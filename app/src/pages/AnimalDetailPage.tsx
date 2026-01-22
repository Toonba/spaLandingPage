import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { AnimalGallery } from '@/components/animals/AnimalGallery'
import { CompatibilityBadges } from '@/components/animals/CompatibilityBadges'
import { Spinner } from '@/components/ui/Spinner'
import { ConfirmModal } from '@/components/ui/ConfirmModal'
import { animalService } from '@/services/animalService'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { formatGender, formatSpecies } from '@/utils/formatters'
import type { Animal } from '@/types/animal'

export function AnimalDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { showToast } = useToast()

  const [animal, setAnimal] = useState<Animal | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAdoptModal, setShowAdoptModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    async function fetchAnimal() {
      if (!id) return
      setLoading(true)
      setError(null)
      try {
        const data = await animalService.getById(id)
        setAnimal(data)
      } catch {
        setError('Erreur lors du chargement')
      } finally {
        setLoading(false)
      }
    }
    fetchAnimal()
  }, [id])

  const handleMarkAdopted = async () => {
    if (!animal) return
    setActionLoading(true)
    try {
      await animalService.updateStatus(animal.id, 'adopted')
      showToast(`${animal.name} a été marqué comme adopté`, 'success')
      navigate('/animaux')
    } catch {
      showToast('Erreur lors de la mise à jour', 'error')
    } finally {
      setActionLoading(false)
      setShowAdoptModal(false)
    }
  }

  const handleDelete = async () => {
    if (!animal) return
    setActionLoading(true)
    try {
      await animalService.delete(animal.id)
      showToast(`${animal.name} a été supprimé`, 'success')
      navigate('/animaux')
    } catch {
      showToast('Erreur lors de la suppression', 'error')
    } finally {
      setActionLoading(false)
      setShowDeleteModal(false)
    }
  }

  if (loading) {
    return (
      <Container className="py-12">
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      </Container>
    )
  }

  if (error || !animal) {
    return (
      <Container className="py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Animal non trouvé</h1>
          <p className="text-gray-600 mb-6">
            Cet animal n'existe pas ou a peut-être été adopté.
          </p>
          <Link
            to="/animaux"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
          >
            ← Retour aux animaux
          </Link>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-8">
      <Link
        to="/animaux"
        className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium mb-6"
      >
        ← Retour aux animaux
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <AnimalGallery
            photos={animal.photos}
            mainPhoto={animal.mainPhoto}
            name={animal.name}
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{animal.name}</h1>
            <p className="text-lg text-gray-600">{animal.breed}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Espèce</p>
              <p className="font-semibold text-gray-800">{formatSpecies(animal.species)}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Âge</p>
              <p className="font-semibold text-gray-800">{animal.age}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Sexe</p>
              <p className="font-semibold text-gray-800">{formatGender(animal.gender)}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Statut</p>
              <p className="font-semibold text-green-600">Disponible</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Compatibilités</h2>
            <CompatibilityBadges compatibility={animal.compatibility} />
          </div>
        </div>
      </div>

      {animal.description && (
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Son histoire</h2>
          <p className="text-gray-600 whitespace-pre-line">{animal.description}</p>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          to="/adoption"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
        >
          Comment adopter {animal.name} ?
        </Link>
      </div>

      {/* Admin Actions */}
      {user && (
        <div className="mt-8 bg-gray-100 rounded-xl p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Actions admin</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowAdoptModal(true)}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
            >
              ✓ Marquer adopté
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Supprimer
            </button>
          </div>
        </div>
      )}

      {/* Confirm Adopted Modal */}
      <ConfirmModal
        isOpen={showAdoptModal}
        onClose={() => setShowAdoptModal(false)}
        onConfirm={handleMarkAdopted}
        title="Confirmer l'adoption"
        message={`Marquer ${animal.name} comme adopté ? Il n'apparaîtra plus dans la liste publique mais restera dans la base de données.`}
        confirmText="Confirmer"
        loading={actionLoading}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Supprimer définitivement"
        message={`Êtes-vous sûr de vouloir supprimer ${animal.name} ? Cette action est irréversible.`}
        confirmText="Supprimer"
        variant="danger"
        loading={actionLoading}
      />
    </Container>
  )
}
