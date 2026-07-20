// Portraits africains authentiques — femmes et hommes
const FEMALE_PORTRAITS = [
  "https://media.base44.com/images/public/6a166a2fe45129a4fa500a4d/f92da9995_generated_image.png",
  "https://media.base44.com/images/public/6a166a2fe45129a4fa500a4d/b7f166bf3_generated_image.png",
  "https://media.base44.com/images/public/6a166a2fe45129a4fa500a4d/735c5d6e8_generated_image.png",
  "https://media.base44.com/images/public/6a166a2fe45129a4fa500a4d/8d3852cc9_generated_image.png",
  "https://images.unsplash.com/photo-1531746790095-e16def12e1cd?w=600&h=900&fit=crop&crop=faces",
];

const MALE_PORTRAITS = [
  "https://media.base44.com/images/public/6a166a2fe45129a4fa500a4d/d9accc994_generated_image.png",
  "https://media.base44.com/images/public/6a166a2fe45129a4fa500a4d/ded3107c3_generated_image.png",
  "https://media.base44.com/images/public/6a166a2fe45129a4fa500a4d/742c9ebeb_generated_image.png",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=900&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=600&h=900&fit=crop&crop=faces",
];

const NAMES = [
  { name: "Adjovi", full_name: "Adjovi Kossou Ahyi", gender: "f" },
  { name: "Koffi", full_name: "Koffi Dossou Bossou", gender: "m" },
  { name: "Aïssatou", full_name: "Aïssatou Gandonou Sèdégbé", gender: "f" },
  { name: "Sèmèvo", full_name: "Sèmèvo Agbossou Kpèdé", gender: "m" },
  { name: "Faridatou", full_name: "Faridatou Mama Wansi", gender: "f" },
  { name: "Rodrigue", full_name: "Rodrigue Hounkpatin Zinsou", gender: "m" },
  { name: "Nathalie", full_name: "Nathalie Akakpo Vidégla", gender: "f" },
  { name: "Théodore", full_name: "Théodore Gbèdji Tossou", gender: "m" },
  { name: "Clarisse", full_name: "Clarisse Gbêdê Hounsou", gender: "f" },
  { name: "Hippolyte", full_name: "Hippolyte Azonwakin Sossa", gender: "m" },
  { name: "Yèmi", full_name: "Yèmi Assogba Ogoudèkpè", gender: "f" },
  { name: "Patrice", full_name: "Patrice Hounnou Dèdè", gender: "m" },
  { name: "Virginie", full_name: "Virginie Quenum Adanlété", gender: "f" },
  { name: "Maxime", full_name: "Maxime Alabi Zannou", gender: "m" },
  { name: "Oluwaseun", full_name: "Oluwaseun Adebiyi Fassinou", gender: "f" },
  { name: "Arnaud", full_name: "Arnaud Gbaguidi Lègba", gender: "m" },
  { name: "Bintou", full_name: "Bintou Salifou Kouandété", gender: "f" },
  { name: "Franck", full_name: "Franck Azonhiho Gangbo", gender: "m" },
  { name: "Laure", full_name: "Laure Tchouankou Gaba", gender: "f" },
  { name: "Narcisse", full_name: "Narcisse Klégbé Ahoyo", gender: "m" },
];

const SERIES_QUESTIONS = {
  // === ARTS & SPECTACLE ===
  "Objectif Bénin": [
    "Quelle photo ou quelle vidéo t'a le plus bouleversé à réaliser ?",
    "Quel visage résume le mieux le Bénin selon toi ?",
    "Raconte-nous l'histoire derrière ton cliché préféré.",
    "Quel moment du quotidien mériterait d'être immortalisé avant qu'il ne disparaisse ?"
  ],
  "Design Benin": [
    "À quel moment as-tu compris que le design pouvait changer le quotidien ?",
    "Quel projet t'a demandé le plus de créativité ?",
    "Où trouves-tu ton inspiration lorsque la page est blanche ?",
    "Si tu devais redessiner un symbole du Bénin, lequel choisirais-tu ?"
  ],
  "À la Lettre": [
    "Quel livre a profondément changé ta façon de voir le monde ?",
    "Pourquoi écris-tu lorsque tu pourrais simplement parler ?",
    "Quel texte es-tu le plus fier d'avoir écrit ?",
    "Si tu pouvois laisser une seule lettre aux générations futures, que dirait-elle ?"
  ],
  "Premier Rôle": [
    "Quel personnage t'a le plus transformé en tant qu'acteur ou actrice ?",
    "Quelle scène t'a demandé le plus de courage ?",
    "Quel souvenir de tournage te fait encore sourire aujourd'hui ?",
    "Si ta vie devenait un film, quel en serait le titre ?"
  ],
  "Traits de Génie": [
    "Quelle œuvre te ressemble le plus aujourd'hui ?",
    "Quel moment t'a fait comprendre que tu étais artiste ?",
    "Quelle création t'a demandé le plus de toi-même ?",
    "Que voudrais-tu que quelqu'un ressente devant ton travail ?"
  ],
  "Le Corps Parle": [
    "Quel est le premier rythme qui t'a donné envie de danser ?",
    "Quelle danse raconte le mieux ton histoire ?",
    "Quel spectacle t'a laissé sans voix ?",
    "Que ressens-tu lorsque tu danses devant un public ?"
  ],
  "Monte le Son": [
    "Quelle chanson raconte le mieux ton histoire personnelle ?",
    "Quel concert ou quelle scène t'a donné des frissons pour la première fois ?",
    "Quelle rencontre musicale a changé ta carrière ?",
    "Si tu devais faire découvrir le Bénin avec une seule chanson, laquelle choisirais-tu ?"
  ],
  "Influences": [
    "Quel contenu a changé ta vie ou celle de quelqu'un qui te suit ?",
    "Quel message refuses-tu de sacrifier pour faire plus de vues ?",
    "Quelle critique t'a fait grandir ?",
    "Si demain toutes les plateformes disparaissaient, comment continuerais-tu à inspirer les autres ?"
  ],
  // === MODE, ARTISANAT & ÉLÉGANCE ===
  "À Plate Couture": [
    "Quelle création raconte le mieux ton histoire personnelle ?",
    "Qui t'a appris à aimer les tissus et la couture ?",
    "Quel client t'a le plus ému et pourquoi ?",
    "Si tu pouvais habiller le monde avec une seule inspiration béninoise, laquelle choisirais-tu ?"
  ],
  "Haut les Mains": [
    "Quelle est la première chose que tu as fabriquée de tes propres mains ?",
    "Quel geste t'a demandé le plus d'années pour être maîtrisé ?",
    "Quelle création te ressemble le plus aujourd'hui ?",
    "Que voudrais-tu transmettre à quelqu'un qui reprendrait ton atelier demain ?"
  ],
  "Fiât Luxe": [
    "À quel moment as-tu compris que le luxe était avant tout une expérience humaine ?",
    "Quelle attention aux détails fait toute la différence dans ton métier ?",
    "Quelle expérience as-tu créée dont tu es le plus fier ?",
    "Comment définirais-tu le luxe à la béninoise ?"
  ],
  // === SAVEURS & TERROIR ===
  "À la Sauce Bénin": [
    "Quel plat te ramène instantanément en enfance ?",
    "Qui cuisine le mieux dans ta famille et qu'a-t-il transmis au-delà des recettes ?",
    "Quelle odeur te fait immédiatement penser au Bénin ?",
    "Si tu devais faire découvrir le pays avec un seul repas, que servirais-tu ?"
  ],
  "Maquis & Street Food": [
    "Quel est le premier maquis qui t'a donné le sentiment d'être chez toi ?",
    "Quelle recette attire les clients avant même qu'ils ne la goûtent ?",
    "Quelle rencontre improbable as-tu faite autour d'une table ?",
    "Si ton maquis pouvait raconter une histoire, laquelle serait-elle ?"
  ],
  "Au Fil de l'Eau": [
    "Quel est ton premier souvenir lié à l'eau ?",
    "Que t'a appris la lagune ou la mer que la terre ne pouvait pas t'enseigner ?",
    "Quelle journée sur l'eau t'a marqué pour toujours ?",
    "Que ressens-tu lorsque tu regardes l'horizon au lever du soleil ?"
  ],
  "Gardiens de la Terre": [
    "Quelle leçon la terre t'a-t-elle apprise que personne d'autre ne pouvait t'enseigner ?",
    "Quel souvenir d'enfance est lié à un champ, un arbre ou une récolte ?",
    "Quelle saison a changé le destin de ta famille ?",
    "Qu'aimerais-tu transmettre à ceux qui ne connaissent plus le monde agricole ?"
  ],
  // === BÂTISSEURS & TECH ===
  "Laisse Béton": [
    "Quel bâtiment te rend le plus fier lorsque tu passes devant ?",
    "Qui t'a transmis le goût de bâtir ou de créer des espaces ?",
    "Quelle erreur t'a appris la plus grande leçon de ton métier ?",
    "Si tu pouvais construire un lieu emblématique pour le Bénin, à quoi ressemblerait-il ?"
  ],
  "Têtes Chercheuses": [
    "Quelle question t'empêche encore de dormir aujourd'hui ?",
    "Quel échec a finalement conduit à ta plus grande découverte ?",
    "Pourquoi as-tu choisi de chercher plutôt que de suivre un chemin plus simple ?",
    "Quelle innovation pourrait transformer la vie quotidienne des Béninois ?"
  ],
  "Code 229": [
    "Quel problème du quotidien t'a donné envie d'innover ?",
    "Quel a été ton plus grand échec avant de réussir ?",
    "Comment imagines-tu le Bénin numérique dans dix ans ?",
    "Quelle technologie pourrait changer la vie de millions d'Africains ?"
  ],
  "Capital Benin": [
    "Pourquoi as-tu choisi de miser sur le Bénin plutôt qu'ailleurs ?",
    "Quel projet t'a convaincu qu'un investissement peut changer des vies ?",
    "Quelle qualité recherches-tu d'abord chez un entrepreneur ?",
    "Selon toi, quelle est la plus grande richesse du Bénin ?"
  ],
  "Made in Benin": [
    "Quel produit t'a rendu le plus fier de porter la mention « Made in Benin » ?",
    "Quel défi as-tu dû relever pour produire localement ?",
    "Comment convaincs-tu quelqu'un de choisir un produit béninois ?",
    "Quel rêve aimerais-tu voir estampillé « Made in Benin » dans le monde entier ?"
  ],
  "Les Décideurs": [
    "Quelle décision a changé le destin de ton entreprise ?",
    "Quel échec t'a le plus fait grandir comme dirigeant ?",
    "Quel collaborateur t'a appris une leçon inattendue ?",
    "Quel conseil donnerais-tu à quelqu'un qui veut créer son entreprise aujourd'hui ?"
  ],
  // === SOCIÉTÉ & SPIRITUALITÉ ===
  "Les Chemins de la Foi": [
    "Quel moment de foi a profondément transformé ta vie ?",
    "Quelle personne a nourri ta spiritualité lorsque tu étais plus jeune ?",
    "Comment ta foi influence-t-elle les décisions que tu prends chaque jour ?",
    "Si tu pouvais transmettre une seule valeur aux générations futures, laquelle choisirais-tu ?"
  ],
  "Bokonon": [
    "Quel événement de ta vie t'a convaincu de suivre la voie du Fa ou du Vodoun ?",
    "Quelle idée reçue aimerais-tu faire disparaître sur le Vodoun ?",
    "Quelle consultation ou quel rituel t'a le plus marqué humainement ?",
    "Si le monde pouvait comprendre une seule chose du Vodoun, laquelle serait-ce ?"
  ],
  "Secrets Ancestraux": [
    "Qui t'a transmis ce savoir pour la première fois ?",
    "Quelle guérison ou quel accompagnement t'a le plus marqué ?",
    "Comment distingues-tu tradition, expérience et croyance dans ta pratique ?",
    "Quel héritage crains-tu de voir disparaître ?"
  ],
  "Elles font le Bénin": [
    "À quel moment as-tu compris que tu pouvais créer quelque chose de grand ?",
    "Quel obstacle t'a rendu plus forte ?",
    "Quelle femme t'inspire encore aujourd'hui ?",
    "Que voudrais-tu que les jeunes filles retiennent de ton parcours ?"
  ],
  "Question de Droit": [
    "Quelle affaire t'a le plus marqué humainement ?",
    "Quel moment t'a rappelé pourquoi la justice est essentielle ?",
    "Quelle idée fausse le grand public a-t-il souvent sur ton métier ?",
    "Si tu pouvais changer une seule loi, laquelle serait-ce et pourquoi ?"
  ],
  "Mandats": [
    "Quel moment de ton engagement public a été le plus difficile à vivre ?",
    "Quelle décision t'a demandé le plus de courage ?",
    "Comment gardes-tu le lien avec les réalités des citoyens ?",
    "Quel héritage souhaites-tu laisser après ton mandat ?"
  ],
  "Sentinelles": [
    "Quel jour t'a rappelé pourquoi tu avais choisi de protéger les autres ?",
    "Quelle intervention ne quittera jamais ta mémoire ?",
    "Comment gères-tu la peur lorsque tout le monde compte sur toi ?",
    "Que voudrais-tu que les citoyens comprennent mieux de ton métier ?"
  ],
  "Corps & Âme": [
    "Quel patient ou quelle personne t'a profondément marqué dans ton parcours ?",
    "Quel moment t'a rappelé pourquoi tu avais choisi ce métier ?",
    "Comment prends-tu soin de toi lorsque tu consacres ta vie aux autres ?",
    "Quelle habitude simple pourrait améliorer la santé de toute une communauté ?"
  ],
  "Coach Me If You Can": [
    "Qui t'a aidé à devenir la personne que tu es aujourd'hui ?",
    "Quel déclic a changé le cours de ta vie ?",
    "Quelle transformation chez l'un de tes clients t'a le plus ému ?",
    "Quel conseil aurais-tu aimé recevoir dix ans plus tôt ?"
  ],
  // === MÉMOIRE & IDENTITÉ ===
  "Black to Benin": [
    "Quel moment t'a donné le sentiment d'être enfin chez toi ?",
    "Qu'as-tu découvert au Bénin que personne ne t'avait raconté ?",
    "Quelle rencontre a complètement changé ton regard sur tes origines ?",
    "Si tu pouvais inviter quelqu'un de la diaspora à vivre une seule expérience ici, laquelle choisirais-tu ?"
  ],
  "Béninois Ailleurs": [
    "Quel moment t'a fait réaliser que le Bénin faisait toujours partie de toi ?",
    "Quelle habitude béninoise t'accompagne partout où tu vis ?",
    "Comment expliques-tu le Bénin à quelqu'un qui n'y est jamais allé ?",
    "Si tu revenais demain pour lancer un projet, lequel choisirais-tu ?"
  ],
  "Langues de Chez Nous": [
    "Quel mot de ta langue maternelle est impossible à traduire ?",
    "Quel expression entendais-tu souvent pendant ton enfance ?",
    "Quel souvenir est intimement lié à ta langue ?",
    "Pourquoi est-il important de transmettre nos langues aux générations futures ?"
  ],
  "Baobabs": [
    "Quelle histoire entendue dans ton enfance ne t'a jamais quitté ?",
    "Qui t'a transmis la plus grande leçon de ta vie ?",
    "Quel événement de l'histoire du Bénin devrait être mieux connu ?",
    "Quel héritage voudrais-tu laisser derrière toi ?"
  ],
  "Le Royaume": [
    "Quel roi ou quelle reine t'inspire le plus et pourquoi ?",
    "Quel lieu du patrimoine te procure le plus d'émotion lorsque tu le visites ?",
    "Quelle histoire royale mériterait d'être connue dans le monde entier ?",
    "Que représente aujourd'hui l'héritage des royaumes pour les jeunes générations ?"
  ],
  "Dantokpa": [
    "Quel est ton tout premier souvenir de Dantokpa ?",
    "Quelle négociation t'a appris la plus grande leçon de ta vie ?",
    "Quel personnage du marché symbolise le mieux son âme ?",
    "Si Dantokpa disparaissait demain, qu'est-ce qui manquerait le plus au Bénin ?"
  ],
  // === VIE URBAINE & DÉCOUVERTE ===
  "Ils nous ZEM": [
    "Quelle est la course qui a changé ta façon de voir les gens ?",
    "Quel passager t'a raconté une histoire que tu n'oublieras jamais ?",
    "Quel endroit de la ville ne ressemble à aucun autre quand on est zémidjan ?",
    "Si ton zém pouvait raconter une seule journée, laquelle choisirait-il ?"
  ],
  "Hors Carte": [
    "Quel endroit secret du Bénin refuses-tu de garder pour toi ?",
    "Quelle aventure t'a fait découvrir une autre facette du pays ?",
    "Quelle rencontre n'aurait jamais eu lieu sans ce voyage ?",
    "Si tu avais 48 heures pour faire tomber quelqu'un amoureux du Bénin, où l'emmènerais-tu ?"
  ],
  // === VISION & FUTUR ===
  "Next Gen 229": [
    "Quel rêve portes-tu pour ton pays ?",
    "Quelle personne t'a donné confiance lorsque tu doutais ?",
    "Qu'est-ce que ta génération fait différemment des précédentes ?",
    "Si tu pouvais changer une seule chose au Bénin avant tes 30 ans, laquelle serait-ce ?"
  ],
  "Hors Cadre": [
    "Quel choix de vie a surpris tout ton entourage ?",
    "Pourquoi as-tu décidé de sortir des sentiers battus ?",
    "Quelle rencontre improbable t'a conduit là où tu es aujourd'hui ?",
    "Quelle est la plus belle surprise que ton parcours t'ait offerte ?"
  ],
  "Demain": [
    "À quoi ressemblera le Bénin en 2050 selon toi ?",
    "Quelle idée paraît folle aujourd'hui mais deviendra évidente demain ?",
    "Qu'aimerais-tu que les générations futures disent de la nôtre ?",
    "Si tu pouvais lancer un projet sans aucune limite, lequel changerait durablement le Bénin ?"
  ]
};

const FALLBACK_QUESTIONS = [
  "Comment es-tu arrivé à faire ce que tu fais aujourd'hui ?",
  "Quel est ton secret le mieux gardé sur le Bénin ?",
  "Qu'est-ce qui rend ton travail unique ?",
  "Quel message veux-tu laisser au monde ?"
];

const EPISODE_SUBTITLES = ["Épisode 1", "Épisode 2", "Épisode 3", "Épisode 4"];

const SERIES_THEMATIC_IMAGES = {
  // === ARTS & SPECTACLE ===
  "Objectif Bénin": [
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&fit=crop&q=80"
  ],
  "Design Benin": [
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&fit=crop&q=80"
  ],
  "À la Lettre": [
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1474366521946-c3d4b507abf2?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&fit=crop&q=80"
  ],
  "Premier Rôle": [
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&fit=crop&q=80"
  ],
  "Traits de Génie": [
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1571115177098-24ec42ed2cdb?w=800&fit=crop&q=80"
  ],
  "Le Corps Parle": [
    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&fit=crop&q=80"
  ],
  "Monte le Son": [
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&fit=crop&q=80"
  ],
  "Influences": [
    "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&fit=crop&q=80"
  ],

  // === MODE, ARTISANAT & ÉLÉGANCE ===
  "À Plate Couture": [
    "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1558278224-5db379207745?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&fit=crop&q=80"
  ],
  "Haut les Mains": [
    "https://images.unsplash.com/photo-1565192647048-f997eed8795e?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1576016770956-debb63d900ee?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&fit=crop&q=80"
  ],
  "Fiât Luxe": [
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&fit=crop&q=80"
  ],

  // === SAVEURS & TERROIR ===
  "À la Sauce Bénin": [
    "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&fit=crop&q=80"
  ],
  "Maquis & Street Food": [
    "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&fit=crop&q=80"
  ],
  "Au Fil de l'Eau": [
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&fit=crop&q=80"
  ],
  "Gardiens de la Terre": [
    "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1592997573562-b76ee1976a93?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&fit=crop&q=80"
  ],

  // === BÂTISSEURS & TECH ===
  "Laisse Béton": [
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&fit=crop&q=80"
  ],
  "Têtes Chercheuses": [
    "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&fit=crop&q=80"
  ],
  "Code 229": [
    "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&fit=crop&q=80"
  ],
  "Capital Benin": [
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&fit=crop&q=80"
  ],
  "Made in Benin": [
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?w=800&fit=crop&q=80"
  ],
  "Les Décideurs": [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1542744173-8e0ee26bf18a?w=800&fit=crop&q=80"
  ],

  // === SOCIÉTÉ & SPIRITUALITÉ ===
  "Les Chemins de la Foi": [
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544427928-f4219463bbf9?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&fit=crop&q=80"
  ],
  "Bokonon": [
    "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507604276583-eef5d076aa5f?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&fit=crop&q=80"
  ],
  "Secrets Ancestraux": [
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&fit=crop&q=80"
  ],
  "Elles font le Bénin": [
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1563178430-f404ae06221c?w=800&fit=crop&q=80"
  ],
  "Question de Droit": [
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1505664194779-8bebcb95c02e?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&fit=crop&q=80"
  ],
  "Mandats": [
    "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&fit=crop&q=80"
  ],
  "Sentinelles": [
    "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1621243804936-775306a8f2e3?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1471107340919-a87cf0f5b5f1?w=800&fit=crop&q=80"
  ],
  "Corps & Âme": [
    "https://images.unsplash.com/photo-1504813184591-01557010072b?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&fit=crop&q=80"
  ],
  "Coach Me If You Can": [
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&fit=crop&q=80"
  ],

  // === MÉMOIRE & IDENTITÉ ===
  "Black to Benin": [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1530521951415-3db744121ddb?w=800&fit=crop&q=80"
  ],
  "Béninois Ailleurs": [
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&fit=crop&q=80"
  ],
  "Langues de Chez Nous": [
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1531206715517-5c0ba140e2b8?w=800&fit=crop&q=80"
  ],
  "Baobabs": [
    "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&fit=crop&q=80"
  ],
  "Le Royaume": [
    "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1564507592333-c4f1ba6d2e90?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&fit=crop&q=80"
  ],
  "Dantokpa": [
    "https://images.unsplash.com/photo-1543083503-4c9c6317b1b6?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&fit=crop&q=80"
  ],

  // === VIE URBAINE & DÉCOUVERTE ===
  "Ils nous ZEM": [
    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1469031497684-14d2417277b4?w=800&fit=crop&q=80"
  ],
  "Hors Carte": [
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&fit=crop&q=80"
  ],

  // === VISION & FUTUR ===
  "Next Gen 229": [
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=800&fit=crop&q=80"
  ],
  "Hors Cadre": [
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&fit=crop&q=80"
  ],
  "Demain": [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&fit=crop&q=80"
  ]
};

const THUMBNAIL_POOL = [
  "https://images.unsplash.com/photo-1599923594042-4f3876e6a17b?w=400&h=700&fit=crop",
  "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=400&h=700&fit=crop",
  "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?w=400&h=700&fit=crop",
  "https://images.unsplash.com/photo-1541815144-7490274354a9?w=400&h=700&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=700&fit=crop",
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=700&fit=crop",
  "https://images.unsplash.com/photo-1544640808-32ca72ac7f37?w=400&h=700&fit=crop",
  "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=700&fit=crop",
  "https://images.unsplash.com/photo-1513553404607-988bf2703777?w=400&h=700&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&h=700&fit=crop",
  "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=700&fit=crop",
  "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=700&fit=crop",
];

const DURATIONS = ["2:48", "3:24", "4:10", "3:55", "5:01", "2:30", "4:35", "3:15"];

const LOCATIONS = [
  "Cotonou, Littoral",
  "Porto-Novo, Ouémé",
  "Ouidah, Atlantique",
  "Abomey, Zou",
  "Ganvié, Lac Nokoué",
  "Parakou, Borgou",
  "Natitingou, Atacora",
];

const LANGUAGES_POOL = [
  ["Français", "Fon"],
  ["Français", "Yoruba"],
  ["Français"],
  ["Français", "Bariba"],
  ["Français", "Fon", "Anglais"],
];

const RATINGS = [4.7, 4.8, 4.9, 4.6, 4.8, 4.9, 4.7];

const PROJECT_VIDEO_POOL = [
  "SMs0GnYgcIA",
  "B2gHygqPR00",
  "eVb9kQXVfRo",
  "3W5kQZQYqHc",
  "r4Ff4pPc8nk",
];

const PROJECT_GALLERY_POOL = [
  [
    "https://images.unsplash.com/photo-1512058564366-005c6e1e9c1f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop",
  ],
  [
    "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
  ],
  [
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
  ],
];

// Known detailed providers
const KNOWN_PROVIDERS = {
  "provider-adjovi": {
    id: "provider-adjovi",
    name: "Adjovi",
    full_name: "Adjovi Kossou Ahyi",
    gender: "f",
    series: "À la Sauce Bénin",
    suyu: "saveurs-terroir",
    tagline: "Cheffe cuisinière et gardienne des saveurs béninoises",
    bio: "Née à Cotonou, Adjovi a appris à cuisiner dès l'âge de 6 ans auprès de sa grand-mère dans leur village du Zou. Aujourd'hui reconnue comme l'une des meilleures ambassadrices de la gastronomie béninoise, elle réinvente les recettes ancestrales avec une précision et une passion qui font voyager tous ceux qui partagent sa table.",
    poster_url: "https://media.base44.com/images/public/6a166a2fe45129a4fa500a4d/f92da9995_generated_image.png",
    avatar_url: "https://media.base44.com/images/public/6a166a2fe45129a4fa500a4d/f92da9995_generated_image.png",
    seriesList: ["À la Sauce Bénin", "Maquis & Street Food"],
    cover_url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&h=600&fit=crop",
    episodes: [
      {
        title: "Quel plat te ramène instantanément en enfance ?",
        subtitle: "Épisode 1 · Origines",
        description: "Adjovi raconte son enfance culinaire dans le village de sa grand-mère et les saveurs qui ont forgé sa vocation.",
        thumbnail_url: "https://images.unsplash.com/photo-1531746790095-e16def12e1cd?w=400&h=700&fit=crop&crop=faces",
        duration: "3:24",
      },
      {
        title: "Qui cuisine le mieux dans ta famille et qu'a-t-il transmis au-delà des recettes ?",
        subtitle: "Épisode 2 · Transmission",
        description: "La philosophie de la cuisine béninoise : nourrir le corps et l'âme avec des ingrédients simples et sacrés.",
        thumbnail_url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=700&fit=crop",
        duration: "4:12",
      },
      {
        title: "Quelle odeur te fait immédiatement penser au Bénin ?",
        subtitle: "Épisode 3 · Mémoire",
        description: "La sauce de gombo d'Adjovi : une recette transmise de mère en fille depuis cinq générations.",
        thumbnail_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=700&fit=crop",
        duration: "5:01",
      },
      {
        title: "Si tu devais faire découvrir le pays avec un seul repas, que servirais-tu ?",
        subtitle: "Épisode 4 · Vision",
        description: "Le futur de la gastronomie béninoise vu par Adjovi : entre ancrage local et ambition mondiale.",
        thumbnail_url: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&h=700&fit=crop",
        duration: "2:48",
      },
    ],
    services: [
      {
        name: "Atelier de cuisine béninoise",
        description: "3 heures d'immersion dans les saveurs du Bénin. Apprenez à préparer l'akassa, la sauce de gombo et le poisson braisé.",
        price: 40,
        currency: "EUR",
        duration: "3 heures",
      },
      {
        name: "Dîner chez Adjovi",
        description: "Repas de 5 plats dans sa maison de Cotonou. Un voyage gastronomique intime et inoubliable.",
        price: 60,
        currency: "EUR",
        duration: "2 heures",
      },
      {
        name: "Tour du marché Dantokpa",
        description: "Visite guidée des épices et ingrédients secrets du plus grand marché d'Afrique de l'Ouest.",
        price: 25,
        currency: "EUR",
        duration: "2 heures",
      },
    ],
    projects: [
      {
        name: "École de cuisine béninoise Adjovi",
        description: "Financement participatif pour ouvrir une école gratuite de cuisine traditionnelle à Cotonou, destinée aux jeunes filles en décrochage scolaire.",
        goal: 25000,
        currency: "EUR",
        raised: 18200,
        backers: 312,
        deadline: "2026-12-31",
        video_id: "SMs0GnYgcIA",
        gallery: [
          "https://images.unsplash.com/photo-1512058564366-005c6e1e9c1f?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=300&fit=crop",
        ],
        rewards: [
          { tier: "10 €", label: "Ton nom au mur des fondateurs + recette PDF" },
          { tier: "50 €", label: "Atelier de cuisine en ligne avec Adjovi + tote bag" },
          { tier: "200 €", label: "Dîner privé pour 2 à Cotonou + visite de l'école" },
        ],
      },
    ],
    location: "Cotonou, Littoral",
    rating: 4.9,
    languages: ["Français", "Fon"],
    products: [
      {
        name: "Épices Secrètes de Dantokpa",
        description: "Mélange artisanal d'épices traditionnelles béninoises pour rehausser vos sauces et grillades, préparé avec passion par Adjovi.",
        price: 15,
        currency: "EUR",
        shipping: "Retrait sur place ou envoi postal (+5€)",
      },
      {
        name: "Coffret Saveurs du Bénin",
        description: "Un magnifique coffret en raphia tressé avec huiles de coco locales, purée de piment piquante artisanale et condiments secrets d'Adjovi.",
        price: 35,
        currency: "EUR",
        shipping: "Livraison internationale disponible",
      }
    ],
  },
  "provider-koffi": {
    id: "provider-koffi",
    name: "Koffi",
    full_name: "Koffi Dossou Bossou",
    gender: "m",
    series: "Le Royaume",
    suyu: "memoire-identite",
    tagline: "Historien et guide du patrimoine royal d'Abomey",
    bio: "Koffi est le descendant d'une famille de gardiens du palais royal d'Abomey. Depuis 20 ans, il consacre sa vie à faire vivre la mémoire du Royaume du Dahomey. Historien autodidacte, conteur exceptionnel, il transforme chaque visite du palais en une expérience émotionnelle unique.",
    poster_url: "https://media.base44.com/images/public/6a166a2fe45129a4fa500a4d/d9accc994_generated_image.png",
    avatar_url: "https://media.base44.com/images/public/6a166a2fe45129a4fa500a4d/d9accc994_generated_image.png",
    seriesList: ["Le Royaume", "Secrets Ancestraux"],
    cover_url: "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?w=1200&h=600&fit=crop",
    episodes: [
      {
        title: "Quel roi ou quelle reine t'inspire le plus et pourquoi ?",
        subtitle: "Épisode 1 · Origines",
        description: "Koffi raconte sa rencontre avec l'histoire du Dahomey et pourquoi il a choisi d'en être le gardien.",
        thumbnail_url: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&h=700&fit=crop&crop=faces",
        duration: "2:48",
      },
      {
        title: "Quel lieu du patrimoine te procure le plus d'émotion lorsque tu le visites ?",
        subtitle: "Épisode 2 · Révélation",
        description: "La géographie sacrée du palais d'Abomey : chaque cour, chaque autel, chaque bas-relief raconte une histoire.",
        thumbnail_url: "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?w=400&h=700&fit=crop",
        duration: "3:35",
      },
      {
        title: "Quelle histoire royale mériterait d'être connue dans le monde entier ?",
        subtitle: "Épisode 3 · Décryptage",
        description: "Le code symbolique des bas-reliefs du Dahomey : langage visuel d'un royaume sans écriture.",
        thumbnail_url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=700&fit=crop",
        duration: "4:20",
      },
      {
        title: "Que représente aujourd'hui l'héritage des royaumes pour les jeunes générations ?",
        subtitle: "Épisode 4 · Héritage",
        description: "Pourquoi la mémoire du Dahomey est essentielle pour construire un Bénin fier et souverain.",
        thumbnail_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=700&fit=crop",
        duration: "3:55",
      },
    ],
    services: [
      {
        name: "Visite guidée du Palais Royal",
        description: "2 heures de visite immersive avec Koffi. Histoire, symboles et anecdotes exclusives sur les 12 rois du Dahomey.",
        price: 35,
        currency: "EUR",
        duration: "2 heures",
      },
      {
        name: "Conférence privée sur le Dahomey",
        description: "Session privée avec Koffi sur l'histoire précoloniale du Bénin. Parfait pour groupes et chercheurs.",
        price: 80,
        currency: "EUR",
        duration: "1 journée",
      },
      {
        name: "Tour patrimonial d'Abomey",
        description: "Découverte complète d'Abomey : palais, bas-reliefs, artisans et lieux sacrés.",
        price: 55,
        currency: "EUR",
        duration: "4 heures",
      },
    ],
    projects: [
      {
        name: "Musée numérique des bas-reliefs du Dahomey",
        description: "Numérisation 3D et sauvegarde des bas-reliefs menacés du palais royal d'Abomey. Un patrimoine UNESCO à préserver pour les générations futures.",
        goal: 40000,
        currency: "EUR",
        raised: 28750,
        backers: 541,
        deadline: "2026-10-15",
        video_id: "B2gHygqPR00",
        gallery: [
          "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1564507592333-c4f1ba6d2e90?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
        ],
        rewards: [
          { tier: "15 €", label: "Accès anticipé à la plateforme numérique + carte postale" },
          { tier: "80 €", label: "Visite guidée privée du palais + nom dans les crédits" },
          { tier: "300 €", label: "Parrainage d'un bas-relief + rencontre avec les artisans" },
        ],
      },
    ],
    location: "Abomey, Zou",
    rating: 4.8,
    languages: ["Français", "Fon", "Anglais"],
    products: [
      {
        name: "Livre d'Art « Les Rois d'Abomey »",
        description: "Superbe ouvrage broché de photographies inédites et de récits historiques passionnants sur la grande dynastie du Dahomey.",
        price: 45,
        currency: "EUR",
        shipping: "Expédition dans le monde entier sous 7 jours",
      },
      {
        name: "Réplique miniature de bas-relief",
        description: "Sculpture traditionnelle miniature sur argile de terre rouge d'Abomey, façonnée à la main par des artisans royaux locaux.",
        price: 25,
        currency: "EUR",
        shipping: "Retrait à l'atelier ou livraison postale sécurisée",
      }
    ],
  },
  "provider-aissatou": {
    id: "provider-aissatou",
    name: "Aïssatou",
    full_name: "Aïssatou Gandonou Sèdégbé",
    gender: "f",
    series: "À Plate Couture",
    suyu: "mode-artisanat-elegance",
    tagline: "Maître couturière et créatrice de mode wax et indigo",
    bio: "Aïssatou a découvert l'art de la couture à 10 ans dans l'atelier de sa mère à Porto-Novo. Aujourd'hui, ses créations mêlent symbolique Yoruba, pigments naturels et design contemporain. Ses pièces sont exposées à Cotonou, Paris et New York — un pont entre l'Afrique et le monde.",
    poster_url: "https://media.base44.com/images/public/6a166a2fe45129a4fa500a4d/b7f166bf3_generated_image.png",
    avatar_url: "https://media.base44.com/images/public/6a166a2fe45129a4fa500a4d/b7f166bf3_generated_image.png",
    seriesList: ["À Plate Couture", "Haut les Mains"],
    cover_url: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1200&h=600&fit=crop",
    episodes: [
      {
        title: "Quelle création raconte le mieux ton histoire personnelle ?",
        subtitle: "Épisode 1 · Origines",
        description: "Aïssatou raconte comment elle a découvert que chaque création raconte une histoire.",
        thumbnail_url: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=700&fit=crop&crop=faces",
        duration: "3:10",
      },
      {
        title: "Qui t'a appris à aimer les tissus et la couture ?",
        subtitle: "Épisode 2 · Transmission",
        description: "La pièce maîtresse d'Aïssatou : un vêtement qui encode l'histoire de sa famille sur trois générations.",
        thumbnail_url: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=700&fit=crop",
        duration: "4:05",
      },
      {
        title: "Quel client t'a le plus ému et pourquoi ?",
        subtitle: "Épisode 3 · Émotion",
        description: "Comment l'atelier de sa mère est devenu le laboratoire de sa propre révolution créative.",
        thumbnail_url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=700&fit=crop",
        duration: "3:45",
      },
      {
        title: "Si tu pouvais habiller le monde avec une seule inspiration béninoise, laquelle choisirais-tu ?",
        subtitle: "Épisode 4 · Vision",
        description: "Aïssatou sur la place de la mode béninoise dans le monde et ce qu'elle dit de nous.",
        thumbnail_url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=700&fit=crop",
        duration: "2:30",
      },
    ],
    services: [
      {
        name: "Atelier de couture wax",
        description: "Initiez-vous à la création textile avec Aïssatou. Créez votre propre pièce unique.",
        price: 45,
        currency: "EUR",
        duration: "3 heures",
      },
      {
        name: "Tenue sur mesure personnalisée",
        description: "Commandez une tenue wax ou indigo sur mesure avec votre propre symbolique.",
        price: 120,
        currency: "EUR",
        duration: "1 semaine",
      },
      {
        name: "Tour mode de Porto-Novo",
        description: "Découvrez les ateliers de couturiers et teinturiers de Porto-Novo avec Aïssatou comme guide.",
        price: 30,
        currency: "EUR",
        duration: "2 heures",
      },
    ],
    projects: [
      {
        name: "Atelier d'indigo naturel de Porto-Novo",
        description: "Aidez-nous à créer un atelier communautaire d'indigo naturel et de tissage traditionnel pour former et autonomiser 15 jeunes femmes de la région de l'Ouémé.",
        goal: 15000,
        currency: "EUR",
        raised: 9400,
        backers: 142,
        deadline: "2026-11-30",
        video_id: "SMs0GnYgcIA",
        gallery: [
          "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop",
        ],
        rewards: [
          { tier: "15 €", label: "Votre nom gravé sur le mur de l'atelier de teinture + remerciements" },
          { tier: "50 €", label: "Une écharpe d'indigo naturel teintée et tissée à la main par Aïssatou" },
          { tier: "200 €", label: "Stage d'initiation de 2 jours à Porto-Novo avec repas et logement inclus" },
        ],
      },
    ],
    location: "Porto-Novo, Ouémé",
    rating: 4.7,
    languages: ["Français", "Yoruba"],
    products: [
      {
        name: "Écharpe d'Indigo Naturel",
        description: "Magnifique écharpe tissée et teinte à la main à Porto-Novo en coton 100% biologique avec des motifs d'indigo naturel traditionnel.",
        price: 40,
        currency: "EUR",
        shipping: "Livraison gratuite au Bénin, envoi mondial (+8€)",
      },
      {
        name: "Sac Cabas en Tissu Wax",
        description: "Sac à main spacieux et moderne doublé de coton résistant, orné de motifs wax traditionnels Yoruba, parfait au quotidien.",
        price: 30,
        currency: "EUR",
        shipping: "Prêt à être expédié dans le monde entier",
      }
    ],
  },
};

function seededIndex(str, max) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) % 997;
  return Math.abs(hash) % max;
}

const allSuyuSeries = {
  "arts-spectacle": ["Objectif Bénin", "Design Benin", "À la Lettre", "Premier Rôle", "Traits de Génie", "Le Corps Parle", "Monte le Son", "Influences"],
  "mode-artisanat-elegance": ["À Plate Couture", "Haut les Mains", "Fiât Luxe"],
  "saveurs-terroir": ["À la Sauce Bénin", "Maquis & Street Food", "Au Fil de l'Eau", "Gardiens de la Terre"],
  "batisseurs-tech": ["Laisse Béton", "Têtes Chercheuses", "Code 229", "Capital Benin", "Made in Benin", "Les Décideurs"],
  "societe-spiritualite": ["Les Chemins de la Foi", "Bokonon", "Secrets Ancestraux", "Elles font le Bénin", "Question de Droit", "Mandats", "Sentinelles", "Corps & Âme", "Coach Me If You Can"],
  "memoire-identite": ["Black to Benin", "Béninois Ailleurs", "Langues de Chez Nous", "Baobabs", "Le Royaume", "Dantokpa"],
  "vie-urbaine-decouverte": ["Ils nous ZEM", "Hors Carte"],
  "vision-futur": ["Next Gen 229", "Hors Cadre", "Demain"]
};

export function getEpisodesForProvider(provider, seriesName) {
  const isPrimary = (seriesName === provider.series);
  const count = isPrimary ? 4 : 2; // "A first series with two episodes, another with four, etc."

  const key = `${seriesName}-${provider.name}`;
  const questions = (SERIES_QUESTIONS[seriesName] || FALLBACK_QUESTIONS).slice(0, count);
  const thumbBase = seededIndex(key + "thumb", THUMBNAIL_POOL.length);
  const thematicPool = SERIES_THEMATIC_IMAGES[seriesName] || THUMBNAIL_POOL;
  return questions.map((q, i) => ({
    title: q,
    subtitle: `${seriesName} · Épisode ${i + 1}`,
    description: `${provider.name} apporte son regard unique sur cette question essentielle de la série ${seriesName}.`,
    thumbnail_url: thematicPool[i % thematicPool.length],
    duration: DURATIONS[seededIndex(key + i, DURATIONS.length)],
  }));
}

export function generateProvider(seriesName, suyuId, slot) {
  const key = `${seriesName}-${slot}`;
  const nameIdx = seededIndex(key + "name", NAMES.length);
  const locIdx = seededIndex(key + "loc", LOCATIONS.length);
  const langIdx = seededIndex(key + "lang", LANGUAGES_POOL.length);
  const ratingIdx = seededIndex(key + "rating", RATINGS.length);
  const thumbBase = seededIndex(key + "thumb", THUMBNAIL_POOL.length);

  const person = NAMES[nameIdx];
  const questions = SERIES_QUESTIONS[seriesName] || FALLBACK_QUESTIONS;

  const pool = person.gender === "f" ? FEMALE_PORTRAITS : MALE_PORTRAITS;
  const portraitIdx = seededIndex(key + "portrait", pool.length);
  const poster_url = pool[portraitIdx];

  const seriesInSuyu = allSuyuSeries[suyuId] || [seriesName];
  const secondaryCandidates = seriesInSuyu.filter(s => s !== seriesName);
  const secondarySeries = secondaryCandidates.length > 0 
    ? secondaryCandidates[seededIndex(key + "secondary", secondaryCandidates.length)]
    : null;
  const seriesList = secondarySeries ? [seriesName, secondarySeries] : [seriesName];

  const thematicPool = SERIES_THEMATIC_IMAGES[seriesName] || THUMBNAIL_POOL;
  const cover_url = thematicPool[0] || "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop";

  // Tous les prestataires proposent un projet de financement participatif pour l'évaluation
  const hasProject = true;
  const projects = hasProject
    ? [
        {
          name: `Projet collaboratif — ${person.name}`,
          description: `Soutenez le nouveau projet de ${person.name} : un atelier, une création ou une initiative qui a besoin de la communauté pour voir le jour.`,
          goal: 10000,
          currency: "EUR",
          raised: seededIndex(key + "raised", 10000),
          backers: seededIndex(key + "backers", 200),
          deadline: "2026-12-31",
          video_id: PROJECT_VIDEO_POOL[seededIndex(key + "vid", PROJECT_VIDEO_POOL.length)],
          gallery: SERIES_THEMATIC_IMAGES[seriesName] || PROJECT_GALLERY_POOL[seededIndex(key + "gal", PROJECT_GALLERY_POOL.length)],
          rewards: [
            { tier: "5 €", label: "Remerciements publics + sticker exclusif" },
            { tier: "25 €", label: "Produit/Service en pré-vente à tarif early bird" },
            { tier: "100 €", label: `Expérience VIP avec ${person.name}` },
          ],
        },
      ]
    : [];

  return {
    id: `${suyuId}-${seriesName.toLowerCase().replace(/\s+/g, "-")}-${slot}`,
    name: person.name,
    full_name: person.full_name,
    gender: person.gender,
    series: seriesName,
    suyu: suyuId,
    tagline: `Protagoniste de la série « ${seriesName} »`,
    bio: `${person.name} est une figure essentielle de la série « ${seriesName} » au Bénin. Avec des années d'expérience et une passion profonde pour son savoir-faire, ${
      person.gender === "f" ? "elle" : "il"
    } partage son expertise avec ceux qui cherchent une connexion authentique avec la culture béninoise.`,
    poster_url,
    avatar_url: poster_url,
    seriesList,
    cover_url,
    episodes: questions.map((q, i) => ({
      title: q,
      subtitle: EPISODE_SUBTITLES[i] || `Épisode ${i + 1}`,
      description: `${person.name} répond avec honnêteté et profondeur à cette question fondamentale sur sa vie et son rapport au Bénin.`,
      thumbnail_url: thematicPool[i % thematicPool.length],
      duration: DURATIONS[seededIndex(key + i, DURATIONS.length)],
    })),
    services: [
      {
        name: `Session avec ${person.name}`,
        description: `Une expérience personnalisée et intime de 2 heures avec ${person.name} au cœur du Bénin.`,
        price: 35 + seededIndex(key + "price1", 10) * 5,
        currency: "EUR",
        duration: "2 heures",
      },
      {
        name: "Atelier Intensif",
        description: `Journée complète d'immersion. ${person.name} révèle tous ses secrets et techniques exclusives.`,
        price: 80 + seededIndex(key + "price2", 12) * 10,
        currency: "EUR",
        duration: "1 journée",
      },
    ],
    products: [
      {
        name: `Création Artisanale de ${person.name}`,
        description: `Un objet d'art ou accessoire culturel unique fabriqué à la main par ${person.name} selon des techniques ancestrales.`,
        price: 20 + seededIndex(key + "prod1", 8) * 5,
        currency: "EUR",
        shipping: "Expédié sous 5 jours ou retrait à l'atelier",
      },
      {
        name: `Coffret Souvenir Traditionnel`,
        description: `Une sélection d'objets ou d'ingrédients locaux assemblés personnellement par ${person.name} pour célébrer le Bénin.`,
        price: 15 + seededIndex(key + "prod2", 6) * 5,
        currency: "EUR",
        shipping: "Livraison postale nationale et internationale",
      }
    ],
    projects,
    location: LOCATIONS[locIdx],
    rating: RATINGS[ratingIdx],
    languages: LANGUAGES_POOL[langIdx],
  };
}

export function getProvidersForSeries(seriesName, suyuId) {
  const known = Object.values(KNOWN_PROVIDERS).filter((p) => p.series === seriesName);
  const result = [...known];
  for (let slot = result.length; result.length < 4; slot++) {
    result.push(generateProvider(seriesName, suyuId, slot));
  }
  return result;
}

export function getProviderById(id) {
  if (KNOWN_PROVIDERS[id]) return KNOWN_PROVIDERS[id];
  const parts = id.split("-");
  const slot = parseInt(parts[parts.length - 1]);
  const suyuId = parts[0];
  const seriesSlug = parts.slice(1, parts.length - 1).join("-");
  const reconstructed = seriesSlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const seriesName =
    Object.keys(SERIES_QUESTIONS).find((k) => k.toLowerCase() === reconstructed.toLowerCase()) ||
    reconstructed;
  return generateProvider(seriesName, suyuId, slot);
}
