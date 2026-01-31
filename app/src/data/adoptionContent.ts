export interface AdoptionFee {
  category: string
  price: string
  details?: string
}

export const adoptionContent = {
  title: 'Adopter un animal',
  intro:
    "L'adoption d'un animal est un engagement sur le long terme. Voici les tarifs et conditions d'adoption à la SPA de Pontarlier.",
  catFees: [
    {
      category: 'Chat adulte (1 an et plus)',
      price: '170 €',
      details: 'Identifié, vacciné, stérilisé, déparasité',
    },
    {
      category: 'Chat senior (10 ans et plus)',
      price: 'Don libre à partir de 50 €',
      details: 'Contrat doyen',
    },
    { category: 'Chaton (2 à 6 mois)', price: '100 €' },
    { category: 'Chaton (6 à 12 mois)', price: '170 €' },
  ] as AdoptionFee[],
  dogFees: [
    { category: "Chiot (jusqu'à 6 mois)", price: 'Nous contacter' },
    {
      category: "Chien adulte (jusqu'à 8 ans)",
      price: '250 €',
      details: 'Identifié, vacciné, stérilisé, déparasité',
    },
    { category: 'Chien senior (8 à 10 ans)', price: '190 €' },
    {
      category: 'Chien senior (10 ans et plus)',
      price: 'Don libre à partir de 50 €',
      details: 'Contrat doyen',
    },
  ] as AdoptionFee[],
  note: "L'association se réserve le droit d'effectuer des visites et de reprendre l'animal si les conditions de vie ne sont pas satisfaisantes. Un supplément de 50€ est demandé pour les chiens avec passeport européen et vaccination antirabique.",
}

export const adoptionAdvice = {
  title: 'Conseils aux adoptants',
  intro:
    'Posséder un animal demande de la patience, de la compréhension, des connaissances et beaucoup d\'amitié.',
  beforeAdoption: {
    title: 'Avant d\'adopter, réfléchissez à :',
    items: [
      'Qui gardera votre animal pendant vos vacances ?',
      'Un chien a besoin de 3 sorties par jour minimum, la litière du chat doit être nettoyée quotidiennement',
      'Les frais vétérinaires et de nourriture représentent un budget conséquent',
      'Un animal est un être vivant avec des besoins émotionnels, pas un objet',
      'C\'est un engagement de 10 à 15 ans en tant que responsable principal',
    ],
  },
  afterAdoption: {
    title: 'Après l\'adoption :',
    items: [
      'Gardez votre chien en laisse lors des premières sorties',
      'Sécurisez votre jardin avant de le laisser en liberté',
      'L\'animal peut avoir des troubles du comportement liés à la perte de ses repères',
      'Laissez-lui le temps de s\'adapter à son nouvel environnement et à son nouveau régime alimentaire',
      'Parlez-lui doucement et laissez-le venir vers vous à son rythme',
      'Faites preuve de patience et de compréhension pendant la période d\'adaptation',
    ],
  },
}
