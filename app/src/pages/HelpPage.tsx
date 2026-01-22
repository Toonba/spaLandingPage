import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Spinner } from '@/components/ui/Spinner'
import { SpaInfoEditModal } from '@/components/spa/SpaInfoEditModal'
import { useSpaInfo } from '@/hooks/useSpaInfo'
import { useAuth } from '@/context/AuthContext'
import { DAY_LABELS, DAYS_ORDER } from '@/types/spaInfo'
import type { SpaHours } from '@/types/spaInfo'

const HELP_OPTIONS = [
  {
    icon: '💰',
    title: 'Dons',
    description: 'Vos dons nous permettent de soigner et nourrir nos pensionnaires.',
    details: [
      'Don ponctuel ou régulier',
      'Déductible des impôts',
      'Chaque euro compte',
    ],
  },
  {
    icon: '🤝',
    title: 'Bénévolat',
    description: "Nous avons toujours besoin de bras pour s'occuper de nos pensionnaires.",
    details: [
      'Promener les chiens',
      'Socialiser les animaux',
      'Entretenir les locaux',
      'Participer aux événements',
    ],
  },
  {
    icon: '📦',
    title: 'Dons matériels',
    description: 'Nous acceptons les dons en nature pour le bien-être des animaux.',
    details: [
      'Croquettes et pâtées',
      'Couvertures et paniers',
      'Jouets pour animaux',
      'Produits d\'entretien',
    ],
  },
]

function formatHours(hours: SpaHours) {
  return DAYS_ORDER.map((day) => ({
    day: DAY_LABELS[day],
    value: hours[day] || 'Fermé',
    isClosed: !hours[day],
  }))
}

export function HelpPage() {
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

  return (
    <Container className="py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Aider la SPA</h1>
        {user && (
          <button
            onClick={() => setShowEditModal(true)}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            Modifier
          </button>
        )}
      </div>

      {/* Options d'aide */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Comment nous aider ?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {HELP_OPTIONS.map((option) => (
            <div
              key={option.title}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{option.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{option.title}</h3>
              <p className="text-gray-600 mb-4">{option.description}</p>
              <ul className="space-y-1">
                {option.details.map((detail, index) => (
                  <li key={index} className="text-sm text-gray-500 flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Infos supplémentaires depuis Firestore */}
      {spaInfo?.helpInfo && (
        <section className="mb-12 bg-orange-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Informations complémentaires</h2>
          <p className="text-gray-700 whitespace-pre-line">{spaInfo.helpInfo}</p>
        </section>
      )}

      {/* Contact */}
      {spaInfo && !error && (
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Nous trouver</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Coordonnées */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact</h3>
              <div className="space-y-3">
                <p className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <span className="text-gray-600">{spaInfo.address}</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-xl">📞</span>
                  <a
                    href={`tel:${spaInfo.phone}`}
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    {spaInfo.phone}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-xl">📧</span>
                  <a
                    href={`mailto:${spaInfo.email}`}
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    {spaInfo.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Horaires */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Horaires</h3>
              <div className="space-y-2">
                {formatHours(spaInfo.hours).map(({ day, value, isClosed }) => (
                  <div key={day} className="flex justify-between">
                    <span className="text-gray-600">{day}</span>
                    <span className={isClosed ? 'text-red-500' : 'text-gray-800 font-medium'}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
