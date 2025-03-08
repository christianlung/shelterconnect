import redis from '../redis';
import { prisma } from '../prisma';
import { fetchWithCache, cacheDonors } from './cache';

// Store original prisma.donor.findMany implementation
const originalFindMany = prisma.donor.findMany;

jest.mock('../redis', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    set: jest.fn(),
  },
}));

global.fetch = jest.fn();

describe(fetchWithCache, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return cached data if available', async () => {
    const mockData = { foo: 'bar' };
    (redis.get as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockData));

    const result = await fetchWithCache('https://api.example.com/data');

    expect(result).toEqual(mockData);
    expect(redis.get).toHaveBeenCalledWith(
      'cache_key:https://api.example.com/data',
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  it('should fetch and cache data if not in cache', async () => {
    const mockData = { foo: 'bar' };
    (redis.get as jest.Mock).mockResolvedValueOnce(null);
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
    });

    const result = await fetchWithCache('https://api.example.com/data');

    expect(result).toEqual(mockData);
    expect(redis.get).toHaveBeenCalledWith(
      'cache_key:https://api.example.com/data',
    );
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/data');
    expect(redis.set).toHaveBeenCalledWith(
      'cache_key:https://api.example.com/data',
      JSON.stringify(mockData),
      'EX',
      3600,
    );
  });

  it('should throw error when fetch fails', async () => {
    const errorMessage = 'Network error';
    (redis.get as jest.Mock).mockResolvedValueOnce(null);
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(
      fetchWithCache('https://api.example.com/data'),
    ).rejects.toThrow(errorMessage);
  });
});

describe(cacheDonors, () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    prisma.donor.findMany = originalFindMany;
    await prisma.donor.deleteMany();
  });

  afterAll(async () => {
    await prisma.donor.deleteMany();
    await prisma.$disconnect();
    prisma.donor.findMany = originalFindMany;
  });

  it('should return cached donors if available', async () => {
    const testDonor = await prisma.donor.create({
      data: {
        donorName: 'John Doe',
        finalDonorAmount: '100',
      },
    });

    (redis.get as jest.Mock).mockResolvedValueOnce(JSON.stringify([testDonor]));

    const result = await cacheDonors();

    expect(result).toEqual({ success: true, data: [testDonor] });
    expect(redis.get).toHaveBeenCalledWith('donors');
  });

  it('should fetch and cache donors if not in cache', async () => {
    const testDonor = await prisma.donor.create({
      data: {
        donorName: 'John Doe',
        finalDonorAmount: '100',
      },
    });

    (redis.get as jest.Mock).mockResolvedValueOnce(null);

    const result = await cacheDonors();

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
    expect(result.data![0]).toEqual(testDonor);

    expect(redis.set).toHaveBeenCalledWith(
      'donors',
      JSON.stringify(result.data),
      'EX',
      3600,
    );
  });

  it('should handle database errors and return failure response', async () => {
    // Temporarily mock prisma.donor.findMany to throw an error
    const findManySpy = jest.spyOn(prisma.donor, 'findMany');
    findManySpy.mockRejectedValueOnce(new Error('Database error'));

    (redis.get as jest.Mock).mockResolvedValueOnce(null);

    const result = await cacheDonors();

    expect(result).toEqual({ success: false, data: null });
    expect(redis.get).toHaveBeenCalledWith('donors');

    findManySpy.mockRestore();
  });
});
