import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'

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

interface ScrapedAnimal {
  name: string
  species: string
  breed: string
  age: string
  gender: string
  description: string
  photos: string[]
  mainPhoto: string
  compatibility: {
    children: boolean
    dogs: boolean
    cats: boolean
    other_animals: boolean
  }
  status: string
}

async function main() {
  console.log('=== Import Animals to Firestore ===\n')
  console.log(`Project: ${serviceAccount.project_id}`)

  // Read animals.json
  const animalsPath = join(__dirname, 'output', 'animals.json')
  const raw = readFileSync(animalsPath, 'utf-8')
  const animals: ScrapedAnimal[] = JSON.parse(raw)
  console.log(`Found ${animals.length} animals to import\n`)

  // Check existing count
  const existingSnapshot = await db.collection(COLLECTION).count().get()
  const existingCount = existingSnapshot.data().count
  console.log(`Existing animals in Firestore: ${existingCount}`)

  if (existingCount > 0) {
    if (process.argv.includes('--clear')) {
      console.log('\n🗑️  Clearing existing animals...')
      const docs = await db.collection(COLLECTION).listDocuments()
      for (const doc of docs) {
        await doc.delete()
      }
      console.log(`  Deleted ${docs.length} documents`)
    } else {
      console.log('\n⚠️  Collection is not empty. Import will ADD to existing data.')
      console.log('   Run with --force to proceed, or --clear to replace all data.\n')
      if (!process.argv.includes('--force')) {
        process.exit(0)
      }
    }
  }

  // Import
  let imported = 0
  let failed = 0

  for (const animal of animals) {
    try {
      const now = Timestamp.now()
      await db.collection(COLLECTION).add({
        ...animal,
        birthDate: null,
        createdAt: now,
        updatedAt: now,
      })
      imported++
      console.log(`  ✓ ${animal.name} (${animal.species})`)
    } catch (err) {
      failed++
      console.error(`  ✗ ${animal.name}: ${err}`)
    }
  }

  console.log(`\n=== Import complete ===`)
  console.log(`  Imported: ${imported}`)
  console.log(`  Failed: ${failed}`)
}

main().catch((err) => {
  console.error('Import failed:', err)
  process.exit(1)
})
