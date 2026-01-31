import * as cheerio from 'cheerio'

const BASE_URL = 'https://animaux.spa-pontarlier.com'

interface ScrapedAnimal {
  name: string
  species: 'chien' | 'chat' | 'autre'
  breed: string
  age: string
  gender: 'male' | 'female'
  description: string
  photos: string[]
  mainPhoto: string
  compatibility: {
    children: boolean
    dogs: boolean
    cats: boolean
    other_animals: boolean
  }
  status: 'available'
}

async function fetchPage(url: string): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  return res.text()
}

async function getListingPages(category: string): Promise<string[]> {
  const urls: string[] = []
  let page = 1

  while (true) {
    const url = page === 1
      ? `${BASE_URL}/category/${category}/`
      : `${BASE_URL}/category/${category}/page/${page}/`

    try {
      const html = await fetchPage(url)
      const $ = cheerio.load(html)

      const links: string[] = []
      $('a[href*="/' + (category === 'chiens' ? 'chiens' : category === 'chats' ? 'chats' : 'nac') + '/"]').each((_, el) => {
        const href = $(el).attr('href')
        if (href && href !== `${BASE_URL}/category/${category}/` && !href.includes('/category/') && !href.includes('/page/')) {
          links.push(href.startsWith('http') ? href : `${BASE_URL}${href}`)
        }
      })

      const uniqueLinks = [...new Set(links)]
      if (uniqueLinks.length === 0) break

      urls.push(...uniqueLinks)

      // Check if there's a next page
      const hasNext = $('a.next').length > 0 || $('a:contains("Suivant")').length > 0 || $(`a[href*="/page/${page + 1}/"]`).length > 0
      if (!hasNext) break

      page++
    } catch {
      break
    }
  }

  return [...new Set(urls)]
}

function parseGender(text: string): 'male' | 'female' {
  const lower = text.toLowerCase()
  if (lower.includes('femelle') || lower.includes('female')) return 'female'
  return 'male'
}

function parseCompatibility(text: string) {
  const lower = text.toLowerCase()
  return {
    children: lower.includes('enfant') || lower.includes('child'),
    dogs: lower.includes('chien') || lower.includes('congénère') || lower.includes('dog'),
    cats: lower.includes('chat') || lower.includes('cat'),
    other_animals: lower.includes('autre') || lower.includes('nac'),
  }
}

async function scrapeAnimalDetail(url: string, species: 'chien' | 'chat' | 'autre'): Promise<ScrapedAnimal | null> {
  try {
    const html = await fetchPage(url)
    const $ = cheerio.load(html)

    const name = $('h1.entry-title, h1, .entry-title').first().text().trim()
    if (!name) return null

    // Extract photos (filter out non-animal photos)
    const excludedPhotos = ['AIDEZ-LES-REFUGES', '3f9b9d08', 'abandon', 'silouette-chat1', 'Petit.png', 'Moyen-petit.png', 'Grand.png']
    const photos: string[] = []
    $('img').each((_, el) => {
      const src = $(el).attr('src') || $(el).attr('data-src')
      if (src && src.includes('wp-content/uploads') && !src.includes('logo') && !src.includes('icon')) {
        const isExcluded = excludedPhotos.some(excluded => src.toLowerCase().includes(excluded.toLowerCase()))
        if (!isExcluded) {
          photos.push(src)
        }
      }
    })

    // Extract description text - look in wp-block-heading h2 tags (site-specific structure)
    const paragraphs: string[] = []

    // The site uses h2.wp-block-heading for descriptions
    $('h2.wp-block-heading').each((_, el) => {
      const text = $(el).text().trim()
      // Filter out short texts, dates, and metadata
      if (text && text.length > 30 &&
          !text.match(/^né(?:e)?\s+le\s+\d/i) &&  // Not just birth date
          !text.toLowerCase().includes('accès à la fiche') &&
          !text.toLowerCase().includes('catégorie')) {
        paragraphs.push(text)
      }
    })

    // Fallback: try paragraphs in entry-content
    if (paragraphs.length === 0) {
      $('.entry-content p, .post-content p').each((_, el) => {
        const text = $(el).text().trim()
        if (text && text.length > 30) {
          paragraphs.push(text)
        }
      })
    }

    const description = paragraphs.join('\n')

    // Try to extract age/breed/gender from text
    let age = ''
    let breed = ''
    let gender: 'male' | 'female' = 'male'
    const fullText = $('body').text().toLowerCase()

    // Gender detection
    gender = parseGender(fullText)

    // Age detection - look for patterns like "né(e) le", "X ans", "X mois"
    const ageMatch = fullText.match(/(\d+)\s*ans?/) || fullText.match(/(\d+)\s*mois/)
    if (ageMatch) {
      age = ageMatch[0]
    }
    const birthMatch = fullText.match(/né(?:e)?\s+(?:le\s+)?(\d{1,2}[\s/.-]\w+[\s/.-]\d{2,4})/)
    if (birthMatch) {
      age = `Né(e) le ${birthMatch[1]}`
    }

    // Compatibility
    const compatibility = parseCompatibility(fullText)

    return {
      name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
      species,
      breed,
      age,
      gender,
      description,
      photos: [...new Set(photos)],
      mainPhoto: photos[0] || '',
      compatibility,
      status: 'available',
    }
  } catch (err) {
    console.error(`  Failed to scrape ${url}:`, err)
    return null
  }
}

export async function scrapeAnimals(): Promise<ScrapedAnimal[]> {
  const animals: ScrapedAnimal[] = []

  const categories: { slug: string; species: 'chien' | 'chat' | 'autre' }[] = [
    { slug: 'chiens', species: 'chien' },
    { slug: 'chats', species: 'chat' },
    { slug: 'NAC', species: 'autre' },
  ]

  for (const cat of categories) {
    console.log(`\nScraping ${cat.slug}...`)
    const urls = await getListingPages(cat.slug)
    console.log(`  Found ${urls.length} animal pages`)

    for (const url of urls) {
      console.log(`  Scraping: ${url.split('/').filter(Boolean).pop()}`)
      const animal = await scrapeAnimalDetail(url, cat.species)
      if (animal) {
        animals.push(animal)
        console.log(`    ✓ ${animal.name}`)
      }
      // Small delay to be polite
      await new Promise((r) => setTimeout(r, 300))
    }
  }

  return animals
}
