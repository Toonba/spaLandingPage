import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal'
import { spaInfoService } from '@/services/spaInfoService'
import { useToast } from '@/context/ToastContext'
import { DAY_LABELS, DAYS_ORDER } from '@/types/spaInfo'
import type { SpaInfo, SpaHours } from '@/types/spaInfo'

interface SpaInfoEditModalProps {
  isOpen: boolean
  onClose: () => void
  spaInfo: SpaInfo
  onSuccess: () => void
}

type FormData = {
  name: string
  address: string
  phone: string
  email: string
  hours: SpaHours
  description: string
  adoptionProcess: string
  helpInfo: string
}

export function SpaInfoEditModal({ isOpen, onClose, spaInfo, onSuccess }: SpaInfoEditModalProps) {
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    phone: '',
    email: '',
    hours: {
      monday: null,
      tuesday: null,
      wednesday: null,
      thursday: null,
      friday: null,
      saturday: null,
      sunday: null,
    },
    description: '',
    adoptionProcess: '',
    helpInfo: '',
  })

  useEffect(() => {
    if (isOpen && spaInfo) {
      setFormData({
        name: spaInfo.name || '',
        address: spaInfo.address || '',
        phone: spaInfo.phone || '',
        email: spaInfo.email || '',
        hours: { ...spaInfo.hours },
        description: spaInfo.description || '',
        adoptionProcess: spaInfo.adoptionProcess || '',
        helpInfo: spaInfo.helpInfo || '',
      })
    }
  }, [isOpen, spaInfo])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleHoursChange = (day: keyof SpaHours, value: string) => {
    setFormData((prev) => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: value.trim() === '' ? null : value,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await spaInfoService.update(formData)
      showToast('Informations mises à jour', 'success')
      onSuccess()
      onClose()
    } catch {
      showToast('Erreur lors de la mise à jour', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Modifier les informations">
      <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
        {/* Informations générales */}
        <section>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
            Informations générales
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Horaires */}
        <section>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
            Horaires d'ouverture
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            Laissez vide pour indiquer "Fermé"
          </p>
          <div className="space-y-2">
            {DAYS_ORDER.map((day) => (
              <div key={day} className="flex items-center gap-3">
                <label className="w-24 text-sm text-gray-600">{DAY_LABELS[day]}</label>
                <input
                  type="text"
                  value={formData.hours[day] || ''}
                  onChange={(e) => handleHoursChange(day, e.target.value)}
                  placeholder="Ex: 14h-17h"
                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Textes */}
        <section>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
            Textes
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Présentation
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                placeholder="Description générale de la SPA..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Procédure d'adoption
              </label>
              <textarea
                value={formData.adoptionProcess}
                onChange={(e) => handleInputChange('adoptionProcess', e.target.value)}
                rows={3}
                placeholder="Informations sur la procédure d'adoption..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Comment aider
              </label>
              <textarea
                value={formData.helpInfo}
                onChange={(e) => handleInputChange('helpInfo', e.target.value)}
                rows={3}
                placeholder="Informations sur comment aider la SPA..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
        </section>

        {/* Boutons */}
        <div className="flex gap-3 pt-4 border-t sticky bottom-0 bg-white">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
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
