'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouseChimney,
  faMagnifyingGlass,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import ShelterQuickInfo from './ShelterQuickInfo';
import { useCallback } from 'react';
import CheckboxGroup from '@/src/components/CheckboxGroup';
import { useShelterStore } from '@/lib/store/shelterStore';
import type { GetSheltersParams } from '@/lib/actions/shelter.schema';

export default function ShelterList() {
  const { shelters, loading, setFilters, fetchShelters } = useShelterStore();

  const handleSearch = useCallback(() => {
    fetchShelters();
  }, [fetchShelters]);

  const handleFilterChange = useCallback(
    (value: string, checked: boolean) => {
      setFilters((prev: GetSheltersParams) => ({
        ...prev,
        [value]: checked || undefined,
      }));
    },
    [setFilters],
  );

  return (
    <div className="container mx-auto max-w-6xl px-4 pb-8">
      <div className="mb-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
            <FontAwesomeIcon
              icon={faHouseChimney}
              className="h-6 w-6 text-primary-500"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Available Shelters
          </h1>
        </div>

        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
                placeholder="Search by name"
                onChange={(e) =>
                  setFilters((prev: GetSheltersParams) => ({
                    ...prev,
                    name: e.target.value || undefined,
                  }))
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Capacity
              </label>
              <div className="grid gap-2">
                <input
                  type="number"
                  min="0"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
                  placeholder="Min volunteer capacity"
                  onChange={(e) =>
                    setFilters((prev: GetSheltersParams) => ({
                      ...prev,
                      volunteerCapacity: e.target.value
                        ? { gte: parseInt(e.target.value) }
                        : undefined,
                    }))
                  }
                />
                <input
                  type="number"
                  min="0"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
                  placeholder="Min evacuee capacity"
                  onChange={(e) =>
                    setFilters((prev: GetSheltersParams) => ({
                      ...prev,
                      evacueeCapacity: e.target.value
                        ? { gte: parseInt(e.target.value) }
                        : undefined,
                    }))
                  }
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Basic Services
              </label>
              <CheckboxGroup
                options={[
                  { label: 'Food Provided', value: 'foodProvided' },
                  { label: 'Water Provided', value: 'waterProvided' },
                ]}
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Accommodations
              </label>
              <CheckboxGroup
                options={[
                  {
                    label: 'Wheelchair Accessible',
                    value: 'wheelchairAccessible',
                  },
                  { label: 'Counseling Unit', value: 'hasCounselingUnit' },
                ]}
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Animal Housing
              </label>
              <CheckboxGroup
                options={[
                  { label: 'Small Animals', value: 'housesSmallAnimals' },
                  { label: 'Large Animals', value: 'housesLargeAnimals' },
                ]}
                onChange={handleFilterChange}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="inline-flex items-center rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 focus:outline-none disabled:opacity-50"
            >
              {loading ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="mr-2 h-4 w-4 animate-spin"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="mr-2 h-4 w-4"
                />
              )}
              Search
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <span className="text-sm text-gray-500">{shelters.length} total</span>
        </div>
      </div>

      {shelters.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shelters.map((shelter) => (
            <ShelterQuickInfo key={shelter.id} shelter={shelter} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-gray-50 p-8 text-center">
          <p className="text-gray-600">No shelters available at the moment.</p>
        </div>
      )}
    </div>
  );
}
