# Story 2.6: Page Aider la SPA

## Description

En tant que visiteur,
Je veux savoir comment je peux aider la SPA,
Afin de contribuer à leur mission même si je ne peux pas adopter.

## Critères d'acceptation

- [ ] Page `/aider` accessible
- [ ] Différentes façons d'aider listées (dons, bénévolat, matériel)
- [ ] Informations de contact
- [ ] Horaires et adresse
- [ ] Bouton admin pour modifier (si connecté)

## Tâches techniques

1. Réutiliser `src/services/spaInfoService.ts` et `useSpaInfo` hook
2. Implémenter `src/pages/HelpPage.tsx`

## Contenu de la page

```markdown
# Aider la SPA

## Comment nous aider ?

### 🎁 Dons
Vos dons nous permettent de soigner et nourrir nos pensionnaires.
[Infos sur comment donner - depuis spaInfo.helpInfo]

### 🤝 Bénévolat
Nous avons toujours besoin de bras pour :
- Promener les chiens
- Socialiser les animaux
- Entretenir les locaux
- Participer aux événements

### 📦 Dons matériels
Nous acceptons :
- Croquettes et pâtées
- Couvertures et paniers
- Jouets pour animaux
- Produits d'entretien

## Nous contacter

**Adresse :**
[spaInfo.address]

**Téléphone :**
📞 [spaInfo.phone]

**Email :**
📧 [spaInfo.email]

**Horaires :**
[spaInfo.hours formatés]
```

## Maquette simplifiée

```
┌─────────────────────────────────────────────────┐
│              AIDER LA SPA                       │
├─────────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐            │
│ │  Dons   │ │Bénévolat│ │Matériel │            │
│ │   💰    │ │   🤝    │ │   📦    │            │
│ └─────────┘ └─────────┘ └─────────┘            │
├─────────────────────────────────────────────────┤
│              NOUS TROUVER                       │
│                                                 │
│  📍 [Adresse]                                   │
│  📞 [Téléphone]                                 │
│  📧 [Email]                                     │
│  🕐 [Horaires]                                  │
│                                                 │
│  [Carte Google Maps embed - optionnel]         │
└─────────────────────────────────────────────────┘
```

## Definition of Done

- [ ] Page affiche les infos depuis Firestore
- [ ] Les 3 façons d'aider sont présentées clairement
- [ ] Contact et horaires visibles
- [ ] Si admin connecté, bouton "Modifier" visible
- [ ] Responsive

## Notes

- Le contenu textuel vient de `spaInfo.helpInfo` (Markdown)
- Une Google Maps embed serait un plus mais pas obligatoire MVP
- Liens tel: et mailto: pour faciliter le contact sur mobile
