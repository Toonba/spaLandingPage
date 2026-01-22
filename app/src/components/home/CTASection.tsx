import { Link } from 'react-router-dom'
import { Container } from '@/components/layout/Container'

export function CTASection() {
  return (
    <section className="py-12 bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Link
            to="/animaux"
            className="group block p-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl text-white text-center hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
          >
            <div className="text-5xl mb-4">🐾</div>
            <h2 className="text-2xl font-bold mb-2">Adopter un animal</h2>
            <p className="text-orange-100">
              Découvrez nos pensionnaires en attente d'une famille
            </p>
            <span className="inline-block mt-4 text-sm font-medium bg-white/20 px-4 py-2 rounded-full group-hover:bg-white/30 transition-colors">
              Voir les animaux →
            </span>
          </Link>

          <Link
            to="/aider"
            className="group block p-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl text-white text-center hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
          >
            <div className="text-5xl mb-4">💝</div>
            <h2 className="text-2xl font-bold mb-2">Aider la SPA</h2>
            <p className="text-teal-100">
              Bénévolat, dons, parrainage... Soutenez notre action
            </p>
            <span className="inline-block mt-4 text-sm font-medium bg-white/20 px-4 py-2 rounded-full group-hover:bg-white/30 transition-colors">
              Comment aider →
            </span>
          </Link>
        </div>
      </Container>
    </section>
  )
}
