'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouseChimney,
  faMagnifyingGlass,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import ShelterQuickInfo from './ShelterQuickInfo';
import { useShelters } from '@/lib/hooks/useShelters';
import { useState, useCallback } from 'react';
import type { GetSheltersParams } from '@/lib/actions/shelter.schema';

export default function ShelterList() {
  const [filters, setFilters] = useState<GetSheltersParams>({});
  const { shelters, refetch, loading } = useShelters(filters);

  const handleSearch = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
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
                  setFilters((prev) => ({
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
                    setFilters((prev) => ({
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
                    setFilters((prev) => ({
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
              <div className="flex flex-row gap-2 py-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-500"
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        foodProvided: e.target.checked || undefined,
                      }))
                    }
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Food Provided
                  </span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-500"
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        waterProvided: e.target.checked || undefined,
                      }))
                    }
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Water Provided
                  </span>
                </label>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Accommodations
              </label>
              <div className="space-y-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-500"
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        wheelchairAccessible: e.target.checked || undefined,
                      }))
                    }
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Wheelchair Accessible
                  </span>
                </label>
                <label className="block inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-500"
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        hasCounselingUnit: e.target.checked || undefined,
                      }))
                    }
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Counseling Unit
                  </span>
                </label>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Animal Housing
              </label>
              <div className="space-y-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-500"
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        housesSmallAnimals: e.target.checked || undefined,
                      }))
                    }
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Small Animals
                  </span>
                </label>
                <label className="block inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-500"
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        housesLargeAnimals: e.target.checked || undefined,
                      }))
                    }
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Large Animals
                  </span>
                </label>
              </div>
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
