export interface BoardingPrice {
  animal: string
  single: string
  double?: string
  note?: string
}

export const boardingContent = {
  title: 'Service de pension',
  intro:
    'La SPA de Pontarlier propose un service de pension pour garder vos animaux pendant vos absences.',
  prices: [
    {
      animal: 'Chiens',
      single: '15 €/jour',
      double: '26 €/jour (deux du même foyer)',
      note: 'Réduction de 1 €/jour si vous fournissez la nourriture',
    },
    {
      animal: 'Chats',
      single: '10 €/jour',
      double: '16 €/jour (deux)',
      note: 'Réduction de 0,50 €/jour si vous fournissez la nourriture',
    },
    {
      animal: 'NAC / Oiseaux',
      single: '4 €/jour',
      note: 'Le propriétaire doit fournir la nourriture et la litière',
    },
  ] as BoardingPrice[],
  medicalCare: '0,50 €/jour supplémentaire par animal si un traitement est nécessaire',
  requirements: {
    title: 'Conditions d\'admission',
    items: [
      'Certificat de santé à jour obligatoire',
      'Identification par puce électronique ou tatouage obligatoire',
      'Carnet de vaccination à jour (refus de pension si absent)',
      'Tout traitement médical doit être signalé à l\'arrivée',
      'Les frais vétérinaires sont à la charge du propriétaire en cas de maladie non liée à l\'établissement',
    ],
  },
  payment: {
    title: 'Modalités de paiement',
    items: [
      'Acompte de 50% à la signature du contrat',
      'Solde à régler à l\'arrivée de l\'animal',
      'Annulation à moins d\'une semaine : 20% de l\'acompte retenu',
    ],
  },
  care: {
    title: 'Soins apportés',
    items: [
      'Chiens : sorties quotidiennes dans le parc et balades avec les bénévoles l\'après-midi',
      'Chats : boxes au calme avec visites régulières des bénévoles',
      'NAC : placement en famille d\'accueil dans un environnement sécurisé et surveillé',
    ],
  },
}
