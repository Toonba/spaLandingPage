import { Container } from '@/components/layout/Container'
import { HeroSection } from '@/components/home/HeroSection'
import { CTASection } from '@/components/home/CTASection'
import { CategoryCard } from '@/components/categories/CategoryCard'
import { useAnimalsCount } from '@/hooks/useAnimalsCount'
import { SPECIES_LIST } from '@/types/animal'

export function HomePage() {
  const { counts, total, loading } = useAnimalsCount()

  return (
    <div>
      <HeroSection />
      <CTASection />

      {/* Categories section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Nos pensionnaires
            </h2>
            <p className="text-gray-600">
              {loading ? (
                'Chargement...'
              ) : total === 0 ? (
                'Aucun animal disponible pour le moment'
              ) : (
                `${total} ${total === 1 ? 'animal attend' : 'animaux attendent'} une famille`
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {SPECIES_LIST.map((species) => (
              <CategoryCard
                key={species}
                species={species}
                count={loading ? 0 : counts[species]}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Info section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Notre mission
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              La SPA de Pontarlier recueille, soigne et propose à l'adoption les animaux
              abandonnés ou maltraités. Notre équipe de bénévoles dévoués s'engage chaque jour
              pour leur offrir une seconde chance.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Venez nous rendre visite au refuge pour rencontrer nos pensionnaires.
              Chaque adoption est une victoire pour l'animal et une joie pour sa nouvelle famille.
            </p>
          </div>
        </Container>
      </section>
    </div>
  )
}
