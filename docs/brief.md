# Project Brief: SPA Pontarlier Website Redesign

**Date de création :** 2026-01-17
**Auteur :** Mary (Business Analyst) + Aymerick
**Version :** 1.0

---

## Executive Summary

**Concept produit :** Refonte moderne du site web de la SPA de Pontarlier - une application React permettant aux visiteurs de découvrir les animaux à adopter et à la SPA de gérer son contenu en autonomie.

**Problème principal :** Le site actuel (spa-pontarlier.com) est obsolète, visuellement daté et difficile à naviguer, ce qui nuit à la visibilité des animaux en attente d'adoption et à l'image de l'association.

**Marché cible :** Habitants de la région de Pontarlier cherchant à adopter un animal ou à soutenir la SPA locale.

**Proposition de valeur :** Un site moderne, simple et visuel qui met en avant les animaux disponibles avec un parcours d'adoption clair, tout en permettant à l'équipe SPA de maintenir le contenu sans compétence technique.

---

## Problem Statement

### État actuel et points de douleur

Le site actuel de la SPA de Pontarlier présente plusieurs problèmes majeurs :
- **Design obsolète** : Apparence datée (style années 2000) qui ne reflète pas le professionnalisme de l'association
- **Navigation complexe** : 7 rubriques avec de nombreux sous-menus, difficile à parcourir
- **Contenu dense** : Murs de texte qui découragent la lecture et masquent les informations essentielles
- **Présentation des animaux** : Pas de galerie interactive, difficile de découvrir les animaux disponibles
- **Maintenance** : Processus de mise à jour probablement complexe, dépendant de compétences techniques

### Impact du problème

- Visiteurs potentiels découragés par l'expérience utilisateur médiocre
- Animaux moins visibles = potentiellement moins d'adoptions
- Image de l'association dégradée par un site vieillissant
- Équipe SPA potentiellement dépendante d'un prestataire pour les mises à jour

### Pourquoi les solutions existantes ne suffisent pas

Le site actuel fonctionne sur un CMS daté (Webassist v1.6.20). Une simple mise à jour cosmétique ne résoudrait pas les problèmes structurels de navigation et d'architecture de l'information.

### Urgence

Chaque jour avec un site peu engageant est une opportunité manquée de connecter un animal avec son futur adoptant.

---

## Proposed Solution

### Concept et approche

Développer une nouvelle application web React moderne qui remplace entièrement le site existant, avec :
- **Interface visiteur** : Design épuré mettant en avant les animaux avec un parcours d'adoption intuitif
- **Interface admin** : Back-office simple permettant à l'équipe SPA de gérer le contenu en autonomie
- **Architecture cloud** : Firebase comme backend (base de données, authentification, stockage, hébergement)

### Différenciateurs par rapport à l'existant

| Actuel | Nouveau |
|--------|---------|
| Design années 2000 | Design moderne, responsive |
| Navigation complexe (7 menus) | Navigation simplifiée (3-4 sections) |
| Murs de texte | Cartes visuelles, photos mises en avant |
| Mise à jour complexe | Interface admin intuitive |
| Dépendance technique | Autonomie totale de la SPA |

### Pourquoi cette solution réussira

- **Stack éprouvée** : React + Firebase = technologies matures, bien documentées, communauté large
- **Coût zéro** : Hébergement gratuit (Firebase free tier) adapté au volume d'une SPA locale
- **Maintenabilité** : Code propre, composants réutilisables, architecture simple
- **Transfert facilité** : Projet clé en main à remettre à la SPA

### Vision du produit

Un site qui donne envie d'adopter dès la première visite, où chaque animal a sa fiche attractive, et où l'équipe SPA peut ajouter un nouveau pensionnaire en 2 minutes.

---

## Target Users

### Primary User Segment: Visiteur Adoptant

**Profil :**
- Habitant de la région de Pontarlier et alentours
- Toute tranche d'âge (familles, retraités, jeunes actifs)
- Sensible à la cause animale, préfère adopter qu'acheter

**Comportements actuels :**
- Cherche des informations sur l'adoption en ligne
- Visite potentiellement plusieurs refuges/SPA avant de se décider
- Consulte le site depuis mobile ou desktop

**Besoins et points de douleur :**
- Voir rapidement les animaux disponibles avec photos de qualité
- Filtrer selon ses contraintes (compatible enfants, autres animaux, taille...)
- Comprendre le processus d'adoption simplement
- Trouver les infos pratiques (horaires, adresse, contact)

**Objectifs :**
- Trouver un compagnon qui correspond à son mode de vie
- Se rassurer sur les conditions d'adoption
- Passer à l'action (visite, appel)

### Secondary User Segment: Administrateur SPA

**Profil :**
- Employé ou bénévole de la SPA de Pontarlier
- Niveau technique faible à moyen (non-développeur)
- Temps limité pour les tâches administratives

**Comportements actuels :**
- Gère les arrivées/départs d'animaux au quotidien
- Communique avec le public (téléphone, accueil)
- Probablement peu familier avec les outils web complexes

**Besoins et points de douleur :**
- Mettre à jour le site rapidement sans aide technique
- Ajouter un animal avec photo en quelques clics
- Marquer un animal comme adopté facilement
- Modifier les infos pratiques (horaires exceptionnels, etc.)

**Objectifs :**
- Garder le site à jour sans effort
- Maximiser la visibilité des animaux
- Ne pas dépendre d'un prestataire externe

---

## Goals & Success Metrics

### Business Objectives

- **Augmenter la visibilité des animaux** : 100% des animaux disponibles visibles sur le site avec fiche complète
- **Faciliter le parcours d'adoption** : Réduire le nombre de clics pour atteindre une fiche animal (max 3 clics depuis l'accueil)
- **Autonomiser la SPA** : L'équipe peut gérer le contenu sans intervention technique externe
- **Moderniser l'image** : Site responsive, design actuel, temps de chargement < 3 secondes

### User Success Metrics

**Visiteur :**
- Peut trouver un animal correspondant à ses critères en moins de 2 minutes
- Comprend le processus d'adoption en une seule page
- Accède aux infos de contact en 1 clic depuis n'importe quelle page

**Admin :**
- Peut ajouter un nouvel animal (avec photo) en moins de 5 minutes
- Peut marquer un animal comme adopté en 2 clics
- Peut modifier les infos SPA (horaires, contact) en moins de 1 minute

### Key Performance Indicators (KPIs)

- **Taux de complétion des fiches** : 100% des animaux ont nom, photo, âge, compatibilités renseignés
- **Fraîcheur du contenu** : Délai moyen entre arrivée d'un animal et publication sur le site < 24h
- **Taux d'adoption** : (Métrique business SPA, hors contrôle direct du site, mais objectif sous-jacent)
- **Autonomie admin** : 0 demandes d'intervention technique pour les mises à jour de contenu

---

## MVP Scope

### Core Features (Must Have)

**Côté Visiteur :**
- **Homepage avec carrousel** : Photos des lieux, présentation concise, 2 CTA principaux (Adopter / Aider)
- **Page catégories** : Cartes visuelles (Chiens, Chats, Oiseaux, Autres) avec compteur d'animaux
- **Liste des animaux** : Grille de cartes avec photo, nom, âge + filtres basiques (compatibilités)
- **Fiche animal** : Infos complètes (identité, compatibilités, histoire, galerie photo)
- **Page procédure d'adoption** : Instructions claires, infos de contact
- **Page "Aider la SPA"** : Présentation, moyens de soutenir (dons, bénévolat), infos pratiques

**Côté Admin :**
- **Authentification** : Login sécurisé (1 compte partagé)
- **CRUD Animaux** : Ajouter, modifier, archiver (adopté), supprimer une fiche
- **Upload photos** : Gestion des images pour chaque animal
- **Gestion infos SPA** : Modifier horaires, contact, texte de présentation

### Out of Scope for MVP

- Questionnaire interactif "Quel animal pour moi"
- Recherche par nom
- Système d'annonces avec bandeau
- Gestion des annonces (admin)
- Multi-comptes admin avec rôles différenciés
- Formulaire de pré-adoption en ligne
- Statistiques / tableau de bord admin
- Multilingue
- Application mobile native

### MVP Success Criteria

Le MVP est considéré comme réussi si :
1. Un visiteur peut parcourir tous les animaux disponibles et accéder à leurs fiches complètes
2. Un admin peut ajouter un nouvel animal avec photo en moins de 5 minutes sans aide
3. Le site est responsive (fonctionne sur mobile et desktop)
4. Le site est déployé et accessible publiquement
5. La SPA peut utiliser le site de manière autonome après une formation de 15 minutes

---

## Post-MVP Vision

### Phase 2 Features

Fonctionnalités à implémenter après validation du MVP :

- **Questionnaire interactif "Quel animal pour moi"** : Parcours guidé par questions pour matcher visiteur/animal selon ses contraintes et préférences
- **Recherche par nom** : Pour les visiteurs connaissant déjà un animal (bénévoles, personnes ayant visité la SPA)
- **Système d'annonces** : Bandeau en haut du site + gestion admin pour communiquer (horaires exceptionnels, événements, appels aux dons)

### Long-term Vision (1-2 ans)

Si le projet est adopté et utilisé par la SPA, évolutions possibles :

- **Galerie "Ils ont été adoptés"** : Section valorisant les adoptions réussies (témoignages, photos)
- **Système de parrainage en ligne** : Permettre de parrainer un animal directement via le site
- **Intégration dons en ligne** : Lien vers une plateforme de dons sécurisée
- **Newsletter** : Inscription pour recevoir les actualités de la SPA
- **Statistiques publiques** : Compteur d'adoptions, animaux accueillis, etc.

### Expansion Opportunities

- **Template réutilisable** : Le projet pourrait servir de base pour d'autres SPA/refuges locaux
- **Open source** : Publication du code pour permettre à d'autres développeurs de contribuer
- **Réseau de SPA** : Si plusieurs refuges adoptent la solution, possibilité d'un portail régional unifié

---

## Technical Considerations

### Platform Requirements

- **Target Platforms :** Web (application React single-page)
- **Browser/OS Support :** Navigateurs modernes (Chrome, Firefox, Safari, Edge - 2 dernières versions), responsive mobile/tablet/desktop
- **Performance Requirements :**
  - Temps de chargement initial < 3 secondes
  - Time to Interactive < 5 secondes
  - Score Lighthouse > 80 (Performance, Accessibility)

### Technology Preferences

- **Frontend :** React (Create React App ou Vite)
- **Styling :** Tailwind CSS
- **Backend :** Firebase (serverless)
  - **Database :** Firestore (NoSQL, temps réel)
  - **Auth :** Firebase Authentication (email/password)
  - **Storage :** Firebase Storage (images des animaux)
- **Hosting :** Firebase Hosting (gratuit, SSL inclus, CDN global)

### Architecture Considerations

- **Repository Structure :** Monorepo simple (un seul projet React contenant le site public + admin)
- **Service Architecture :**
  - Frontend React → Firebase SDK → Services Firebase
  - Pas de backend custom, tout géré par Firebase
- **Integration Requirements :**
  - Aucune intégration tierce pour le MVP
  - Firebase uniquement
- **Security/Compliance :**
  - Règles Firestore pour protéger les données (lecture publique animaux, écriture admin only)
  - Firebase Auth pour sécuriser l'accès admin
  - HTTPS obligatoire (inclus avec Firebase Hosting)
  - Pas de données personnelles utilisateurs stockées (pas de RGPD complexe)

---

## Constraints & Assumptions

### Constraints

- **Budget :** 0€ (hors abonnement Claude Code existant)
  - Utilisation exclusive de services gratuits (Firebase free tier)
  - Pas d'achat de templates, librairies payantes ou services tiers

- **Timeline :** Pas de deadline fixe
  - Développement en quelques heures par jour
  - Rythme d'apprentissage, pas de pression de livraison

- **Resources :**
  - 1 développeur (Aymerick) - frontend React, 2 ans d'expérience
  - Pas d'équipe design, UX, backend
  - Apprentissage Firebase en cours de route

- **Technical :**
  - Pas d'accès au backend/BDD du site actuel
  - Données animaux à saisir manuellement ou récupérer via l'URL publique
  - Dépendance au free tier Firebase (limites généreuses mais existantes)

### Key Assumptions

- La SPA de Pontarlier sera intéressée par le projet une fois terminé
- L'équipe SPA aura la capacité d'utiliser une interface admin simple
- Le volume d'animaux et de trafic restera dans les limites du free tier Firebase
- Quelqu'un à la SPA pourra créer/gérer le compte Firebase pour la production
- Les photos des animaux seront fournies par la SPA (ou prises sur le site actuel avec permission)
- Le projet sera transféré "clé en main" sans engagement de maintenance long terme
- Le développeur sera disponible pour corriger des bugs ponctuels post-livraison

---

## Risks & Open Questions

### Key Risks

- **Adoption par la SPA incertaine :** Le projet est développé sans demande explicite de leur part. Risque qu'ils ne soient pas intéressés ou ne puissent pas l'utiliser.
  - *Impact :* Projet inutilisé, temps investi sans retour concret
  - *Mitigation :* Contacter la SPA tôt dans le projet pour valider l'intérêt

- **Transfert technique complexe :** La SPA devra créer un compte Firebase et gérer l'hébergement.
  - *Impact :* Blocage à la mise en production
  - *Mitigation :* Documenter le processus, proposer une session d'accompagnement

- **Limites du free tier Firebase :** Si le site génère beaucoup de trafic ou stocke beaucoup d'images.
  - *Impact :* Coûts inattendus ou service dégradé
  - *Mitigation :* Optimiser les images, monitorer l'usage, informer la SPA des limites

- **Qualité du contenu :** Sans designer, le rendu visuel dépend des choix UI du développeur.
  - *Impact :* Site fonctionnel mais peu attrayant
  - *Mitigation :* S'inspirer de sites de refuges modernes, utiliser Tailwind UI patterns

### Open Questions

- Qui à la SPA serait le contact/responsable pour ce projet ?
- La SPA a-t-elle un budget pour l'hébergement si le free tier ne suffit plus ?
- Ont-ils des photos de qualité des animaux ou faut-il les prendre ?
- Quel est le volume actuel d'animaux (pour estimer le stockage) ?
- Y a-t-il des contraintes légales sur l'utilisation des photos du site actuel ?
- Comment se passe actuellement la mise à jour du site existant ?

### Areas Needing Further Research

- **Firebase Security Rules** : Approfondir les règles Firestore pour sécuriser l'admin
- **Optimisation images** : Compression, lazy loading, formats modernes (WebP)
- **Accessibilité** : Standards WCAG pour un site public associatif
- **SEO** : React SPA et référencement (pré-rendering, meta tags)

---

## Appendices

### A. Research Summary

**Analyse du site existant (spa-pontarlier.com) :**
- CMS actuel : Webassist v1.6.20
- Structure : 7 rubriques principales avec sous-menus
- Points forts : Informations complètes (tarifs, horaires, processus)
- Points faibles : Design obsolète, navigation complexe, densité textuelle
- Infos clés récupérées : Horaires (14h-17h), contact (03.81.46.40.64), tarification adoption/pension

**Session de brainstorming (2026-01-17) :**
- Techniques utilisées : Role Playing, Mind Mapping, First Principles, SCAMPER
- Résultats complets : `docs/brainstorming-session-results.md`
- Personas identifiés : Visiteur adoptant (3 sous-types), Admin SPA
- Architecture définie : React + Tailwind + Firebase
- MVP priorisé vs fonctionnalités v2

### B. Stakeholder Input

*Aucun contact direct avec la SPA à ce stade.*

À planifier :
- Prise de contact pour présenter le projet
- Validation de l'intérêt
- Recueil des besoins spécifiques

### C. References

- Site actuel : https://www.spa-pontarlier.com/
- Firebase Documentation : https://firebase.google.com/docs
- React Documentation : https://react.dev/
- Tailwind CSS : https://tailwindcss.com/
- Brainstorming results : `docs/brainstorming-session-results.md`

---

## Next Steps

### Immediate Actions

1. **Contacter la SPA de Pontarlier** : Présenter le projet, valider l'intérêt, identifier un interlocuteur
2. **Créer le projet React** : Initialiser avec Vite + Tailwind CSS
3. **Configurer Firebase** : Créer le projet Firebase (Firestore, Auth, Storage, Hosting)
4. **Passer à l'agent Architecte** : Définir l'architecture technique détaillée avec `/architect`
5. **Créer le PRD** : Transformer ce brief en Product Requirements Document avec `/po`

### PM Handoff

Ce Project Brief fournit le contexte complet pour le projet **SPA Pontarlier Website Redesign**.

**Pour le Product Owner / PM :**

Veuillez démarrer en mode "PRD Generation", examiner ce brief en détail et travailler avec l'utilisateur pour créer le PRD section par section, en demandant des clarifications ou en suggérant des améliorations si nécessaire.

**Documents disponibles :**
- `docs/brief.md` — Ce Project Brief
- `docs/brainstorming-session-results.md` — Résultats détaillés du brainstorming

**Contexte clé :**
- Projet d'apprentissage Claude Code + BMAD
- Budget : 0€
- Timeline : Flexible (quelques heures/jour)
- Stack : React + Tailwind + Firebase
- Objectif : Site clé en main à proposer à la SPA

---

*Document créé avec la méthodologie BMAD™*
