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
              <p>11 rue des tourbières</p>
              <p>Rocade Georges Pompidou</p>
              <p>25300 Pontarlier</p>
              <p className="mt-2">
                <a href="tel:+33381464064" className="hover:text-white transition-colors">
                  Tél: 03.81.46.40.64
                </a>
              </p>
              <p>
                <a href="mailto:contact@spa-pontarlier.com" className="hover:text-white transition-colors">
                  contact@spa-pontarlier.com
                </a>
              </p>
            </address>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Horaires</h3>
            <p className="text-gray-400 text-sm">
              Lun, Mar, Mer, Ven, Sam: 14h - 17h
              <br />
              Jeudi et Dimanche: Fermé
              <br />
              <span className="text-gray-500">Fermé les jours fériés</span>
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
