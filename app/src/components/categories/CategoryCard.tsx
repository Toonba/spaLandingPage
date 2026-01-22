import { Link } from 'react-router-dom'
import type { Species } from '@/types/animal'
import { SPECIES_LABELS } from '@/types/animal'

interface CategoryCardProps {
  species: Species
  count: number
}

const SPECIES_ICONS: Record<Species, string> = {
  chien: '🐕',
  chat: '🐱',
  oiseau: '🦜',
  autre: '🐾',
}

const SPECIES_COLORS: Record<Species, string> = {
  chien: 'from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600',
  chat: 'from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600',
  oiseau: 'from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600',
  autre: 'from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600',
}

export function CategoryCard({ species, count }: CategoryCardProps) {
  return (
    <Link
      to={`/animaux?species=${species}`}
      className={`block p-6 rounded-xl bg-gradient-to-br ${SPECIES_COLORS[species]} text-white text-center transition-all shadow-md hover:shadow-lg hover:scale-105`}
    >
      <div className="text-4xl mb-2">{SPECIES_ICONS[species]}</div>
      <h3 className="text-lg font-semibold">{SPECIES_LABELS[species]}</h3>
      <p className="text-3xl font-bold mt-1">{count}</p>
      <p className="text-sm text-white/80">
        {count === 0 ? 'aucun' : count === 1 ? 'disponible' : 'disponibles'}
      </p>
    </Link>
  )
}
