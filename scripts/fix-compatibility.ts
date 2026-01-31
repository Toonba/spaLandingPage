import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

interface Animal {
  name: string
  description: string
  compatibility: {
    children: boolean
    dogs: boolean
    cats: boolean
    other_animals: boolean
  }
  [key: string]: unknown
}

function analyzeCompatibility(description: string, currentCompat: Animal['compatibility']) {
  if (!description) return currentCompat

  // Normaliser les apostrophes et caractères spéciaux
  const desc = description.toLowerCase().replace(/['ʼ'`]/g, "'")
  const newCompat = { ...currentCompat }

  // === ENFANTS ===
  // Patterns négatifs pour enfants
  const childrenNegativePatterns = [
    /pas d.{0,3}enfant/,
    /sans enfant/,
    /enfants en bas/,
    /pas avec des enfants/,
    /pas compatible.{0,10}enfants/,
    /n.aime pas les enfants/,
    /famille sans enfant/,
    /pas les enfants/,
    /pas d.{0,3}enfants/,
  ]
  if (childrenNegativePatterns.some((pattern) => pattern.test(desc))) {
    newCompat.children = false
  }
  // Patterns positifs pour enfants (seulement si pas déjà mis à false)
  else if (
    desc.includes('avec des enfants') ||
    desc.includes('avec les enfants') ||
    desc.includes('famille avec enfant') ||
    /enfants avec qui (elle|il) pourra/.test(desc)
  ) {
    newCompat.children = true
  }

  // === CHIENS ===
  // Patterns négatifs pour chiens (utiliser regex pour proximité)
  const dogsNegativePatterns = [
    /pas.{0,10}à l'aise.{0,15}(autres )?chiens/,
    /pas d.{0,5}autres chiens/,
    /sans (autre )?chien/,
    /pas de chien/,
    /seul chien/,
    /n.apprécie pas les chiens/,
    /pas compatible.{0,10}chiens/,
    /difficile avec les chiens/,
    /n.aime pas ses congénères/,
    /pas avec les (autres )?chiens/,
  ]
  if (dogsNegativePatterns.some((pattern) => pattern.test(desc))) {
    newCompat.dogs = false
  }
  // Patterns positifs pour chiens (seulement si pas déjà mis à false)
  if (newCompat.dogs !== false) {
    const dogsPositivePatterns = [
      /s.entend.{0,10}(avec )?(les )?autres chiens/,
      /ok.{0,5}(avec )?(les )?chiens/,
      /compatible.{0,10}chiens/,
      /aime les chiens/,
      /bien avec les chiens/,
      /entend avec ses congénères/,
    ]
    if (dogsPositivePatterns.some((pattern) => pattern.test(desc))) {
      newCompat.dogs = true
    }
  }

  // === CHATS ===
  // Patterns négatifs pour chats
  const catsNegativePatterns = [
    /pas de chat/,
    /sans chat/,
    /pas avec les chats/,
    /pas compatible.{0,10}chats/,
    /n.aime pas les chats/,
    /pas avec des chats/,
    /pas les chats/,
  ]
  if (catsNegativePatterns.some((pattern) => pattern.test(desc))) {
    newCompat.cats = false
  }
  // Patterns positifs pour chats (seulement si pas déjà mis à false)
  else if (
    desc.includes('ok avec les chats') ||
    desc.includes('compatible avec les chats') ||
    desc.includes('aime les chats') ||
    desc.includes('bien avec les chats')
  ) {
    newCompat.cats = true
  }

  return newCompat
}

async function main() {
  const animalsPath = join(__dirname, 'output', 'animals.json')
  const raw = readFileSync(animalsPath, 'utf-8')
  const animals: Animal[] = JSON.parse(raw)

  console.log('=== Analyse et correction des compatibilités ===\n')

  let changedCount = 0

  const updatedAnimals = animals.map((animal) => {
    const oldCompat = { ...animal.compatibility }
    const newCompat = analyzeCompatibility(animal.description, animal.compatibility)

    const hasChanged =
      oldCompat.children !== newCompat.children ||
      oldCompat.dogs !== newCompat.dogs ||
      oldCompat.cats !== newCompat.cats ||
      oldCompat.other_animals !== newCompat.other_animals

    if (hasChanged) {
      changedCount++
      console.log(`--- ${animal.name} ---`)
      console.log(`Description: ${animal.description.substring(0, 200)}...`)
      console.log(`Avant:  enfants=${oldCompat.children}, chiens=${oldCompat.dogs}, chats=${oldCompat.cats}`)
      console.log(`Après:  enfants=${newCompat.children}, chiens=${newCompat.dogs}, chats=${newCompat.cats}`)
      console.log('')
    }

    return {
      ...animal,
      compatibility: newCompat,
    }
  })

  // Sauvegarder
  writeFileSync(animalsPath, JSON.stringify(updatedAnimals, null, 2))

  console.log(`=== Terminé ===`)
  console.log(`${changedCount} animaux modifiés`)
  console.log(`Fichier sauvegardé: ${animalsPath}`)
}

main().catch(console.error)
