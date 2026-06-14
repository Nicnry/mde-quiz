// ================================================================
// COURS MDE 62-41.2 — DONNÉES COMPLÈTES
// Extrait directement des slides et documents du prof
// ================================================================

// ── COULEURS PAR CHAPITRE ────────────────────────────────────────
export const COULEURS_CHAPITRES = {
  fondements:     '#6366f1',
  merise_uml:     '#8b5cf6',
  mvc_cd:         '#a855f7',
  stereotypes:    '#ec4899',
  transformation: '#14b8a6',
  dt_ti:          '#7c6aff',
  identifiantes:  '#f59e0b',
  contraintes:    '#3b82f6',
  apis:           '#10b981',
  odm:            '#f97316',
  reverse:        '#06b6d4',
  lien_prog:      '#e879f9',
  types:          '#ef4444',
  iteratif:       '#84cc16',
}

// ================================================================
// CHAPITRES & QUESTIONS
// ================================================================
export const CHAPITRES = [

  // ═══════════════════════════════════════════════════════════════
  // 1. FONDEMENTS MDE
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'fondements',
    titre: 'Fondements MDE',
    emoji: '🏛️',
    couleur: COULEURS_CHAPITRES.fondements,
    description: 'MDE, ingénierie générative, référentiel, postulat générateurs',
    theorie: `Model-Driven Engineering (MDE) : "L'ingénierie dirigée par les modèles est la discipline informatique mettant à disposition des outils, concepts et langages pour créer et transformer des modèles. Il s'agit d'une ingénierie générative, par laquelle tout ou partie d'une application est générée à partir de modèles servant de spécifications." [Wikipedia]

3 principes fondamentaux :
  1. Les modèles doivent être riches, précis et sans ambiguïté pour être transformables
  2. Les modèles s'appuient sur un DSL (Domain Specific Language) enrichi
  3. L'environnement propose un éditeur et des outils de transformation s'appuyant sur le DSL

Le RÉFÉRENTIEL :
  • Pièce maîtresse d'un processus MDE
  • Stocke tous les objets de définition du SI
  • Les restitue sous forme graphique, textuelle ou autre
  • Assure la traçabilité des objets entre niveaux d'abstraction
  • Dans VP+MVC-CD → fichier .vpp | Dans ODM → fichier .dmd

Le POSTULAT des générateurs :
  → On NE MODIFIE JAMAIS le code généré manuellement
  → On modifie le modèle, puis on régénère
  → Modifier manuellement = perdre les modifications à la prochaine itération`,
    questions: [
      {
        id: 'f1',
        enonce: 'Quelle est la définition exacte du MDE (Model-Driven Engineering) ?',
        choix: [
          "Un langage de modélisation graphique pour les bases de données",
          "L'ingénierie générative où tout ou partie d'une application est générée à partir de modèles servant de spécifications",
          "Un outil Oracle permettant de transformer des MCD en SQL",
          "Une méthode de gestion de projet informatique basée sur les modèles",
        ],
        reponse: 1,
        explication: "MDE = ingénierie générative : les modèles NE SONT PLUS de la documentation, ils PILOTENT la génération du code. L'outil lit le modèle et produit automatiquement le SQL-DDL, les triggers, les packages PL/SQL. C'est le cœur du cours.",
      },
      {
        id: 'f2',
        enonce: "Que dit le 'postulat d'utilisation des générateurs' ?",
        choix: [
          "Les générateurs sont optionnels — on peut les remplacer par du code manuel",
          "On ne modifie JAMAIS manuellement le code généré ; on modifie le modèle et on regénère",
          "Les générateurs ne fonctionnent que pour les bases Oracle",
          "On doit valider chaque fichier généré avant de l'utiliser",
        ],
        reponse: 1,
        explication: "C'est le principe de discipline MDE : si on touche le code généré à la main, la prochaine régénération écrasera ces modifications. La source de vérité est toujours le modèle. Modifier le code généré est une faute grave en MDE.",
      },
      {
        id: 'f3',
        enonce: "Quelle est la différence entre un MODÈLE et un DIAGRAMME dans un AGL comme ODM ou VP ?",
        choix: [
          "Ce sont deux termes synonymes — il n'y a aucune différence",
          "Un modèle est textuel, un diagramme est graphique",
          "Le modèle est l'ensemble complet des objets dans le référentiel ; un diagramme (subview) est une représentation graphique partielle d'une portion du modèle",
          "Un modèle contient plusieurs projets ; un diagramme est propre à un seul projet",
        ],
        reponse: 2,
        explication: "Dans ODM : le Relational Model contient TOUTES les tables. Une subview n'affiche qu'un sous-ensemble pour la lisibilité. Modifier une table dans une subview modifie le modèle global. Dans VP : même principe avec les diagrammes et le référentiel.",
      },
      {
        id: 'f4',
        enonce: "Pourquoi l'approche MDE met-elle 'l'emphase sur les données' plutôt que sur les traitements ?",
        choix: [
          "Parce que les bases de données coûtent plus cher à développer",
          "Parce que la structure des données d'une entreprise est stable dans le temps, contrairement aux traitements qui évoluent constamment",
          "Parce qu'Oracle impose cette approche dans ses licences",
          "Parce que les traitements ne peuvent pas être modélisés",
        ],
        reponse: 1,
        explication: "La structure d'une commande, d'un client, d'un produit ne change quasiment pas en 20 ans. En revanche, les règles de gestion, les processus métier, les interfaces évoluent continuellement. Investir l'effort sur un modèle de données solide est donc plus rentable à long terme.",
      },
      {
        id: 'f5',
        enonce: "Dans un AGL, le référentiel assure quelle fonction essentielle entre les niveaux d'abstraction ?",
        choix: [
          "Il génère automatiquement la documentation utilisateur",
          "Il assure la traçabilité des objets entre niveaux (MCD → MLD-R → MPD) et permet la transformation automatique",
          "Il stocke uniquement les scripts SQL pour les sauvegarder",
          "Il effectue les tests de performance de la base de données",
        ],
        reponse: 1,
        explication: "Quand on dessine une entité dans le MCD, le référentiel sait qu'elle donne une table dans le MLD-R et des objets Oracle dans le MPD. Cette traçabilité permet la génération automatique : modifier l'entité dans le MCD et régénérer met automatiquement à jour la table et tous ses artefacts physiques.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. MERISE & UML
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'merise_uml',
    titre: 'Merise & UML',
    emoji: '📐',
    couleur: COULEURS_CHAPITRES.merise_uml,
    description: 'Niveaux d\'abstraction, forces/faiblesses, stratégie MVC-CD',
    theorie: `MERISE (années 1970) :
  + Niveaux d'abstraction (Conceptuel → Logique → Physique) ✓
  + Règles formelles de transformation entre niveaux ✓
  - Formalisme spécifique à chaque niveau (différent entre MCD et MLD-R)
  - Formalisme MCD non extensible (pas de profil possible)
  - Formalismes MLD-R et MPD-R limités

UML (années 1990) :
  + Langage riche et extensible grâce aux PROFILS ✓
  + Formalisme unique applicable à tous les niveaux ✓
  - Pas de niveaux d'abstraction prévus par le langage lui-même
  - UML n'est PAS une méthode ! (UP/Unified Process est une méthode)
  - Diagramme de classe UML ≠ MCD

STRATÉGIE MVC-CD : "On prend le meilleur des 2 !"
  → Niveaux d'abstraction de Merise + règles de transformation formelles
  → Langage UML avec un profil personnalisé par niveau
  → Représentation uniforme entre niveaux (même syntaxe UML partout)

Les 3 niveaux d'abstraction :
  • CONCEPTUEL → MCD : vision métier pure, indépendante de toute technologie
    "On s'intéresse uniquement aux données utiles, sans contrainte économique, technique ou organisationnelle"
  • LOGIQUE → MLD-R : indépendant du SGBD spécifique (norme SQL ANSI)
    Tables, colonnes, PK, FK, NOT NULL, UNIQUE, CHECK
  • PHYSIQUE → MPD-R Oracle : spécifique au constructeur
    Types VARCHAR2, NUMBER, triggers PL/SQL, séquences, packages, index, tablespace`,
    questions: [
      {
        id: 'm1',
        enonce: "Quels sont les 3 niveaux d'abstraction de Merise, du plus abstrait au plus concret ?",
        choix: [
          "Fonctionnel → Technique → Opérationnel",
          "Conceptuel → Logique → Physique",
          "Métier → Applicatif → Infrastructure",
          "Analyse → Conception → Implémentation",
        ],
        reponse: 1,
        explication: "Conceptuel (MCD) = vision métier pure. Logique (MLD-R) = vision relationnelle indépendante du SGBD. Physique (MPD-R Oracle) = spécifique Oracle avec VARCHAR2, triggers PL/SQL, séquences... À chaque niveau, le modèle peut être enrichi avec des spécifications propres à ce niveau.",
      },
      {
        id: 'm2',
        enonce: "Quelle est la principale FAIBLESSE de Merise que MVC-CD pallie avec UML ?",
        choix: [
          "Merise ne supporte pas les bases de données Oracle",
          "Merise n'a pas de niveau logique",
          "Le formalisme MCD de Merise est non extensible — impossible d'ajouter des stéréotypes comme {ordered} ou <<NID-1>>",
          "Merise ne définit pas de règles de transformation entre niveaux",
        ],
        reponse: 2,
        explication: "Le formalisme Merise original est figé — on ne peut pas l'enrichir avec des stéréotypes personnalisés. UML offre la notion de PROFIL qui permet d'étendre le langage. MVC-CD crée un DSL (Domain Specific Language) en ajoutant <<Entity>>, <<NID-1>>, <<M>>, {ordered}, les types token/word... au-dessus d'UML.",
      },
      {
        id: 'm3',
        enonce: "En quoi le niveau PHYSIQUE (MPD-R) est-il différent du niveau LOGIQUE (MLD-R) ?",
        choix: [
          "Le niveau physique contient uniquement des données de configuration serveur",
          "Le niveau logique est propre à un constructeur SGBD ; le niveau physique est générique",
          "Le niveau logique (MLD-R) est indépendant du SGBD (SQL standard) ; le niveau physique (MPD-R) est propre à un constructeur avec ses types, triggers, séquences, tablespaces...",
          "Il n'y a aucune différence pratique entre les deux",
        ],
        reponse: 2,
        explication: "MLD-R = SQL ANSI standard, portable. MPD-R Oracle = VARCHAR2 (pas VARCHAR), NUMBER, séquences Oracle (SEQ_...), packages PL/SQL (TAPIS_SPEC/BODY), triggers BIR/BUR/BDR/AIR/AUR/ADR, gestion du tablespace... C'est pour ça que Merise dit 'n'a pas proposé de formalisme' pour le physique.",
      },
      {
        id: 'm4',
        enonce: "Pourquoi dit-on 'Diagramme de classe UML ≠ MCD' ?",
        choix: [
          "Parce que le diagramme de classe UML ne peut pas représenter des associations",
          "Parce que UML est orienté objet (avec méthodes, héritage, visibilité) alors que le MCD est orienté données (entités, associations, cardinalités) — la sémantique est différente",
          "Parce que UML utilise des rectangles et le MCD des ellipses",
          "Ce sont des termes synonymes — la distinction est uniquement historique",
        ],
        reponse: 1,
        explication: "Un diagramme de classe UML peut avoir des méthodes, de l'héritage, des visibilités (public/private), des dépendances entre classes logicielles. Un MCD représente uniquement les données métier et leurs relations. MVC-CD utilise UML comme base syntaxique mais avec un profil qui le réoriente vers la modélisation de données.",
      },
      {
        id: 'm5',
        enonce: "Le niveau CONCEPTUEL doit être 'indépendant des contraintes économiques, techniques et organisationnelles'. Qu'est-ce que cela signifie concrètement ?",
        choix: [
          "On ne s'intéresse pas au coût du projet à ce niveau",
          "On modélise la réalité métier telle qu'elle est, sans se préoccuper de quelle base de données sera utilisée, du serveur, des performances, du coût de stockage",
          "On ne documente pas les règles métier dans le MCD",
          "Le MCD est réalisé par les utilisateurs, pas les informaticiens",
        ],
        reponse: 1,
        explication: "Au niveau conceptuel, on se pose uniquement la question : 'Quelles données le métier a-t-il besoin ?' Pas 'Quel type SQL ?' ni 'Quelle taille de colonne ?' ni 'Oracle ou MySQL ?'. Ces questions viendront aux niveaux logique et physique. C'est la séparation des préoccupations fondamentale de Merise.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. MVC-CD & PROFIL UML
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'mvc_cd',
    titre: 'MVC-CD & Profil UML',
    emoji: '🔵',
    couleur: COULEURS_CHAPITRES.mvc_cd,
    description: 'DSL, profil UML HEG-IG, Visual Paradigm, démarche VP',
    theorie: `MVC-CD = Modélisation et Vérification Conceptuelle des Données
  → Projet de recherche de la HE-Arc
  → Plugin pour Visual Paradigm
  → Crée un DSL (Domain Specific Language) en étendant UML avec un profil

Composants du profil MCD MVC-CD :
  • Stéréotypes : <<Entity>>, <<NID-1>>, <<NID-2>>, <<M>>, <<AID>>, <<CID>>, <<LP>>
  • Contraintes : {ordered}, {nonoriented}, {frozen}, {absolute}...
  • Types de données riches : token, word, positiveDecimal, positiveMoney, nonNegativeInteger...

Rôle dans la démarche :
  • VP = Éditeur (Editor) — on dessine le MCD
  • MVC-CD = Générateur (Generator) — il transforme et génère
    → MCD → MLD-R (transformation automatique)
    → MLD-R → MPD-R Oracle (avec triggers, packages, séquences)
    → MPD-R → SQL-DDL (génération du code)

Démarche complète dans VP+MVC-CD :
  1. Créer le MCD dans Visual Paradigm avec le profil MVC-CD
  2. Transformer MCD → MLD-R (plugin calcule automatiquement)
  3. Transformer MLD-R → MPD-R (ajoute les objets Oracle)
  4. Générer le SQL-DDL (CREATE TABLE, séquences, triggers, packages)
  5. Exécuter dans le schéma Oracle

Standards d'entreprise dans MVC-CD :
  • Règles de nommage : casse, longueur, singulier/pluriel
  • Règles de conception : nom de la PK, mode TI, journalisation...
  • L'outil paramétrable pour respecter ces standards automatiquement`,
    questions: [
      {
        id: 'vc1',
        enonce: "Dans la démarche MVC-CD avec Visual Paradigm, quel est le rôle exact de VP et de MVC-CD ?",
        choix: [
          "VP génère le SQL, MVC-CD dessine les modèles",
          "VP est l'éditeur (Editor) où on dessine ; MVC-CD est le générateur (Generator) qui transforme MCD→MLD-R→MPD-R et génère le SQL-DDL",
          "Ce sont deux outils identiques avec des interfaces différentes",
          "VP est pour les développeurs, MVC-CD est pour les architectes",
        ],
        reponse: 1,
        explication: "Dans le triangle MDE (Language / Editor / Generator) : le profil UML MVC-CD = le langage (DSL), Visual Paradigm = l'éditeur, et le plugin MVC-CD = le générateur. VP se contente d'afficher et d'éditer ; c'est le plugin qui fait la magie de la transformation et de la génération.",
      },
      {
        id: 'vc2',
        enonce: "Qu'est-ce qu'un profil UML et pourquoi MVC-CD en a-t-il besoin ?",
        choix: [
          "Un profil UML est une version allégée d'UML pour les petits projets",
          "Un profil UML étend le langage avec des stéréotypes, contraintes et valeurs marquées — MVC-CD en a besoin pour ajouter <<NID-1>>, {ordered}, token... qui n'existent pas dans UML standard",
          "Un profil UML définit l'apparence graphique des diagrammes",
          "Un profil UML est un module payant d'Oracle",
        ],
        reponse: 1,
        explication: "UML propose 3 mécanismes d'extensibilité : stéréotypes (<<>>), contraintes ({}) et valeurs marquées. MVC-CD crée un profil HEG-IG qui ajoute tous les concepts spécifiques à la modélisation de données selon les standards de la HE-Arc. Sans ce profil, UML ne saurait pas ce que signifie <<NID-1>> ou token.",
      },
      {
        id: 'vc3',
        enonce: "Dans VP+MVC-CD, en quel ordre se fait la génération des artefacts ?",
        choix: [
          "SQL-DDL → MPD-R → MLD-R → MCD",
          "MCD → MLD-R → MPD-R Oracle → SQL-DDL → Exécution Oracle",
          "MLD-R → MCD → APIs → SQL-DDL",
          "MPD-R → MCD → MLD-R → APIs",
        ],
        reponse: 1,
        explication: "Toujours du plus abstrait au plus concret : MCD (conceptuel) → MLD-R (logique, par le plugin) → MPD-R Oracle (physique, ajoute séquences/triggers/packages) → SQL-DDL (code exécutable). Chaque étape est générée automatiquement par le plugin depuis l'étape précédente. Ne jamais sauter une étape.",
      },
      {
        id: 'vc4',
        enonce: "La journalisation est visible à quel niveau dans VP+MVC-CD ? Et au niveau physique ?",
        choix: [
          "Au niveau MCD uniquement ; au niveau physique elle n'existe pas",
          "Au niveau MLD-R : une opération stéréotypée <<JNL>> sur la table ; au niveau MPD-R : une table _JN avec les colonnes JN_DATETIME, JN_OPERATION, JN_USER, JN_SESSION, JN_APPL + toutes les colonnes de la table source",
          "Au niveau MCD uniquement sous forme de commentaire",
          "Elle est invisible dans le modèle — uniquement dans le code SQL",
        ],
        reponse: 1,
        explication: "Dans VP+MVC-CD : au niveau MLD-R, la journalisation = une opération <<JNL>> sur la table. Au niveau MPD-R Oracle, elle se concrétise en une table NOMTABLE_JN contenant JN_DATETIME (timestamp), JN_OPERATION (INS/UPD/DEL), JN_USER (varchar), JN_SESSION (varchar), JN_APPL (varchar) + toutes les colonnes de la table de base.",
      },
      {
        id: 'vc5',
        enonce: "Les colonnes d'audit (<<AAU>>, <<AAI>>, <<AMU>>, <<AMI>>) apparaissent-elles dans le MCD ?",
        choix: [
          "Oui, on les dessine manuellement dans chaque entité du MCD",
          "Non, elles sont ajoutées automatiquement au niveau MLD-R par le plugin. Dans le MCD on ne les voit pas — elles sont purement techniques",
          "Oui, mais uniquement dans les entités importantes",
          "Non, elles n'existent que dans le code SQL, pas dans les modèles",
        ],
        reponse: 1,
        explication: "Au niveau conceptuel (MCD), on modélise les données métier uniquement. Les colonnes d'audit (ajUser, ajDate, moUser, moDate) sont des besoins techniques récurrents. Le plugin MVC-CD les ajoute automatiquement dans le MLD-R lors de la transformation, pour toutes les tables. C'est la valeur de l'automatisation.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. STÉRÉOTYPES & IDENTIFIANTS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'stereotypes',
    titre: 'Stéréotypes & Identifiants',
    emoji: '🏷️',
    couleur: COULEURS_CHAPITRES.stereotypes,
    description: 'AID, NID-x, CID, M, AAU, AAI, AMU, AMI — profil HEG-IG',
    theorie: `Stéréotypes d'identifiants (sur les attributs) :

  <<AID>> — Auto-generated ID
    • PK générée automatiquement par séquence Oracle
    • Aucun sens métier — l'utilisateur ne la voit jamais
    • Exemple : num NUMERIC {aid} → générée par SEQ_NOMTABLE
    • En Laravel : $table->id()

  <<NID-1>>, <<NID-2>>... — Natural ID (Identifiant Naturel)
    • Identifiant qui a un sens MÉTIER dans la réalité
    • Caractéristiques : UNIQUE + NON-NULL + MODIFIABLE (c'est une vraie donnée utilisateur)
    • En MLD-R : contrainte UNIQUE + NOT NULL (pas PK !)
    • Exemples : code ISBN d'un livre, matricule d'un étudiant, code d'un module

  <<CID>> — Composition ID (Identifiant de Composition)
    • Entité DÉPENDANTE qui n'existe pas sans son parent
    • Numérotation locale au parent (recommence à 1 pour chaque parent)
    • En MLD-R (mode DT) : PK = (CID + FK_parent)
    • Exemple : numéro de ligne de commande (1,2,3 PAR commande)

  <<M>> — Mandatory (Obligatoire)
    • Traduit par NOT NULL en SQL

  <<U>> — Unique
    • Contrainte UNIQUE en SQL

Stéréotypes d'audit (sur les colonnes techniques) :
  <<AAU>> → ajUser : utilisateur lors de l'AJOUT (ajUser := USER)
  <<AAI>> → ajDate : horodatage lors de l'AJOUT (ajDate := SYSDATE)
  <<AMU>> → moUser : utilisateur lors de la MODIFICATION (moUser := USER)
  <<AMI>> → moDate : horodatage lors de la MODIFICATION (moDate := SYSDATE)

  ⚠️ LIMITES des colonnes d'audit :
  • Ne tracent que la DERNIÈRE modification (pas l'historique)
  • La suppression n'est PAS traçable (la ligne n'existe plus)
  → C'est pour ça qu'existe la journalisation _JN en complément !

Stéréotype <<LP>> — Lien de Programmation (voir chapitre dédié)`,
    questions: [
      {
        id: 'st1',
        enonce: "Quelle est la différence fondamentale entre <<AID>> et <<NID-1>> ?",
        choix: [
          "AID est numérique, NID est toujours textuel",
          "AID = identifiant auto-généré sans sens métier (séquence) ; NID = identifiant naturel avec un sens métier, UNIQUE + NOT NULL + MODIFIABLE",
          "AID est la clé primaire, NID est la clé étrangère",
          "AID est obligatoire, NID est optionnel",
        ],
        reponse: 1,
        explication: "AID (ex: num d'un client = 1,2,3...) n'a aucune signification pour l'utilisateur. NID (ex: matricule, code ISBN) existe dans la réalité métier. Le NID est MODIFIABLE car l'utilisateur peut corriger un matricule erroné — une PK AID ne l'est pas. En MLD-R, le NID devient UNIQUE + NOT NULL mais ce n'est PAS la PK.",
      },
      {
        id: 'st2',
        enonce: "Un étudiant a à la fois <<AID>> num et <<NID-1>> matricule. Comment se traduisent-ils dans la table MLD-R ?",
        choix: [
          "num = PK, matricule = UNIQUE + NOT NULL. Les deux peuvent être NULL.",
          "num = PK (auto, NOT NULL, unique, non-modifiable) ; matricule = contrainte UNIQUE + NOT NULL séparée (modifiable par l'utilisateur)",
          "matricule = PK, num = simple colonne optionnelle",
          "Les deux sont PK ensemble (PK composite)",
        ],
        reponse: 1,
        explication: "La table ETUDIANTS aura : num NUMBER(9) PK (généré par SEQ_ETU), matricule VARCHAR2(10) NOT NULL + UNIQUE (contrainte NID1_ETU_matricule). L'étudiant 1 peut avoir matricule='A12345'. Si on se trompe dans le matricule, on peut le corriger (MODIFIABLE) — impossible avec la PK AID.",
      },
      {
        id: 'st3',
        enonce: "Pourquoi les colonnes d'audit ne remplacent-elles PAS la journalisation (_JN) ?",
        choix: [
          "Parce qu'elles sont alimentées par des triggers différents",
          "Parce qu'elles ne tracent que le DERNIER état (moUser, moDate) et ne peuvent pas tracer les suppressions — la ligne n'existe plus après un DELETE",
          "Parce qu'elles prennent trop de place en base de données",
          "Parce qu'elles ne fonctionnent qu'avec Oracle 12c et supérieur",
        ],
        reponse: 1,
        explication: "Colonnes d'audit = vision instantanée du dernier changement. Si un client est modifié 10 fois, on ne voit que la dernière modification dans moUser/moDate. Si le client est supprimé, toutes les infos disparaissent. La table _JN enregistre CHAQUE opération (INS, UPD, DEL) dans une ligne séparée avec horodatage et type d'opération.",
      },
      {
        id: 'st4',
        enonce: "Qu'est-ce qu'un <<CID>> et en quoi diffère-t-il d'un <<AID>> ?",
        choix: [
          "CID = identifiant conditionnel, visible seulement dans certains contextes",
          "CID = Composition ID : l'entité est dépendante de son parent, son identifiant est local (repart à 1 par parent), et en DT la PK = (CID + FK_parent)",
          "CID = identifiant calculé automatiquement depuis d'autres colonnes",
          "CID = identifiant composite basé sur plusieurs colonnes métier",
        ],
        reponse: 1,
        explication: "Exemple : une ligne de commande est numérotée 1, 2, 3 PAR commande. La ligne 1 de la commande 100 ≠ ligne 1 de la commande 200. L'entité LigneCommande n'existe pas sans sa Commande parente. En mode DT, la PK de LignesCommande = (numligne + com_num). En mode TI, elle obtient sa propre PK indépendante.",
      },
      {
        id: 'st5',
        enonce: "Dans ODM (notation Barker), comment se représente un identifiant naturel (NID) ?",
        choix: [
          "Par un '#' devant le nom de l'attribut (comme la clé primaire)",
          "Par un 'U*' devant l'attribut : U = Unique, * = Non nul (mais ce n'est pas la PK)",
          "Par un 'N' devant l'attribut pour 'Natural'",
          "Il n'y a pas de représentation spéciale dans ODM — tous les attributs se voient pareil",
        ],
        reponse: 1,
        explication: "Dans ODM (notation Barker) : # = Primary Key, U = Unique, * = Non nul (obligatoire), o = optionnel. Un NID se représente donc par 'U *' : Unique ET obligatoire, mais ce n'est pas la PK (#). La slide ODM montre : Eleve avec # * Numero (PK) et U * Matricule (NID).",
      },
      {
        id: 'st6',
        enonce: "Pourquoi la colonne <<AAU>> (ajUser) ne doit-elle être alimentée QUE lors de l'insertion et jamais modifiée ensuite ?",
        choix: [
          "Pour des raisons de performance — les mises à jour sont trop lentes",
          "Parce que ajUser enregistre QUI a CRÉÉ l'enregistrement. Modifier cette colonne plus tard en ferait quelque chose de faux — elle deviendrait 'qui a modifié' ce qui est le rôle de moUser",
          "Parce que Oracle ne permet pas de modifier les colonnes NOT NULL",
          "Parce que c'est une contrainte SQL UNIQUE qui empêche la modification",
        ],
        reponse: 1,
        explication: "Les 4 colonnes d'audit ont des rôles distincts et figés : ajUser = créateur (alimenté UNE FOIS à l'INSERT, jamais modifié), ajDate = date de création, moUser = dernier modificateur (mis à jour à chaque UPDATE), moDate = date de dernière modification. C'est le trigger BIR qui alimente ajUser et ajDate, et BUR qui alimente moUser et moDate.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 5. TRANSFORMATION MCD → MLD-R
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'transformation',
    titre: 'Transformation MCD → MLD-R',
    emoji: '⚙️',
    couleur: COULEURS_CHAPITRES.transformation,
    description: 'Règles des 3 cas, tables associatives, tables dépendantes, cardinalités',
    theorie: `Règles de transformation MCD → MLD-R (Merise, mode DT) :

CAS 1 — Association 1:N (0..1 ou 1..1 côté 1, 0..* ou 1..* côté N) :
  → La PK de l'entité côté "1" migre comme FK dans la table côté "N"
  → Pas de table intermédiaire
  → Exemple : Module (1) ← concerner → (0..*) Examen
    Table Examens : num PK, mod_num FK→Modules, dateEvaluation NID

CAS 2 — Association N:N (0..* des deux côtés) :
  → Génère une TABLE ASSOCIATIVE
  → PK = composite (FK_table1 + FK_table2)
  → Les attributs propres de l'association deviennent des colonnes ordinaires
  → Exemple : Personne (0..*) — Inscription — (0..*) Module
    Table Inscriptions : per_num PK FK, mod_num PK FK, dateInscription

CAS 3 — Entité dépendante (CID) :
  → La PK de la table enfant = (propre CID + PK complète du parent)
  → Exemple : Resultat <<CID>> numdep, parent = Inscription (per_num + mod_num)
    Table Resultats : per_num PK FK, mod_num PK FK, numdep PK, note M

CAS PARTICULIER — Association 1:1 :
  → La PK d'une entité migre comme FK UNIQUE dans l'autre
  → En pratique : choisir la table côté "optionnel" pour recevoir la FK
  → La FK reçoit une contrainte UNIQUE

⚠️ Cas Biblio (cas réel du cours) :
  [Personne] 0..* ← Inscription → 0..* [Module]
                            ↓ 1
                       <<Entity>> Inscription (dateInscription)
                            ↓ <<CID>> obtenir
                       <<Entity>> Resultat (numdep, note)
                   0..* ← epreuve → 1 [Examen] (dateEvaluation)

  Table Inscriptions (DT) : per_num PK FK, mod_num PK FK, dateInscription
  Table Resultats (DT) : per_num PK FK, mod_num PK FK, numdep PK, note, exa_epreuve_num FK`,
    questions: [
      {
        id: 'tr1',
        enonce: "Une association N:N (0..* — 0..*) en mode DT donne quelle structure dans le MLD-R ?",
        choix: [
          "Une seule grande table avec toutes les colonnes des deux entités",
          "Une table associative avec une PK COMPOSITE formée des deux FK vers les entités parentes",
          "Deux tables avec une FK dans chacune pointant vers l'autre",
          "Une table associative avec un AID comme PK indépendante",
        ],
        reponse: 1,
        explication: "En mode DT : Inscriptions(per_num PK FK→Personnes, mod_num PK FK→Modules, dateInscription). Les deux FK ensemble forment la PK composite. Cette PK garantit automatiquement : unicité du couple, NOT NULL sur les deux FK, et non-modifiabilité. En mode TI, ce comportement change complètement.",
      },
      {
        id: 'tr2',
        enonce: "Comment se transforme une association 1:N entre Module (côté 1) et Examen (côté N) ?",
        choix: [
          "Une table EXAMENS_MODULES intermédiaire est créée",
          "La PK de Modules (num) migre comme FK (mod_num) dans la table Examens",
          "La PK d'Examens migre dans la table Modules",
          "Les deux tables restent indépendantes — les cardinalités sont gérées par les triggers",
        ],
        reponse: 1,
        explication: "Règle 1:N : la PK de l'entité côté '1' migre comme FK dans la table côté 'N'. Donc : Examens(num PK, <<NID-1>> dateEvaluation, mod_concerner_num FK→Modules). Pas de table intermédiaire nécessaire. La FK peut être NOT NULL si la cardinalité minimale est 1 côté N.",
      },
      {
        id: 'tr3',
        enonce: "Dans le cas Biblio, la table Resultats en mode DT a une PK composée de combien de colonnes ? Lesquelles ?",
        choix: [
          "1 colonne : numdep uniquement (son propre identifiant)",
          "3 colonnes : per_num + mod_num + numdep (les deux FK vers Inscriptions + son CID)",
          "2 colonnes : per_num + mod_num (les deux FK vers Inscriptions)",
          "4 colonnes : per_num + mod_num + numdep + exa_epreuve_num",
        ],
        reponse: 1,
        explication: "Resultat est une entité dépendante (<<CID>>) d'Inscription. Sa PK = PK complète du parent + son propre CID. Inscription a pour PK (per_num + mod_num). Donc Resultats : PK = (per_num FK + mod_num FK + numdep). C'est une PK de 3 colonnes. La FK vers Inscriptions est elle-même composite (2 colonnes).",
      },
      {
        id: 'tr4',
        enonce: "Quelle contrainte SUPPLÉMENTAIRE reçoit la FK dans une association 1:1 lors de la transformation MCD → MLD-R ?",
        choix: [
          "Une contrainte CHECK pour vérifier la valeur",
          "Une contrainte UNIQUE (car côté '1' = au plus une occurrence)",
          "Une contrainte NOT NULL obligatoire",
          "Une contrainte DEFAULT pour une valeur par défaut",
        ],
        reponse: 1,
        explication: "Dans une association 1:1 (ex: Personne et Passeport), la FK migre dans une table et doit être UNIQUE — car un passeport ne peut appartenir qu'à UNE personne. Sans cette contrainte UNIQUE, on aurait une association 1:N. C'est la contrainte qui distingue le 1:1 du 1:N au niveau logique.",
      },
      {
        id: 'tr5',
        enonce: "Un attribut de l'association (ex: dateInscription dans Inscription) où se retrouve-t-il dans le MLD-R ?",
        choix: [
          "Il est dupliqué dans les deux tables parentes",
          "Il est ignoré lors de la transformation — les attributs d'associations ne sont pas transformés",
          "Il devient une colonne ordinaire dans la table associative générée",
          "Il devient une table séparée liée par FK",
        ],
        reponse: 2,
        explication: "Les attributs portés par une association N:N deviennent des colonnes ordinaires dans la table associative. dateInscription → colonne dans la table Inscriptions, aux côtés des deux FK qui forment la PK. Elle n'est ni PK ni FK, juste une donnée de l'inscription.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 6. MODES DT vs TI
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'dt_ti',
    titre: 'Modes DT vs TI',
    emoji: '⚡',
    couleur: COULEURS_CHAPITRES.dt_ti,
    description: 'Tables Indépendantes, SIMPK, {stability}, compensation PK composite',
    theorie: `CONTEXTE : Les frameworks modernes (Oracle APEX, Laravel/Eloquent) préconisent des tables avec une PK mono-colonne (tables indépendantes). Deux raisons :

  1. ÉVOLUTION : si une PK composite change, toutes les FK qui la référencent doivent changer en cascade. Avec une PK mono-colonne, l'impact est minimal.
  2. COMPATIBILITÉ : les RAD/ORM fonctionnent mieux avec $table->id() qu'avec des PK composites.

DEUX APPROCHES pour intégrer une contrainte TI :
  Approche 1 (MVC-CD) : paramétrer le mode de transformation → plugin génère automatiquement le MLD-R TI
  Approche 2 (ODM) : "dénaturer" le MCD en créant des entités associatives explicites avec AID

MODE DT (Dépendance entre Tables) — transformation naturelle :
  Table Inscriptions (DT) :
    per_num  <<PK>> <<FK-1>>  NUMERIC   ← PK composite
    mod_num  <<PK>> <<FK-2>>  NUMERIC   ← PK composite
    dateInscription           DATE

  Table Resultats (DT) :
    per_num  <<PK>> <<FK-1>>  NUMERIC   ← PK 3 colonnes
    mod_num  <<PK>> <<FK-1>>  NUMERIC   ← PK 3 colonnes
    numdep   <<PK>>  <<M>>    NUMERIC   ← PK 3 colonnes
    note     <<M>>            NUMERIC

MODE TI (Tables Indépendantes) :
  Table Inscriptions (TI) :
    num      <<PK>>            NUMERIC   ← PK INDÉPENDANTE (AID)
    per_num  <<FK-1>> <<M>>  NUMERIC   ← NOT NULL car ancien PK
    mod_num  <<FK-2>> <<M>>  NUMERIC   ← NOT NULL car ancien PK
    dateInscription           DATE
    contrainte <<U>> SIMPK_ins(per_num, mod_num) {stability}

  Table Resultats (TI) :
    num      <<PK>>            NUMERIC   ← PK INDÉPENDANTE
    ins_num  <<FK-1>> <<M>>   NUMERIC   ← FK simple vers Inscriptions
    numdep   <<M>>             NUMERIC
    note     <<M>>             NUMERIC

LES 3 COMPENSATIONS du mode TI (sur une ancienne table associative) :
  La PK composite garantissait automatiquement :
  1. NOT NULL sur chaque FK → à ajouter explicitement <<M>>
  2. UNIQUE du couple → contrainte SIMPK (SIMulation de clé Primaire) <<U>>
  3. Non-modifiabilité des FK → contrainte {stability}

SIMPK = SIMulation de clé Primaire = contrainte UNIQUE sur la combinaison des FK`,
    questions: [
      {
        id: 'dv1',
        enonce: "En mode TI, quelles sont les 3 contraintes à ajouter sur les anciennes FK d'une table associative pour compenser la perte de la PK composite ?",
        choix: [
          "{frozen} + CHECK + PRIMARY KEY",
          "NOT NULL sur chaque FK + contrainte UNIQUE combinée (SIMPK) + {stability} sur les FK",
          "UNIQUE individuel + DEFAULT + NOT NULL",
          "{ordered} + {frozen} + UNIQUE",
        ],
        reponse: 1,
        explication: "La PK composite (per_num + mod_num) garantissait 3 choses gratuitement : (1) NOT NULL (une PK ne peut pas être NULL), (2) UNIQUE du couple, (3) Non-modifiabilité (une PK ne change pas). En TI, la PK devient 'num' indépendant — on perd ces 3 garanties sur per_num et mod_num, qu'il faut recréer explicitement.",
      },
      {
        id: 'dv2',
        enonce: "Qu'est-ce que la SIMPK et pourquoi s'appelle-t-elle ainsi ?",
        choix: [
          "Simple Primary Key — une PK mono-colonne",
          "SIMulation de clé Primaire — contrainte UNIQUE sur la combinaison (FK1+FK2) qui simule le comportement d'unicité que la PK composite avait en mode DT",
          "Standard IMplementation Primary Key — une convention Oracle",
          "Secondary IMportant Primary Key — une clé secondaire",
        ],
        reponse: 1,
        explication: "En mode DT, la PK (per_num, mod_num) garantissait l'unicité du couple automatiquement. En mode TI, la PK est 'num' — il n'y a plus de contrainte d'unicité sur (per_num, mod_num). La SIMPK = contrainte <<U>> sur (per_num, mod_num) qui SIMULE cette garantie perdue. Sans elle, on pourrait inscrire la même personne au même module plusieurs fois.",
      },
      {
        id: 'dv3',
        enonce: "Dans quel outil peut-on choisir entre mode DT et mode TI automatiquement ?",
        choix: [
          "Dans Oracle Data Modeler (ODM) via ses préférences de transformation",
          "Dans le plugin MVC-CD2 de Visual Paradigm, dans les préférences onglet MCD → MLD-R",
          "Dans Oracle SQL Developer via un script de migration",
          "Dans Visual Paradigm directement, sans plugin",
        ],
        reponse: 1,
        explication: "MVC-CD2 (le plugin VP) offre deux modes de transformation : DT et TI. On le paramètre dans les préférences. ODM ne supporte fondamentalement que le mode DT. Pour obtenir du TI avec ODM, il faut dénaturer le MCD (créer des entités associatives explicites avec AID, puis des associations non-transférables père-fils).",
      },
      {
        id: 'dv4',
        enonce: "Que se passe-t-il à la table Resultats lors du passage de DT à TI dans le cas Biblio ?",
        choix: [
          "Aucun changement — seule la table Inscriptions est affectée",
          "Sa PK passe de 3 colonnes (per_num + mod_num + numdep) à 1 colonne (num), et sa FK vers Inscriptions passe de 2 colonnes (per_num + mod_num) à 1 colonne (ins_num)",
          "Elle est supprimée et fusionnée avec Inscriptions",
          "Elle reçoit uniquement une contrainte SIMPK supplémentaire",
        ],
        reponse: 1,
        explication: "En DT : Resultats a une PK de 3 colonnes et une FK composite de 2 colonnes vers Inscriptions. En TI : Inscriptions a maintenant une PK mono-colonne (ins_num). Donc Resultats reçoit une FK mono-colonne (ins_num) et sa propre PK devient (res_num). Toutes les tables deviennent 'indépendantes' — d'où le nom du mode.",
      },
      {
        id: 'dv5',
        enonce: "Comment implémenter le mode TI dans Oracle Data Modeler (qui ne le supporte pas nativement) ?",
        choix: [
          "En activant l'option 'Independent Tables' dans les préférences d'ODM",
          "En dénaturant le MCD : créer une entité Realisation avec son propre AID (num), puis créer des associations non-transférables père-fils vers Mandat et Collaborateur",
          "En modifiant directement le MLD-R généré pour remplacer les PK composites",
          "Ce n'est pas possible dans ODM — il faut utiliser VP+MVC-CD",
        ],
        reponse: 1,
        explication: "ODM applique toujours la transformation DT. Pour obtenir une table indépendante à partir d'une association N:N (Mandat ↔ Collaborateur), on crée une entité Realisation avec un AID (numero PK), puis deux associations NON-TRANSFÉRABLES père-fils (Mandat→Realisation, Collaborateur→Realisation). Résultat : REALISATIONS a une PK mono-colonne.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 7. ASSOCIATIONS IDENTIFIANTES
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'identifiantes',
    titre: 'Associations Identifiantes',
    emoji: '🔗',
    couleur: COULEURS_CHAPITRES.identifiantes,
    description: 'NID vs CID, {absolute}, losange ODM, cas Camion-Dépôt',
    theorie: `Une association est dite "identifiante" quand l'entité enfant est partiellement ou totalement identifiée par son association avec le parent.

ASSOCIATION IDENTIFIANTE NATURELLE (stéréotype <<NID>> sur l'association) :
  → L'entité enfant a un identifiant naturel qui n'est UNIQUE QUE dans le contexte du parent
  → Exemple (Cas Camion-Dépôt) :
    <<NID-1>> identification : L'immatriculation "AB-123" est unique PAR dépôt
    → Deux dépôts différents peuvent avoir chacun un camion "AB-123"
    → En MLD-R : contrainte UNIQUE sur (identification + dep_num)

CONTRAINTE {absolute} — inverser le comportement :
  → L'identifiant naturel devient unique GLOBALEMENT (pas juste par parent)
  → Exemple : <<NID-2>> numéro de châssis + {absolute}
    → Un numéro de châssis est gravé dans le métal, unique dans le monde entier
    → En MLD-R : contrainte UNIQUE simple sur (numChassis) uniquement
    → Plus deux camions ne peuvent avoir le même châssis, quel que soit le dépôt

ASSOCIATION IDENTIFIANTE DE COMPOSITION (<<CID>>) :
  → L'entité enfant N'EXISTE PAS sans son parent
  → Sa numérotation repart à 1 pour chaque parent
  → Propriété de NON-TRANSFÉRABILITÉ : l'enfant ne peut pas changer de parent
  → Exemple : Place de parking numérotée 1,2,3 PAR dépôt
    → Place n°1 du dépôt A ≠ Place n°1 du dépôt B
    → Une place ne peut JAMAIS changer de dépôt
  → En MLD-R : PK de PlacesParc = (numPlace + dep_num FK)
  → La colonne numDep est alimentée automatiquement (repart à 1 par dépôt) par les APIs

DANS ODM (notation Barker) :
  → Le "petit losange" ◆ sur une relation = association identifiante (Identifying)
  → Case à cocher "Identifying" dans les propriétés de la relation
  → Conséquence : la PK de l'entité enfant incluera la PK du parent (PK composite)
  → Correspond à une association CID dans le formalisme MVC-CD/VP`,
    questions: [
      {
        id: 'id1',
        enonce: "Dans le cas Camion-Dépôt, le <<NID-1>> 'identification' (immatriculation) sans {absolute} signifie :",
        choix: [
          "L'immatriculation est unique dans le monde entier — aucun camion ne peut avoir la même",
          "L'immatriculation est unique PAR DÉPÔT seulement — deux dépôts différents peuvent avoir chacun un camion 'AB-123'",
          "L'immatriculation est optionnelle et peut être NULL",
          "L'immatriculation identifie à la fois le camion et le dépôt",
        ],
        reponse: 1,
        explication: "Sans {absolute}, un NID dans une association identifiante est unique RELATIVEMENT au parent. Deux dépôts peuvent avoir chacun leur camion 'AB-123'. En MLD-R, la contrainte UNIQUE porte sur (identification, dep_num) — pas sur identification seul. C'est cohérent avec la réalité : les immatriculations sont gérées par région.",
      },
      {
        id: 'id2',
        enonce: "Pourquoi le <<NID-2>> numéro de châssis reçoit-il {absolute} dans le cas Camion-Dépôt ?",
        choix: [
          "Pour indiquer que c'est le deuxième identifiant naturel",
          "Parce qu'un numéro de châssis est physiquement gravé dans le véhicule et unique dans le monde entier — aucun contexte de dépôt ne change cette réalité",
          "Pour différencier les camions d'un même dépôt",
          "{absolute} est obligatoire sur tous les NID-2",
        ],
        reponse: 1,
        explication: "Un numéro VIN (Vehicle Identification Number) est standardisé mondialement et unique pour chaque véhicule. Il n'y a PAS de contexte parent : deux camions ne peuvent JAMAIS avoir le même châssis, qu'ils soient dans le même dépôt ou non. {absolute} traduit cette réalité en forçant UNIQUE(numChassis) sans la FK du dépôt.",
      },
      {
        id: 'id3',
        enonce: "Dans ODM, que signifie le 'petit losange' ◆ (Identifying) sur une relation entre deux entités ?",
        choix: [
          "Une relation Many-to-Many",
          "Une relation obligatoire (cardinalité minimale = 1) des deux côtés",
          "Une association identifiante : la PK de l'entité enfant sera composite et inclura la PK du parent",
          "Une relation avec une contrainte {frozen}",
        ],
        reponse: 2,
        explication: "Dans la notation Barker d'ODM, le losange rempli ◆ indique 'Identifying = true'. Conséquence directe sur le MLD-R : la PK de l'entité enfant devient composite = (PK_enfant + PK_parent). C'est l'équivalent exact d'une association identifiante CID dans MVC-CD/VP. Sans le losange = relation normale, PK de l'enfant reste indépendante.",
      },
      {
        id: 'id4',
        enonce: "La propriété de NON-TRANSFÉRABILITÉ d'une association CID (ex: Place de parking) signifie :",
        choix: [
          "La place ne peut pas être louée à plusieurs clients",
          "Une place de parking ne peut jamais changer de dépôt — sa FK dep_num est figée à l'insertion et ne peut plus être modifiée",
          "La place ne peut pas être supprimée si elle est occupée",
          "La numérotation des places est séquentielle et ne peut pas être réordonnée",
        ],
        reponse: 1,
        explication: "La non-transférabilité est une conséquence logique du CID : si une place est identifiée par (numPlace + dep_num), changer dep_num changerait son identité. C'est physiquement absurde — une place est dans un bâtiment fixe. Dans VP, la FK dep_num reçoit {frozen}. Dans ODM, 'Transferable = false'. Implémentée par un trigger BEFORE UPDATE bloquant.",
      },
      {
        id: 'id5',
        enonce: "Comment la colonne numDep (numérotation locale par dépôt) est-elle alimentée dans le cas des Places de parking ?",
        choix: [
          "Par l'utilisateur qui saisit manuellement un numéro",
          "Par une séquence Oracle globale comme les PK AID",
          "Par les APIs de tables (trigger) : à chaque insertion, MAX(numDep) + 1 pour ce dépôt spécifique — repart à 1 pour chaque nouveau dépôt",
          "Par une valeur DEFAULT définie au niveau SQL-DDL",
        ],
        reponse: 2,
        explication: "La numérotation relative est le caractère distinctif du CID. Une séquence Oracle globale donnerait 1, 2, 3, 4... pour TOUS les dépôts. On veut 1, 2, 3 pour le dépôt A et 1, 2, 3 pour le dépôt B. Les APIs de tables calculent donc MAX(numDep) WHERE dep_num = depot_courant et ajoutent 1. Ceci est mentionné dans les cours comme 'alimenté automatiquement' mais 'pas pris en charge par ODM ni les APIs standard'.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 8. CONTRAINTES NON-DÉCLARATIVES
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'contraintes',
    titre: 'Contraintes Non-Déclaratives',
    emoji: '🧊',
    couleur: COULEURS_CHAPITRES.contraintes,
    description: '{frozen}, {ordered}, {stability}, {nonoriented}, {absolute} — pourquoi SQL ne peut pas',
    theorie: `Une contrainte est "non-déclarative" quand elle NE PEUT PAS être exprimée en SQL-DDL (CREATE TABLE, CONSTRAINT) et nécessite du code procédural PL/SQL (triggers + procédures stockées).

SQL-DDL peut faire : NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK(valeur > 0)
SQL-DDL NE PEUT PAS faire : "cette valeur ne peut plus changer après insertion", "vérifier que (B,A) n'existe pas avant d'insérer (A,B)", "calculer le prochain numéro séquentiel par groupe"...

{frozen} — IMMUABILITÉ après insertion
  • Sur COLONNE : cette colonne spécifique ne peut plus être modifiée
    Exemple : dateSignature d'un Mandat (alimentée auto à la création → ne doit jamais changer)
  • Sur ASSOCIATION : la FK correspondante est figée (l'enfant ne peut pas changer de parent)
    Exemple : {frozen} entre Mandat et Client → un Mandat reste lié à son Client initial
  • Dans ODM : "Transferable = false" sur la relation
  • Physique : trigger BEFORE UPDATE qui lève RAISE_APPLICATION_ERROR si la valeur change
  ⚠️ Dans ODM : non géré par la consolidation → générer le trigger via DDL Preview manuellement

{ordered} — ORDRE EXPLICITE géré en base de données
  • S'applique sur une ENTITÉ
  • Ajoute une colonne ORDRE NOT NULL + UNIQUE dans la table
  • Valeurs par multiples de 10 (10, 20, 30...) pour permettre les insertions intermédiaires
  • Alimentée automatiquement par les APIs de tables (trigger BIR)
  • Exemple : Jours de la semaine → Lundi=10, Mardi=20, ..., Dimanche=70
  • Exemple du cours : Qualification {ordered} → colonne ordre dans QUALIFICATIONS
  ⚠️ UNIQUE sur ordre ≠ ORDER BY → l'ordre est une DONNÉE PERSISTÉE dans la table, pas un tri à la lecture

{stability} — IMMUABILITÉ des FK en mode TI uniquement
  • Spécifique au mode TI (Tables Indépendantes)
  • Rend les colonnes FK immuables pour compenser la perte de l'immuabilité de la PK composite
  • Physique : trigger BEFORE UPDATE bloquant sur les colonnes FK

{nonoriented} — SYMÉTRIE d'une association auto-référencée
  • Association A-B = B-A (ex: amitié, parenté, collègue)
  • SQL UNIQUE sur (per_num1, per_num2) n'empêche pas l'insertion de (per_num2, per_num1)
  • Trigger BEFORE INSERT vérifie l'existence de la version inversée

{absolute} — voir chapitre Associations Identifiantes`,
    questions: [
      {
        id: 'cn1',
        enonce: "Pourquoi SQL-DDL ne peut-il pas implémenter {frozen} sur une colonne ?",
        choix: [
          "Parce que Oracle ne supporte pas les colonnes non-modifiables",
          "Il n'existe pas de contrainte SQL-DDL 'IMMUTABLE' — SQL peut faire NOT NULL, UNIQUE, CHECK sur valeurs, mais pas 'cette valeur existante ne peut plus changer'. Seul un trigger BEFORE UPDATE peut vérifier et bloquer",
          "Parce que {frozen} nécessite un tablespace séparé",
          "Parce que SQL-DDL ne s'exécute qu'à la création, pas aux modifications",
        ],
        reponse: 1,
        explication: "Les contraintes SQL-DDL sont statiques et évaluées sur la valeur courante. CHECK(dateSignature IS NOT NULL) vérifie qu'elle n'est pas NULL, mais ne compare pas avec la valeur précédente. Pour dire 'si cette valeur existait avant et que tu essaies de la changer → erreur', il faut comparer :OLD.dateSignature avec :NEW.dateSignature dans un trigger BEFORE UPDATE.",
      },
      {
        id: 'cn2',
        enonce: "{frozen} sur une ASSOCIATION signifie quoi concrètement ? Exemple : {frozen} entre Mandat et PersonneMorale",
        choix: [
          "Un nouveau mandat ne peut pas être créé pour ce client",
          "La clé étrangère cli_num dans la table Mandats ne peut plus être modifiée après l'INSERT — un Mandat reste définitivement lié à son Client initial",
          "L'association est supprimée de la base après l'insertion",
          "Le client ne peut pas modifier les données du mandat",
        ],
        reponse: 1,
        explication: "{frozen} sur l'association 'pour' (Mandat→PersonneMorale) = {frozen} sur la colonne FK cli_num dans la table MANDATS. Un Mandat signé avec le Client X ne peut jamais être transféré au Client Y. Dans ODM : Transferable = false. Trigger BEFORE UPDATE bloque tout UPDATE qui tenterait de changer cli_num. La checklist Ecrisoft mentionne explicitement '{frozen} sur l'association Mandat-Client'.",
      },
      {
        id: 'cn3',
        enonce: "Pourquoi les valeurs de la colonne ORDRE dans une entité {ordered} sont-elles des MULTIPLES DE 10 (10, 20, 30...) et pas 1, 2, 3 ?",
        choix: [
          "C'est une contrainte Oracle — les colonnes d'ordre doivent être des multiples de 10",
          "Pour laisser de l'espace entre les valeurs afin de pouvoir insérer de nouveaux éléments entre deux existants sans tout renuméroter",
          "Pour correspondre aux codes ASCII des caractères alphanumériques",
          "Pour des raisons de performance d'indexation dans Oracle",
        ],
        reponse: 1,
        explication: "Si Lundi=1, Mardi=2, Mercredi=3 et qu'on veut insérer 'Mardi soir' entre Mardi et Mercredi, on n'a pas de place (on ne peut pas mettre 2.5). Avec Lundi=10, Mardi=20, Mercredi=30, on peut insérer 'Mardi soir'=25 sans toucher aux autres. C'est une pratique standard dans les tables ordonnées pour éviter les renumérotations massives.",
      },
      {
        id: 'cn4',
        enonce: "Dans ODM, comment gérer la contrainte {frozen} sur une association (non-transférabilité) ? Y a-t-il une limite ?",
        choix: [
          "En cochant 'Frozen = true' dans les propriétés de la relation — entièrement pris en charge",
          "En décochant 'Transferable' dans les propriétés de la relation. Limite : ODM ne génère PAS automatiquement le trigger lors de la consolidation — il faut le récupérer manuellement via DDL Preview sur la table et l'exécuter séparément",
          "Via une contrainte CHECK personnalisée dans le script SQL-DDL",
          "ODM ne supporte pas du tout cette contrainte — il faut l'écrire à la main en PL/SQL",
        ],
        reponse: 1,
        explication: "Le doc ODM le précise explicitement : 'ODM ne prend pas encore en compte les contraintes de clé étrangères non-transférables dans le mécanisme de consolidation. Les triggers traduisant cette propriété ne sont donc pas générés. Pour contourner le problème : sélectionner la table, clic-droit > DDL Preview, récupérer le code SQL du trigger et l'exécuter dans le schéma.'",
      },
      {
        id: 'cn5',
        enonce: "Pourquoi une contrainte SQL UNIQUE sur (per_num1, per_num2) ne suffit-elle pas pour implémenter {nonoriented} ?",
        choix: [
          "Parce que UNIQUE ne fonctionne pas sur plusieurs colonnes",
          "Parce que UNIQUE((per_num1, per_num2)) empêche le doublon EXACT (3,7)+(3,7), mais pas le doublon SYMÉTRIQUE : (3,7) et (7,3) sont deux lignes différentes aux yeux de SQL",
          "Parce que les contraintes UNIQUE sont ignorées sur les tables associatives",
          "Parce que UNIQUE nécessite que les colonnes soient NOT NULL",
        ],
        reponse: 1,
        explication: "SQL compare les tuples dans l'ordre. UNIQUE(per_num1, per_num2) : (3,7) ≠ (7,3) pour SQL — deux lignes parfaitement valides. Mais sémantiquement, 'Alice est amie de Bob' = 'Bob est ami d'Alice'. Un trigger BEFORE INSERT vérifie : 'EXISTS(SELECT 1 FROM Amities WHERE per_num1 = :NEW.per_num2 AND per_num2 = :NEW.per_num1)' et bloque si la version inversée existe déjà.",
      },
      {
        id: 'cn6',
        enonce: "Quelle est la différence entre {stability} et {frozen} ?",
        choix: [
          "Ce sont deux noms pour la même contrainte",
          "{stability} s'applique spécifiquement aux FK en mode TI pour compenser la perte de l'immuabilité de la PK composite. {frozen} s'applique sur n'importe quelle colonne ou association (pas spécifique au mode TI)",
          "{frozen} s'applique aux colonnes, {stability} aux tables entières",
          "{stability} est une contrainte SQL standard, {frozen} est propre à MVC-CD",
        ],
        reponse: 1,
        explication: "{stability} n'apparaît QU'EN MODE TI et uniquement sur les FK d'anciennes tables associatives. C'est une compensation technique : en DT, l'immuabilité des FK était gratuite (via la PK). En TI, on la perd et on la recrée avec {stability}. {frozen} est plus général : il peut s'appliquer à dateSignature, à l'association Mandat→Client, à n'importe quelle colonne ou relation qui doit être figée.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 9. APIS DE TABLES
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'apis',
    titre: 'APIs de Tables',
    emoji: '🔧',
    couleur: COULEURS_CHAPITRES.apis,
    description: 'Triggers BIR/BUR/BDR, procédures stockées, journalisation _JN, colonnes d\'audit',
    theorie: `Les APIs de tables = ensemble de TRIGGERS + PROCÉDURES STOCKÉES formant une sur-couche logicielle.

Origine : initialement proposé par Oracle via Oracle Designer. MVC-CD s'en est fortement inspiré.

But : "Compléter les spécifications qui NE PEUVENT PAS être prises en charge par du code SQL-DDL"

Les 6 TRIGGERS générés (per table) :
  BEFORE INSERT ROW  → BIR_NomTable  (avant insertion)
  BEFORE UPDATE ROW  → BUR_NomTable  (avant modification)
  BEFORE DELETE ROW  → BDR_NomTable  (avant suppression)
  AFTER INSERT ROW   → AIR_NomTable  (après insertion)
  AFTER UPDATE ROW   → AUR_NomTable  (après modification)
  AFTER DELETE ROW   → ADR_NomTable  (après suppression)

Les PROCÉDURES STOCKÉES générées (dans le package NOMTABLE_TAPIS) :
  • ins(api_rec)      → gère un INSERT (alimente PK, colonnes audit...)
  • upd(api_rec)      → gère un UPDATE (alimente moUser, moDate, vérifie frozen...)
  • del(api_rec)      → gère un DELETE
  • journal(api_rec)  → enregistre une ligne dans la table _JN
  • autogen_column()  → alimenta automatiquement les colonnes calculées (ordre, CID...)

Ce que les APIs prennent en charge :
  1. Alimentation auto de la PK (séquence Oracle : SEQ_NOMTABLE.NEXTVAL)
  2. Colonnes d'audit (ajUser/ajDate/moUser/moDate)
  3. Journalisation (_JN) — traçabilité complète
  4. Contraintes non-déclaratives ({frozen}, {ordered}, {stability}...)
  5. Types de données riches (validation token, word, positiveDecimal...)
  6. Règles de gestion métier / dénormalisation

RÈGLE FONDAMENTALE :
  → Les APIs DOIVENT être appelées systématiquement
  → Quelque soit l'applicatif client (web, SQL direct, batch...)
  → De manière totalement transparente
  → Sinon : contournement des règles = corruption des données !

TABLE _JN (journalisation) :
  Structure : colonnes de contexte + toutes les colonnes de la table source
  JN_DATETIME    TIMESTAMP  ← horodatage de l'opération
  JN_OPERATION   VARCHAR2   ← 'INS', 'UPD' ou 'DEL'
  JN_USER        VARCHAR2   ← utilisateur Oracle connecté
  JN_SESSION     VARCHAR2   ← numéro de session
  JN_APPL        VARCHAR2   ← nom de l'application (ex: api_ELEVES.INS)
  [+ toutes les colonnes de la table de base]

Exemple réel vu dans le cours :
  JN_OPERATION: INS | JN_USER: AGL_PROF_CAMUS | JN_DATETIME: 04.07.13 16:42:50 | MATRICULE: 39076 | NOM: Favre
  JN_OPERATION: UPD | JN_USER: AGL_PROF_CAMUS | JN_DATETIME: 04.07.13 17:04:49 | NOM: Favre-Rocher
  JN_OPERATION: DEL | JN_USER: AGL_PROF_CAMUS | JN_DATETIME: 04.07.13 17:06:21 | NOM: Favre-Rocher

STRATÉGIES d'alimentation de la PK :
  Stratégie 1 : Colonne nativement auto-incrémentée (IDENTITY en Oracle 12c+)
    → Simple mais nécessite une fonction pour récupérer la dernière valeur dans une transaction
  Stratégie 2 : Séquence Oracle + trigger BEFORE INSERT ROW
    → BIR_NomTable appelle SEQ_NOMTABLE.NEXTVAL et alimente la PK
  Stratégie 3 : Séquence appelée sur DEFAULT (Oracle 12c+)
    → PK NUMERIC DEFAULT SEQ_NOMTABLE.NEXTVAL
    → Implémentation propre à chaque constructeur et aux choix de l'entreprise`,
    questions: [
      {
        id: 'ap1',
        enonce: "Combien de triggers sont générés par les APIs de tables pour une table donnée ? Lesquels ?",
        choix: [
          "3 triggers : INSERT, UPDATE, DELETE",
          "6 triggers : BIR, BUR, BDR (BEFORE) + AIR, AUR, ADR (AFTER) pour INSERT, UPDATE, DELETE ROW",
          "2 triggers : un avant (BEFORE) et un après (AFTER) chaque opération",
          "1 trigger universel qui gère toutes les opérations",
        ],
        reponse: 1,
        explication: "6 triggers par table : BIR (Before Insert Row), BUR (Before Update Row), BDR (Before Delete Row), AIR (After Insert Row), AUR (After Update Row), ADR (After Delete Row). Les triggers BEFORE délèguent aux procédures stockées (ins, upd, del) qui contiennent la logique. Les triggers AFTER peuvent faire des vérifications supplémentaires ou notifier.",
      },
      {
        id: 'ap2',
        enonce: "Quelles sont les 5 catégories de fonctionnalités que les APIs de tables prennent en charge ?",
        choix: [
          "SELECT, INSERT, UPDATE, DELETE, MERGE",
          "Alimentation PK (séquence) + colonnes d'audit + journalisation _JN + contraintes non-déclaratives ({frozen}, {ordered}...) + types de données riches (token, positiveDecimal...)",
          "Sécurité, Performance, Backup, Réplication, Monitoring",
          "Validation, Export, Import, Archivage, Réplication",
        ],
        reponse: 1,
        explication: "Les APIs complètent ce que SQL-DDL ne peut pas faire : (1) Séquence pour la PK, (2) Audit automatique (4 colonnes alimentées), (3) Journalisation dans _JN (INS/UPD/DEL tracés), (4) Contraintes non-déclaratives ({frozen} = trigger BUR bloquant, {ordered} = trigger BIR calculant l'ordre), (5) Validation des types riches (token, word, positiveDecimal).",
      },
      {
        id: 'ap3',
        enonce: "Quel est le contenu d'une ligne dans la table de journalisation _JN ? Donnez les colonnes de contexte.",
        choix: [
          "JN_DATETIME + JN_OPERATION + JN_USER + JN_SESSION + JN_APPL + toutes les colonnes de la table source",
          "Seulement JN_DATETIME et JN_USER pour chaque opération",
          "La PK de la table source + JN_OPERATION uniquement",
          "JN_HASH + JN_CHECKSUM + JN_VERSION + toutes les colonnes source",
        ],
        reponse: 0,
        explication: "La table _JN (ex: ELEVES_JN) contient : JN_DATETIME (timestamp de l'opération), JN_OPERATION ('INS', 'UPD', 'DEL'), JN_USER (utilisateur Oracle), JN_SESSION (session ID), JN_APPL (nom de l'applicatif, ex: 'api_ELEVES.INS') + la copie de TOUTES les colonnes de la table source au moment de l'opération. Exemple vu en cours : on voit l'INSERT de Favre, la modification du nom en Favre-Rocher, puis la suppression.",
      },
      {
        id: 'ap4',
        enonce: "Pourquoi les APIs de tables doivent-elles être appelées 'quel que soit l'applicatif client' ?",
        choix: [
          "Pour des raisons de performance — les APIs sont plus rapides que le SQL direct",
          "Parce que l'intégrité des données dépend des APIs. Si un script SQL bypass les APIs, les contraintes ({frozen}, audit, journalisation...) ne s'appliquent pas → les données peuvent être corrompues",
          "Parce qu'Oracle impose cela pour des raisons de licence",
          "Pour pouvoir auditer qui utilise quelle application",
        ],
        reponse: 1,
        explication: "Si un développeur fait INSERT INTO CLIENTS (num, nom) VALUES (1, 'Test') directement en SQL (sans passer par les APIs), le trigger BIR_CLIENTS s'exécute. Mais si les APIs ne sont pas correctement configurées, ou si on execute un DDL qui contourne les triggers, les colonnes d'audit ne sont pas alimentées, la journalisation n'est pas faite, et {frozen} n'est pas vérifié. D'où la règle : les APIs sont le point d'accès UNIQUE aux données.",
      },
      {
        id: 'ap5',
        enonce: "Parmi les 3 stratégies d'alimentation de la PK, laquelle MVC-CD utilise-t-il principalement ?",
        choix: [
          "Stratégie 1 : colonne IDENTITY (auto-incrémentée nativement par Oracle)",
          "Stratégie 2 : Séquence Oracle (SEQ_NOMTABLE) + trigger BEFORE INSERT ROW qui alimente la PK",
          "Stratégie 3 : séquence appelée sur DEFAULT",
          "Aucune — MVC-CD laisse le développeur choisir manuellement",
        ],
        reponse: 1,
        explication: "MVC-CD utilise Stratégie 2 : le trigger BIR_NomTable est généré, et dans sa procédure stockée 'ins', il appelle SEQ_NOMTABLE.NEXTVAL pour obtenir la prochaine valeur et l'affecter à la PK. On voit dans le modèle physique VP : <<Sequence>> <<Oracle>> NomTable_SEQPK (Cache = 20). Cache = 20 signifie que Oracle préalloue 20 valeurs pour la performance.",
      },
      {
        id: 'ap6',
        enonce: "Faut-il regénérer les APIs de tables lors d'une nouvelle itération ? Pourquoi est-ce simple ?",
        choix: [
          "Non, les APIs se mettent à jour automatiquement lors de l'exécution du SQL-DDL",
          "Oui, car les APIs s'appuient sur la structure de la table (colonnes, types, contraintes). Simple car tout est CREATE OR REPLACE — pas besoin de supprimer l'ancien code avant de regénérer",
          "Non, les APIs ne changent jamais car les triggers sont génériques",
          "Oui, mais c'est complexe — il faut supprimer manuellement les anciens triggers et packages avant",
        ],
        reponse: 1,
        explication: "Si on ajoute une colonne 'dateNaissance' à une entité, la procédure stockée 'ins' doit inclure cette colonne, et la procédure 'journal' doit la copier dans la table _JN. Donc on doit regénérer. Mais c'est simple car MVC-CD génère des CREATE OR REPLACE : le code est remplacé à chaud sans DROP préalable. En production, cela ne nécessite pas d'interruption de service.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 10. ORACLE DATA MODELER
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'odm',
    titre: 'Oracle Data Modeler (ODM)',
    emoji: '🟠',
    couleur: COULEURS_CHAPITRES.odm,
    description: 'Architecture, notation Barker, domaines, référentiel de règles, Design Rules',
    theorie: `Oracle Data Modeler (ODM) = outil professionnel Oracle, GRATUIT, intégré à SQL Developer.

Naissance : 2009 (jeunesse difficile), améliorations notables dès ~2011-2012.
Capacités : modélisation des données, multidimensionnelle, processus (DFD), outils de transformation/génération.

TERMINOLOGIE ODM (DÉSTABILISANTE par rapport au cours) :
  • "Logical Model" dans ODM = NIVEAU CONCEPTUEL (MCD) ← attention !
  • "Relational Model" dans ODM = NIVEAU LOGIQUE (MLD-R)
  • "Physical Model" dans ODM = NIVEAU PHYSIQUE (MPD-R)
  ⚠️ Dans ce cours, on utilise les termes classiques : MCD, MLD-R, MPD

ARCHITECTURE ODM :
  • Un Design = un projet (1 seul MCD par Design)
  • Plusieurs subviews (diagrammes partiels) pour la lisibilité
  • Le MCD est entier dans un diagramme implicite
  • Un MCD → 1 ou plusieurs MLD-R
  • Un MLD-R → 1 ou plusieurs MPD

NOTATION BARKER dans ODM (≠ UML MVC-CD) :
  • Entités = rectangles avec coins arrondis
  • # = Primary Key (clé primaire)
  • U = Unique (identifiant naturel NID)
  • * = Non nul (obligatoire — comme <<M>>)
  • o = optionnel
  • Trait plein côté entité = cardinalité minimale 1 (obligatoire)
  • Trait tillé côté entité = cardinalité minimale 0 (optionnel)
  • Patte d'oie = cardinalité maximale N
  • ◆ Losange = association identifiante (Identifying)
  ⚠️ ODM NE SUPPORTE PAS les entités associatives !

DOMAINES dans ODM :
  • Type de données personnalisé et réutilisable
  • Affine un type standard (ex: limiter les valeurs autorisées)
  • Génère une contrainte CHECK au niveau physique
  • Exemples du cours :
    PK_Numerique = Integer(38) → utilisé pour TOUTES les clés primaires
    OUI_NON = Char(1) avec CHECK IN ('Y', 'N')
  • Pourquoi Integer(38) et pas INTEGER ? → Pour éviter des faux positifs dans la consolidation (Oracle convertit INTEGER en NUMBER(38) en interne)

RÉFÉRENTIEL DE RÈGLES dans ODM :
  • Préférences et paramétrage
  • Design Rules : règles de validation prédéfinies dans ODM
  • Custom Design Rules : créer ses propres règles de validation
  • Scripts de transformation : scripts JavaScript (moteur Nashorn/JVM) qui agissent sur les objets du référentiel
  → L'entreprise peut vérifier automatiquement la conformité de ses modèles`,
    questions: [
      {
        id: 'od1',
        enonce: "Dans ODM, le 'Logical Model' correspond à quel niveau dans notre terminologie MDE ?",
        choix: [
          "Au niveau Logique (MLD-R) — c'est logique !",
          "Au niveau Conceptuel (MCD) — terme contre-intuitif mais c'est ainsi dans ODM",
          "Au niveau Physique (MPD-R)",
          "C'est un niveau supplémentaire propre à ODM, entre conceptuel et logique",
        ],
        reponse: 1,
        explication: "ODM utilise une terminologie décalée : 'Logical Model' = MCD (conceptuel), 'Relational Model' = MLD-R (logique), 'Physical Model' = MPD. C'est mentionné dans les slides comme 'terminologie quelque peu déstabilisante'. Dans ce cours, on ignore cette terminologie et on utilise toujours MCD/MLD-R/MPD pour éviter la confusion.",
      },
      {
        id: 'od2',
        enonce: "Dans la notation Barker d'ODM, que signifient les symboles # U * o devant un attribut ?",
        choix: [
          "# = Obligatoire, U = Unique, * = Calculé, o = Optionnel",
          "# = Primary Key, U = Unique (identifiant naturel), * = Non nul (obligatoire), o = Optionnel (peut être NULL)",
          "# = Foreign Key, U = Unique, * = Mandatory, o = Optional",
          "Ce sont des décorations esthétiques sans signification fonctionnelle",
        ],
        reponse: 1,
        explication: "Notation Barker dans ODM : # précède la PK (Primary Key), U précède un attribut Unique (NID), * précède un attribut obligatoire (NOT NULL, équivalent de <<M>>), o précède un attribut optionnel (peut être NULL). On peut combiner : 'U *' sur Matricule = Unique ET Non Nul. '# *' sur Numero = PK ET Non Nul.",
      },
      {
        id: 'od3',
        enonce: "Pourquoi ODM ne supporte-t-il pas les entités associatives ? Quelle est la conséquence ?",
        choix: [
          "C'est un bug ODM qui sera corrigé dans la prochaine version",
          "La notation Barker sur laquelle se base ODM ne prévoit pas les entités associatives. Conséquence : pour modéliser une table associative indépendante (mode TI), on doit dénaturer le MCD en créant une entité avec AID et des associations père-fils",
          "Les entités associatives ne sont pas utilisées dans les bases Oracle",
          "ODM les supporte mais sous un nom différent ('junction entity')",
        ],
        reponse: 1,
        explication: "La notation Barker (héritée de Oracle UK) ne comporte pas le concept d'entité associative. Dans VP+MVC-CD, on peut dessiner une entité avec stéréotype d'association. Dans ODM, une association N:N est représentée directement avec une relation, et ODM la transforme automatiquement en table associative DT. Pour TI : on crée une entité Realisation avec numero AID + deux relations père-fils non-transférables.",
      },
      {
        id: 'od4',
        enonce: "Pourquoi utilise-t-on le domaine PK_Numerique = Integer(38) plutôt qu'INTEGER dans ODM ?",
        choix: [
          "Pour limiter les valeurs négatives sur les clés primaires",
          "Pour éviter des faux positifs dans le mécanisme de consolidation : Oracle stocke INTEGER comme NUMBER(38) en interne, ce qui crée des 'différences fantômes' entre le modèle (INTEGER) et la base (NUMBER(38))",
          "Parce qu'INTEGER ne supporte pas les valeurs au-dessus de 2147483647",
          "Pour raisons de standardisation entre plusieurs schémas Oracle",
        ],
        reponse: 1,
        explication: "Si on définit le type INTEGER dans ODM et qu'Oracle le stocke en NUMBER(38), lors de la consolidation ODM compare 'INTEGER (modèle)' avec 'NUMBER(38) (base)' et détecte une différence → génère un ALTER TABLE inutile. En définissant directement PK_Numerique = INTEGER(38), ODM et Oracle sont d'accord sur le type → pas de faux delta dans la consolidation.",
      },
      {
        id: 'od5',
        enonce: "Qu'est-ce qu'un 'script de transformation' dans le Référentiel de règles d'ODM ?",
        choix: [
          "Un script SQL de migration entre deux versions de la base",
          "Un script JavaScript (moteur Nashorn/JVM) qui accède à l'API ODM pour manipuler les objets du référentiel — permet d'automatiser des transformations comme générer les APIs de tables, appliquer des règles de nommage, créer des index...",
          "Un script de sauvegarde du projet ODM",
          "Un script de génération de documentation automatique",
        ],
        reponse: 1,
        explication: "ODM intègre le moteur JavaScript Oracle Nashorn (JVM). Les scripts de transformation peuvent lire et modifier tous les objets du référentiel (tables, colonnes, contraintes, relations...). Dans ce cours, le script 'Heg-Arc : Prépare environnement de travail' configure les règles de nommage. D'autres scripts génèrent les APIs de tables, créent des index FK, mettent les identifiants en majuscule. C'est ce qui pallie les lacunes natives d'ODM.",
      },
      {
        id: 'od6',
        enonce: "Dans ODM, qu'est-ce qu'une 'subview' et quel est son intérêt ?",
        choix: [
          "Une vue SQL (VIEW) créée automatiquement dans Oracle",
          "Un diagramme partiel du modèle — affiche un sous-ensemble de tables pour améliorer la lisibilité, sans modifier le modèle global",
          "Un sous-projet à l'intérieur d'un Design",
          "Une copie de sauvegarde du MLD-R",
        ],
        reponse: 1,
        explication: "Un projet ODM peut avoir des dizaines de tables. La subview permet de n'afficher que les tables pertinentes pour un sous-système. Exemple : une subview 'Tables métier' n'affiche que les tables business sans les _JN. Modifier une table dans une subview modifie le modèle global — c'est juste une vue filtée. On peut créer autant de subviews que nécessaire.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 11. REVERSE ENGINEERING & CONSOLIDATION
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'reverse',
    titre: 'Reverse Engineering & Consolidation',
    emoji: '🔄',
    couleur: COULEURS_CHAPITRES.reverse,
    description: 'Ingénierie inverse, étapes ODM, mécanisme de consolidation, delta SQL',
    theorie: `REVERSE ENGINEERING (Ingénierie Inverse) :
  → Reconstruire MLD-R + MPD depuis une base de données existante
  → L'AGL lit le dictionnaire Oracle et génère les modèles automatiquement
  
Processus complet (selon le cours et l'article) :
  ÉTAPE 1 : AGL lit le dictionnaire → génère MLD-R + MPD (simultanément)
  ÉTAPE 2 : AGL déduit le MCD depuis le MLD-R (moins automatique)
  ÉTAPE 3 (optionnel) : Modifier le MCD pour faire évoluer la structure
  ÉTAPE 4 : Regénérer MLD-R + MPD depuis le MCD modifié
  ÉTAPE 5 : AGL génère le SQL de mise à jour et l'exécute sur la base

Cas d'usage du reverse engineering :
  1. Faire évoluer une BD existante sans documentation (legacy)
  2. Rétrodocumentation : comprendre une structure existante
  3. Migration : comprendre le schéma source avant de migrer
  4. Audit : vérifier cohérence entre modèle théorique et base réelle

Étapes dans ODM (précises du cours) :
  1. FERMER tout projet en cours
  2. Créer un NOUVEAU Design
  3. File > Import > Data Dictionary
  4. Cliquer Add, saisir les informations de connexion Oracle (schéma AGL)
  5. Tester la connexion, sauvegarder
  6. Lancer l'import → ODM génère le Relational Model
  ⚠️ DÉCOCHER toutes les options de consolidation lors de l'import !

MÉCANISME DE CONSOLIDATION :
  Source = modèle dans l'outil (référentiel ODM ou VP)
  Cible = dictionnaire de la base Oracle réelle
  
  → Compare les deux et génère uniquement le SQL-DDL de DIFFÉRENCES (delta)
  → Si modèle = base → delta vide (rien à faire)
  → Si on a ajouté une colonne → delta = ALTER TABLE ADD COLUMN
  → Si on a créé une entité → delta = CREATE TABLE
  → Si on a supprimé une entité → delta = DROP TABLE
  
  Analogie : c'est l'équivalent de 'git diff' entre le modèle et la base
  ou de 'php artisan migrate' en Laravel`,
    questions: [
      {
        id: 're1',
        enonce: "Dans ODM, quelles sont les étapes exactes pour réaliser un reverse engineering d'un schéma Oracle ?",
        choix: [
          "Ouvrir le projet existant → clic droit → 'Synchronize with Database'",
          "Fermer tout projet → créer un nouveau Design → File > Import > Data Dictionary → Add (configurer la connexion) → tester → lancer l'import",
          "Tools > Design Rules → Reverse Engineering → Connect to Database",
          "File > New Design → Database > Oracle → Import Schema",
        ],
        reponse: 1,
        explication: "Le cours est précis sur ces étapes : (1) Fermer tout projet en cours (important !), (2) Créer un nouveau Design, (3) File > Import > Data Dictionary, (4) Add pour ajouter la connexion, (5) Saisir les infos de connexion au schéma Oracle (host, port, service, user, password), (6) Tester la connexion, (7) Sauvegarder et lancer. Résultat : ODM génère automatiquement le Relational Model.",
      },
      {
        id: 're2',
        enonce: "Pourquoi doit-on DÉCOCHER les options de consolidation lors du reverse engineering dans ODM ?",
        choix: [
          "Pour des raisons de performance — la consolidation ralentit l'import",
          "Parce que lors d'un reverse engineering, on veut lire la base TELLE QU'ELLE EST, sans appliquer de transformations. Cocher la consolidation ferait interpréter la base selon des règles qui fausseraient le modèle généré",
          "Parce que les options de consolidation sont réservées aux DBA Oracle",
          "C'est juste une bonne pratique — les cocher ou non ne change rien",
        ],
        reponse: 1,
        explication: "Lors du reverse engineering, ODM doit reconstruire fidèlement ce qui existe dans la base. Si on active la consolidation en même temps, ODM va comparer ce qu'il lit avec... rien (il n'y a pas encore de modèle), ce qui peut créer des artefacts. La règle du cours : 'Décochez tout ce qui est coché' lors de l'import par Data Dictionary.",
      },
      {
        id: 're3',
        enonce: "Après avoir modifié le MCD et régénéré le MLD-R, que génère exactement le mécanisme de consolidation ?",
        choix: [
          "Un script SQL complet recréant toutes les tables (DROP + CREATE)",
          "Uniquement le SQL-DDL de DIFFÉRENCES (delta) entre le modèle actuel et la base Oracle existante",
          "Un rapport de validation sans SQL",
          "Une sauvegarde du schéma existant avant modification",
        ],
        reponse: 1,
        explication: "La consolidation compare modèle vs base et génère SEULEMENT ce qui a changé. Si on a ajouté une colonne 'email' à la table CLIENTS → delta = ALTER TABLE CLIENTS ADD (email VARCHAR2(100)). Les données existantes sont préservées. Si rien n'a changé → delta vide. C'est l'équivalent de 'php artisan migrate' (Laravel) ou de 'git diff' suivi d'un 'git apply'.",
      },
      {
        id: 're4',
        enonce: "Peut-on obtenir le MCD depuis un reverse engineering ? Comment ?",
        choix: [
          "Oui, automatiquement et parfaitement — c'est la fonction principale du reverse engineering",
          "Partiellement : ODM reconstruit fidèlement le MLD-R + MPD depuis le dictionnaire, mais le MCD doit être déduit/reconstruit depuis le MLD-R, ce qui est moins automatique et peut nécessiter un travail manuel",
          "Non, le MCD ne peut jamais être reconstruit depuis une base existante",
          "Oui, mais uniquement si la base a été créée avec MVC-CD ou ODM initialement",
        ],
        reponse: 1,
        explication: "Le reverse engineering reconstruit facilement MLD-R + MPD depuis le dictionnaire Oracle (les tables, colonnes, PK, FK, types sont dans le dictionnaire). Mais le MCD (niveau conceptuel) doit être déduit par inférence logique depuis le MLD-R — moins automatique et souvent moins exact. L'avantage du MCD : vue métier abstraite, indépendante de la technologie, utile pour comprendre le sens.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 12. LIEN DE PROGRAMMATION
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'lien_prog',
    titre: 'Lien de Programmation',
    emoji: '🔌',
    couleur: COULEURS_CHAPITRES.lien_prog,
    description: '<<LP>>, stabilité du code applicatif, cas Biblio et Botanique',
    theorie: `PROBLÈME : Le code applicatif doit parfois se baser sur des valeurs métier pour décider d'une règle de gestion.

Exemple (cas Livres/TypesLivres) :
  IF v_typeLivre = 'Enfant' THEN   ← règle : si type = Enfant, ageMin obligatoire
    IF v_livre_ageMin IS NULL THEN
      raise_app_error("L'âge min est obligatoire")
    END IF
  END IF

PROBLÈME avec ce code :
  → Si un utilisateur renomme le type 'Enfant' en 'Enfants' (avec s)
  → Le NID-1 libelle est MODIFIABLE par nature
  → Le code plante ou ne s'applique plus
  → "KAPPUT !" — le code est cassé sans qu'on l'ait modifié

SOLUTION : Le LIEN DE PROGRAMMATION <<LP>>

Principe :
  • Dans le MCD : définir un lien de programmation sur un identifiant naturel (NID)
  • Dans le MLD-R : ajout d'une colonne supplémentaire nommée LienProg
  • Stéréotype <<LP>> : valeur OBLIGATOIRE + UNIQUE + NON-MODIFIABLE (frozen !)
  • Alimenté automatiquement à l'INSERTION avec la valeur du NID au moment de la création

Fonctionnement (table TypesLivres) :
  INSERT INTO TYPESLIVRES (libelle) VALUES ('Enfant')
  → Déclenche le trigger BIR_TYPESLIVRES
  → API alimente automatiquement : lienProg = libelle = 'Enfant'
  → Résultat : num=12, libelle='Enfant', lienProg='Enfant'

  UPDATE TYPESLIVRES SET libelle='Enfants' WHERE libelle='Enfant'
  → num=12, libelle='Enfants', lienProg='Enfant'  ← lienProg NE CHANGE PAS !

  IF v_typeLivre.LIENPROG = 'Enfant' THEN   ← code stable !
  → Fonctionne même si le libellé devient 'Enfants', 'Jeunesse', 'Young readers'...

MLD-R de TypesLivres avec LP :
  <<Table>> TypesLivres
  <<PK>> num : NUMERIC {aid}
  <<NID-1>> <<M>> libelle : VARCHAR (word)
  <<LP>> <<M>> lienProg : VARCHAR (word)   ← colonne ajoutée par le LP
  <<PK>> PK_tyLiv(num)
  <<U>> NID1_tyLiv_libelle(libelle)
  <<U>> LP_tyLiv(lienProg)                 ← contrainte UNIQUE sur lienProg

Cas réel : Projet Botanique (cours 2025)
  Table REGNES_BIOLOGIE avec lienProg 'PLANTE' / 'CHAMPIGNON'
  → URL https://portail-gpsr.unine.ch/plantes/1050380
  → Code : WHERE regnes_biologie.lienprog = 'PLANTE' AND idtaxon = '1050380'
  → Même si le libellé change (Plante → Végétal), l'URL et le code fonctionnent toujours

Propriétés du <<LP>> :
  • NOT NULL (<<M>>) — toujours alimenté
  • UNIQUE (<<U>>) — un LP identifie un et un seul type
  • NON-MODIFIABLE — une fois créé, ne change jamais
  • Alimenté auto à l'insertion = "photo" du NID au moment de la création`,
    questions: [
      {
        id: 'lp1',
        enonce: "Quel problème le Lien de Programmation (<<LP>>) résout-il ?",
        choix: [
          "Il améliore les performances des requêtes SQL sur les tables de référence",
          "Il découple le code applicatif des valeurs affichées à l'utilisateur. Si le libellé 'Enfant' change en 'Enfants', le code qui teste LIENPROG = 'Enfant' continue de fonctionner",
          "Il génère automatiquement la PK des tables de référence",
          "Il permet de créer des liens entre tables sans clé étrangère",
        ],
        reponse: 1,
        explication: "Sans LP : code = IF libelle = 'Enfant'. Quelqu'un change le libellé en 'Enfants' → code cassé. Avec LP : code = IF lienProg = 'Enfant'. lienProg est NON-MODIFIABLE (figé à la création avec la valeur initiale du NID). L'utilisateur peut changer le libellé autant qu'il veut — le code reste stable. C'est le découplage entre valeur affichée et valeur de référence.",
      },
      {
        id: 'lp2',
        enonce: "Quelles sont les propriétés exactes du stéréotype <<LP>> dans le MLD-R ?",
        choix: [
          "Unique + optionnel + modifiable par l'administrateur",
          "NOT NULL + UNIQUE + NON-MODIFIABLE ({frozen}) + alimenté automatiquement à l'insertion avec la valeur du NID courant",
          "NOT NULL + PRIMARY KEY + auto-généré par séquence",
          "UNIQUE seulement — les autres propriétés sont optionnelles",
        ],
        reponse: 1,
        explication: "Le cours précise les 4 propriétés du <<LP>> : (1) NOT NULL (<<M>>) — toujours alimenté, (2) UNIQUE (<<U>>) — un LP identifie un seul enregistrement, (3) Non-modifiable = {frozen} — une fois créé, le lienProg ne change JAMAIS même si le libellé change, (4) Alimenté auto à l'insertion = la valeur du NID au moment du CREATE. Ces 4 propriétés ensemble garantissent la stabilité.",
      },
      {
        id: 'lp3',
        enonce: "Dans le projet Botanique 2025, comment le LP permet-il de construire des URLs stables ?",
        choix: [
          "En générant automatiquement des slugs URL-safe depuis le libellé",
          "La colonne lienProg contient 'PLANTE' ou 'CHAMPIGNON' (valeurs figées). L'URL utilise WHERE lienprog='PLANTE' — même si le libellé change en 'Végétal', l'URL /plantes/... et le code WHERE restent valides",
          "En créant une table de correspondance URL → libellé",
          "Le LP n'intervient pas dans la construction des URLs",
        ],
        reponse: 1,
        explication: "URL : https://portail-gpsr.unine.ch/plantes/1050380. La query : WHERE regnes_biologie.lienprog = 'PLANTE' AND idtaxon = '1050380'. Le lienProg 'PLANTE' est figé depuis la création du règne. Même si le libellé devient 'Végétal' ou 'Plantes supérieures', lienProg reste 'PLANTE' → l'URL et le code de routage fonctionnent sans modification.",
      },
      {
        id: 'lp4',
        enonce: "Sur quel type de colonne peut-on définir un Lien de Programmation ? Pourquoi pas sur n'importe quelle colonne ?",
        choix: [
          "Sur n'importe quelle colonne NOT NULL de la table",
          "Uniquement sur un IDENTIFIANT NATUREL (NID) — parce que le LP est une 'photo stable' du NID, et un NID est par définition le meilleur candidat pour identifier un type de référence dans le code",
          "Sur la clé primaire AID uniquement",
          "Sur les colonnes de type VARCHAR uniquement",
        ],
        reponse: 1,
        explication: "Le LP est défini sur un NID car : (1) le NID a déjà une valeur significative pour l'identification (c'est une donnée métier), (2) le NID est unique et non-null, (3) l'objectif est de 'photographier' la valeur identifiante au moment de la création pour servir de référence stable dans le code. Définir un LP sur un attribut quelconque (ex: une description) n'aurait pas de sens.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 13. TYPES DE DONNÉES RICHES
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'types',
    titre: 'Types de Données Riches',
    emoji: '📐',
    couleur: COULEURS_CHAPITRES.types,
    description: 'token, word, positiveDecimal, positiveMoney, nonNegativeInteger, domaines ODM',
    theorie: `Les types "riches" du profil MVC-CD sont des sous-types enrichis des types SQL standards.
Ils ajoutent des contraintes de validation qui NE PEUVENT PAS être faites en SQL simple.

Hiérarchie des types chaîne de caractères :
  string (le plus large)
    └── normalizedString (texte libre avec espaces multiples)
          └── token (un token sans caractères spéciaux)
                └── word (un seul mot, sans espaces)

  token : chaîne de caractères où les caractères non-autorisés sont interdits
    → Implémentée par une contrainte CHECK ou une validation dans les APIs
    → Interdit les espaces en début/fin, les retours à la ligne, etc.
    → Exemple : nom : token(40) → "Jean-Luc" OK, "  Jean  " NON

  word : encore plus restrictif que token — un seul "mot" sans espaces
    → Exemple : mnemo : word(4) → "CAMU" OK, "Jean Luc" NON
    → Utilisé pour les codes, abréviations, identifiants courts

Types numériques enrichis (hiérarchie complète) :
  decimal → integer → nonPositiveInteger → negativeInteger
                    → nonNegativeInteger (≥ 0) → positiveInteger (> 0)
  money (décimal avec format monétaire CHF) → positiveDecimal (D*+, décimal > 0)
  → nonNegativeMoney, positiveMoney (avec format monétaire)

Types les plus utilisés dans le cours :
  nonNegativeInteger : entier ≥ 0 (ex: âge, quantité, nbHeures)
  positiveDecimal : décimal strictement > 0 (ex: note sur 6)
  positiveMoney : montant monétaire > 0 avec format 1'230.00 CHF
  nonNegativeMoney : montant ≥ 0

Domaines dans ODM (équivalent des types riches) :
  PK_Numerique = Integer(38) → pour toutes les PK
  OUI_NON = Char(1) avec CHECK IN ('Y', 'N') → booléen Oracle
  Ces domaines génèrent des contraintes CHECK au niveau physique !

Implémentation physique :
  • Les contraintes de type (valeur > 0, pas de caractères spéciaux) → contraintes CHECK en SQL
  • Les validations complexes (format token, format word) → triggers/procédures PL/SQL dans les APIs
  • Les domaines ODM → contraintes CHECK dans le CREATE TABLE ou CONSTRAINT`,
    questions: [
      {
        id: 'ty1',
        enonce: "Quelle est la différence entre les types 'token' et 'word' dans le profil MVC-CD ?",
        choix: [
          "token est pour les nombres, word est pour le texte",
          "token = chaîne de caractères sans caractères spéciaux non-autorisés (peut contenir des espaces entre les mots) ; word = un SEUL mot sans espaces du tout — encore plus restrictif",
          "Ce sont deux noms pour le même type, utilisés dans des contextes différents",
          "token est limité à 30 caractères, word est limité à 10",
        ],
        reponse: 1,
        explication: "Hiérarchie : string > normalizedString > token > word. token permet 'Jean-Luc', 'Expert Oracle PL/SQL' (avec espaces entre mots). word permet uniquement 'CAMU', 'mnemo', 'AB123' — pas d'espace. Dans le cas Ecrisoft : raisonSociale : token (raison sociale peut avoir des espaces) vs mnemo : word(4) (code court sans espace).",
      },
      {
        id: 'ty2',
        enonce: "Quelle est la différence entre positiveDecimal et positiveMoney ?",
        choix: [
          "positiveDecimal est limité à 2 décimales, positiveMoney a une précision arbitraire",
          "Les deux imposent une valeur décimale > 0, mais positiveMoney AJOUTE un formatage monétaire (1'230'000.00 CHF) — même contrainte numérique, présentation différente",
          "positiveDecimal est pour les notes (0-6), positiveMoney est pour les prix",
          "Ce sont des synonymes",
        ],
        reponse: 1,
        explication: "Les deux sont dans l'ensemble D*+ (décimaux strictement positifs). La différence = formatage : positiveDecimal = juste le nombre (3.5, 1250.00...). positiveMoney = mise en forme monétaire : 1'230.00 CHF, 45'000.00 EUR... La contrainte de validation numérique (>0) est identique. Dans l'affichage Oracle : positiveMoney peut utiliser TO_CHAR avec un masque monétaire.",
      },
      {
        id: 'ty3',
        enonce: "nonNegativeInteger dans la checklist Ecrisoft implique quelle contrainte concrète ?",
        choix: [
          "NOT NULL uniquement",
          "Entier ≥ 0 : le type SQL est NUMERIC et une contrainte CHECK valeur ≥ 0 est ajoutée",
          "Entier strictement positif (> 0) — 0 n'est pas autorisé",
          "C'est juste un commentaire documentaire, sans contrainte SQL",
        ],
        reponse: 1,
        explication: "nonNegativeInteger = entier de l'ensemble ℤ+ (zéro et positifs). Implique : type NUMERIC en SQL + CHECK(valeur >= 0). Dans la checklist Ecrisoft : 'nonNegativeInteger : type numérique' + 'nonNegativeInteger : Contrôle que la valeur soit >= 0'. Exemple d'usage : ageMin : nonNegativeInteger(2) → un âge ne peut pas être négatif.",
      },
      {
        id: 'ty4',
        enonce: "Un domaine ODM 'OUI_NON = Char(1), valeurs autorisées : Y, N' génère quoi au niveau physique ?",
        choix: [
          "Un trigger BEFORE INSERT/UPDATE qui vérifie la valeur",
          "Une contrainte CHECK au niveau du CREATE TABLE : colonne CHAR(1) CHECK(colonne IN ('Y','N'))",
          "Un type Oracle natif BOOLEAN",
          "Une table de référence séparée avec les valeurs autorisées",
        ],
        reponse: 1,
        explication: "Les domaines ODM avec liste de valeurs autorisées génèrent automatiquement une contrainte CHECK au niveau physique. Le SQL généré : obligation CHAR(1) NOT NULL CONSTRAINT CHK_TAB_obligation CHECK (obligation IN ('Y','N')). Dans le cours : la colonne 'Obligation' de la table Classe utilise le domaine OUI_NON.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 14. DÉVELOPPEMENT ITÉRATIF
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'iteratif',
    titre: 'Développement Itératif MDE',
    emoji: '🔁',
    couleur: COULEURS_CHAPITRES.iteratif,
    description: 'Cycle itératif, consolidation delta, regénération cohérente',
    theorie: `Le développement itératif en MDE = ajouter des fonctionnalités progressivement tout en maintenant LA COHÉRENCE entre modèle et base à chaque itération.

CYCLE D'UNE ITÉRATION :
  1. Modifier le MCD (ajouter entité, association, attribut...)
  2. Transformer MCD → MLD-R (plugin MVC-CD ou manuellement dans ODM)
  3. Lancer la CONSOLIDATION → obtenir le delta SQL-DDL
  4. Exécuter le delta SQL-DDL dans le schéma Oracle (ALTER TABLE, CREATE TABLE...)
  5. Regénérer les APIS de tables (car la structure a pu changer)
  6. Exécuter les APIs (CREATE OR REPLACE → pas besoin de DROP)
  7. Tester avec les nouvelles données

PROBLÈMES spécifiques lors de l'itération (cas Biblio) :
  Si on AJOUTE une entité avec des FK vers des entités existantes :
    → La consolidation génère CREATE TABLE + ADD CONSTRAINT FK
    → OK si la table cible existe déjà

  Si on AJOUTE une CONTRAINTE NOT NULL sur une colonne existante qui contient des NULL :
    → Oracle refuse l'ALTER TABLE (données invalides)
    → Il faut d'abord mettre à jour les données, PUIS ajouter la contrainte
    → C'est normal : "Que se passe-t-il ? Pourquoi est-ce normal ?"
    → Réponse attendue du prof : les données existantes violent la nouvelle contrainte

API DE TABLES dans le contexte itératif :
  → Regénérer à chaque itération car les APIs s'appuient sur la structure
  → Simple : CREATE OR REPLACE (pas de DROP nécessaire)
  → Les triggers et packages sont remplacés à chaud

Mécanisme de consolidation dans ODM (étape 2 du projet Biblio) :
  → File > Import > Data Dictionary (connexion existante)
  → Lancer la consolidation
  → 'DDL Preview' pour voir le delta AVANT exécution
  → Option 'Export to database' pour exécuter directement
  → ⚠️ Désactiver 'Export to database' pour générer le script d'abord (bonne pratique)`,
    questions: [
      {
        id: 'it1',
        enonce: "Dans la démarche MDE avec ODM, quel est l'ordre correct des étapes lors d'une nouvelle itération après modification du MCD ?",
        choix: [
          "Modifier la base directement en SQL → mettre à jour le MCD pour qu'il corresponde",
          "Modifier le MCD → Transformer en MLD-R → Consolidation (delta SQL-DDL) → Exécuter delta → Regénérer APIs",
          "Regénérer APIs → Consolidation → Transformer MLD-R → Modifier MCD",
          "Consolidation → Modifier MCD → APIs → Exécuter SQL",
        ],
        reponse: 1,
        explication: "Le modèle est TOUJOURS la source de vérité. On ne touche JAMAIS la base directement. L'ordre strict : (1) Modifier le MCD, (2) Transformer en MLD-R (dans ODM : les transformations se font via les scripts), (3) Consolidation = comparaison modèle/base → delta SQL, (4) Exécuter le delta, (5) Regénérer les APIs (car la structure a changé). Inverser cet ordre viole le principe MDE.",
      },
      {
        id: 'it2',
        enonce: "Lors du cas Biblio étape 3 (ajout de l'entité Langue), un problème survient avec la consolidation. Quel est-il et pourquoi est-ce 'normal' ?",
        choix: [
          "ODM génère du SQL incorrect — c'est un bug",
          "La consolidation génère un ALTER TABLE ajoutant une colonne NOT NULL sur une table existante qui contient déjà des données sans cette colonne → Oracle refuse (les lignes existantes seraient NULL). Il faut d'abord remplir les données puis ajouter la contrainte",
          "La connexion Oracle est perdue lors de la consolidation",
          "Les APIs générées entrent en conflit avec les données existantes",
        ],
        reponse: 1,
        explication: "C'est une situation réelle en développement itératif. Si on ajoute une colonne NOT NULL sur une table avec 1000 lignes existantes : Oracle ne peut pas ajouter NOT NULL car les 1000 lignes auraient cette colonne à NULL. Solution : (1) Ajouter la colonne sans NOT NULL, (2) UPDATE pour alimenter toutes les lignes, (3) ALTER TABLE MODIFY colonne NOT NULL. Le cours demande d'expliquer pourquoi c'est 'normal'.",
      },
      {
        id: 'it3',
        enonce: "Pourquoi le développement itératif est-il un avantage majeur de la démarche MDE par rapport au développement 'classique' ?",
        choix: [
          "Parce qu'il permet de livrer plus vite sans tests",
          "Parce que la cohérence modèle↔base est GARANTIE AUTOMATIQUEMENT par les outils à chaque itération — sans MDE, maintenir cette cohérence manuellement entre doc, schéma et code est source d'erreurs constantes",
          "Parce qu'il évite d'écrire du SQL",
          "Parce qu'Oracle impose les itérations dans ses licences",
        ],
        reponse: 1,
        explication: "Sans MDE : à chaque évolution, il faut manuellement mettre à jour la doc (MCD sur papier), écrire les ALTER TABLE, modifier les triggers, tout tester... avec des erreurs inévitables (oubli d'une colonne, trigger non mis à jour). Avec MDE : modifier le MCD → tout est regénéré automatiquement et cohérent. La valeur = l'automatisation de la cohérence verticale.",
      },
    ],
  },
]

// ================================================================
// FLASHCARDS (extraites des documents réels)
// ================================================================
export const FLASHCARDS = [
  { recto: "MDE", verso: "Model-Driven Engineering — ingénierie générative où les modèles pilotent la génération du code. Principe : 'tout ou partie d'une application est générée à partir de modèles servant de spécifications'" },
  { recto: "Postulat des générateurs", verso: "On NE MODIFIE JAMAIS le code généré manuellement. On modifie le modèle et on regénère. Modifier le code généré = perdre les modifications à la prochaine itération." },
  { recto: "Référentiel AGL", verso: "Pièce maîtresse du MDE. Stocke tous les objets du SI, assure la traçabilité entre niveaux, peut les restituer sous forme graphique/textuelle. VP = .vpp | ODM = .dmd" },
  { recto: "MVC-CD", verso: "Plugin Visual Paradigm de la HE-Arc. Crée un DSL (profil UML enrichi) + génère MCD→MLD-R→MPD-R→SQL-DDL automatiquement. VP = éditeur, MVC-CD = générateur." },
  { recto: "Niveaux d'abstraction Merise", verso: "Conceptuel (MCD — vision métier) → Logique (MLD-R — SQL standard) → Physique (MPD-R Oracle — triggers, séquences, types Oracle)" },
  { recto: "Terminologie ODM", verso: "Logical Model = MCD (conceptuel) ! Relational Model = MLD-R (logique). Physical Model = MPD-R. ATTENTION : contre-intuitif !" },
  { recto: "<<AID>>", verso: "Auto-generated ID. PK générée par séquence Oracle, aucun sens métier. Ex: num = 1,2,3... | Laravel: $table->id()" },
  { recto: "<<NID-1>>", verso: "Natural ID. Identifiant naturel avec sens métier. Propriétés: UNIQUE + NOT NULL + MODIFIABLE. En MLD-R: contrainte UNIQUE + NOT NULL (PAS la PK). Ex: matricule, code ISBN" },
  { recto: "<<CID>>", verso: "Composition ID. Entité dépendante, n'existe pas sans son parent. Numérotation locale (repart à 1 par parent). En DT: PK = (CID + FK_parent)" },
  { recto: "<<M>>", verso: "Mandatory = attribut obligatoire → NOT NULL en SQL" },
  { recto: "<<AAU>> / <<AAI>>", verso: "ajUser (alimenté à l'INSERT avec USER) / ajDate (alimenté à l'INSERT avec SYSDATE). Colonnes d'audit 'création'. Jamais modifiées après." },
  { recto: "<<AMU>> / <<AMI>>", verso: "moUser (mis à jour à chaque UPDATE avec USER) / moDate (mis à jour à chaque UPDATE avec SYSDATE). Colonnes d'audit 'modification'." },
  { recto: "Limite colonnes d'audit vs _JN", verso: "Colonnes d'audit = DERNIÈRE modification uniquement. Suppression non traçable (ligne disparaît). Table _JN = HISTORIQUE COMPLET de toutes les opérations (INS/UPD/DEL)." },
  { recto: "Mode DT", verso: "Dépendance entre Tables. Table associative N:N → PK COMPOSITE = (FK1 + FK2). Garantit automatiquement: NOT NULL, unicité du couple, non-modifiabilité des FK." },
  { recto: "Mode TI", verso: "Tables Indépendantes. Toutes les tables ont une PK mono-colonne (AID). Compenser avec: NOT NULL sur FK + SIMPK (UNIQUE combiné) + {stability}" },
  { recto: "SIMPK", verso: "SIMulation de clé Primaire. Contrainte UNIQUE sur (FK1+FK2) en mode TI. Compense la perte de l'unicité garantie par la PK composite en mode DT." },
  { recto: "{frozen} sur colonne", verso: "Cette colonne ne peut plus être modifiée après insertion. Ex: dateSignature. Trigger BEFORE UPDATE bloque si :OLD.valeur ≠ :NEW.valeur" },
  { recto: "{frozen} sur association", verso: "La FK correspondante est figée — l'enfant ne peut pas changer de parent. Ex: Mandat reste lié à son Client. Dans ODM: Transferable = false. ⚠️ Non géré dans la consolidation ODM → DDL Preview" },
  { recto: "{ordered}", verso: "Ajoute colonne ORDRE NOT NULL + UNIQUE dans la table. Valeurs multiples de 10 (10,20,30...) pour laisser de l'espace. Alimentée auto par APIs. Ex: Jours → Lundi=10, Mardi=20..." },
  { recto: "{stability}", verso: "Immuabilité des FK en mode TI uniquement. Compense la perte de l'immuabilité de la PK composite. Trigger BEFORE UPDATE sur les FK." },
  { recto: "{nonoriented}", verso: "Association symétrique (A,B)=(B,A). SQL UNIQUE ne suffit pas car (3,7)≠(7,3). Trigger BEFORE INSERT vérifie l'existence de la version inversée." },
  { recto: "{absolute}", verso: "Sur un NID dans association identifiante. Rend le NID unique GLOBALEMENT (pas juste par parent). Ex: numéro de châssis unique dans le monde entier." },
  { recto: "APIs de tables", verso: "6 triggers (BIR/BUR/BDR/AIR/AUR/ADR) + package PL/SQL (procédures ins/upd/del/journal/autogen_column). Prennent en charge: PK, audit, journalisation, contraintes non-déclaratives, types riches." },
  { recto: "Table _JN (journalisation)", verso: "Colonnes contexte: JN_DATETIME, JN_OPERATION (INS/UPD/DEL), JN_USER, JN_SESSION, JN_APPL + TOUTES les colonnes de la table source. Historique complet." },
  { recto: "Association identifiante NID", verso: "L'attribut NID de l'enfant est unique DANS LE CONTEXTE du parent. Ex: immatriculation unique par dépôt. MLD-R: UNIQUE(identification + dep_num)" },
  { recto: "Association identifiante CID (<<CID>>)", verso: "Entité n'existe pas sans parent. Numérotation repart à 1 par parent. Non-transférable (ne change pas de parent). MLD-R (DT): PK = (numEnfant + FK_parent)" },
  { recto: "Losange ◆ dans ODM", verso: "Identifying relationship = association identifiante. La PK de l'enfant inclut la PK du parent (PK composite). Équivalent de CID dans MVC-CD/VP." },
  { recto: "Notation Barker (ODM)", verso: "# = PK | U = Unique (NID) | * = Non nul (obligatoire) | o = optionnel | Patte d'oie = cardinalité N | Trait plein = cardinalité min 1 | Trait tillé = min 0" },
  { recto: "Domaine ODM", verso: "Type de données personnalisé et réutilisable. Ex: PK_Numerique=Integer(38), OUI_NON=Char(1) IN('Y','N'). Génère une contrainte CHECK au niveau physique." },
  { recto: "Consolidation", verso: "Compare modèle (référentiel) vs base Oracle → génère uniquement le SQL-DDL DELTA (différences). Analogue: php artisan migrate ou git diff+apply." },
  { recto: "Reverse engineering ODM (étapes)", verso: "1.Fermer tout projet, 2.Nouveau Design, 3.File>Import>Data Dictionary, 4.Add (connexion), 5.Tester, 6.Lancer import. ⚠️ Décocher options consolidation !" },
  { recto: "<<LP>> Lien de Programmation", verso: "Colonne supplémentaire sur un NID. NOT NULL + UNIQUE + NON-MODIFIABLE. Alimentée auto à l'INSERT avec la valeur du NID. Permet au code de référencer une valeur stable même si le libellé change." },
  { recto: "token", verso: "Type chaîne sans caractères non-autorisés (espaces début/fin, retours ligne...). Plus restrictif que VARCHAR. Ex: nom token(40) = 'Jean-Luc' OK, '  Jean  ' NON" },
  { recto: "word", verso: "Type encore plus restrictif que token. Un seul 'mot' sans espaces. Ex: mnemo word(4) = 'CAMU' OK, 'Jean Luc' NON. Utilisé pour codes et abréviations." },
  { recto: "positiveDecimal vs positiveMoney", verso: "Les deux = décimal > 0. positiveMoney AJOUTE un format monétaire: 1'230.00 CHF. Contrainte numérique identique, présentation différente." },
  { recto: "nonNegativeInteger", verso: "Entier de l'ensemble ℤ+ (≥ 0). SQL: NUMERIC + CHECK(valeur >= 0). Ex: ageMin, nbHeures, quantité." },
  { recto: "Développement itératif MDE", verso: "Cycle: MCD → consolidation delta → exécuter delta → regénérer APIs. Garantie automatique de cohérence modèle↔base. CREATE OR REPLACE pour les APIs = pas de DROP nécessaire." },
  { recto: "Simulation entité associative (ODM)", verso: "Dans ODM, pas d'entité associative native. Pour TI: créer une entité avec AID (ex: Realisation, num PK) + deux relations père-fils NON-TRANSFÉRABLES vers les deux parents." },
  { recto: "Custom Design Rule (ODM)", verso: "Règle de validation créée par l'entreprise dans ODM (script JavaScript/Nashorn). Vérifie la conformité des modèles aux standards d'entreprise automatiquement." },
  { recto: "Stratégie 2 alimentation PK (MVC-CD)", verso: "Séquence Oracle (SEQ_NOMTABLE, Cache=20) + trigger BIR_NomTable. La procédure ins() appelle SEQ_NOMTABLE.NEXTVAL et alimente la PK. Visible dans le MPD VP." },
]

export const TOTAL_QUESTIONS = CHAPITRES.reduce((s, c) => s + c.questions.length, 0)
export const TOTAL_FLASHCARDS = FLASHCARDS.length
