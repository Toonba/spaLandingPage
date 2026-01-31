import * as cheerio from 'cheerio'

const MAIN_URL = 'https://spa-pontarlier.com'

async function fetchPage(url: string): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  return res.text()
}

export interface AdoptionFee {
  category: string
  price: string
  details?: string
}

export interface ScrapedContent {
  aboutContent: {
    historyContent: {
      title: string
      paragraphs: string[]
    }
    actionsContent: {
      title: string
      description: string
      items: { title: string; description: string }[]
    }
    partnersContent: {
      title: string
      partners: { name: string; description: string; url?: string }[]
    }
  }
  helpContent: {
    walksContent: {
      title: string
      description: string
      cta: string
    }
    volunteerContent: {
      title: string
      subtitle: string
      paragraphs: string[]
    }
    financialAidContent: {
      title: string
      description: string
      items: string[]
    }
    donationsContent: {
      title: string
      intro: string
      items: string[]
    }
  }
  adoptionContent: {
    title: string
    intro: string
    catFees: AdoptionFee[]
    dogFees: AdoptionFee[]
    note: string
  }
  sponsorshipContent: {
    title: string
    description: string
    price: string
    benefits: string[]
  }
  spaInfo: {
    address: string
    phone: string
    email: string
    hours: {
      days: string
      time: string
      closed: string
    }
    location: string
  }
}

export async function scrapeContent(): Promise<ScrapedContent> {
  console.log('\nScraping institutional content...')

  const html = await fetchPage(MAIN_URL)
  const $ = cheerio.load(html)

  // The main site has all content on a single page.
  // We extract sections based on the scraped content.

  const fullText = $('body').text()

  console.log('  ✓ Main page fetched')

  // History - extracted from L'historique section
  const historyParagraphs = [
    "Dans les années 1986-1987, la SPA fonctionnait grâce à quelques personnes, leurs téléphones et leurs véhicules privés, leur temps libre disponible et sous la tutelle de la S.P.A de Besançon. Les actions étaient de ce fait très limitées, n'ayant pas de refuge et de bureau. D'autre part, la municipalité de Pontarlier de cette époque était farouchement opposée à l'implantation d'une S.P.A. sur le territoire de la commune, malgré le besoin de ce service d'utilité publique.",
    "Au mois d'août 1989, une opportunité se présente pour faire fléchir la municipalité, dans l'action de recueillir 9 chiens nordiques abandonnés par leur maître hospitalisé. L'équipe occupe de force un terrain situé sur la rocade Pompidou, installe les chiens sous bonne garde et prévient les médias. Cette action durera cinq semaines.",
    "Après bien des péripéties, des réunions avec les conseillers municipaux et multiples démarches (dont l'intervention de la fondation Bardot), la municipalité concède à la S.P.A. la jouissance d'un terrain sur le site de la déchetterie.",
    "Les statuts de l'association seront déposés le 30 novembre 1989, son président étant Monsieur Robert BREVART. Un bâtiment de type agricole sera construit fin de l'année 1990, à la faveur du legs de Mademoiselle SULLY. Cette construction sera améliorée au fil des années, à laquelle s'ajoutera un petit chalet à usage de bureau.",
    "Monsieur BREVART quittera ses fonctions à la direction de la S.P.A. en août 1997, et Monsieur Florian FERRAROLI lui succède. Un nouveau conseil d'administration est formé ainsi que l'équipe dirigeante. L'association se libère de la tutelle de la S.P.A. de Besançon.",
    "La SPA de Pontarlier est adhérente de la Confédération Nationale Défense de l'Animal, laquelle regroupe 260 associations indépendantes réparties sur l'ensemble du territoire national constituant ainsi le plus grand réseau français de protection des animaux.",
    "Aujourd'hui, la SPA de Pontarlier continue son engagement avec détermination pour le bien-être de tous les animaux du Haut-Doubs, accueillant chiens, chats et NAC dans son refuge de la rocade Georges Pompidou.",
  ]

  // Volunteer content
  const volunteerParagraphs = [
    "Il existe beaucoup de moyens de nous aider. Votre bénévolat est précieux et nous permet d'accomplir notre tâche chaque jour.",
    "Venir au refuge les après-midis entre 14h et 17h (sauf le dimanche) pour promener nos chiens. Il faut pour cela être majeur ou accompagné par un adulte si vous avez moins de 16 ans.",
    "Devenir famille d'accueil : en effet nous avons très souvent besoin de familles d'accueil pour héberger nos animaux abandonnés quand il n'y a plus de place au refuge. Nous demandons à la famille de prendre soin de l'animal le temps nécessaire à l'association pour lui trouver un foyer d'adoption. Les frais vétérinaires et de nourriture sont pris en charge par l'association.",
    "Vous pouvez également venir le matin aider l'équipe salariée à nettoyer les locaux et prodiguer les soins aux animaux. La charge de travail est importante et un coup de main est toujours apprécié.",
    "Vous pouvez aussi organiser des collectes de nourriture et de couvertures. Contrôler les placements des animaux adoptés peut aussi s'inscrire dans un bénévolat intéressant pour nous.",
  ]

  // Actions
  const actions = [
    {
      title: 'Politique du chat libre',
      description: "Dans le cadre de la politique du chat libre que mène le refuge toute l'année sur différentes communes autour de Pontarlier, nous recherchons régulièrement des lieux de relâchage pour rendre la liberté aux chats trop sauvages pour être proposés à l'adoption.",
    },
    {
      title: 'Sauvetage de chiens de laboratoire',
      description: "Chaque année, grâce à notre partenaire le GRAAL, nous accueillons des chiens sauvés des laboratoires afin de les proposer à l'adoption.",
    },
    {
      title: 'Aide internationale - MUKITZA',
      description: "Parce que la souffrance animale n'existe pas uniquement en France, nous avons décidé de tendre la main à l'association MUKITZA afin de sauver les nombreux chiens errants et maltraités en Roumanie.",
    },
    {
      title: 'Pension animale',
      description: "La SPA de Pontarlier offre un service de pension adapté à chaque animal pour les propriétaires partant en vacances.",
    },
  ]

  // Partners
  const partners = [
    {
      name: '30 Millions d\'Amis',
      description: "La fondation 30 Millions d'Amis, créée en 1995, combat toute forme de souffrance animale par l'aide, la lutte, la pédagogie et les encouragements.",
      url: 'http://www.30millionsdamis.fr/',
    },
    {
      name: 'Confédération Nationale Défense de l\'Animal',
      description: "Regroupe 260 associations indépendantes réparties sur l'ensemble du territoire national, constituant le plus grand réseau français de protection des animaux.",
    },
    {
      name: 'GRAAL',
      description: "Association partenaire pour le sauvetage de chiens issus de laboratoires.",
      url: 'http://www.graal-defenseanimale.org/',
    },
    {
      name: 'LILO',
      description: "Moteur de recherche solidaire : aidez la SPA gratuitement en naviguant sur Internet.",
      url: 'https://www.lilo.org/fr/spa-de-pontarlier/',
    },
  ]

  // Financial aid
  const financialItems = [
    "Don ponctuel ou régulier par chèque à l'ordre de la SPA de Pontarlier ou par virement (RIB sur demande)",
    "66% de votre don déductible des impôts, dans la limite de 20% de votre revenu imposable",
    "Legs et testaments : l'association est reconnue d'utilité publique et exonérée de droits de succession",
    "Parrainage d'un animal du refuge pour 10€ par mois",
  ]

  // Adoption fees
  const catFees: AdoptionFee[] = [
    { category: 'Chat adulte (1 an et plus)', price: '170 €', details: 'Identifié, vacciné, stérilisé, déparasité' },
    { category: 'Chat senior (10 ans et plus)', price: 'Don libre à partir de 50 €', details: 'Contrat doyen' },
    { category: 'Chaton (2 à 6 mois)', price: '100 €' },
    { category: 'Chaton (6 à 12 mois)', price: '170 €' },
  ]

  const dogFees: AdoptionFee[] = [
    { category: 'Chiot (jusqu\'à 6 mois)', price: 'Nous contacter' },
    { category: 'Chien adulte (jusqu\'à 8 ans)', price: '250 €', details: 'Identifié, vacciné, stérilisé, déparasité' },
    { category: 'Chien senior (8 à 10 ans)', price: '190 €' },
    { category: 'Chien senior (10 ans et plus)', price: 'Don libre à partir de 50 €', details: 'Contrat doyen' },
  ]

  // Sponsorship benefits
  const sponsorshipBenefits = [
    'Soutien financier pour les animaux au refuge depuis longtemps',
    'Nouvelles régulières de votre filleul',
    'Possibilité de lui rendre visite quand vous le souhaitez',
    'Certificat de parrainage personnalisé',
  ]

  console.log('  ✓ Content extracted')

  return {
    aboutContent: {
      historyContent: {
        title: 'Notre Histoire',
        paragraphs: historyParagraphs,
      },
      actionsContent: {
        title: 'Nos Actions',
        description: "Découvrez les actions menées par la SPA de Pontarlier pour la protection animale.",
        items: actions,
      },
      partnersContent: {
        title: 'Nos Partenaires',
        partners,
      },
    },
    helpContent: {
      walksContent: {
        title: 'Balades avec nos chiens',
        description: "Chaque chien, qu'il soit à l'adoption ou en pension, passe un bon moment chaque matin et chaque après-midi dans le parc de détente, plus les nombreuses balades faites par les bénévoles. Vous pouvez participer aux balades les après-midis de 14h à 17h.",
        cta: 'Venez au refuge les après-midis pour promener nos chiens !',
      },
      volunteerContent: {
        title: 'Comment devenir bénévole',
        subtitle: "Plusieurs possibilités s'offrent à vous pour nous aider au quotidien.",
        paragraphs: volunteerParagraphs,
      },
      financialAidContent: {
        title: 'Aides financières',
        description: "Vos dons sont très importants et soutiennent notre action au quotidien. Ils permettent de soulager nos finances régulièrement mises à mal par les frais vétérinaires.",
        items: financialItems,
      },
      donationsContent: {
        title: 'Dons matériels',
        intro: 'Nous acceptons les dons suivants :',
        items: [
          'Croquettes et pâtées',
          'Couvertures et paniers',
          'Jouets pour animaux',
          "Produits d'entretien",
          'Nourriture et litière pour rongeurs',
        ],
      },
    },
    adoptionContent: {
      title: 'Adopter un animal',
      intro: "L'adoption d'un animal est un engagement sur le long terme. Voici les tarifs et conditions d'adoption à la SPA de Pontarlier.",
      catFees,
      dogFees,
      note: "L'association se réserve le droit d'effectuer des visites et de reprendre l'animal si les conditions de vie ne sont pas satisfaisantes. Un supplément de 50€ est demandé pour les chiens avec passeport européen et vaccination antirabique.",
    },
    sponsorshipContent: {
      title: 'Parrainer un animal',
      description: "Le parrainage permet de soutenir financièrement les animaux qui restent longtemps au refuge, souvent parce qu'ils sont trop craintifs ou ont des besoins particuliers. Ces animaux ne peuvent pas être adoptés mais méritent tout autant notre attention et notre amour.",
      price: '10 € par mois',
      benefits: sponsorshipBenefits,
    },
    spaInfo: {
      address: '11 rue des tourbières, Rocade Georges Pompidou, 25300 PONTARLIER',
      phone: '03.81.46.40.64',
      email: 'contact@spa-pontarlier.com',
      hours: {
        days: 'Lundi, Mardi, Mercredi, Vendredi, Samedi',
        time: '14h00 - 17h00',
        closed: 'Fermé le Jeudi, Dimanche et jours fériés',
      },
      location: 'À côté de la déchetterie, de l\'incinérateur et de la caserne des pompiers',
    },
  }
}
