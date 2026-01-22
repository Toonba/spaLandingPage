import { Link } from 'react-router-dom'
import { Container } from '@/components/layout/Container'

export function NotFoundPage() {
  return (
    <Container className="py-16">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page non trouvée</h2>
        <p className="text-gray-600 mb-8">
          Désolé, la page que vous recherchez n'existe pas.
        </p>
        <Link
          to="/"
          className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </Container>
  )
}
