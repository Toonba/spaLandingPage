import { SPECIES_LABELS, SPECIES_LIST } from '@/types/animal'
import type { Species } from '@/types/animal'

export interface AnimalFiltersState {
  species?: Species
  children?: boolean
  dogs?: boolean
  cats?: boolean
}

interface AnimalFiltersProps {
  filters: AnimalFiltersState
  onChange: (filters: AnimalFiltersState) => void
  resultCount: number
  loading: boolean
}

export function AnimalFilters({ filters, onChange, resultCount, loading }: AnimalFiltersProps) {
  const handleSpeciesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    onChange({
      ...filters,
      species: value ? (value as Species) : undefined,
    })
  }

  const handleCompatibilityChange = (key: 'children' | 'dogs' | 'cats') => {
    onChange({
      ...filters,
      [key]: !filters[key],
    })
  }

  const activeFiltersCount = [
    filters.species,
    filters.children,
    filters.dogs,
    filters.cats,
  ].filter(Boolean).length

  const clearFilters = () => {
    onChange({})
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Species filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="species" className="text-sm font-medium text-gray-700">
            Espèce:
          </label>
          <select
            id="species"
            value={filters.species || ''}
            onChange={handleSpeciesChange}
            className="rounded-lg border-gray-300 border px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">Tous</option>
            {SPECIES_LIST.map((species) => (
              <option key={species} value={species}>
                {SPECIES_LABELS[species]}
              </option>
            ))}
          </select>
        </div>

        {/* Compatibility filters */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Compatible:</span>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.children || false}
              onChange={() => handleCompatibilityChange('children')}
              className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            <span className="text-sm text-gray-600">👶 Enfants</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.dogs || false}
              onChange={() => handleCompatibilityChange('dogs')}
              className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            <span className="text-sm text-gray-600">🐕 Chiens</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.cats || false}
              onChange={() => handleCompatibilityChange('cats')}
              className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            <span className="text-sm text-gray-600">🐱 Chats</span>
          </label>
        </div>
      </div>

      {/* Results count and clear button */}
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <p className="text-sm text-gray-600">
          {loading ? (
            'Chargement...'
          ) : (
            <>
              <span className="font-semibold text-gray-800">{resultCount}</span>{' '}
              {resultCount <= 1 ? 'animal trouvé' : 'animaux trouvés'}
            </>
          )}
        </p>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            Effacer les filtres
          </button>
        )}
      </div>
    </div>
  )
}
