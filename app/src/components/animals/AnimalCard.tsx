import { Link } from 'react-router-dom'
import type { Animal } from '@/types/animal'

interface AnimalCardProps {
  animal: Animal
  onEdit?: (animal: Animal) => void
}

const PLACEHOLDER_IMAGE = 'https://placehold.co/400x300/f97316/white?text=Photo'

const COMPATIBILITY_LABELS = {
  children: { label: 'Enfants', icon: '👶' },
  dogs: { label: 'Chiens', icon: '🐕' },
  cats: { label: 'Chats', icon: '🐱' },
  other_animals: { label: 'Autres', icon: '🐾' },
}

const STATUS_CONFIG = {
  available: { label: 'Disponible', bgColor: 'bg-emerald-500', textColor: 'text-white' },
  adopted: { label: 'Adopté', bgColor: 'bg-gray-500', textColor: 'text-white' },
  reserved: { label: 'Réservé', bgColor: 'bg-amber-500', textColor: 'text-white' },
  sponsorship: { label: 'Parrainage', bgColor: 'bg-purple-500', textColor: 'text-white' },
}

const COMPATIBILITY_ORDER: (keyof typeof COMPATIBILITY_LABELS)[] = [
  'children',
  'dogs',
  'cats',
  'other_animals',
]

export function AnimalCard({ animal, onEdit }: AnimalCardProps) {
  const imageUrl = animal.mainPhoto || PLACEHOLDER_IMAGE

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onEdit?.(animal)
  }

  return (
    <Link
      to={`/animaux/${animal.id}`}
      className="group relative block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      {onEdit && (
        <button
          onClick={handleEditClick}
          className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white text-gray-700 px-3 py-1 rounded-lg text-sm font-medium shadow-sm transition-colors"
        >
          Modifier
        </button>
      )}
      <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
        {animal.status !== 'available' && (
          <span
            className={`absolute top-2 left-2 z-10 px-2 py-1 rounded-lg text-xs font-semibold ${STATUS_CONFIG[animal.status].bgColor} ${STATUS_CONFIG[animal.status].textColor}`}
          >
            {STATUS_CONFIG[animal.status].label}
          </span>
        )}
        <img
          src={imageUrl}
          alt={animal.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = PLACEHOLDER_IMAGE
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
          {animal.name}
        </h3>
        <p className="text-gray-600 text-sm">
          {[animal.breed, animal.age].filter(Boolean).join(' • ') || '\u00A0'}
        </p>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
            <span className="leading-none">{animal.gender === 'male' ? '♂' : '♀'}</span>
            <span>{animal.gender === 'male' ? 'Mâle' : 'Femelle'}</span>
          </span>
          {animal.status !== 'sponsorship' && (
            <div className="flex items-center gap-1">
              {COMPATIBILITY_ORDER.map((key) => {
                const isCompatible = animal.compatibility?.[key] ?? false
                return (
                  <span
                    key={key}
                    className={`inline-block px-2 py-0.5 rounded-full ${
                      isCompatible
                        ? 'bg-emerald-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                    title={`${isCompatible ? 'OK' : 'Non'} avec ${COMPATIBILITY_LABELS[key].label.toLowerCase()}`}
                  >
                    {COMPATIBILITY_LABELS[key].icon}
                  </span>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
