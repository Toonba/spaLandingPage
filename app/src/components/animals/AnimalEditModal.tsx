import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal } from '@/components/ui/Modal'
import { PhotoUploader, type PhotoUploaderRef } from './PhotoUploader'
import { animalSchema, type AnimalFormData } from '@/utils/validators'
import { animalService } from '@/services/animalService'
import { storageService } from '@/services/storageService'
import { useToast } from '@/context/ToastContext'
import { SPECIES_LABELS, SPECIES_LIST } from '@/types/animal'
import type { Animal } from '@/types/animal'

interface AnimalEditModalProps {
  isOpen: boolean
  onClose: () => void
  animal?: Animal | null
  onSuccess: () => void
}

function getInitialPhotos(animal: Animal | null | undefined): string[] {
  if (!animal) return []
  return [animal.mainPhoto, ...animal.photos].filter(Boolean)
}

export function AnimalEditModal({ isOpen, onClose, animal, onSuccess }: AnimalEditModalProps) {
  const { showToast } = useToast()
  const isEditing = !!animal
  const photoUploaderRef = useRef<PhotoUploaderRef>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AnimalFormData>({
    resolver: zodResolver(animalSchema),
    defaultValues: animal
      ? {
          name: animal.name,
          species: animal.species,
          breed: animal.breed,
          age: animal.age,
          birthDate: animal.birthDate?.toISOString().split('T')[0] || null,
          gender: animal.gender,
          description: animal.description,
          compatibility: animal.compatibility,
        }
      : {
          name: '',
          species: 'chien',
          breed: '',
          age: '',
          birthDate: null,
          gender: 'male',
          description: '',
          compatibility: {
            children: false,
            dogs: false,
            cats: false,
            other_animals: false,
          },
        },
  })

  const processSubmit = async (data: AnimalFormData, uploaderRef: PhotoUploaderRef | null) => {
    const animalId = animal?.id || crypto.randomUUID()
    const photos = uploaderRef?.getPhotos() || { existing: [], newFiles: [] }

    // Upload new photos
    const uploadedUrls: string[] = []
    for (const file of photos.newFiles) {
      const url = await storageService.uploadPhoto(file, animalId)
      uploadedUrls.push(url)
    }

    // Combine existing and new photos
    const allPhotos = [...photos.existing, ...uploadedUrls]
    const mainPhoto = allPhotos[0] || ''
    const photoList = allPhotos.slice(1)

    const payload = {
      ...data,
      birthDate: data.birthDate ? new Date(data.birthDate) : null,
      photos: photoList,
      mainPhoto,
      status: animal?.status || 'available' as const,
    }

    if (isEditing && animal) {
      await animalService.update(animal.id, payload)
      showToast('Animal modifié avec succès', 'success')
    } else {
      await animalService.create(payload)
      showToast('Animal ajouté avec succès', 'success')
    }

    reset()
    onSuccess()
    onClose()
  }

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit(async (data) => {
      try {
        await processSubmit(data, photoUploaderRef.current)
      } catch {
        showToast('Une erreur est survenue', 'error')
      }
    })(e)
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  // Use a key to force remount PhotoUploader when animal changes
  const uploaderKey = animal?.id || 'new'

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? `Modifier ${animal?.name}` : 'Ajouter un animal'}
    >
      <form onSubmit={onFormSubmit} className="space-y-4">
        {/* Nom */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Espèce */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Espèce <span className="text-red-500">*</span>
          </label>
          <select
            {...register('species')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            {SPECIES_LIST.map((species) => (
              <option key={species} value={species}>
                {SPECIES_LABELS[species]}
              </option>
            ))}
          </select>
        </div>

        {/* Race */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Race <span className="text-red-500">*</span>
          </label>
          <input
            {...register('breed')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          {errors.breed && (
            <p className="mt-1 text-sm text-red-500">{errors.breed.message}</p>
          )}
        </div>

        {/* Âge */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Âge <span className="text-red-500">*</span>
          </label>
          <input
            {...register('age')}
            placeholder="Ex: 2 ans, 6 mois"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-500">{errors.age.message}</p>
          )}
        </div>

        {/* Date de naissance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date de naissance <span className="text-gray-400">(optionnel)</span>
          </label>
          <input
            type="date"
            {...register('birthDate')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* Sexe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sexe <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="male"
                {...register('gender')}
                className="text-orange-500 focus:ring-orange-500"
              />
              <span>Mâle</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="female"
                {...register('gender')}
                className="text-orange-500 focus:ring-orange-500"
              />
              <span>Femelle</span>
            </label>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Histoire de l'animal, son caractère..."
          />
        </div>

        {/* Compatibilités */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Compatibilités
          </label>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register('compatibility.children')}
                className="rounded text-orange-500 focus:ring-orange-500"
              />
              <span className="text-sm">OK enfants</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register('compatibility.dogs')}
                className="rounded text-orange-500 focus:ring-orange-500"
              />
              <span className="text-sm">OK chiens</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register('compatibility.cats')}
                className="rounded text-orange-500 focus:ring-orange-500"
              />
              <span className="text-sm">OK chats</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register('compatibility.other_animals')}
                className="rounded text-orange-500 focus:ring-orange-500"
              />
              <span className="text-sm">OK autres animaux</span>
            </label>
          </div>
        </div>

        {/* Photos */}
        <PhotoUploader
          key={uploaderKey}
          ref={photoUploaderRef}
          initialPhotos={getInitialPhotos(animal)}
        />

        {/* Boutons */}
        <div className="flex gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-lg transition-colors"
          >
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
