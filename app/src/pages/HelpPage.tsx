import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Spinner } from '@/components/ui/Spinner'
import { SpaInfoEditModal } from '@/components/spa/SpaInfoEditModal'
import { Tabs } from '@/components/ui/Tabs'
import { useSpaInfo } from '@/hooks/useSpaInfo'
import { useAuth } from '@/context/AuthContext'
import { DAY_LABELS, DAYS_ORDER } from '@/types/spaInfo'
import type { SpaHours } from '@/types/spaInfo'
import {
  walksContent,
  volunteerContent,
  financialAidContent,
  donationsContent,
} from '@/data/helpContent'
import { sponsorshipContent } from '@/data/sponsorshipContent'
import { boardingContent } from '@/data/boardingContent'

function formatHours(hours: SpaHours) {
  return DAYS_ORDER.map((day) => ({
    day: DAY_LABELS[day],
    value: hours[day] || 'Fermé',
    isClosed: !hours[day],
  }))
}

function WalksTab() {
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-orange-700 mb-3">{walksContent.title}</h2>
      <p className="text-gray-700 mb-4">{walksContent.description}</p>
      <p className="font-medium text-orange-600">{walksContent.cta}</p>
    </div>
  )
}

function VolunteerTab() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">{volunteerContent.title}</h2>
      <p className="text-gray-500">{volunteerContent.subtitle}</p>
      {volunteerContent.paragraphs.map((p, i) => (
        <p key={i} className="text-gray-700 leading-relaxed">{p}</p>
      ))}
    </div>
  )
}

function FinancialTab() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">{financialAidContent.title}</h2>
      <p className="text-gray-600">{financialAidContent.description}</p>
      <ul className="space-y-2">
        {financialAidContent.items.map((item, i) => (
          <li key={i} className="text-gray-700 flex items-center gap-2">
            <span className="text-orange-500">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function DonationsTab() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">{donationsContent.title}</h2>
      <p className="text-gray-600">{donationsContent.intro}</p>
      <ul className="space-y-2">
        {donationsContent.items.map((item, i) => (
          <li key={i} className="text-gray-700 flex items-center gap-2">
            <span className="text-orange-500">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function SponsorshipTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{sponsorshipContent.title}</h2>
        <p className="text-gray-600 mt-2">{sponsorshipContent.description}</p>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">💜</span>
          <div>
            <p className="text-lg font-semibold text-purple-700">Coût du parrainage</p>
            <p className="text-2xl font-bold text-purple-600">{sponsorshipContent.price}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Ce que vous recevez</h3>
        <ul className="space-y-2">
          {sponsorshipContent.benefits.map((benefit, i) => (
            <li key={i} className="text-gray-700 flex items-center gap-2">
              <span className="text-purple-500">✓</span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-gray-600">{sponsorshipContent.cta}</p>
      </div>
    </div>
  )
}

function BoardingTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{boardingContent.title}</h2>
        <p className="text-gray-600 mt-2">{boardingContent.intro}</p>
      </div>

      {/* Tarifs */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tarifs</h3>
        <div className="space-y-4">
          {boardingContent.prices.map((price, i) => (
            <div key={i} className="border-b border-gray-100 pb-3 last:border-0">
              <div className="flex justify-between items-start">
                <span className="font-medium text-gray-800">{price.animal}</span>
                <span className="text-orange-600 font-semibold">{price.single}</span>
              </div>
              {price.double && (
                <p className="text-sm text-gray-600 mt-1">{price.double}</p>
              )}
              {price.note && (
                <p className="text-sm text-gray-500 mt-1 italic">{price.note}</p>
              )}
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
          {boardingContent.medicalCare}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Conditions */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">{boardingContent.requirements.title}</h3>
          <ul className="space-y-2">
            {boardingContent.requirements.items.map((item, i) => (
              <li key={i} className="text-gray-700 flex items-start gap-2 text-sm">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Paiement */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">{boardingContent.payment.title}</h3>
          <ul className="space-y-2">
            {boardingContent.payment.items.map((item, i) => (
              <li key={i} className="text-gray-700 flex items-start gap-2 text-sm">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Soins */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-3">{boardingContent.care.title}</h3>
        <ul className="space-y-2">
          {boardingContent.care.items.map((item, i) => (
            <li key={i} className="text-gray-700 flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ContactTab({ spaInfo }: { spaInfo: { address: string; phone: string; email: string; hours: SpaHours } }) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact</h3>
        <div className="space-y-3">
          <p className="flex items-start gap-3">
            <span className="text-xl">📍</span>
            <span className="text-gray-600">{spaInfo.address}</span>
          </p>
          <p className="flex items-center gap-3">
            <span className="text-xl">📞</span>
            <a href={`tel:${spaInfo.phone}`} className="text-orange-600 hover:text-orange-700 font-medium">
              {spaInfo.phone}
            </a>
          </p>
          <p className="flex items-center gap-3">
            <span className="text-xl">📧</span>
            <a href={`mailto:${spaInfo.email}`} className="text-orange-600 hover:text-orange-700 font-medium">
              {spaInfo.email}
            </a>
          </p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Horaires</h3>
        <div className="space-y-2">
          {formatHours(spaInfo.hours).map(({ day, value, isClosed }) => (
            <div key={day} className="flex justify-between">
              <span className="text-gray-600">{day}</span>
              <span className={isClosed ? 'text-red-500' : 'text-gray-800 font-medium'}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function HelpPage() {
  const { spaInfo, loading, error, refetch } = useSpaInfo()
  const { user } = useAuth()
  const [showEditModal, setShowEditModal] = useState(false)
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined)

  // Read tab from URL on mount
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam) {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  if (loading) {
    return (
      <Container className="py-12">
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      </Container>
    )
  }

  const tabs = [
    { id: 'walks', label: 'Balades', content: <WalksTab /> },
    { id: 'volunteer', label: 'Bénévolat', content: <VolunteerTab /> },
    { id: 'sponsorship', label: 'Parrainage', content: <SponsorshipTab /> },
    { id: 'boarding', label: 'Pension', content: <BoardingTab /> },
    { id: 'financial', label: 'Aides financières', content: <FinancialTab /> },
    { id: 'donations', label: 'Dons matériels', content: <DonationsTab /> },
    ...(spaInfo && !error
      ? [{ id: 'contact', label: 'Contact & Horaires', content: <ContactTab spaInfo={spaInfo} /> }]
      : []),
  ]

  return (
    <Container className="py-8">
      <div className="flex items-center justify-between mb-6">
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

      <Tabs tabs={tabs} defaultTab="walks" activeTab={activeTab} onTabChange={setActiveTab} />

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
