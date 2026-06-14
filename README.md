# 🧠 MDE Quiz v2 — 62-41.2

Application de révision **complète** du cours MDE, basée sur les documents réels du professeur Camus.

## Contenu

| | |
|---|---|
| **Questions** | ~100 questions avec explications détaillées |
| **Flashcards** | 40 flashcards avec système de mémorisation (je sais / à revoir) |
| **Chapitres** | 14 chapitres couvrant 100% du cours |
| **Théorie** | Contenu textuel complet extrait des slides pour chaque chapitre |

## Chapitres couverts (100% du cours)

1. 🏛️ **Fondements MDE** — définition, référentiel, postulat générateurs
2. 📐 **Merise & UML** — niveaux d'abstraction, forces/faiblesses, stratégie
3. 🔵 **MVC-CD & Profil UML** — DSL, démarche VP, génération automatique
4. 🏷️ **Stéréotypes & Identifiants** — AID, NID, CID, M, colonnes d'audit
5. ⚙️ **Transformation MCD→MLD-R** — les 3 cas, tables associatives, dépendantes
6. ⚡ **Modes DT vs TI** — SIMPK, {stability}, compensation PK composite
7. 🔗 **Associations Identifiantes** — NID vs CID, {absolute}, losange ODM
8. 🧊 **Contraintes Non-Déclaratives** — {frozen}, {ordered}, {stability}, {nonoriented}
9. 🔧 **APIs de Tables** — triggers BIR/BUR/BDR, journalisation _JN, séquences
10. 🟠 **Oracle Data Modeler** — notation Barker, domaines, référentiel de règles
11. 🔄 **Reverse Engineering & Consolidation** — étapes ODM, delta SQL
12. 🔌 **Lien de Programmation** — <<LP>>, cas Biblio, cas Botanique
13. 📐 **Types de Données Riches** — token, word, positiveDecimal, domaines ODM
14. 🔁 **Développement Itératif** — cycle MDE, consolidation, regénération APIs

## Déploiement Vercel (5 minutes)

### Via GitHub (recommandé)

```bash
# 1. Initialiser git et pousser
cd mde-quiz
git init
git add .
git commit -m "MDE Quiz v2 — cours complet"
git remote add origin https://github.com/TON_USERNAME/mde-quiz.git
git push -u origin main

# 2. Aller sur vercel.com → New Project → Import depuis GitHub
# 3. Laisser tous les paramètres par défaut (Next.js détecté auto)
# 4. Deploy → URL disponible en ~2 minutes ✅
```

### Via Vercel CLI

```bash
npm install -g vercel
cd mde-quiz
npm install
vercel --prod
```

## Développement local

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Ajouter des questions

Dans `data/cours.js`, ajouter dans le tableau `questions` du chapitre concerné :

```js
{
  id: 'identifiant_unique',
  enonce: 'Ta question ici ?',
  choix: ['Option A', 'Option B', 'Option C', 'Option D'],
  reponse: 0,           // index de la bonne réponse (0=A, 1=B...)
  explication: 'Explication détaillée de la bonne réponse...',
}
```

## Fonctionnalités

- ✅ **Progression sauvegardée** (localStorage) — reprends où tu t'es arrêté
- 📖 **Cours intégré** — bouton "Cours" dans chaque quiz pour lire la théorie
- 🔀 **Ordre aléatoire** — les questions sont mélangées à chaque session
- ❌ **Historique des erreurs** — résumé des questions ratées à la fin
- 🃏 **Flashcards avec flip** — système "je sais / à revoir"
- 📚 **Page théorie** — lecture complète du cours par chapitre
