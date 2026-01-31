import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load service account key
const serviceAccountPath = join(__dirname, '..', 'spa-pontarlier-firebase-adminsdk-fbsvc-750ce484d3.json')
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'))

// Initialize Firebase Admin with service account
initializeApp({
  credential: cert(serviceAccount),
})

const db = getFirestore()

const spaInfo = {
  name: 'SPA de Pontarlier',
  address: '11 rue des tourbières, Rocade Georges Pompidou, 25300 PONTARLIER',
  phone: '03.81.46.40.64',
  email: 'contact@spa-pontarlier.com',
  hours: {
    monday: '14h00 - 17h00',
    tuesday: '14h00 - 17h00',
    wednesday: '14h00 - 17h00',
    thursday: null, // Fermé
    friday: '14h00 - 17h00',
    saturday: '14h00 - 17h00',
    sunday: null, // Fermé
  },
  description: 'Refuge pour animaux abandonné du Haut-Doubs. À côté de la déchetterie, de l\'incinérateur et de la caserne des pompiers.',
  adoptionProcess: 'Tous nos animaux sont identifiés, vaccinés, stérilisés et déparasités. L\'association se réserve le droit d\'effectuer des visites et de reprendre l\'animal si les conditions de vie ne sont pas satisfaisantes.',
  helpInfo: 'Fermé les jours fériés.',
}

async function main() {
  console.log('=== Update SPA Info in Firestore ===\n')

  await db.doc('spaInfo/main').set(spaInfo, { merge: true })

  console.log('✓ SPA info updated successfully')
  console.log('\nUpdated data:')
  console.log('  Address:', spaInfo.address)
  console.log('  Phone:', spaInfo.phone)
  console.log('  Email:', spaInfo.email)
  console.log('  Hours:')
  console.log('    Lundi:', spaInfo.hours.monday)
  console.log('    Mardi:', spaInfo.hours.tuesday)
  console.log('    Mercredi:', spaInfo.hours.wednesday)
  console.log('    Jeudi:', spaInfo.hours.thursday || 'Fermé')
  console.log('    Vendredi:', spaInfo.hours.friday)
  console.log('    Samedi:', spaInfo.hours.saturday)
  console.log('    Dimanche:', spaInfo.hours.sunday || 'Fermé')
}

main().catch((err) => {
  console.error('Update failed:', err)
  process.exit(1)
})
