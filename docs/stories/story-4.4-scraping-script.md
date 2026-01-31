# Story 4.4: Script de Scraping

## Description

En tant que développeur,
Je veux extraire les données du site existant (spa-pontarlier.com),
Afin de pré-remplir la base de données et le contenu statique avant la livraison.

## Critères d'acceptation

- [x] Script capable d'extraire les fiches animaux (nom, espèce, âge, description, photos)
- [x] Script capable d'extraire le contenu institutionnel (historique, bénévolat, etc.)
- [x] Données animaux exportées au format compatible Firestore
- [x] Contenu textuel exporté pour intégration dans les fichiers statiques
- [x] Script exécutable en une commande
- [x] Documentation d'utilisation

## Données à extraire

### 1. Fiches animaux

| Champ | Source | Mapping |
|-------|--------|---------|
| Nom | Titre de la fiche | `name` |
| Espèce | Catégorie (chien/chat) | `species` |
| Race | Si disponible | `breed` |
| Âge | Texte | `age` |
| Sexe | Si disponible | `gender` |
| Description | Texte de présentation | `description` |
| Photos | URLs images | `photos[]`, `mainPhoto` |
| Compatibilités | Si mentionnées | `compatibility` |

### 2. Contenu institutionnel

| Section | URL source probable | Destination |
|---------|---------------------|-------------|
| Historique | `/historique` ou `/qui-sommes-nous` | `src/data/aboutContent.ts` |
| Comment devenir bénévole | `/benevoles` ou `/nous-aider` | `src/data/helpContent.ts` |
| Balades | Page bénévoles ou actions | `src/data/helpContent.ts` |
| Aides financières | `/nous-aider` ou `/dons` | `src/data/helpContent.ts` |
| Partenaires | `/partenaires` | `src/data/aboutContent.ts` |
| Actions menées | `/nos-actions` | `src/data/aboutContent.ts` |

## Tâches techniques

1. Créer dossier `scripts/` à la racine du projet
2. Créer script `scripts/scrape-spa.ts` (ou `.js`)
3. Choisir librairie de scraping (Cheerio, Puppeteer, ou Playwright)
4. Implémenter extraction des animaux
5. Implémenter extraction du contenu textuel
6. Créer fichiers de sortie JSON/TS
7. Documenter l'utilisation dans README ou script

## Structure proposée

```
scripts/
├── scrape-spa.ts           # Script principal
├── scrapers/
│   ├── animals.ts          # Extraction fiches animaux
│   └── content.ts          # Extraction contenu textuel
├── output/
│   ├── animals.json        # Données animaux (pour import Firestore)
│   ├── aboutContent.ts     # Contenu page À propos (copier dans src/data/)
│   └── helpContent.ts      # Contenu page Aider (copier dans src/data/)
└── README.md               # Documentation
```

## Choix technique : Librairie de scraping

| Option | Avantages | Inconvénients |
|--------|-----------|---------------|
| **Cheerio** | Léger, rapide, simple | Pas de JS rendering |
| **Puppeteer** | Browser complet, JS rendering | Plus lourd |
| **Playwright** | Multi-browser, moderne | Plus lourd |

**Recommandation :** Commencer avec **Cheerio** (le site semble statique). Si le contenu est généré en JS, passer à Puppeteer.

## Format de sortie animaux

```json
// scripts/output/animals.json
[
  {
    "name": "Rex",
    "species": "chien",
    "breed": "Berger Allemand",
    "age": "3 ans",
    "gender": "male",
    "description": "Rex est un chien affectueux...",
    "photos": [
      "https://spa-pontarlier.com/images/rex-1.jpg",
      "https://spa-pontarlier.com/images/rex-2.jpg"
    ],
    "mainPhoto": "https://spa-pontarlier.com/images/rex-1.jpg",
    "compatibility": {
      "children": true,
      "dogs": true,
      "cats": false,
      "other_animals": false
    },
    "status": "available"
  }
]
```

## Format de sortie contenu

```typescript
// scripts/output/aboutContent.ts
export const historyContent = {
  title: "Notre Histoire",
  paragraphs: [
    "La SPA de Pontarlier a été fondée en...",
    "Au fil des années...",
    // ... 7 paragraphes
  ]
};

export const actionsContent = {
  title: "Nos Actions",
  items: [
    {
      title: "Sauvetages",
      description: "Description..."
    }
  ]
};

export const partnersContent = {
  title: "Nos Partenaires",
  partners: [
    {
      name: "Nom du partenaire",
      logo: "url-si-disponible",
      url: "site-web-si-disponible"
    }
  ]
};
```

## Commandes

```bash
# Installation des dépendances de scraping
npm install --save-dev cheerio node-fetch

# Exécution du script
npx ts-node scripts/scrape-spa.ts

# Ou avec npm script
npm run scrape
```

## Definition of Done

- [x] Script exécutable sans erreur
- [x] Données animaux extraites et formatées en JSON
- [x] Contenu textuel extrait et formaté en TypeScript
- [x] Photos des animaux listées (URLs originales)
- [x] Documentation d'utilisation présente
- [x] Le script peut être réexécuté si besoin

## Notes

- Ce script est à usage **ponctuel** (1-2 exécutions avant livraison)
- Les photos restent sur le serveur original pour l'instant (URLs)
- Un script séparé pourra télécharger les photos et les uploader sur Firebase Storage
- Le contenu extrait devra être relu et éventuellement reformaté manuellement

## Étapes post-scraping

1. Vérifier et corriger manuellement le contenu extrait
2. Copier `aboutContent.ts` et `helpContent.ts` dans `src/data/`
3. Importer `animals.json` dans Firestore (script ou Firebase Console)
4. Télécharger les photos et les uploader sur Firebase Storage (optionnel, story séparée)

## Dépendances

- Aucune dépendance sur les autres stories
- Peut être développé en parallèle de l'Epic 4

## Risques

- Structure du site existant inconnue (nécessite exploration)
- Contenu potentiellement en dur dans le HTML (pas de JSON/API)
- Qualité des photos variable
- Certaines informations peuvent être manquantes

## Dev Agent Record

### Status
Ready for Review

### Agent Model Used
Claude Opus 4.5

### File List
- `scripts/scrape-spa.ts` (created - main entry point)
- `scripts/scrapers/animals.ts` (created - animal scraper with pagination)
- `scripts/scrapers/content.ts` (created - institutional content extractor)
- `scripts/output/animals.json` (generated - 59 animals)
- `scripts/output/aboutContent.ts` (generated - history, actions, partners)
- `scripts/output/helpContent.ts` (generated - walks, volunteer, financial, donations)
- `scripts/output/spaInfo.json` (generated - address, phone, hours)
- `app/src/data/aboutContent.ts` (updated with real scraped content)
- `app/src/data/helpContent.ts` (updated with real scraped content)
- `app/src/pages/AboutPage.tsx` (modified - added partner URL links)
- `app/package.json` (modified - added cheerio dep + scrape script)

### Change Log
- Created scraping script using Cheerio for spa-pontarlier.com
- Animals scraper: paginates through chiens/chats/NAC categories on animaux.spa-pontarlier.com (WordPress)
- Content scraper: extracts history, volunteer, financial aid, partners, actions from main site
- Scraped 26 dogs + 33 cats = 59 animals with photos, descriptions, compatibility info
- Copied real content to src/data/ (aboutContent.ts, helpContent.ts)
- Added partner website links to AboutPage
- Script runnable via `npm run scrape`

### Debug Log References
N/A

### Completion Notes
- 59 animals extracted (26 chiens, 33 chats, 0 NAC)
- All institutional content extracted from real site
- Static content files updated with real data
- animals.json ready for Firestore import
- Script is idempotent and re-runnable
