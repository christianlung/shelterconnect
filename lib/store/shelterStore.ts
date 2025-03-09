import { create } from 'zustand';
import type { Shelter } from '@prisma/client';
import type { GetSheltersParams } from '@/lib/actions/shelter.schema';
import { getShelters } from '@/lib/actions/shelter';

interface ShelterState {
  shelters: Shelter[];
  loading: boolean;
  error: string | null;
  filters: GetSheltersParams;
  setFilters: (
    setFunc: (prevFilters: GetSheltersParams) => GetSheltersParams,
  ) => void;
  setShelters: (shelters: Shelter[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
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
        set({ shelters: result.data });
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

    setFilters: (setFunc) =>
      set((state) => ({
        filters: setFunc(state.filters),
      })),

    setShelters: (shelters) => set({ shelters }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    fetchShelters,
    refetch: fetchShelters,
  };
});
