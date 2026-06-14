// ============================================================
// DONNÉES COMPLÈTES DU COURS MDE 62-41.2
// ============================================================

export const CHAPITRES = [
  // ─── 1. FONDEMENTS MDE ────────────────────────────────────
  {
    id: "fondements",
    titre: "Fondements MDE & Merise",
    emoji: "🏛️",
    couleur: "#6366f1",
    description: "MDE, niveaux d'abstraction, référentiel, AGL",
    questions: [
      {
        id: "f1",
        question: "Que signifie MDE et quelle est sa définition fondamentale ?",
        choix: [
          "Model-Driven Engineering — l'ingénierie où tout ou partie d'une application est générée à partir de modèles servant de spécifications",
          "Model-Driven Editing — un outil graphique pour éditer des modèles de données",
          "Méthode De l'Entreprise — une méthode de gestion de projets informatiques",
          "Multi-Data Engineering — une approche de gestion des bases de données distribuées",
        ],
        reponse: 0,
        explication: "MDE = Model-Driven Engineering. La définition exacte : 'L'ingénierie dirigée par les modèles est la discipline informatique mettant à disposition des outils, concepts et langages pour créer et transformer des modèles. Il s'agit d'une ingénierie générative, par laquelle tout ou partie d'une application est générée à partir de modèles servant de spécifications.' Les modèles ne sont plus de la documentation — ils pilotent la génération du code.",
      },
      {
        id: "f2",
        question: "Quels sont les 3 niveaux d'abstraction de la méthode Merise ?",
        choix: [
          "Fonctionnel, Technique, Opérationnel",
          "Conceptuel, Logique, Physique",
          "Métier, Applicatif, Infrastructure",
          "Analyse, Conception, Implémentation",
        ],
        reponse: 1,
        explication: "Merise définit 3 niveaux d'abstraction : Conceptuel (MCD — vision métier pure, indépendante de la technologie), Logique (MLD-R — adapté au modèle relationnel mais pas à un SGBD spécifique), Physique (MPD-R Oracle — spécifique au constructeur, avec types Oracle, triggers PL/SQL, séquences...). À chaque niveau, le modèle peut être enrichi avec des spécifications propres à ce niveau.",
      },
      {
        id: "f3",
        question: "Quelle est la différence entre un Modèle et un Diagramme dans un AGL ?",
        choix: [
          "Un modèle est graphique, un diagramme est textuel",
          "Un diagramme est une représentation graphique (vue) d'une partie d'un modèle ; le modèle est l'ensemble complet stocké dans le référentiel",
          "Ce sont deux termes synonymes",
          "Un modèle contient plusieurs AGL, un diagramme est propre à un seul outil",
        ],
        reponse: 1,
        explication: "Un modèle est l'ensemble des objets et leurs relations, stocké dans le référentiel. Un diagramme (ou subview dans ODM) est une représentation graphique partielle du modèle — une vue. On peut avoir plusieurs diagrammes pour le même modèle (ex: un diagramme par sous-système). Modifier un objet dans un diagramme modifie le modèle global.",
      },
      {
        id: "f4",
        question: "Qu'est-ce que le référentiel dans une démarche MDE ?",
        choix: [
          "Le fichier SQL contenant tous les scripts de création",
          "La pièce maîtresse qui stocke tous les objets de définition d'un SI, les restitue sous forme graphique/textuelle, et assure la traçabilité entre niveaux d'abstraction",
          "Le serveur Oracle où les données sont stockées",
          "La documentation PDF du projet",
        ],
        reponse: 1,
        explication: "Le référentiel est la pièce maîtresse d'un processus MDE. Il stocke les différents objets de définition d'un SI (entités, associations, tables, triggers...), les restitue sous différentes formes (graphique, textuelle), et assure la transition et la traçabilité des objets entre les niveaux d'abstraction. Dans VP+MVC-CD, c'est le fichier .vpp ; dans ODM, c'est le fichier .dmd.",
      },
      {
        id: "f5",
        question: "Pourquoi les données sont-elles au centre de la démarche MDE (emphase sur les données) ?",
        choix: [
          "Parce que les bases de données coûtent plus cher que le code",
          "Parce que la nature (structure) des données d'une entreprise est stable dans le temps, contrairement aux traitements qui évoluent constamment",
          "Parce qu'Oracle impose cette approche",
          "Parce que les données sont plus faciles à modéliser que les processus",
        ],
        reponse: 1,
        explication: "C'est un fondement philosophique clé du cours : les données sont stables (la structure d'une commande, d'un client, d'un produit change peu), tandis que les traitements évoluent (les règles de gestion, les processus métier changent régulièrement). Il est donc plus rentable d'investir l'effort de modélisation sur les données. On dit 'data-centric' ou 'emphase sur les données'.",
      },
      {
        id: "f6",
        question: "Dans Oracle Data Modeler, comment s'appelle le niveau Conceptuel, Logique et Physique ?",
        choix: [
          "Entity Diagram, Table Diagram, Oracle Diagram",
          "Logical Model (MCD), Relational Model (MLD-R), Physical Model (MPD)",
          "UML Model, SQL Model, DDL Model",
          "Conceptual Layer, Data Layer, Storage Layer",
        ],
        reponse: 1,
        explication: "ODM utilise une terminologie différente mais déconcertante : le niveau Conceptuel correspond au 'Logical Model' (ce qui est contre-intuitif !), le niveau Logique correspond au 'Relational Model', et le niveau Physique correspond au 'Physical Model'. Dans ce cours, on utilise quand même la terminologie classique MCD/MLD-R/MPD pour éviter la confusion.",
      },
      {
        id: "f7",
        question: "Qu'est-ce que le 'postulat d'utilisation des générateurs' dans la démarche MDE ?",
        choix: [
          "Le modèle généré par un outil est supposé correct — le développeur ne doit pas modifier manuellement le code généré",
          "Les générateurs sont optionnels et peuvent être remplacés par du code manuel",
          "Seuls les triggers peuvent être générés automatiquement",
          "Les générateurs ne fonctionnent que pour les petits projets",
        ],
        reponse: 0,
        explication: "Le postulat est fondamental : si on fait confiance à l'outil de génération, on NE MODIFIE PAS le code généré à la main. On modifie le modèle, on regénère. Si on modifie le code généré, on perd le bénéfice de l'approche MDE — la prochaine regénération écrasera les modifications manuelles. C'est la discipline de base : le modèle est la source de vérité.",
      },
    ],
  },

  // ─── 2. STÉRÉOTYPES & IDENTIFIANTS ────────────────────────
  {
    id: "stereotypes",
    titre: "Stéréotypes & Identifiants",
    emoji: "🏷️",
    couleur: "#ec4899",
    description: "AID, NID, CID, M, les stéréotypes du profil MVC-CD",
    questions: [
      {
        id: "s1",
        question: "Quelle est la différence entre <<AID>> et <<NID-1>> sur un attribut ?",
        choix: [
          "AID est numérique, NID est textuel",
          "AID est un identifiant auto-généré sans sens métier (séquence) ; NID est un identifiant naturel qui a un sens métier, est unique et modifiable",
          "AID est la clé primaire, NID est la clé étrangère",
          "AID est obligatoire, NID est optionnel",
        ],
        reponse: 1,
        explication: "AID (Auto-generated ID) = PK générée automatiquement (séquence Oracle) sans aucun sens pour l'utilisateur. Exemple : num d'un client = 1, 2, 3... NID (Natural ID) = identifiant métier qui existe dans la réalité. Exemple : matricule d'un étudiant, code ISBN d'un livre. Le NID est Unique + Non-null MAIS modifiable (c'est une vraie donnée métier, pas une PK technique). En MLD-R, le NID devient une contrainte UNIQUE + NOT NULL.",
      },
      {
        id: "s2",
        question: "Que signifie le stéréotype <<M>> sur un attribut dans le MCD ?",
        choix: [
          "L'attribut est de type Money",
          "L'attribut est Mandatory (obligatoire) — correspond à NOT NULL en SQL",
          "L'attribut est Multiple (peut avoir plusieurs valeurs)",
          "L'attribut est Modifiable uniquement par l'administrateur",
        ],
        reponse: 1,
        explication: "<<M>> signifie Mandatory (obligatoire). En SQL, cela se traduit par une contrainte NOT NULL sur la colonne. C'est l'un des stéréotypes les plus courants dans le profil MVC-CD. Un attribut sans <<M>> est optionnel (peut être NULL).",
      },
      {
        id: "s3",
        question: "Qu'est-ce qu'un <<CID>> et comment se distingue-t-il d'un <<AID>> ?",
        choix: [
          "CID = Conditional ID, utilisé quand l'identifiant dépend d'une condition",
          "CID = Composition ID, l'identifiant est partiel et se complète avec la FK du parent — l'entité enfant n'existe pas sans son parent",
          "CID = Custom ID, défini par le développeur",
          "CID = Complex ID, composé de plusieurs colonnes",
        ],
        reponse: 1,
        explication: "CID = Composition ID. C'est l'identifiant d'une entité dépendante (faible). L'entité ne peut exister sans son parent. Son identifiant est local au parent et se remet à 1 pour chaque nouveau parent. Exemple : une ligne de commande est numérotée 1, 2, 3 PAR commande. La ligne 1 de la commande A ≠ ligne 1 de la commande B. En MLD-R, la PK de la table enfant inclut la FK du parent.",
      },
      {
        id: "s4",
        question: "Dans le MCD, que représentent les stéréotypes <<AAU>>, <<AAI>>, <<AMU>>, <<AMI>> ?",
        choix: [
          "Des types de données avancés pour les attributs numériques",
          "Les 4 colonnes d'audit : Ajout-User, Ajout-Instant, Modification-User, Modification-Instant",
          "Des contraintes de sécurité sur les colonnes sensibles",
          "Des identificateurs d'associations entre entités",
        ],
        reponse: 1,
        explication: "Ces 4 stéréotypes définissent les colonnes d'audit : AAU (ajUser — utilisateur à l'ajout), AAI (ajDate — horodatage à l'ajout), AMU (moUser — utilisateur lors de la dernière modification), AMI (moDate — horodatage de la dernière modification). Ces colonnes sont alimentées automatiquement par les APIs de tables et sont totalement transparentes pour l'utilisateur.",
      },
      {
        id: "s5",
        question: "Quelle est la limite des colonnes d'audit par rapport à la journalisation ?",
        choix: [
          "Les colonnes d'audit ne fonctionnent qu'avec Oracle",
          "Les colonnes d'audit ne tracent que le dernier état (pas l'historique), et la suppression n'est pas traçable car la ligne disparaît",
          "Les colonnes d'audit ralentissent trop les performances",
          "Les colonnes d'audit nécessitent une licence Oracle supplémentaire",
        ],
        reponse: 1,
        explication: "Les colonnes d'audit (ajUser, ajDate, moUser, moDate) ont des limites importantes : (1) elles ne conservent que la DERNIÈRE modification, pas l'historique complet, (2) la trace de la modification est limitée à la dernière modification, (3) la trace de la suppression est IMPOSSIBLE car la ligne n'existe plus. C'est pourquoi la journalisation (_JN) existe en complément : elle trace TOUTES les mutations dans une table séparée.",
      },
      {
        id: "s6",
        question: "Le stéréotype <<NID-1>> sur un attribut implique quelles contraintes SQL dans le MLD-R ?",
        choix: [
          "PRIMARY KEY uniquement",
          "UNIQUE + NOT NULL (mais PAS PRIMARY KEY — le NID n'est pas la PK technique)",
          "NOT NULL uniquement",
          "UNIQUE uniquement (peut être NULL)",
        ],
        reponse: 1,
        explication: "Un NID-1 est un identifiant naturel donc : (1) UNIQUE car il identifie l'entité de manière unique dans son contexte, (2) NOT NULL car un identifiant ne peut pas être vide. MAIS ce n'est PAS la Primary Key — la PK est l'AID (auto-généré). En pratique : on aura une colonne AID (PK) ET une colonne NID-1 avec contrainte UNIQUE + NOT NULL.",
      },
    ],
  },

  // ─── 3. TRANSFORMATION MCD → MLD-R ────────────────────────
  {
    id: "transformation",
    titre: "Transformation MCD → MLD-R",
    emoji: "⚙️",
    couleur: "#14b8a6",
    description: "Règles de transformation, tables associatives, tables dépendantes",
    questions: [
      {
        id: "t1",
        question: "Une association Many-to-Many (0..* — 0..*) en mode DT donne quoi dans le MLD-R ?",
        choix: [
          "Une seule table avec toutes les colonnes concaténées",
          "Une table associative avec une PK composite formée des deux clés étrangères",
          "Deux tables avec une FK dans chacune pointant vers l'autre",
          "Une table associative avec un AID comme PK indépendante",
        ],
        reponse: 1,
        explication: "En mode DT (Dépendance entre Tables), une association N:N génère une table associative dont la clé primaire est COMPOSITE : elle est formée de la FK vers la table A et de la FK vers la table B. Exemple : Inscriptions(per_num PK FK→Personnes, mod_num PK FK→Modules, dateInscription). Les deux FK ensemble forment la PK — c'est la table dépendante classique.",
      },
      {
        id: "t2",
        question: "Une association One-to-Many (1 — 0..*) génère quoi dans le MLD-R ?",
        choix: [
          "Une table intermédiaire entre les deux entités",
          "La clé primaire de l'entité côté 1 est ajoutée comme clé étrangère dans la table côté Many",
          "La clé primaire de l'entité côté Many est ajoutée dans la table côté 1",
          "Une nouvelle table est créée avec les deux clés primaires",
        ],
        reponse: 1,
        explication: "Pour une association 1:N, la clé primaire de l'entité côté 1 ('parent') migre comme clé étrangère dans la table côté Many ('enfant'). Exemple : Module(1) — possède — (0..*) Examen → la table Examens reçoit une FK mod_num pointant vers Modules. Pas de table intermédiaire nécessaire.",
      },
      {
        id: "t3",
        question: "Dans une table associative en mode DT, la PK composite garantit implicitement quelles propriétés sur les FK ?",
        choix: [
          "Seulement l'unicité du couple",
          "NOT NULL (les deux colonnes sont obligatoires), UNIQUE du couple, et NON-MODIFIABLE (une PK ne peut pas changer)",
          "Seulement NOT NULL",
          "Aucune propriété supplémentaire — les FK restent libres",
        ],
        reponse: 1,
        explication: "C'est crucial pour comprendre DT vs TI : une PK garantit automatiquement (1) NOT NULL sur toutes ses colonnes, (2) UNICITÉ de la combinaison, (3) NON-MODIFIABILITÉ (par convention, une PK ne change pas). En mode TI, quand on retire les FK de la PK, on PERD ces 3 garanties et on doit les reconstituer manuellement avec {stability}, SIMPK, et NOT NULL.",
      },
      {
        id: "t4",
        question: "La table Resultats (entité dépendante d'Inscriptions via <<CID>>) a en mode DT une PK composée de :",
        choix: [
          "Uniquement de numdep (son propre identifiant)",
          "De numdep ET des deux colonnes de la FK vers Inscriptions (per_num + mod_num) — soit 3 colonnes au total",
          "De numdep ET d'une seule FK vers Inscriptions",
          "Des deux FK vers Personnes et Modules directement",
        ],
        reponse: 1,
        explication: "Table Resultats en mode DT : PK = (per_num + mod_num + numdep). La PK hérite de toute la PK de la table parente (Inscriptions = per_num + mod_num) PLUS son propre identifiant partiel (numdep). C'est une PK de 3 colonnes. La FK vers Inscriptions est elle-même composite (per_num + mod_num). C'est l'effet cascade des tables dépendantes en mode DT.",
      },
      {
        id: "t5",
        question: "Quelle est la règle de transformation pour une association One-to-One (1..1 — 0..1) ?",
        choix: [
          "On crée toujours une table intermédiaire",
          "La PK d'une des deux entités migre dans l'autre comme FK (généralement vers l'entité côté 0..1), et cette FK est UNIQUE",
          "On fusionne les deux entités en une seule table",
          "Les deux tables gardent leur PK indépendante sans FK entre elles",
        ],
        reponse: 1,
        explication: "Pour une association 1:1, la PK d'une entité migre comme FK dans l'autre. La FK reçoit en plus une contrainte UNIQUE (puisqu'un seul enregistrement de l'autre côté peut y être associé). Généralement on fait migrer vers l'entité côté 0..1 (optionnel) pour éviter les NULLs côté obligatoire.",
      },
    ],
  },

  // ─── 4. MODE DT vs TI ─────────────────────────────────────
  {
    id: "dt-ti",
    titre: "Modes DT vs TI",
    emoji: "⚡",
    couleur: "#a855f7",
    description: "Tables Indépendantes, SIMPK, stability, compensation",
    questions: [
      {
        id: "dt1",
        question: "Que signifie SIMPK et pourquoi apparaît-elle uniquement en mode TI ?",
        choix: [
          "Simple Primary Key — une PK mono-colonne",
          "SIMulation de clé Primaire — contrainte UNIQUE sur la combinaison des FK d'une ancienne table associative, pour compenser la perte de la PK composite",
          "Standard Implementation Primary Key — une convention Oracle",
          "Secondary Index on Multiple Primary Keys",
        ],
        reponse: 1,
        explication: "SIMPK = SIMulation de clé Primaire. En mode DT, la PK composite (FK1 + FK2) garantit l'unicité du couple. En mode TI, la PK devient un AID indépendant — on perd l'unicité du couple. SIMPK est une contrainte <<U>> UNIQUE sur (FK1 + FK2) qui recrée cette garantie. Elle s'appelle 'simulation' car elle reproduit le comportement de la PK composite sans en être une.",
      },
      {
        id: "dt2",
        question: "Pourquoi le mode TI est-il préféré dans certains frameworks comme Oracle APEX ou Laravel ?",
        choix: [
          "Parce que les clés composites ne sont pas supportées par ces frameworks",
          "Parce que les tables avec une PK mono-colonne sont plus simples à manipuler dans les frameworks RAD/ORM, facilitent les évolutions du MCD sans impact en cascade sur les FK",
          "Pour des raisons de performance uniquement",
          "Parce que le mode DT est obsolète",
        ],
        reponse: 1,
        explication: "Deux raisons principales : (1) Évolutivité : si la PK d'une table change en mode DT, toutes les FK composites qui la référencent cascadent. En TI, les FK ne sont jamais dans une PK composite, donc l'impact est minimal. (2) Compatibilité framework : Laravel (Eloquent), Oracle APEX, et beaucoup de RAD/ORM fonctionnent mieux avec des PK simples de type `id`. En TI, chaque table a son `id` indépendant.",
      },
      {
        id: "dt3",
        question: "En mode TI, la table Resultats (anciennement dépendante d'Inscriptions) devient :",
        choix: [
          "Identique au mode DT — aucun changement",
          "Une table avec une PK indépendante (res_num), et une FK mono-colonne vers Inscriptions (ins_num), au lieu d'une FK composite de 2 colonnes",
          "Une table sans clé étrangère vers Inscriptions",
          "Une table fusionnée avec Inscriptions",
        ],
        reponse: 1,
        explication: "En mode DT, Resultats avait une PK de 3 colonnes (per_num + mod_num + numdep) et une FK composite de 2 colonnes vers Inscriptions. En mode TI, Inscriptions a maintenant une PK mono-colonne (ins_num). Donc Resultats reçoit une FK mono-colonne (ins_num) vers Inscriptions, et sa propre PK devient res_num. Toutes les tables deviennent ainsi 'indépendantes'.",
      },
      {
        id: "dt4",
        question: "Dans quel outil peut-on paramétrer le mode de transformation DT ou TI ?",
        choix: [
          "Dans Oracle Data Modeler (ODM)",
          "Dans le plugin MVC-CD2 de Visual Paradigm, dans les préférences onglet MCD → MLD-R",
          "Dans Oracle SQL Developer",
          "Dans les deux outils ODM et VP de manière identique",
        ],
        reponse: 1,
        explication: "C'est le plugin MVC-CD2 (dans Visual Paradigm) qui offre le choix entre mode DT et TI via ses préférences. ODM n'offre fondamentalement que le mode DT (transformation traditionnelle). Pour obtenir un MLD-R en mode TI avec ODM, il faut 'dénaturer' manuellement le MCD en créant des entités associatives explicites (simulation d'entité associative).",
      },
      {
        id: "dt5",
        question: "Qu'est-ce que la 'simulation d'entité associative' dans ODM et pourquoi est-elle nécessaire ?",
        choix: [
          "C'est une fonctionnalité native d'ODM pour gérer les associations N:N",
          "C'est créer manuellement une entité (ex: Realisation) avec son propre AID pour simuler une table associative en mode TI, car ODM ne supporte pas le mode TI automatiquement",
          "C'est une procédure pour tester les associations dans la base de données",
          "C'est importer une association depuis un autre outil",
        ],
        reponse: 1,
        explication: "ODM transforme toujours les associations N:N en tables associatives DT (PK composite). Pour obtenir une table indépendante (TI), il faut 'dénaturer' le MCD : au lieu d'une association N:N entre Mandat et Collaborateur, on crée une entité Realisation avec un AID (numero PK), puis deux associations 1:N non-transférables (Mandat→Realisation et Collaborateur→Realisation). Résultat : table REALISATIONS avec PK indépendante.",
      },
    ],
  },

  // ─── 5. ASSOCIATIONS IDENTIFIANTES ────────────────────────
  {
    id: "identifiantes",
    titre: "Associations Identifiantes",
    emoji: "🔗",
    couleur: "#f59e0b",
    description: "NID vs CID, {absolute}, losange ODM, conséquences logiques",
    questions: [
      {
        id: "ai1",
        question: "Quelle est la différence entre une association identifiante naturelle (NID) et une association identifiante de composition (CID) ?",
        choix: [
          "NID est pour les associations 1:N, CID est pour les associations N:N",
          "Dans NID, l'enfant a un identifiant qui n'est unique que relativement au parent ; dans CID, l'enfant n'existe pas sans son parent et sa numérotation repart à 1 pour chaque parent",
          "NID génère une PK composite, CID génère une PK simple",
          "Ce sont deux termes synonymes pour le même concept",
        ],
        reponse: 1,
        explication: "Association identifiante NID : l'attribut identifiant de l'enfant est unique 'dans le contexte du parent'. Exemple : Camion identifié par 'AB-123' DANS son dépôt. Un autre dépôt peut avoir aussi 'AB-123'. Association identifiante CID : l'enfant ne peut PAS exister sans parent, et sa numérotation est relative au parent (repart à 1). Exemple : Place de parking numérotée 1,2,3 PAR dépôt. La place ne peut pas changer de dépôt.",
      },
      {
        id: "ai2",
        question: "Dans Oracle Data Modeler, qu'est-ce que le 'petit losange' (◆) dans une relation signifie ?",
        choix: [
          "Une relation Many-to-Many",
          "Une relation obligatoire des deux côtés",
          "Une association identifiante (Identifying relationship) — la PK de l'enfant inclut la PK du parent",
          "Une relation avec une contrainte CHECK",
        ],
        reponse: 2,
        explication: "Dans la notation Barker utilisée par ODM, le losange rempli (◆) sur une relation indique qu'elle est 'Identifying' (identifiante). La case 'Identifying' dans les propriétés de la relation. Conséquence : la PK de l'entité enfant sera composite et inclura la PK du parent. C'est l'équivalent d'une association identifiante CID dans le formalisme MVC-CD/VP.",
      },
      {
        id: "ai3",
        question: "Que garantit la contrainte {absolute} sur une association identifiante naturelle ?",
        choix: [
          "L'association est obligatoire des deux côtés",
          "L'identifiant naturel (NID) est unique GLOBALEMENT dans toute la table, pas seulement dans le contexte du parent",
          "L'entité enfant ne peut pas être supprimée",
          "L'association est non-transférable",
        ],
        reponse: 1,
        explication: "Sans {absolute} : NID unique PAR parent (contrainte UNIQUE sur NID + FK_parent). Exemple : deux dépôts peuvent avoir un camion 'AB-123'. Avec {absolute} : NID unique GLOBALEMENT (contrainte UNIQUE sur NID seul). Exemple : si le dépôt A a 'AB-123', aucun autre camion ne peut avoir ce numéro. {absolute} inverse le comportement par défaut de l'association identifiante.",
      },
      {
        id: "ai4",
        question: "Dans le cas Camion-Dépôt, si on a l'association identifiante NID-2 avec {absolute} sur numéro de châssis, que signifie-t-il concrètement ?",
        choix: [
          "Chaque dépôt peut avoir ses propres numéros de châssis qui se répètent",
          "Le numéro de châssis est unique dans l'absolu — tous les camions du monde ont un numéro de châssis différent, indépendamment du dépôt",
          "Le numéro de châssis identifie le dépôt, pas le camion",
          "Les camions peuvent changer de châssis",
        ],
        reponse: 1,
        explication: "NID-2 avec {absolute} sur numéro de châssis reflète la réalité : un numéro de châssis est gravé dans le métal d'un véhicule et est globalement unique dans le monde entier. Contrairement à l'immatriculation (NID-1 sans {absolute}) qui peut être attribuée différemment par pays/dépôt, le châssis est absolument unique.",
      },
      {
        id: "ai5",
        question: "Quelle est la conséquence sur la PK de la table PlacesParc (association <<CID>> avec Depot) ?",
        choix: [
          "La PK est uniquement numPlace (identifiant propre)",
          "La PK est composite : (numPlace + dep_num FK vers Depots) — la place ne s'identifie qu'avec son dépôt",
          "La PK est uniquement dep_num",
          "Il n'y a pas de PK, PlacesParc est une table de liaison",
        ],
        reponse: 1,
        explication: "Avec une association identifiante CID, la table enfant (PlacesParc) a une PK composite = (propre identifiant + FK du parent). Ici : PK = (numPlace + dep_num). Conséquence : on peut avoir une place n°1 dans le dépôt A ET une place n°1 dans le dépôt B — ces deux lignes sont distinctes. La place n°1 n'a de sens que dans le contexte d'un dépôt spécifique.",
      },
    ],
  },

  // ─── 6. CONTRAINTES NON-DÉCLARATIVES ─────────────────────
  {
    id: "contraintes",
    titre: "Contraintes Non-Déclaratives",
    emoji: "🧊",
    couleur: "#3b82f6",
    description: "{frozen}, {ordered}, {stability}, {nonoriented}, {absolute}",
    questions: [
      {
        id: "c1",
        question: "Pourquoi dit-on qu'une contrainte est 'non-déclarative' ?",
        choix: [
          "Parce qu'elle n'est pas visible dans le MCD",
          "Parce qu'elle ne peut pas être exprimée en SQL-DDL (CREATE TABLE / ALTER TABLE) et nécessite du code procédural PL/SQL (triggers)",
          "Parce qu'elle est facultative et documentaire uniquement",
          "Parce qu'Oracle ne la supporte pas nativement",
        ],
        reponse: 1,
        explication: "SQL-DDL (NOT NULL, UNIQUE, CHECK, FK...) peut exprimer des contraintes statiques simples. Une contrainte non-déclarative implique une logique procédurale : comparaison de valeurs avant/après (BEFORE UPDATE), vérification d'existence d'autres lignes (BEFORE INSERT), alimentation automatique de colonnes. Ces logiques nécessitent des triggers PL/SQL que SQL-DDL ne peut pas exprimer.",
      },
      {
        id: "c2",
        question: "{frozen} sur une association signifie que :",
        choix: [
          "L'association ne peut jamais être créée",
          "La valeur de la clé étrangère ne peut plus changer après insertion — l'enfant ne peut pas 'changer de parent'",
          "L'association est optionnelle",
          "L'association est bidirectionnelle",
        ],
        reponse: 1,
        explication: "{frozen} sur une association fige la valeur de la FK après l'INSERT. Exemple : un Mandat ne peut pas changer de Client une fois créé. Dans ODM, c'est 'Transferable = false'. Implémentation physique : un trigger BEFORE UPDATE qui compare :OLD.cli_num et :NEW.cli_num — si elles diffèrent, RAISE_APPLICATION_ERROR bloque l'opération.",
      },
      {
        id: "c3",
        question: "Quelle différence entre {frozen} sur une colonne et {frozen} sur une association ?",
        choix: [
          "Il n'y a aucune différence",
          "{frozen} sur colonne = cette colonne spécifique est immuable (ex: dateSignature) ; {frozen} sur association = la FK est immuable (l'enfant ne peut pas changer de parent)",
          "{frozen} sur colonne s'applique au MCD, {frozen} sur association s'applique au MLD-R",
          "{frozen} sur colonne est supporté par SQL, {frozen} sur association nécessite un trigger",
        ],
        reponse: 1,
        explication: "Deux usages distincts : (1) {frozen} sur une COLONNE : cet attribut spécifique ne peut jamais être modifié (ex: dateReception, alimentée automatiquement à la création). (2) {frozen} sur une ASSOCIATION : la FK correspondante ne peut jamais changer (ex: un Mandat reste lié à son Client initial). Dans les deux cas, c'est un trigger BEFORE UPDATE. Dans ODM, seul le cas 'association' a un équivalent direct (Transferable = false).",
      },
      {
        id: "c4",
        question: "Qu'ajoute concrètement {ordered} à une entité dans la base de données ?",
        choix: [
          "Un index de performance sur les colonnes de tri",
          "Une colonne ORDRE NOT NULL + UNIQUE dans la table, alimentée automatiquement par les APIs (valeurs multiples de 10 pour faciliter les insertions intermédiaires)",
          "Un trigger qui trie automatiquement les SELECT",
          "Une contrainte qui empêche les doublons sur le libellé",
        ],
        reponse: 1,
        explication: "{ordered} génère une colonne 'ordre' (NOT NULL + UNIQUE) dans la table. Les APIs de tables alimentent cette colonne automatiquement. Les valeurs sont des multiples de 10 (10, 20, 30...) pour laisser de l'espace entre les entrées (on peut insérer 15 entre 10 et 20 sans renuméroter). Exemple : Jours de la semaine — Lundi=10, Mardi=20... Dimanche=70.",
      },
      {
        id: "c5",
        question: "{stability} est une contrainte spécifique au mode TI. Que fait-elle exactement ?",
        choix: [
          "Elle empêche la suppression des enregistrements",
          "Elle rend les colonnes FK immuables après insertion, compensant la perte de l'immuabilité qui était garantie par la PK composite en mode DT",
          "Elle garantit que la table a toujours au moins un enregistrement",
          "Elle synchronise automatiquement les FK avec les mises à jour du parent",
        ],
        reponse: 1,
        explication: "En mode DT, les FK dans une PK composite sont immuables par nature (une PK ne change pas). En mode TI, les FK ne sont plus dans la PK — elles pourraient être modifiées. {stability} compense cette perte en ajoutant un trigger BEFORE UPDATE bloquant la modification des colonnes FK. C'est la version 'FK' de {frozen}, spécifique au contexte TI.",
      },
      {
        id: "c6",
        question: "{nonoriented} s'applique à quoi et pourquoi SQL ne peut pas le gérer seul ?",
        choix: [
          "Aux tables sans index — SQL peut le gérer avec des contraintes CHECK",
          "Aux associations auto-référencées symétriques (A,B) = (B,A) — SQL ne peut pas le gérer car UNIQUE((col1, col2)) n'empêche pas l'insertion du doublon inverse (B,A)",
          "Aux colonnes avec des valeurs NULL — SQL gère déjà les NULL nativement",
          "Aux associations N:N — SQL peut le gérer avec une PK composite",
        ],
        reponse: 1,
        explication: "{nonoriented} s'applique aux associations auto-référencées symétriques (ex: amitié). Le problème : UNIQUE(per_num1, per_num2) empêche le doublon EXACT mais PAS le doublon symétrique — (3,7) et (7,3) sont deux lignes différentes pour SQL. Un trigger BEFORE INSERT est nécessaire pour vérifier si (7,3) existe avant d'insérer (3,7).",
      },
      {
        id: "c7",
        question: "Dans ODM, comment implémenter {frozen} sur une association (non-transférabilité) ?",
        choix: [
          "Cocher 'Mandatory = true' sur la relation",
          "Décocher 'Transferable' dans les propriétés de la relation, puis générer le trigger via DDL Preview car le mécanisme de consolidation ne le gère pas",
          "Ajouter une contrainte CHECK sur la FK",
          "Créer manuellement le trigger dans SQL Developer",
        ],
        reponse: 1,
        explication: "Dans ODM : décocher 'Transferable' dans les propriétés General de la relation. Limitation importante : ODM ne prend PAS encore en compte la non-transférabilité dans le mécanisme de consolidation. Les triggers correspondants ne sont pas générés par la consolidation. Solution de contournement : sélectionner la table, clic-droit > DDL Preview, récupérer manuellement le trigger et l'exécuter dans le schéma.",
      },
    ],
  },

  // ─── 7. APIS DE TABLES ────────────────────────────────────
  {
    id: "apis",
    titre: "APIs de Tables",
    emoji: "🔧",
    couleur: "#10b981",
    description: "Triggers, procédures stockées, journalisation, colonnes d'audit",
    questions: [
      {
        id: "a1",
        question: "Qu'est-ce qu'une API de table et de quoi est-elle composée ?",
        choix: [
          "Un endpoint REST exposant les données d'une table Oracle",
          "Un ensemble de triggers BEFORE/AFTER INSERT/UPDATE/DELETE et de procédures stockées PL/SQL qui enrichissent les spécifications d'une table",
          "Une vue SQL (VIEW) qui simplifie l'accès à une table",
          "Un mécanisme de réplication entre deux bases de données",
        ],
        reponse: 1,
        explication: "Une API de table est un 'couple' formé de : (1) Triggers (BIR, BUR, BDR, AIR, AUR, ADR — Before/After Insert/Update/Delete Row) qui interceptent les opérations DML. (2) Procédures stockées (ins, upd, del, journal, autogen_column) contenant la logique métier. Les triggers délèguent aux procédures. Ce mécanisme est transparent pour l'utilisateur final.",
      },
      {
        id: "a2",
        question: "Quelles sont les 5 types de fonctionnalités prises en charge par les APIs de tables ?",
        choix: [
          "SELECT, INSERT, UPDATE, DELETE, MERGE",
          "Alimentation PK par séquence, colonnes d'audit, journalisation _JN, contraintes non-déclaratives, types de données riches",
          "Sécurité, Performance, Backup, Réplication, Monitoring",
          "Validation, Formatage, Export, Import, Archivage",
        ],
        reponse: 1,
        explication: "Les APIs de tables prennent en charge : (1) Génération automatique de la PK via séquence Oracle, (2) Colonnes d'audit (ajUser, ajDate, moUser, moDate), (3) Journalisation dans une table _JN, (4) Contraintes non-déclaratives ({frozen}, {ordered}, {nonoriented}...), (5) Types de données riches (token, word, positiveDecimal — via contraintes CHECK et validations).",
      },
      {
        id: "a3",
        question: "Pourquoi faut-il regénérer les APIs de tables à chaque itération du développement ?",
        choix: [
          "Par obligation Oracle — les triggers expirent après 30 jours",
          "Parce que les APIs s'appuient sur la structure de la table, qui peut avoir évolué avec la nouvelle itération",
          "Pour des raisons de sécurité — éviter l'accumulation de code obsolète",
          "Ce n'est pas nécessaire — les APIs se mettent à jour automatiquement",
        ],
        reponse: 1,
        explication: "Les APIs de tables sont générées à partir de la structure de la table (colonnes, types, contraintes). Si on ajoute une colonne, modifie un type, ou change une contrainte, les procédures stockées et triggers doivent être regénérés pour refléter la nouvelle structure. La bonne nouvelle : c'est simple car tout utilise CREATE OR REPLACE — il n'y a pas besoin de supprimer l'ancien code.",
      },
      {
        id: "a4",
        question: "Qu'est-ce que la journalisation (_JN) et pourquoi ne remplace-t-elle pas les backups ?",
        choix: [
          "C'est un backup en temps réel — elle remplace totalement les backups traditionnels",
          "C'est une table qui trace toutes les mutations (INSERT/UPDATE/DELETE) d'une table métier. Elle n'est pas un backup car elle ne protège pas contre la corruption du SGBD ou la perte du serveur",
          "C'est un log système d'Oracle pour les administrateurs DBA",
          "C'est un mécanisme de réplication entre deux bases",
        ],
        reponse: 1,
        explication: "La table _JN contient une copie de chaque ligne avant/après chaque modification, avec date, utilisateur, type d'opération. Elle sert à reconstituer des données erronées, auditer les modifications, répondre à des questions comme 'qui a modifié ce client à 14h ?'. MAIS elle n'est pas un backup technique : si le serveur crash ou la BD se corrompt, la table _JN disparaît aussi. Les backups techniques restent indispensables.",
      },
      {
        id: "a5",
        question: "Quel est l'intérêt principal d'utiliser des générateurs (AGL) pour produire les APIs de tables ?",
        choix: [
          "Les APIs générées sont plus rapides que celles écrites à la main",
          "Cela élimine les erreurs humaines sur du code répétitif, garantit la cohérence entre toutes les tables, et permet de regénérer rapidement après une évolution du modèle",
          "C'est obligatoire par la norme Oracle",
          "Les générateurs ajoutent automatiquement des fonctionnalités non spécifiées",
        ],
        reponse: 1,
        explication: "Les APIs de tables contiennent du code PL/SQL très répétitif et similaire d'une table à l'autre. Les écrire à la main serait : (1) long et coûteux, (2) source d'erreurs (oublier une colonne, une contrainte), (3) difficile à maintenir. Un générateur (le plugin MVC-CD ou le script custom d'ODM) produit ce code de manière systématique et sans erreur à partir du modèle — c'est la valeur du MDE.",
      },
    ],
  },

  // ─── 8. OUTILS VP & ODM ───────────────────────────────────
  {
    id: "outils",
    titre: "Outils : VP/MVC-CD & ODM",
    emoji: "🛠️",
    couleur: "#f97316",
    description: "Visual Paradigm, Oracle Data Modeler, démarche, étapes",
    questions: [
      {
        id: "o1",
        question: "Dans la démarche MDE avec MVC-CD2, quel est l'ordre correct des étapes de génération ?",
        choix: [
          "SQL-DDL → APIs → MLD-R → MCD",
          "MCD → MLD-R → SQL-DDL → APIs de tables",
          "MLD-R → MCD → APIs → SQL-DDL",
          "MCD → APIs → SQL-DDL → MLD-R",
        ],
        reponse: 1,
        explication: "La démarche suit l'ordre des niveaux d'abstraction, du plus abstrait au plus concret : (1) MCD — modélisation conceptuelle du domaine, (2) MLD-R — transformation automatique par MVC-CD2, (3) SQL-DDL — génération du code de création des tables, (4) APIs de tables — génération des triggers et procédures PL/SQL. Chaque étape s'appuie sur la précédente.",
      },
      {
        id: "o2",
        question: "Comment réaliser un reverse engineering dans Oracle Data Modeler ?",
        choix: [
          "Menu Tools > Generate DDL > From Database",
          "Fermer tout projet, créer un nouveau Design, puis File > Import > Data Dictionary, configurer la connexion Oracle, tester et lancer l'import",
          "Ouvrir un projet existant et cliquer 'Synchronize'",
          "Exporter le schéma SQL puis l'importer comme texte",
        ],
        reponse: 1,
        explication: "Étapes précises du reverse engineering dans ODM : (1) Fermer tout projet en cours, (2) Créer un nouveau Design, (3) File > Import > Data Dictionary, (4) Cliquer 'Add' et saisir les informations de connexion au schéma Oracle, (5) Tester la connexion, (6) Lancer l'import. Résultat : ODM génère automatiquement le MLD-R (Relational Model) à partir de la structure existante.",
      },
      {
        id: "o3",
        question: "Qu'est-ce que le mécanisme de consolidation et à quoi sert-il ?",
        choix: [
          "Un outil de fusion de deux modèles différents",
          "Un mécanisme qui compare le modèle (référentiel) avec le dictionnaire de la base Oracle et génère le SQL-DDL de différences (delta) pour synchroniser les deux",
          "Une validation automatique du MCD",
          "Un export du MLD-R en format XML",
        ],
        reponse: 1,
        explication: "La consolidation compare deux sources : Source = le modèle dans l'outil (référentiel), Cible = le dictionnaire de la base Oracle réelle. Elle génère uniquement le SQL-DDL 'delta' — les instructions nécessaires pour que la base corresponde exactement au modèle. Si le modèle et la base sont identiques, le delta est vide. C'est l'équivalent de `php artisan migrate` en Laravel.",
      },
      {
        id: "o4",
        question: "Pourquoi ne faut-il PAS cocher les options de consolidation lors du reverse engineering dans ODM ?",
        choix: [
          "Car cela ralentit le processus d'importation",
          "Car le mécanisme de consolidation ne doit pas prendre en compte ces options lors du reverse — elles fausseraient la représentation du modèle généré",
          "Car ces options sont réservées aux DBA Oracle",
          "Car la consolidation ne fonctionne qu'après une modification manuelle du modèle",
        ],
        reponse: 1,
        explication: "Lors du reverse engineering, ODM doit lire la structure de la base telle qu'elle est, sans appliquer de transformations ou de consolidations. Cocher les options de consolidation à cette étape ferait interpréter le contenu de la BD selon des règles qui ne s'appliquent pas ici, ce qui pourrait créer des artefacts ou des erreurs dans le modèle généré.",
      },
      {
        id: "o5",
        question: "Quelle est la différence fondamentale entre le processus d'ingénierie de MVC-CD et celui d'ODM ?",
        choix: [
          "MVC-CD est plus ancien qu'ODM",
          "MVC-CD supporte 3 niveaux (MCD → MLD-R → MPD) avec une transformation automatique complète et un mode TI ; ODM utilise la notation Barker, supporte 3 niveaux mais ne gère pas le mode TI automatiquement",
          "ODM ne peut pas générer de SQL-DDL",
          "MVC-CD ne fonctionne qu'avec Oracle, ODM est multi-SGBD",
        ],
        reponse: 1,
        explication: "MVC-CD (plugin VP) : notation UML enrichie, profil HEG-IG personnalisé, mode DT ET TI automatiques, stéréotypes riches ({frozen}, {ordered}...), journalisation native. ODM : notation Barker (≠ UML), pas de mode TI automatique (il faut dénaturer le MCD), non-transférabilité non gérée dans la consolidation, mais outil professionnel Oracle avec consolidation robuste.",
      },
      {
        id: "o6",
        question: "Dans ODM, qu'est-ce qu'une 'subview' et à quoi sert-elle ?",
        choix: [
          "Une sous-table dérivée d'une table principale",
          "Un diagramme partiel du modèle — permet d'afficher uniquement certaines tables pour améliorer la lisibilité sans modifier le modèle global",
          "Une vue SQL (VIEW) créée automatiquement par ODM",
          "Un sous-niveau d'abstraction entre logique et physique",
        ],
        reponse: 1,
        explication: "Une subview dans ODM est l'équivalent d'un diagramme partiel. Le modèle complet reste dans le référentiel, mais on peut créer des subviews pour n'afficher qu'une partie des tables (ex: seulement les tables métier, sans les tables de journalisation). C'est purement une aide à la lisibilité — modifier une table dans une subview modifie le modèle global.",
      },
    ],
  },

  // ─── 9. REVERSE ENGINEERING ───────────────────────────────
  {
    id: "reverse",
    titre: "Reverse Engineering",
    emoji: "🔄",
    couleur: "#06b6d4",
    description: "Ingénierie inverse, cas d'usage, étapes, consolidation",
    questions: [
      {
        id: "r1",
        question: "Quels sont les 3 modèles obtenus lors d'un reverse engineering d'une base existante ?",
        choix: [
          "XML, JSON, et CSV",
          "MCD (déduit), MLD-R (généré depuis le dictionnaire), et MPD (généré depuis le dictionnaire)",
          "Uniquement le MLD-R — le MCD et MPD doivent être faits manuellement",
          "MPD uniquement — le reste est impossible à reconstruire",
        ],
        reponse: 1,
        explication: "Un AGL réalisant un reverse engineering lit le dictionnaire de la base et génère : (1) Le MLD-R + MPD directement depuis le dictionnaire (simultanément dans la plupart des outils). (2) Le MCD est déduit du MLD-R via des règles d'inférence — c'est la partie la moins automatique. L'avantage du MCD est qu'il offre une vue métier abstraite, indépendante de la technologie.",
      },
      {
        id: "r2",
        question: "Dans quel cas d'usage le reverse engineering est-il particulièrement utile ?",
        choix: [
          "Uniquement quand on démarre un nouveau projet from scratch",
          "Quand on doit faire évoluer une BD existante sans documentation, ou comprendre la structure d'un système hérité (legacy)",
          "Uniquement pour les bases Oracle — pas pour MySQL ou PostgreSQL",
          "Quand on veut convertir une base relationnelle en base NoSQL",
        ],
        reponse: 1,
        explication: "Cas d'usage principaux : (1) Faire évoluer une BD existante — on reverse, on modifie le MCD, on regénère et on consolide. (2) Rétrodocumentation — comprendre une BD sans documentation existante. (3) Migration — comprendre le schéma source avant de migrer. (4) Audit — vérifier la cohérence entre le modèle théorique et la BD réelle.",
      },
      {
        id: "r3",
        question: "Après un reverse engineering et une modification du modèle, quelle est l'étape suivante pour mettre à jour la base ?",
        choix: [
          "Supprimer la base et recréer toutes les tables depuis zéro",
          "Lancer le mécanisme de consolidation qui génère uniquement le SQL-DDL de différences (delta) entre le nouveau modèle et la base existante",
          "Exporter le modèle en SQL complet et l'exécuter manuellement",
          "Utiliser un script de migration Laravel",
        ],
        reponse: 1,
        explication: "C'est la force de la démarche MDE : après modification du modèle, la consolidation compare modèle vs base et génère UNIQUEMENT ce qui a changé (ALTER TABLE, CREATE TABLE, DROP...). Pas besoin de tout recréer. Les données existantes sont préservées. C'est identique en concept à `git diff` : on voit et applique seulement les différences.",
      },
    ],
  },

  // ─── 10. LIEN DE PROGRAMMATION ────────────────────────────
  {
    id: "lien-prog",
    titre: "Lien de Programmation",
    emoji: "🔌",
    couleur: "#8b5cf6",
    description: "<<LP>>, NID stable pour le code applicatif",
    questions: [
      {
        id: "lp1",
        question: "Quel est le problème que résout le Lien de Programmation (<<LP>>) ?",
        choix: [
          "Les performances des requêtes SQL sur des tables volumineuses",
          "Le code applicatif qui se branche sur des valeurs métier d'un NID qui pourrait changer — le LP offre une colonne stable, non-modifiable, sur laquelle le code peut s'appuyer",
          "La gestion des transactions concurrentes dans Oracle",
          "La migration des données d'un SGBD à un autre",
        ],
        reponse: 1,
        explication: "Problème : le code applicatif a besoin de tester des valeurs métier (ex: IF TypeLivre = 'Enfant'). Mais un NID est modifiable par nature (une valeur métier peut changer). Si quelqu'un renomme 'Enfant' en 'Enfants', tout le code qui cherche 'Enfant' est cassé. Solution : le LP = colonne supplémentaire <<LP>> alimentée automatiquement à l'insertion avec la valeur du NID, et NON-MODIFIABLE. Le code s'appuie sur cette colonne stable.",
      },
      {
        id: "lp2",
        question: "Quelles sont les propriétés du stéréotype <<LP>> dans le MLD-R ?",
        choix: [
          "Unique + NOT NULL + Modifiable",
          "Obligatoire (NOT NULL) + Unique + Non-modifiable (frozen) + alimenté automatiquement à l'insertion",
          "Optionnel + Unique + Auto-généré par séquence",
          "NOT NULL uniquement",
        ],
        reponse: 1,
        explication: "<<LP>> cumule : (1) NOT NULL — la colonne doit toujours avoir une valeur, (2) UNIQUE — un lien de programmation identifie un seul type, (3) Non-modifiable = {frozen} — une fois alimenté, il ne peut plus changer, (4) Alimenté automatiquement à l'INSERT avec la valeur du NID courant. Ce dernier point est clé : le LP est une 'photo' de la valeur NID au moment de la création.",
      },
      {
        id: "lp3",
        question: "Dans le cas Livres-TypesLivres, comment le LP permet-il de gérer la règle 'si TypeLivre = Enfant, ageMin est obligatoire' ?",
        choix: [
          "Via une contrainte CHECK directement en SQL",
          "La colonne lienProg de TypesLivres est alimentée avec 'Enfant' à la création. Le code compare v_typeLivre.LIENPROG = 'Enfant' — valeur stable même si le libellé change",
          "Via un trigger sur la table Livres qui vérifie le libellé",
          "Via une FK entre Livres et une table des règles métier",
        ],
        reponse: 1,
        explication: "Sans LP : `IF v_typeLivre.LIBELLE = 'Enfant'` — si quelqu'un change le libellé en 'Enfants' ou 'Jeunesse', la règle ne s'applique plus. Avec LP : `IF v_typeLivre.LIENPROG = 'Enfant'` — cette valeur est figée définitivement à la création du type 'Enfant'. L'utilisateur peut changer le libellé affiché, le code reste stable. C'est le découplage entre valeur affichée (NID) et valeur de référence (LP).",
      },
    ],
  },

  // ─── 11. TYPES DE DONNÉES RICHES ──────────────────────────
  {
    id: "types",
    titre: "Types de Données Riches",
    emoji: "📐",
    couleur: "#ef4444",
    description: "token, word, positiveDecimal, positiveMoney, domaines ODM",
    questions: [
      {
        id: "ty1",
        question: "Qu'est-ce qu'un type 'token' dans le profil MVC-CD et comment est-il implémenté ?",
        choix: [
          "Un token d'authentification JWT",
          "Un type chaîne de caractères où les caractères non autorisés sont interdits — implémenté via une contrainte CHECK ou un trigger dans les APIs",
          "Un type numérique pour les identifiants",
          "Un type date avec formatage automatique",
        ],
        reponse: 1,
        explication: "token est un type string enrichi qui interdit certains caractères (espaces en début/fin, caractères spéciaux selon la définition). C'est plus restrictif que VARCHAR. word est encore plus restrictif (un seul mot, pas d'espaces du tout). Ces types génèrent des contraintes CHECK ou des validations dans les APIs de tables pour rejeter les valeurs non conformes.",
      },
      {
        id: "ty2",
        question: "Quelle est la différence entre positiveDecimal et positiveMoney ?",
        choix: [
          "positiveDecimal est pour les entiers, positiveMoney pour les décimaux",
          "Les deux imposent des valeurs > 0, mais positiveMoney ajoute un formatage monétaire (ex: 1'230.00 CHF) en plus de la contrainte numérique",
          "positiveMoney est limité à 2 décimales, positiveDecimal accepte n décimales",
          "Ce sont deux noms pour le même type",
        ],
        reponse: 1,
        explication: "positiveDecimal = nombre décimal de l'ensemble D*+ (strictement > 0). positiveMoney = identique mais avec une mise en forme monétaire (ex: '1'230'000.00 CHF'). La contrainte CHECK >0 est identique. La différence est dans la présentation/formatage. Les deux nécessitent des validations dans les APIs de tables.",
      },
      {
        id: "ty3",
        question: "Dans Oracle Data Modeler, qu'est-ce qu'un 'Domaine' et quel est son intérêt ?",
        choix: [
          "Un schéma Oracle dédié à un département de l'entreprise",
          "Un type de données personnalisé et réutilisable (ex: PK_Numerique = NUMERIC(38)) qui permet d'unifier et standardiser les types à travers tout le modèle, et génère une contrainte CHECK",
          "Un nom de table avec un préfixe standard",
          "Un mécanisme d'héritage entre entités",
        ],
        reponse: 1,
        explication: "Un Domaine dans ODM est un type personnalisé réutilisable. Exemples : PK_Numerique (NUMERIC 38 — pour toutes les PK), OUI_NON (CHAR(1) avec CHECK IN ('Y','N')). Avantages : (1) standardisation — toutes les PK utilisent le même type, (2) réutilisabilité — défini une fois, utilisé dans toutes les tables, (3) génère une contrainte CHECK automatiquement au niveau physique.",
      },
      {
        id: "ty4",
        question: "Pourquoi utilise-t-on NUMERIC(38) pour les PK dans ODM plutôt qu'INTEGER ?",
        choix: [
          "Parce qu'INTEGER n'existe pas dans Oracle",
          "Pour éviter des problèmes lors du mécanisme de consolidation — Oracle gère les INTEGER différemment en interne et cela peut créer des faux positifs dans la détection de différences",
          "Parce que NUMERIC(38) permet de stocker plus de valeurs",
          "C'est une convention esthétique sans impact technique",
        ],
        reponse: 1,
        explication: "Dans Oracle, INTEGER est converti en NUMBER(38) internement. Lors de la consolidation, ODM compare les types et peut voir une 'différence' entre INTEGER (dans le modèle) et NUMBER(38) (dans la base), générant des ALTER TABLE inutiles. En définissant directement le domaine PK_Numerique comme NUMERIC(38), on évite ces faux positifs dans la consolidation.",
      },
    ],
  },

  // ─── 12. DÉVELOPPEMENT ITÉRATIF ────────────────────────────
  {
    id: "iteratif",
    titre: "Développement Itératif & MDE",
    emoji: "🔁",
    couleur: "#84cc16",
    description: "Itérations, regénération, consolidation, postulat générateurs",
    questions: [
      {
        id: "i1",
        question: "Dans une nouvelle itération MDE, quel est l'ordre des opérations après modification du MCD ?",
        choix: [
          "Modifier la BD manuellement, puis mettre à jour le MCD pour refléter les changements",
          "Modifier le MCD → régénérer le MLD-R → regénérer le SQL-DDL via consolidation → regénérer les APIs de tables",
          "Regénérer les APIs → consolidation → MLD-R → MCD",
          "Consolidation → MCD → MLD-R → APIs",
        ],
        reponse: 1,
        explication: "Le modèle est TOUJOURS la source de vérité en MDE. L'ordre est strict : (1) Modifier le MCD (niveau conceptuel), (2) Régénérer le MLD-R (le plugin transforme automatiquement), (3) Consolider = générer le SQL-DDL delta et l'exécuter, (4) Regénérer les APIs de tables (car la structure a changé). Ne jamais modifier la BD manuellement en contournant le modèle.",
      },
      {
        id: "i2",
        question: "Si on ajoute une nouvelle colonne dans une table via le MCD et qu'on consolide, qu'obtient-on exactement dans le SQL-DDL généré ?",
        choix: [
          "Un DROP TABLE et CREATE TABLE complet",
          "Un ALTER TABLE ADD COLUMN — seulement la différence, sans toucher aux données existantes",
          "Un script de migration avec INSERT des données manquantes",
          "Un nouveau script complet CREATE TABLE en parallèle",
        ],
        reponse: 1,
        explication: "C'est la puissance de la consolidation : elle ne génère QUE le delta. Si on ajoute une colonne au MCD, la consolidation génère un ALTER TABLE nomTable ADD (nouvelleColonne TYPE). Les données existantes sont préservées. Si on supprime une entité, elle génère un DROP TABLE. Si on change un type, elle génère un MODIFY. Jamais de recreation complète inutile.",
      },
      {
        id: "i3",
        question: "Pourquoi le 'développement itératif' est-il un avantage clé de la démarche MDE ?",
        choix: [
          "Parce qu'il permet de livrer des fonctionnalités progressivement tout en maintenant la cohérence modèle↔base grâce aux regénérations automatisées",
          "Parce qu'il évite d'écrire du SQL",
          "Parce qu'Oracle impose les itérations",
          "Parce que les itérations réduisent le nombre de tables nécessaires",
        ],
        reponse: 1,
        explication: "Sans MDE, chaque itération impose de maintenir manuellement la cohérence entre documentation, schéma et code — erreurs fréquentes. Avec MDE : le modèle est modifié → la regénération garantit que le code SQL et les APIs reflètent exactement le modèle. La cohérence est automatique. On peut faire 10 itérations sans divergence entre le modèle et la réalité.",
      },
    ],
  },
];

// ─── FLASHCARDS ───────────────────────────────────────────────
export const FLASHCARDS = [
  { recto: "AID", verso: "Auto-generated ID — clé primaire générée par séquence, sans sens métier. Ex: num d'un client = 1,2,3..." },
  { recto: "NID-1", verso: "Natural ID — identifiant naturel, UNIQUE + NOT NULL + modifiable. Ex: matricule étudiant, code ISBN" },
  { recto: "CID", verso: "Composition ID — entité dépendante, n'existe pas sans parent, numérotation repart à 1 par parent" },
  { recto: "<<M>>", verso: "Mandatory — attribut obligatoire → NOT NULL en SQL" },
  { recto: "Mode DT", verso: "Dépendance entre Tables — table associative avec PK composite (FK1 + FK2)" },
  { recto: "Mode TI", verso: "Tables Indépendantes — chaque table a une PK indépendante (AID) + SIMPK + stability + NOT NULL" },
  { recto: "SIMPK", verso: "SIMulation de clé Primaire — contrainte UNIQUE sur (FK1+FK2) en mode TI, compense la perte de la PK composite" },
  { recto: "{frozen}", verso: "Valeur immuable après insertion. Sur colonne = cette colonne ne change plus. Sur association = la FK ne change plus (enfant ne change pas de parent)" },
  { recto: "{ordered}", verso: "Ordre explicite géré en BD. Ajoute colonne ORDRE (NOT NULL + UNIQUE), multiples de 10, alimentée par APIs" },
  { recto: "{stability}", verso: "FK immuable en mode TI — compense la perte de l'immuabilité que garantissait la PK composite en mode DT" },
  { recto: "{nonoriented}", verso: "Association symétrique : (A,B) = (B,A). Trigger BEFORE INSERT vérifie que le doublon inverse n'existe pas" },
  { recto: "{absolute}", verso: "NID unique GLOBALEMENT (pas juste par parent). Ex: numéro de châssis unique pour tous les camions" },
  { recto: "APIs de table", verso: "Ensemble de triggers (BIR/BUR/BDR/AIR/AUR/ADR) + procédures stockées PL/SQL. Gèrent PK, audit, journalisation, contraintes non-déclaratives" },
  { recto: "Journalisation _JN", verso: "Table qui trace toutes les mutations (INSERT/UPDATE/DELETE) d'une table métier. Pas un backup technique." },
  { recto: "Colonnes d'audit", verso: "4 colonnes techniques : ajUser (AAU), ajDate (AAI), moUser (AMU), moDate (AMI). Alimentées auto par APIs." },
  { recto: "Mécanisme de consolidation", verso: "Compare modèle (référentiel) vs BD Oracle → génère uniquement le SQL-DDL de différences (delta)" },
  { recto: "Reverse engineering", verso: "Reconstruire MLD-R + MPD depuis une BD existante via le dictionnaire Oracle. Dans ODM : File > Import > Data Dictionary" },
  { recto: "Lien de programmation <<LP>>", verso: "Colonne supplémentaire sur un NID, NOT NULL + UNIQUE + non-modifiable. Alimentée auto avec la valeur NID à l'INSERT. Stable pour le code applicatif." },
  { recto: "token", verso: "Type string enrichi interdisant les caractères non-autorisés. Plus restrictif que VARCHAR." },
  { recto: "word", verso: "Type string encore plus restrictif que token — un seul mot, pas d'espaces." },
  { recto: "Référentiel", verso: "Pièce maîtresse du MDE : stocke tous les objets du SI, assure la traçabilité entre niveaux d'abstraction" },
  { recto: "Postulat générateurs", verso: "On ne modifie JAMAIS le code généré à la main. On modifie le modèle et on regénère." },
  { recto: "Subview (ODM)", verso: "Diagramme partiel d'un modèle dans ODM. Sert à la lisibilité sans modifier le modèle global." },
  { recto: "Simulation d'entité associative (ODM)", verso: "Créer manuellement une entité avec AID pour simuler une table TI dans ODM (qui ne supporte que le mode DT nativement)" },
  { recto: "Domaine (ODM)", verso: "Type de données personnalisé et réutilisable dans ODM. Ex: PK_Numerique = NUMERIC(38). Génère une contrainte CHECK." },
  { recto: "Identifying (ODM)", verso: "Propriété d'une relation dans ODM (notation Barker). Équivaut à une association identifiante — la PK enfant inclut la PK parent." },
  { recto: "Transferable = false (ODM)", verso: "Équivalent de {frozen} sur une association dans ODM. L'entité enfant ne peut pas changer de parent. Non géré par la consolidation — trigger via DDL Preview." },
];

// ─── STATISTIQUES GLOBALES ────────────────────────────────────
export const TOTAL_QUESTIONS = CHAPITRES.reduce((sum, c) => sum + c.questions.length, 0);
export const TOTAL_FLASHCARDS = FLASHCARDS.length;
