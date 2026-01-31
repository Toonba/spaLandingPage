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
const COLLECTION = 'animals'

// Animals to update (extracted from name patterns)
const updates = [
  { originalName: 'Kurd( reserve)', newName: 'Kurd', status: 'reserved' },
  { originalName: 'Vanille (parrainage uniquement)', newName: 'Vanille', status: 'sponsorship', species: 'chien' },
  { originalName: 'Packo (parrainage uniquement)', newName: 'Packo', status: 'sponsorship' },
  { originalName: 'Naïade (parrainage uniquement)', newName: 'Naïade', status: 'sponsorship' },
  { originalName: 'Sky (parrainage uniquement)', newName: 'Sky', status: 'sponsorship' },
  { originalName: 'Alfredo (parrainage uniquement)', newName: 'Alfredo', status: 'sponsorship' },
  { originalName: 'Gandalf (parrainage uniquement)', newName: 'Gandalf', status: 'sponsorship' },
]

async function main() {
  console.log('=== Update Animal Status in Firestore ===\n')

  for (const update of updates) {
    // Find by original name (or new name if already updated)
    let query = db.collection(COLLECTION).where('name', '==', update.originalName)
    if (update.species) {
      query = query.where('species', '==', update.species)
    }

    let snapshot = await query.get()

    // If not found with original name, try with new name
    if (snapshot.empty) {
      query = db.collection(COLLECTION).where('name', '==', update.newName)
      if (update.species) {
        query = query.where('species', '==', update.species)
      }
      snapshot = await query.get()
    }

    if (snapshot.empty) {
      console.log(`  ⚠️  ${update.originalName} - Not found in database`)
      continue
    }

    for (const doc of snapshot.docs) {
      await doc.ref.update({
        name: update.newName,
        status: update.status,
      })
      console.log(`  ✓ ${update.newName} - Updated to status: ${update.status}`)
    }
  }

  console.log('\n=== Update complete ===')
}

main().catch((err) => {
  console.error('Update failed:', err)
  process.exit(1)
})
