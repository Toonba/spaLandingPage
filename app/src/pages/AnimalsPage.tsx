import { useSearchParams } from 'react-router-dom'
import { useCallback, useMemo, useState } from 'react'
import { Container } from '@/components/layout/Container'
import { AnimalGrid } from '@/components/animals/AnimalGrid'
import { AnimalFilters, type AnimalFiltersState } from '@/components/animals/AnimalFilters'
import { AnimalEditModal } from '@/components/animals/AnimalEditModal'
import { Spinner } from '@/components/ui/Spinner'
import { useAnimals } from '@/hooks/useAnimals'
import { useAuth } from '@/context/AuthContext'
import type { Animal, Species } from '@/types/animal'

export function AnimalsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null)

  const filters: AnimalFiltersState = useMemo(() => ({
    species: (searchParams.get('species') as Species) || undefined,
    children: searchParams.get('children') === 'true',
    dogs: searchParams.get('dogs') === 'true',
    cats: searchParams.get('cats') === 'true',
  }), [searchParams])

  const { animals, loading, error, refetch } = useAnimals(filters)

  const handleFiltersChange = useCallback((newFilters: AnimalFiltersState) => {
    const params = new URLSearchParams()
    if (newFilters.species) params.set('species', newFilters.species)
    if (newFilters.children) params.set('children', 'true')
    if (newFilters.dogs) params.set('dogs', 'true')
    if (newFilters.cats) params.set('cats', 'true')
    setSearchParams(params)
  }, [setSearchParams])

  const handleAddClick = () => {
    setEditingAnimal(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (animal: Animal) => {
    setEditingAnimal(animal)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingAnimal(null)
  }

  return (
    <Container className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Nos animaux à adopter</h1>
        {user && (
          <button
            onClick={handleAddClick}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            + Ajouter un animal
          </button>
        )}
      </div>

      <AnimalFilters
        filters={filters}
        onChange={handleFiltersChange}
        resultCount={animals.length}
        loading={loading}
      />

      {loading && (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-500">Une erreur est survenue lors du chargement.</p>
          <p className="text-gray-500 mt-2">{error.message}</p>
        </div>
      )}

      {!loading && !error && (
        <AnimalGrid
          animals={animals}
          onEdit={user ? handleEditClick : undefined}
        />
      )}

      <AnimalEditModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        animal={editingAnimal}
        onSuccess={refetch}
      />
    </Container>
  )
}
