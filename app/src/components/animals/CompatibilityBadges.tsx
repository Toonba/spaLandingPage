import type { AnimalCompatibility } from '@/types/animal'

interface CompatibilityBadgesProps {
  compatibility: AnimalCompatibility
}

interface BadgeConfig {
  key: keyof AnimalCompatibility
  label: string
  icon: string
}

const badges: BadgeConfig[] = [
  { key: 'children', label: 'Enfants', icon: '👶' },
  { key: 'dogs', label: 'Chiens', icon: '🐕' },
  { key: 'cats', label: 'Chats', icon: '🐱' },
  { key: 'other_animals', label: 'Autres animaux', icon: '🐾' },
]

export function CompatibilityBadges({ compatibility }: CompatibilityBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map(({ key, label, icon }) => {
        const isCompatible = compatibility[key]
        return (
          <span
            key={key}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
              isCompatible
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            <span>{icon}</span>
            <span>{isCompatible ? '✓' : '✗'}</span>
            <span>{label}</span>
          </span>
        )
      })}
    </div>
  )
}
