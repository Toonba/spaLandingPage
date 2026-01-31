import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { scrapeAnimals } from './scrapers/animals.js'
import { scrapeContent } from './scrapers/content.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = join(__dirname, 'output')

async function main() {
  console.log('=== SPA Pontarlier Scraper ===\n')

  mkdirSync(OUTPUT_DIR, { recursive: true })

  // 1. Scrape animals
  console.log('--- Animals ---')
  const animals = await scrapeAnimals()
  const animalsPath = join(OUTPUT_DIR, 'animals.json')
  writeFileSync(animalsPath, JSON.stringify(animals, null, 2), 'utf-8')
  console.log(`\n✓ ${animals.length} animals saved to ${animalsPath}`)

  // 2. Scrape content
  console.log('\n--- Institutional Content ---')
  const content = await scrapeContent()

  // Write aboutContent.ts
  const aboutPath = join(OUTPUT_DIR, 'aboutContent.ts')
  writeFileSync(aboutPath, `export const historyContent = ${JSON.stringify(content.aboutContent.historyContent, null, 2)}

export const actionsContent = ${JSON.stringify(content.aboutContent.actionsContent, null, 2)}

export const partnersContent = ${JSON.stringify(content.aboutContent.partnersContent, null, 2)}
`, 'utf-8')
  console.log(`✓ About content saved to ${aboutPath}`)

  // Write helpContent.ts
  const helpPath = join(OUTPUT_DIR, 'helpContent.ts')
  writeFileSync(helpPath, `export const walksContent = ${JSON.stringify(content.helpContent.walksContent, null, 2)}

export const volunteerContent = ${JSON.stringify(content.helpContent.volunteerContent, null, 2)}

export const financialAidContent = ${JSON.stringify(content.helpContent.financialAidContent, null, 2)}

export const donationsContent = ${JSON.stringify(content.helpContent.donationsContent, null, 2)}
`, 'utf-8')
  console.log(`✓ Help content saved to ${helpPath}`)

  // Write adoptionContent.ts
  const adoptionPath = join(OUTPUT_DIR, 'adoptionContent.ts')
  writeFileSync(adoptionPath, `export interface AdoptionFee {
  category: string
  price: string
  details?: string
}

export const adoptionContent = ${JSON.stringify(content.adoptionContent, null, 2)}
`, 'utf-8')
  console.log(`✓ Adoption content saved to ${adoptionPath}`)

  // Write sponsorshipContent.ts
  const sponsorshipPath = join(OUTPUT_DIR, 'sponsorshipContent.ts')
  writeFileSync(sponsorshipPath, `export const sponsorshipContent = ${JSON.stringify(content.sponsorshipContent, null, 2)}
`, 'utf-8')
  console.log(`✓ Sponsorship content saved to ${sponsorshipPath}`)

  // Write spaInfo
  const spaInfoPath = join(OUTPUT_DIR, 'spaInfo.json')
  writeFileSync(spaInfoPath, JSON.stringify(content.spaInfo, null, 2), 'utf-8')
  console.log(`✓ SPA info saved to ${spaInfoPath}`)

  console.log('\n=== Scraping complete! ===')
  console.log('\nNext steps:')
  console.log('  1. Review and edit output files in scripts/output/')
  console.log('  2. Copy aboutContent.ts → app/src/data/aboutContent.ts')
  console.log('  3. Copy helpContent.ts → app/src/data/helpContent.ts')
  console.log('  4. Import animals.json into Firestore')
}

main().catch((err) => {
  console.error('Scraping failed:', err)
  process.exit(1)
})
