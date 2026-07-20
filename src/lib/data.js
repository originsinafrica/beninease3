// Affiches Unsplash de haute qualité — cohérentes avec chaque thème
const gen = (id) => {
  const images = [
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80", // Art
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80", // Food
    "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&auto=format&fit=crop&q=80", // Culture
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80", // Music
    "https://images.unsplash.com/photo-1565192647048-f997eed8795e?w=800&auto=format&fit=crop&q=80", // Crafts
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80", // Travel
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80", // Gastronomy
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80", // Concert/Show
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop&q=80", // Dance
    "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&auto=format&fit=crop&q=80", // Gallery
  ];
  let hash = 0;
  if (id) {
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
  }
  const index = Math.abs(hash) % images.length;
  return images[index];
};

export const SUYUS = [
  {
    id: "arts-spectacle",
    name: "Arts & Spectacle",
    subtitle: "Créateurs, artistes et voix qui font rayonner le Bénin",
    color: "#C4622A",
    series: [
      {
        name: "Objectif Bénin",
        synopsis: "Photographes et vidéastes racontent le pays image après image.",
        synopsis_larga: "Du portrait de rue au reportage documentaire, ces visuels capturent l'âme du Bénin : ses couleurs, ses regards, ses gestes. Derrière chaque cliché, une histoire, une intention, une émotion. Objectif Bénin suit ceux qui voient le pays à travers un objectif et transforment le quotidien en œuvre d'art.",
        image: gen("d9398652e"),
        keywords: ["Photographie", "Vidéo", "Image", "Regard", "Documentaire", "Bénin", "Art visuel"]
      },
      {
        name: "Design Benin",
        synopsis: "Des créateurs qui imaginent les objets, les espaces et les identités visuelles de demain.",
        synopsis_larga: "Le design béninois affirme une voix singulière : mobilier, packaging, identité de marque, espace public. Une nouvelle génération invente des objets utiles et beaux, nourris de références locales et de rigueur internationale.",
        image: gen("53ae97203"),
        keywords: ["Design", "Objet", "Espace", "Identité visuelle", "Création", "Innovation"]
      },
      {
        name: "À la Lettre",
        synopsis: "Les écrivains, poètes et amoureux des mots qui donnent une voix au Bénin.",
        synopsis_larga: "Roman, poésie, théâtre, spoken word : la littérature béninoise s'écrit à voix haute et à plume libre. Des voix qui racontent le pays de l'intérieur, transmettent la mémoire, rêvent l'avenir et redonnent aux mots leur poids.",
        image: gen("b0e4eb2aa"),
        keywords: ["Écriture", "Littérature", "Poésie", "Mots", "Plume", "Culture", "Bénin"]
      },
      {
        name: "Premier Rôle",
        synopsis: "Les femmes et les hommes qui donnent vie aux histoires du Bénin.",
        synopsis_larga: "Du théâtre au cinéma, des scènes de maquis aux plateaux internationaux, les comédiens et comédiennes du Bénin portent des personnages qui interrogent, font rire, bouleversent. Premier Rôle suit leur travail d'incarnation et leur combat pour une scène béninoise reconnue.",
        image: gen("ef45d5859"),
        keywords: ["Théâtre", "Cinéma", "Acteur", "Scène", "Interprétation", "Art dramatique"]
      },
      {
        name: "Traits de Génie",
        synopsis: "Les artistes qui donnent une forme aux idées, aux émotions et à l'identité béninoise.",
        synopsis_larga: "Peinture, dessin, illustration, street art : les plasticiens du Bénin investissent murs, toiles et écrans pour célébrer la culture, dénoncer les injustices et rêver le futur. Une scène visuelle bouillonnante qui mérite sa place sur les cimaises du monde.",
        image: gen("b04ec07f2"),
        keywords: ["Peinture", "Dessin", "Street art", "Art plastique", "Création", "Couleur"]
      },
      {
        name: "Le Corps Parle",
        synopsis: "Quand le corps devient un langage, la danse raconte ce que les mots ne savent pas dire.",
        synopsis_larga: "Danse contemporaine, traditionnelle, urbaine : au Bénin le corps parle fort. Des chorégraphes inventent un langage qui mêle racines et modernité, transmettant émotions, mémoires et visions du monde à chaque mouvement.",
        image: gen("9a386def1"),
        keywords: ["Danse", "Chorégraphie", "Corps", "Mouvement", "Rythme", "Performance"]
      },
      {
        name: "Monte le Son",
        synopsis: "Les voix, les rythmes et les mélodies qui font vibrer le Bénin.",
        synopsis_larga: "Afrobeat, tchinkoumè, jazz, rap, gospel : le Bénin est une terre de musique. Monte le Son suit les artistes qui font danser le pays et portent sa scène sonore sur les scènes africaines et internationales.",
        image: gen("f6d45fa50"),
        keywords: ["Musique", "Chant", "Rythme", "Concert", "Afrobeat", "Scène", "Voix"]
      },
      {
        name: "Influences",
        synopsis: "Les créateurs qui inspirent, rassemblent et racontent le Bénin à leur manière.",
        synopsis_larga: "Influenceurs, créateurs de contenu, podcasteurs : une nouvelle génération s'est emparée du digital pour informer, divertir et fédérer. Influences décrypte leur impact, leur éthique et leur pouvoir de transformer les imaginaires.",
        image: gen("0ed6b24c0"),
        keywords: ["Contenu", "Influence", "Digital", "Réseau social", "Médias", "Communauté"]
      }
    ]
  },
  {
    id: "mode-artisanat-elegance",
    name: "Mode, Artisanat & Élégance",
    subtitle: "Savoir-faire, mains d'or et art de vivre",
    color: "#7B2CBF",
    series: [
      {
        name: "À Plate Couture",
        synopsis: "Des créateurs qui cousent bien plus que des vêtements : une identité.",
        synopsis_larga: "Wax, bazin, bogolan, indigo : les couturiers et couturières du Bénin habillent une identité. De l'atelier de quartier au défilé international, À Plate Couture suit celles et ceux qui transforment le tissu en discours, en fierté, en élégance.",
        image: gen("5e969e0a4"),
        keywords: ["Couture", "Mode", "Wax", "Bazin", "Tissu", "Identité", "Style", "Création"]
      },
      {
        name: "Haut les Mains",
        synopsis: "Les mains qui fabriquent, sculptent, réparent et transmettent un savoir-faire.",
        synopsis_larga: "Forgerons, sculpteurs, tisserands, restaurateurs : des gestes qui se transmettent de génération en génération. Haut les Mains célèbre l'intelligence de la main et le temps long des savoir-faire qui font la richesse du Bénin.",
        image: gen("8284c3599"),
        keywords: ["Artisanat", "Savoir-faire", "Main", "Sculpture", "Forge", "Fabrication", "Geste"]
      },
      {
        name: "Fiât Luxe",
        synopsis: "Quand l'excellence, le raffinement et le savoir-faire deviennent une expérience.",
        synopsis_larga: "Le luxe à la béninoise n'est pas une question de prix mais d'attention : hôtels de charme, tables d'exception, objets d'art, soins raffinés. Fiât Luxe explore une vision de l'excellence où hospitalité, détail et sens font toute la différence.",
        image: gen("bcc6cb2ca"),
        keywords: ["Luxe", "Raffinement", "Excellence", "Hôtellerie", "Gastronomie", "Expérience", "Élégance"]
      }
    ]
  },
  {
    id: "saveurs-terroir",
    name: "Saveurs & Terroir",
    subtitle: "Cuisine, marchés, eau et terre du Bénin",
    color: "#009B55",
    series: [
      {
        name: "À la Sauce Bénin",
        synopsis: "Chaque recette raconte une famille, une région et une histoire.",
        synopsis_larga: "Akassa, sauce de gombo, poisson braisé, igname pilée, atassi : la cuisine béninoise est un langage. À la Sauce Bénin suit celles et ceux qui font vivre les recettes de famille, les marchés et les mémoires gustatives du pays.",
        image: gen("1da38b9b9"),
        keywords: ["Cuisine", "Recette", "Gastronomie", "Saveur", "Famille", "Tradition", "Bénin", "Food"]
      },
      {
        name: "Maquis & Street Food",
        synopsis: "Là où les meilleures histoires se racontent autour d'une assiette, d'un feu ou d'un kiosque.",
        synopsis_larga: "Kiosques de grilled, maquis animés, gargotes de quartier : la street food béninoise est une institution. Lieux de rencontre, de négociation, de fête et de transmission, où l'on mange aussi bien qu'on y discute.",
        image: gen("b0e71f63c"),
        keywords: ["Street food", "Maquis", "Kiosque", "Cuisine de rue", "Convivialité", "Saveur"]
      },
      {
        name: "Au Fil de l'Eau",
        synopsis: "Le Bénin raconté par celles et ceux dont la vie suit le rythme de l'eau.",
        synopsis_larga: "Pêcheurs de la côte, bateliers du lac Nokoué, riverains du delta et des lagunes : l'eau rythme la vie de millions de Béninois. Au Fil de l'Eau suit les communautés qui vivent, prient et travaillent au contact de l'eau.",
        image: gen("5167778cb"),
        keywords: ["Eau", "Mer", "Lagune", "Pêche", "Lac", "Côte", "Vie", "Bénin"]
      },
      {
        name: "Gardiens de la Terre",
        synopsis: "Ceux qui cultivent, protègent et transmettent les richesses de la terre béninoise.",
        synopsis_larga: "Agriculteurs, agroforestiers, maraîchers, éleveurs : ils nourrissent le pays tout en préservant les sols. Gardiens de la Terre suit les femmes et les hommes qui font vivre la terre béninoise entre savoirs anciens et défis climatiques.",
        image: gen("a743a1a71"),
        keywords: ["Agriculture", "Terre", "Agroforesterie", "Nature", "Durabilité", "Récolte", "Paysan"]
      }
    ]
  },
  {
    id: "batisseurs-tech",
    name: "Bâtisseurs & Tech",
    subtitle: "Entreprendre, innover, coder, investir et diriger",
    color: "#1E5B8C",
    series: [
      {
        name: "Laisse Béton",
        synopsis: "Construire, restaurer, imaginer : les bâtisseurs donnent une forme au Bénin de demain.",
        synopsis_larga: "Architectes, maçons, urbanistes, restaurateurs du patrimoine : ceux qui bâtissent le Bénin de demain en respectant l'héritage d'hier. Laisse Béton suit les chantiers et les rêves qui dessinent l'espace du pays.",
        image: gen("aec856347"),
        keywords: ["Architecture", "Construction", "Bâtiment", "Urbanisme", "Patrimoine", "Restauration"]
      },
      {
        name: "Têtes Chercheuses",
        synopsis: "Chercheurs, enseignants et innovateurs imaginent les solutions de demain.",
        synopsis_larga: "Du labo universitaire à l'atelier de quartier, la recherche béninoise explore santé, agriculture, énergie, sciences sociales. Têtes Chercheuses suit les esprits curieux qui posent les bonnes questions et cherchent des réponses.",
        image: gen("434010426"),
        keywords: ["Recherche", "Science", "Innovation", "Savoir", "Découverte", "Université"]
      },
      {
        name: "Code 229",
        synopsis: "Le Bénin qui innove, code et imagine les technologies de demain.",
        synopsis_larga: "Startups, devs, makers, fintech, agritech : l'écosystème digital béninois bouillonne. Code 229 suit celles et ceux qui écrivent l'avenir du pays ligne par ligne, et bâtissent le Bénin numérique.",
        image: gen("c05c0e637"),
        keywords: ["Tech", "Code", "Startup", "Innovation", "Numérique", "Digital", "Développeur"]
      },
      {
        name: "Capital Benin",
        synopsis: "Ceux qui investissent dans les idées, les entreprises et l'avenir du Bénin.",
        synopsis_larga: "Business angels, fonds d'investissement, family offices : Capital Benin donne la parole à celles et ceux qui croient en l'économie béninoise et misent sur ses entrepreneurs. Une plongée dans les coulisses du capital qui fait grandir.",
        image: gen("1ba960dd4"),
        keywords: ["Investissement", "Capital", "Business", "Finance", "Entrepreneuriat", "Économie"]
      },
      {
        name: "Made in Benin",
        synopsis: "Les marques, les créateurs et les entrepreneurs qui fabriquent le Bénin d'aujourd'hui.",
        synopsis_larga: "Agroalimentaire, textile, cosmétique, industrie créative : le « Made in Benin » s'affirme. Des marques locales qui prouvent qu'on peut produire, transformer et exporter depuis le Bénin avec exigence.",
        image: gen("3d2dddfa7"),
        keywords: ["Production", "Marque", "Industrie", "Transformation", "Local", "Export", "Entrepreneuriat"]
      },
      {
        name: "Les Décideurs",
        synopsis: "Les dirigeants qui construisent des entreprises, créent des emplois et imaginent le Bénin de demain.",
        synopsis_larga: "PDG, dirigeants, chefs d'entreprise : Les Décideurs suit celles et ceux qui portent la responsabilité d'équipes, de résultats et d'avenir. Décryptage d'un métier où l'on décide seul mais où les conséquences sont collectives.",
        image: gen("d90ac9938"),
        keywords: ["Dirigeant", "Leadership", "Entreprise", "Décision", "Management", "Emploi"]
      }
    ]
  },
  {
    id: "societe-spiritualite",
    name: "Société & Spiritualité",
    subtitle: "Foi, traditions, droit, santé, femmes et engagement",
    color: "#8B5A2B",
    series: [
      {
        name: "Les Chemins de la Foi",
        synopsis: "Des femmes et des hommes qui vivent leur spiritualité avec conviction, dans toute sa diversité.",
        synopsis_larga: "Christianisme, islam, Vodoun, églises prophétiques : la spiritualité structure la vie béninoise. Les Chemins de la Foi explore la diversité des croyances et la façon dont la foi guide les choix, apaise les peurs et rassemble les communautés.",
        image: gen("13aaf84a2"),
        keywords: ["Foi", "Spiritualité", "Religion", "Croyance", "Vodoun", "Christianisme", "Islam", "Diversité"]
      },
      {
        name: "Bokonon",
        synopsis: "À la rencontre des gardiens du Fa, de la spiritualité vodoun et des savoirs invisibles qui façonnent encore le Bénin.",
        synopsis_larga: "Le Fa, système divinatoire et philosophie de vie, structure des millions de destinées au Bénin. Bokonon suit les prêtres, prêtresses et devins qui transmettent une cosmogonie souvent mal comprise, mais profondément vivante.",
        image: gen("bf6151bb7"),
        keywords: ["Vodoun", "Fa", "Bokonon", "Divination", "Spiritualité", "Sagesse", "Tradition", "Sacré"]
      },
      {
        name: "Secrets Ancestraux",
        synopsis: "Les savoirs hérités des anciens, entre plantes, traditions et transmission.",
        synopsis_larga: "Phytothérapie, rites, connaissances orales, médecine traditionnelle : des savoirs précieux se transmettent de bouche à oreille. Secrets Ancestraux interroge l'héritage, la transmission et le risque de perte d'un patrimoine immatériel.",
        image: gen("009578893"),
        keywords: ["Tradition", "Savoir", "Plantes", "Phytothérapie", "Ancêtres", "Transmission", "Mémoire"]
      },
      {
        name: "Elles font le Bénin",
        synopsis: "Les femmes qui entreprennent, innovent et transforment le pays.",
        synopsis_larga: "Commerçantes, PDG, artistes, militantes : les femmes sont le moteur du Bénin. Elles font le Bénin suit les parcours de résilience, d'ambition et d'audace qui transforment la société et inspirent les nouvelles générations.",
        image: gen("e16f3ed4e"),
        keywords: ["Femmes", "Entrepreneuriat", "Leadership", "Résilience", "Empowerment", "Innovation", "Bénin"]
      },
      {
        name: "Question de Droit",
        synopsis: "Le droit raconté par celles et ceux qui le vivent chaque jour.",
        synopsis_larga: "Avocats, magistrats, notaires, juristes d'entreprise : le droit régit la vie de chacun. Question de Droit décrypte la justice béninoise, ses défis, ses combats et la façon dont elle touche le quotidien des citoyens.",
        image: gen("5279440bc"),
        keywords: ["Droit", "Justice", "Avocat", "Loi", "Magistrat", "Société", "Bénin"]
      },
      {
        name: "Mandats",
        synopsis: "Le pouvoir, les responsabilités et les choix qui façonnent le pays.",
        synopsis_larga: "Maires, députés, ministres, élus locaux : Mandats suit celles et ceux qui exercent le pouvoir au Bénin. Leurs décisions, leurs doutes, leur courage et l'héritage qu'ils veulent laisser à la collectivité.",
        image: gen("fe1369345"),
        keywords: ["Politique", "Pouvoir", "Mandat", "Responsabilité", "Élu", "Démocratie", "Engagement"]
      },
      {
        name: "Sentinelles",
        synopsis: "Celles et ceux qui veillent, protègent et répondent présents lorsque tout bascule.",
        synopsis_larga: "Sapeurs-pompiers, forces de sécurité, urgences médicales, protection civile : Sentinelles suit celles et ceux qui veillent sur le Bénin. Au cœur des crises, ils incarnent le courage, la discipline et le dévouement.",
        image: gen("991452d14"),
        keywords: ["Protection", "Sécurité", "Urgence", "Secours", "Courage", "Service", "Vigilance"]
      },
      {
        name: "Corps & Âme",
        synopsis: "Prendre soin des autres, du corps comme de l'esprit.",
        synopsis_larga: "Médecins, infirmiers, sages-femmes, psychologues, thérapeutes : Corps & Âme suit celles et ceux qui soignent au Bénin. Leur dévouement, leurs épuisements, leurs joies et les leçons qu'ils tirent de la souffrance et de la guérison.",
        image: gen("2ebeb363b"),
        keywords: ["Santé", "Soins", "Bien-être", "Médecine", "Mental", "Dévouement", "Empathie"]
      },
      {
        name: "Coach Me If You Can",
        synopsis: "Des femmes et des hommes qui aident les autres à révéler leur potentiel.",
        synopsis_larga: "Coaches de vie, mentors sportifs, formateurs, accompagnateurs : une nouvelle profession s'impose au Bénin. Coach Me If You Can décrypte l'art d'aider l'autre à grandir, à se dépasser et à trouver sa voie.",
        image: gen("034e28262"),
        keywords: ["Coaching", "Développement personnel", "Mentorat", "Accompagnement", "Croissance", "Potentiel"]
      }
    ]
  },
  {
    id: "memoire-identite",
    name: "Mémoire & Identité",
    subtitle: "Diaspora, langues, sagesse, royaumes et lieux emblématiques",
    color: "#A0522D",
    series: [
      {
        name: "Black to Benin",
        synopsis: "Des parcours de retour, des racines retrouvées et des histoires de reconnexion avec le Bénin.",
        synopsis_larga: "De la diaspora africaine-américaine, caribéenne ou brésilienne, nombreux sont ceux qui « rentrent » au Bénin. Black to Benin suit ces parcours de retour, de quête, de deuil parfois, où l'on retrouve une terre, une langue, une famille et une part de soi.",
        image: gen("018f3e744"),
        keywords: ["Diaspora", "Retour", "Origines", "Identité", "Racines", "Reconnexion", "Afro-descendant"]
      },
      {
        name: "Béninois Ailleurs",
        synopsis: "Des parcours inspirants aux quatre coins du monde, sans jamais perdre le lien avec le Bénin.",
        synopsis_larga: "Étudiants, expatriés, sportifs, artistes : des Béninois brillent à l'étranger. Béninois Ailleurs suit leurs trajectoires, leur rapport au pays, la façon dont ils portent le drapeau et gardent vivace le lien avec chez eux.",
        image: gen("8f60cf074"),
        keywords: ["Diaspora", "Expatriation", "Parcours", "Monde", "Bénin", "Identité", "Réussite"]
      },
      {
        name: "Langues de Chez Nous",
        synopsis: "Chaque langue porte une mémoire, une identité et une manière de voir le monde.",
        synopsis_larga: "Fon, Yoruba, Bariba, Dendi, Adja, Mina... : plus de 50 langues au Bénin. Langues de Chez Nous célèbre cette diversité linguistique, les mots intraduisibles, les expressions de l'enfance et l'urgence de transmettre.",
        image: gen("8616a11d7"),
        keywords: ["Langue", "Fon", "Yoruba", "Diversité", "Mémoire", "Identité", "Transmission"]
      },
      {
        name: "Baobabs",
        synopsis: "Les gardiens de la mémoire, de la sagesse et des grandes histoires du Bénin.",
        synopsis_larga: "Anciens, sages, griots, aïeux : Baobabs suit les grands témoins du Bénin, celles et ceux qui portent la mémoire longue du pays. Leurs récits, leurs leçons et l'héritage qu'ils souhaitent transmettre aux générations futures.",
        image: gen("b0dbf7a16"),
        keywords: ["Sagesse", "Anciens", "Mémoire", "Histoire", "Griot", "Transmission", "Baobab"]
      },
      {
        name: "Le Royaume",
        synopsis: "Les palais, les dynasties et les héritages qui continuent de façonner l'identité béninoise.",
        synopsis_larga: "Dahomey, Porto-Novo, royaumes du nord : Le Royaume explore les héritages monarchiques du Bénin. Palais UNESCO, dynasties vivantes, mémoires royales et la façon dont cet héritage façonne encore la fierté et l'identité contemporaine.",
        image: gen("b756a98ec"),
        keywords: ["Royaume", "Palais", "Dahomey", "Histoire", "Patrimoine", "Dynastie", "Mémoire"]
      },
      {
        name: "Dantokpa",
        synopsis: "Le plus grand marché du Bénin raconté par celles et ceux qui le font vivre chaque jour.",
        synopsis_larga: "Dantokpa, marché à ciel ouvert géant, est un monde en soi. Commerçantes, négociants, portefaix, féticheurs : Dantokpa suit celles et ceux qui font battre le cœur économique et spirituel du Bénin.",
        image: gen("d75471f44"),
        keywords: ["Marché", "Dantokpa", "Commerce", "Économie", "Négociation", "Cotonou", "Bénin"]
      }
    ]
  },
  {
    id: "vie-urbaine-decouverte",
    name: "Vie Urbaine & Découverte",
    subtitle: "Mobilité, rues, aventures et lieux hors des sentiers battus",
    color: "#2A7A5A",
    series: [
      {
        name: "Ils nous ZEM",
        synopsis: "La ville vue depuis un guidon. Les zémidjans connaissent le Bénin mieux que personne.",
        synopsis_larga: "Les zémidjans, ces chauffeurs de moto-taxi en casquette jaune, sont les veines de la ville. Ils connaissent chaque rue, chaque raccourci, chaque histoire. Ils nous ZEM suit ces rouleurs de l'aube à la nuit, témoins privilégiés de la vie béninoise.",
        image: gen("1cb50c54c"),
        keywords: ["Zémidjan", "Moto-taxi", "Mobilité", "Ville", "Rue", "Transport", "Cotonou", "Bénin"]
      },
      {
        name: "Hors Carte",
        synopsis: "Les lieux, les aventures et les expériences que les guides touristiques oublient souvent.",
        synopsis_larga: "Cascades cachées, villages reculés, festivals confidentiels, routes peu empruntées : Hors Carte suit les explorateurs du Bénin qui sortent des sentiers balisés pour révéler un pays que les guides n'ont pas encore cartographié.",
        image: gen("d665f4c99"),
        keywords: ["Voyage", "Découverte", "Aventure", "Exploration", "Secret", "Nature", "Bénin"]
      }
    ]
  },
  {
    id: "vision-futur",
    name: "Vision & Futur",
    subtitle: "Jeunesse, parcours atypiques et bâtisseurs de demain",
    color: "#0D9488",
    series: [
      {
        name: "Next Gen 229",
        synopsis: "La nouvelle génération qui invente le Bénin de demain.",
        synopsis_larga: "Étudiants, activistes, créateurs, entrepreneurs de moins de 30 ans : Next Gen 229 suit la génération qui prend le relais. Leurs rêves, leurs colères, leurs solutions et la façon dont ils réinventent le Bénin.",
        image: gen("988153f1b"),
        keywords: ["Jeunesse", "Génération", "Avenir", "Innovation", "Engagement", "229", "Bénin"]
      },
      {
        name: "Hors Cadre",
        synopsis: "Les parcours atypiques, les métiers insolites et les histoires que personne n'attend.",
        synopsis_larga: "Pêcheur devenu astronome, comptable reconverti apiculteur, artiste autodidacte : Hors Cadre suit les trajectoires qui sortent des rails. Des vies qui rappellent qu'il n'y a pas qu'une seule façon de réussir et d'exister.",
        image: gen("b987289da"),
        keywords: ["Parcours atypique", "Reconversion", "Insolite", "Audace", "Liberté", "Vie", "Bénin"]
      },
      {
        name: "Demain",
        synopsis: "Les visionnaires qui imaginent le Bénin des dix, vingt ou cinquante prochaines années.",
        synopsis_larga: "Prospectivistes, urbanistes, écologistes, penseurs : Demain donne la parole à celles et ceux qui regardent loin. Leurs scénarios, leurs rêves et les projets qui pourraient transformer durablement le Bénin dans les décennies à venir.",
        image: gen("10a58b408"),
        keywords: ["Futur", "Vision", "Prospective", "Demain", "Transformation", "Rêve", "Bénin"]
      }
    ]
  }
];

export const TREASURE_CARDS = [
  {
    title: "Le Vodoun, patrimoine mondial",
    fact: "Le Vodoun béninois, reconnu patrimoine culturel immatériel de l'humanité par l'UNESCO, est pratiqué par plus de 60 millions de personnes à travers le monde, d'Haïti au Brésil.",
    reward: "10% de réduction sur une consultation de Fa avec un Bokonon",
    rewardProvider: "Bokonon"
  },
  {
    title: "Les Amazones du Dahomey",
    fact: "Les Agojie, guerrières du roi d'Abomey, étaient si redoutées qu'elles étaient appelées « les femmes qui n'ont pas peur de la mort ». Elles ont résisté aux troupes coloniales jusqu'en 1894.",
    reward: "Visite guidée gratuite du palais royal d'Abomey",
    rewardProvider: "Koffi"
  },
  {
    title: "Dantokpa, cœur battant de l'Ouest africain",
    fact: "Dantokpa, l'un des plus grands marchés à ciel ouvert d'Afrique de l'Ouest, génère chaque jour des échanges qui font vivre des centaines de milliers de familles béninoises.",
    reward: "Tour du marché Dantokpa en cadeau avec un atelier culinaire",
    rewardProvider: "Adjovi"
  }
];
