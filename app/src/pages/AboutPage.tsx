import { Container } from '@/components/layout/Container'
import { Tabs } from '@/components/ui/Tabs'
import { historyContent, actionsContent, partnersContent } from '@/data/aboutContent'

function HistoryTab() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">{historyContent.title}</h2>
      {historyContent.paragraphs.map((paragraph, i) => (
        <p key={i} className="text-gray-700 leading-relaxed">
          {paragraph}
        </p>
      ))}
    </div>
  )
}

function ActionsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{actionsContent.title}</h2>
        <p className="mt-2 text-gray-600">{actionsContent.description}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {actionsContent.items.map((item) => (
          <div key={item.title} className="rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900">{item.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function PartnersTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{partnersContent.title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {partnersContent.partners.map((partner) => (
          <div key={partner.name} className="rounded-lg border border-gray-200 p-4 text-center">
            <h3 className="font-semibold text-gray-900">{partner.name}</h3>
            {partner.description && (
              <p className="mt-1 text-sm text-gray-600">{partner.description}</p>
            )}
            {'url' in partner && partner.url && (
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                Visiter le site
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function AboutPage() {
  const tabs = [
    { id: 'history', label: 'Historique', content: <HistoryTab /> },
    { id: 'actions', label: 'Nos Actions', content: <ActionsTab /> },
    { id: 'partners', label: 'Partenaires', content: <PartnersTab /> },
  ]

  return (
    <Container className="py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">À propos</h1>
      <Tabs tabs={tabs} defaultTab="history" />
    </Container>
  )
}
