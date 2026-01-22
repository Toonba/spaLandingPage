import { Container } from './Container'

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <Container className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">SPA Pontarlier</h3>
            <p className="text-gray-400 text-sm">
              Refuge pour animaux abandonnés. Ensemble, donnons-leur une seconde chance.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <address className="text-gray-400 text-sm not-italic">
              <p>123 Rue du Refuge</p>
              <p>25300 Pontarlier</p>
              <p className="mt-2">Tél: 03 81 XX XX XX</p>
            </address>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Horaires</h3>
            <p className="text-gray-400 text-sm">
              Lundi - Samedi: 14h - 18h
              <br />
              Dimanche: Fermé
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} SPA Pontarlier. Tous droits réservés.
        </div>
      </Container>
    </footer>
  )
}
