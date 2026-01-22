# Epic 4: Contenu Institutionnel & Import de Données

**Objectif :** Enrichir le site avec le contenu institutionnel de la SPA (historique, actions, bénévolat) et importer les données existantes du site actuel.

**Contexte :**
- Le site actuel (spa-pontarlier.com) contient du contenu riche à récupérer
- Approche hybride validée : animaux/contact éditable, contenu institutionnel statique
- Import ponctuel des données pour pré-remplir la base avant livraison

**Stories :**
- [4.1 Page À propos](./story-4.1-about-page.md) - Page avec onglets (Historique, Actions, Partenaires)
- [4.2 Enrichissement page Aider](./story-4.2-help-page-enrichment.md) - Balades, bénévolat, aides financières
- [4.3 Onglets page Animaux](./story-4.3-animals-tabs.md) - Refacto avec onglets conditionnels (Chiens, Chats, Autre)
- [4.4 Script de scraping](./story-4.4-scraping-script.md) - Extraction données du site existant

**Modifications transverses :**
- Footer : Ajout contact et horaires (visible sur toutes les pages)
- Data model : Suppression espèce "oiseau", conservation de "autre"

**Critère de complétion :**
- La page À propos affiche l'historique, les actions et le partenaire
- La page Aider présente les balades, le bénévolat et les aides financières
- La page Animaux utilise des onglets avec affichage conditionnel
- Les données animaux sont importées dans Firestore

**Dépendances :**
- Epic 2 (Site Public) doit être terminé pour les stories 4.2 et 4.3
- Story 4.4 (scraping) peut être développée en parallèle

**Approche données :**
| Type de contenu | Stockage | Éditable par admin |
|-----------------|----------|-------------------|
| Fiches animaux | Firestore | Oui |
| Contact, horaires | Firestore (spaInfo) | Oui |
| Historique, Actions, Partenaires | Code (statique) | Non |
| Bénévolat, Balades, Aides financières | Code (statique) | Non |
