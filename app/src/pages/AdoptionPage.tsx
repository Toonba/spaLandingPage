import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Spinner } from '@/components/ui/Spinner'
import { SpaInfoEditModal } from '@/components/spa/SpaInfoEditModal'
import { useSpaInfo } from '@/hooks/useSpaInfo'
import { useAuth } from '@/context/AuthContext'
import { DAY_LABELS, DAYS_ORDER } from '@/types/spaInfo'
import type { SpaHours } from '@/types/spaInfo'
import { adoptionContent, adoptionAdvice } from '@/data/adoptionContent'

const ADOPTION_STEPS = [
  {
    title: 'Visitez la SPA',
    description: 'Venez rencontrer nos pensionnaires aux heures de visite.',
  },
  {
    title: "Rencontrez l'animal",
    description: 'Passez du temps avec lui pour faire connaissance.',
  },
  {
    title: 'Entretien',
    description: "Échangez avec notre équipe sur vos conditions d'accueil.",
  },
  {
    title: 'Formalités',
    description: "Signez le contrat d'adoption et réglez les frais.",
  },
  {
    title: 'Départ',
    description: 'Repartez avec votre nouveau compagnon !',
  },
]

function formatHours(hours: SpaHours) {
  return DAYS_ORDER.map((day) => ({
    day: DAY_LABELS[day],
    value: hours[day] || 'Fermé',
    isClosed: !hours[day],
  }))
}

export function AdoptionPage() {
  const { spaInfo, loading, error, refetch } = useSpaInfo()
  const { user } = useAuth()
  const [showEditModal, setShowEditModal] = useState(false)

  if (loading) {
    return (
      <Container className="py-12">
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      </Container>
    )
  }

  if (error || !spaInfo) {
    return (
      <Container className="py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Comment adopter ?</h1>
        <p className="text-gray-600">
          Les informations ne sont pas disponibles pour le moment.
        </p>
      </Container>
    )
  }

  const formattedHours = formatHours(spaInfo.hours)

  return (
    <Container className="py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Comment adopter ?</h1>
        {user && (
          <button
            onClick={() => setShowEditModal(true)}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            Modifier
          </button>
        )}
      </div>

      {/* Étapes d'adoption */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Les étapes</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {ADOPTION_STEPS.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                {index + 1}
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">{step.title}</h3>
              <p className="text-gray-600 text-xs mt-1">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tarifs d'adoption */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tarifs d'adoption</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Chats */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">🐱</span> Chats
            </h3>
            <div className="space-y-3">
              {adoptionContent.catFees.map((fee, index) => (
                <div key={index} className="border-b border-gray-100 pb-2 last:border-0">
                  <div className="flex justify-between items-start">
                    <span className="text-gray-700">{fee.category}</span>
                    <span className="font-semibold text-orange-600">{fee.price}</span>
                  </div>
                  {fee.details && (
                    <p className="text-sm text-gray-500 mt-1">{fee.details}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chiens */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">🐕</span> Chiens
            </h3>
            <div className="space-y-3">
              {adoptionContent.dogFees.map((fee, index) => (
                <div key={index} className="border-b border-gray-100 pb-2 last:border-0">
                  <div className="flex justify-between items-start">
                    <span className="text-gray-700">{fee.category}</span>
                    <span className="font-semibold text-orange-600">{fee.price}</span>
                  </div>
                  {fee.details && (
                    <p className="text-sm text-gray-500 mt-1">{fee.details}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600 bg-gray-50 rounded-lg p-4">
          {adoptionContent.note}
        </p>
      </section>

      {/* Conseils aux adoptants */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{adoptionAdvice.title}</h2>
        <p className="text-gray-600 mb-6 italic">{adoptionAdvice.intro}</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-800 mb-4">{adoptionAdvice.beforeAdoption.title}</h3>
            <ul className="space-y-2">
              {adoptionAdvice.beforeAdoption.items.map((item, index) => (
                <li key={index} className="text-gray-700 flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-green-800 mb-4">{adoptionAdvice.afterAdoption.title}</h3>
            <ul className="space-y-2">
              {adoptionAdvice.afterAdoption.items.map((item, index) => (
                <li key={index} className="text-gray-700 flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Horaires */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Horaires de visite</h2>
          <div className="space-y-2">
            {formattedHours.map(({ day, value, isClosed }) => (
              <div key={day} className="flex justify-between">
                <span className="text-gray-600">{day}</span>
                <span className={isClosed ? 'text-red-500' : 'text-gray-800 font-medium'}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact</h2>
          <div className="space-y-3">
            <p className="flex items-center gap-2">
              <span>📞</span>
              <a
                href={`tel:${spaInfo.phone}`}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                {spaInfo.phone}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span>📧</span>
              <a
                href={`mailto:${spaInfo.email}`}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                {spaInfo.email}
              </a>
            </p>
            <p className="flex items-start gap-2">
              <span>📍</span>
              <span className="text-gray-600">{spaInfo.address}</span>
            </p>
          </div>
        </section>
      </div>

      {/* Informations complémentaires */}
      {spaInfo.adoptionProcess && (
        <section className="mt-8 bg-orange-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Informations complémentaires</h2>
          <p className="text-gray-700 whitespace-pre-line">{spaInfo.adoptionProcess}</p>
        </section>
      )}

      {/* CTA */}
      <div className="mt-12 text-center">
        <Link
          to="/animaux"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
        >
          Voir nos animaux à adopter
        </Link>
      </div>

      {/* Edit Modal */}
      {spaInfo && (
        <SpaInfoEditModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          spaInfo={spaInfo}
          onSuccess={refetch}
        />
      )}
    </Container>
  )
}
