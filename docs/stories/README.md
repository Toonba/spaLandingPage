# 📋 Stories - SPA Pontarlier

## Vue d'ensemble

| Epic | Stories | Description |
|------|---------|-------------|
| [Epic 1: Setup](./epic-1-setup.md) | 3 | Configuration projet |
| [Epic 2: Site Public](./epic-2-site-public.md) | 6 | Pages visiteurs |
| [Epic 3: Admin](./epic-3-admin.md) | 5 | Gestion contenu |
| [Epic 4: Contenu Institutionnel](./epic-4-institutional-content.md) | 4 | Contenu SPA & Import données |
| **Total** | **18** | **MVP complet + Contenu** |

---

## Ordre recommandé

### Phase 1 - Fondations
1. [Story 1.1: Setup React + Tailwind](./story-1.1-setup-react-tailwind.md)
2. [Story 1.2: Setup Firebase](./story-1.2-setup-firebase.md)
3. [Story 1.3: Setup Layout & Routing](./story-1.3-setup-layout-routing.md)

### Phase 2 - Site Public
4. [Story 2.2: Liste des animaux](./story-2.2-animals-list.md) ← Commencer par ça
5. [Story 2.4: Fiche animal](./story-2.4-animal-detail.md)
6. [Story 2.3: Filtres animaux](./story-2.3-animals-filters.md)
7. [Story 2.1: Page d'accueil](./story-2.1-homepage.md)
8. [Story 2.5: Page Adoption](./story-2.5-adoption-page.md)
9. [Story 2.6: Page Aider la SPA](./story-2.6-help-page.md)

### Phase 3 - Admin
10. [Story 3.1: Authentification](./story-3.1-authentication.md)
11. [Story 3.2: CRUD Animaux](./story-3.2-crud-animals.md)
12. [Story 3.3: Upload Photos](./story-3.3-photo-upload.md)
13. [Story 3.4: Gestion statut animal](./story-3.4-animal-status.md)
14. [Story 3.5: Édition infos SPA](./story-3.5-edit-spa-info.md)

### Phase 4 - Contenu Institutionnel & Import
15. [Story 4.1: Page À propos](./story-4.1-about-page.md) ← Onglets Historique/Actions/Partenaires
16. [Story 4.2: Enrichissement page Aider](./story-4.2-help-page-enrichment.md) ← Balades, Bénévolat, Aides
17. [Story 4.3: Onglets page Animaux](./story-4.3-animals-tabs.md) ← Chiens/Chats/Autre (conditionnel)
18. [Story 4.4: Script de scraping](./story-4.4-scraping-script.md) ← Extraction données site existant

---

## Modifications transverses (Epic 4)

Ces modifications impactent plusieurs composants :

| Modification | Composant | Description |
|--------------|-----------|-------------|
| Footer enrichi | `Footer.tsx` | Ajout contact & horaires (visible sur toutes les pages) |
| Suppression espèce | `types/animal.ts` | Retirer "oiseau" du type `Species` |
| Composant Tabs | `ui/Tabs.tsx` | Nouveau composant partagé (À propos + Animaux) |

---

## Comment utiliser ces stories

1. **Ouvre une story** → Lis la description et les critères d'acceptation
2. **Code** → Suis les tâches techniques
3. **Vérifie** → Coche les critères d'acceptation
4. **Passe à la suivante** → Dans l'ordre recommandé

## Démo

Après chaque phase, tu peux déployer pour voir le résultat :
```bash
npm run build && firebase deploy
```

URL de démo : `https://<ton-project-id>.web.app`

---

*Généré par Sarah (PO) - Méthodologie BMAD™*
