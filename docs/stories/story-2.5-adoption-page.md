# Story 2.5: Page Adoption

## Description

En tant que visiteur,
Je veux comprendre la procédure d'adoption,
Afin de savoir comment procéder pour adopter un animal.

## Critères d'acceptation

- [ ] Page `/adoption` accessible
- [ ] Explication claire des étapes d'adoption
- [ ] Informations de contact (téléphone, email)
- [ ] Horaires de visite
- [ ] Tarifs d'adoption (si applicable)
- [ ] Bouton admin pour modifier (si connecté)

## Tâches techniques

1. Compléter `src/services/spaInfoService.ts` :
   - `get(): Promise<SpaInfo>`
2. Créer les types `src/types/spaInfo.ts` (si pas déjà fait)
3. Implémenter `src/pages/AdoptionPage.tsx`
4. Créer le hook `src/hooks/useSpaInfo.ts`

## Contenu de la page

```markdown
# Comment adopter ?

## Les étapes

1. **Visitez la SPA** - Venez rencontrer nos pensionnaires
2. **Rencontrez l'animal** - Passez du temps avec lui
3. **Entretien** - Échangez avec notre équipe sur vos conditions d'accueil
4. **Formalités** - Signez le contrat d'adoption et réglez les frais
5. **Départ** - Repartez avec votre nouveau compagnon !

## Informations pratiques

**Horaires de visite :**
[Depuis Firestore: spaInfo.hours]

**Contact :**
📞 [spaInfo.phone]
📧 [spaInfo.email]

**Adresse :**
[spaInfo.address]

## Frais d'adoption

Les frais d'adoption couvrent la stérilisation, les vaccins,
l'identification et les soins apportés pendant le séjour.

[Tarifs depuis spaInfo si disponibles]
```

## Service spaInfoService

```typescript
// src/services/spaInfoService.ts
export const spaInfoService = {
  async get(): Promise<SpaInfo> {
    const docSnap = await getDoc(doc(db, 'spaInfo', 'main'));
    if (!docSnap.exists()) {
      throw new Error('SPA info not found');
    }
    return { id: docSnap.id, ...docSnap.data() } as SpaInfo;
  },
};
```

## Definition of Done

- [ ] Page affiche les infos depuis Firestore
- [ ] Horaires formatés correctement
- [ ] Liens téléphone/email cliquables
- [ ] Si admin connecté, bouton "Modifier" visible (pour Story 3.5)
- [ ] Responsive

## Données initiales

Créer le document `spaInfo/main` dans Firestore avec :
```json
{
  "name": "SPA de Pontarlier",
  "address": "...",
  "phone": "03.81.46.40.64",
  "email": "contact@spa-pontarlier.com",
  "hours": {
    "monday": null,
    "tuesday": "14h-17h",
    "wednesday": "14h-17h",
    ...
  },
  "description": "...",
  "adoptionProcess": "...",
  "helpInfo": "..."
}
```
