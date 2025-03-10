import { create } from 'zustand';
import type { Shelter } from '@prisma/client';
import type { GetSheltersParams } from '@/lib/actions/shelter.schema';
import { getShelters } from '@/lib/actions/shelter';

interface ShelterState {
  shelters: Shelter[];
  loading: boolean;
  error: string | null;
  filters: GetSheltersParams;
  totalShelters: number;
  currentPage: number;
  setFilters: (
    setFunc: (prevFilters: GetSheltersParams) => GetSheltersParams,
  ) => void;
  setShelters: (shelters: Shelter[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentPage: (page: number) => void;
  fetchShelters: () => Promise<void>;
  refetch: () => Promise<void>;
}

export const useShelterStore = create<ShelterState>()((set, get) => {
  const fetchShelters = async () => {
    const { filters } = get();
    set({ loading: true, error: null });

    try {
      const result = await getShelters(filters);
      if (result.success) {
        set({
          shelters: result.data.shelters,
          totalShelters: result.data.total,
          currentPage: filters.pagination?.page || 1,
        });
      } else {
        set({ error: 'Failed to fetch shelters' });
      }
    } catch (err) {
      console.error('Error fetching shelters:', err);
      set({ error: 'An error occurred while fetching shelters' });
    } finally {
      set({ loading: false });
    }
  };

  return {
    shelters: [],
    loading: false,
    error: null,
    filters: {},
    totalShelters: 0,
    currentPage: 1,

    setFilters: (setFunc) =>
      set((state) => ({
        filters: setFunc(state.filters),
      })),

    setShelters: (shelters) => set({ shelters }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setCurrentPage: (page) => set({ currentPage: page }),

    fetchShelters,
    refetch: fetchShelters,
  };
});
