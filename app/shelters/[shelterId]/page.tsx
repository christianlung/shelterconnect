import ShelterDetails from '@/components/ShelterDetails';
import { Shelter } from '@prisma/client';

export type TempShelter = Omit<
  Shelter,
  'createdAt' | 'updatedAt' | 'volunteerPreferences'
>;

const ShelterDetailsPage = async ({
  params,
}: {
  params: { shelterId: string };
}) => {
  const { shelterId } = params;

  // TODO get real data instead
  const tempShelters: { [key: number]: TempShelter } = {
    1: {
      id: '1',
      name: 'Safe Haven Shelter',
      address: {
        street: '123 Main St',
        city: 'San Diego',
        state: 'CA',
        zipCode: '92101',
        country: 'USA',
      },
      picture:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6k494W1lQ6ciZpOYjS38dQhLR37D9EF3k_w&s',
      volunteerCapacity: 50,
      evacueeCapacity: 200,
      accommodations: ['Beds', 'Showers'],
      wheelchairAccessible: true,
      housesLargeAnimals: false,
      housesSmallAnimals: true,
      hasCounselingUnit: true,
      foodProvided: true,
      waterProvided: true,
      requiredLanguages: ['ENGLISH', 'SPANISH'],
      location: {
        latitude: 32.7157,
        longitude: -117.1611,
      },
    },
    2: {
      id: '2',
      name: 'Mountain View Shelter',
      address: {
        street: '456 Pine St',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001',
        country: 'USA',
      },
      picture:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6k494W1lQ6ciZpOYjS38dQhLR37D9EF3k_w&s',
      volunteerCapacity: 100,
      evacueeCapacity: 300,
      accommodations: ['Beds', 'Showers', 'Tents'],
      wheelchairAccessible: false,
      housesLargeAnimals: true,
      housesSmallAnimals: true,
      hasCounselingUnit: false,
      foodProvided: true,
      waterProvided: true,
      requiredLanguages: ['ENGLISH'],
      location: {
        latitude: 34.0522,
        longitude: -118.2437,
      },
    },
    3: {
      id: '3',
      name: 'Sunnydale Shelter',
      address: {
        street: '789 Oak Ave',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94107',
        country: 'USA',
      },
      picture:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6k494W1lQ6ciZpOYjS38dQhLR37D9EF3k_w&s', // You can replace with another image URL
      volunteerCapacity: 120,
      evacueeCapacity: 350,
      accommodations: ['Cots', 'Showers', 'Food Kitchens'],
      wheelchairAccessible: true,
      housesLargeAnimals: false,
      housesSmallAnimals: true,
      hasCounselingUnit: true,
      foodProvided: true,
      waterProvided: true,
      requiredLanguages: ['ENGLISH', 'SPANISH'],
      location: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
    },
  };

  return <ShelterDetails shelter={tempShelters[parseInt(shelterId)]} />;
};

export default ShelterDetailsPage;
