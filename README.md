# 🧠 MDE Quiz — 62-41.2

Application de révision complète pour le cours **Ingénierie pilotée par les modèles de données (MDE)**.

## Contenu

- **~70 questions** réparties en 11 chapitres
- **27 flashcards** avec système de mémorisation
- **Progression sauvegardée** dans le navigateur (localStorage)
- **Quiz par chapitre** ou quiz global mélangeant tout

## Chapitres couverts

1. 🏛️ Fondements MDE & Merise
2. 🏷️ Stéréotypes & Identifiants (AID, NID, CID, M...)
3. ⚙️ Transformation MCD → MLD-R
4. ⚡ Modes DT vs TI
5. 🔗 Associations Identifiantes (NID, CID, {absolute})
6. 🧊 Contraintes Non-Déclaratives ({frozen}, {ordered}, {stability}, {nonoriented})
7. 🔧 APIs de Tables (triggers, journalisation, audit)
8. 🛠️ Outils VP/MVC-CD & ODM
9. 🔄 Reverse Engineering & Consolidation
10. 🔌 Lien de Programmation (<<LP>>)
11. 📐 Types de Données Riches (token, word, domaines ODM)
12. 🔁 Développement Itératif

## Déploiement sur Vercel (5 minutes)

### Option 1 — Via GitHub (recommandé)

1. Crée un repo GitHub et pousse ce dossier :
```bash
cd mde-quiz
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TON_USERNAME/mde-quiz.git
git push -u origin main
```

2. Va sur [vercel.com](https://vercel.com) → **New Project**
3. Importe ton repo GitHub
4. Laisse tous les paramètres par défaut (Next.js détecté automatiquement)
5. Clique **Deploy** → URL disponible en 2 minutes ✅

### Option 2 — Via Vercel CLI

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

## Structure du projet

```
mde-quiz/
├── data/
│   └── cours.js          ← Toutes les questions et flashcards
├── pages/
│   ├── index.js          ← Page d'accueil
│   ├── flashcards.js     ← Page flashcards
│   └── quiz/
│       ├── index.js      ← Quiz global
│       └── [id].js       ← Quiz par chapitre
├── components/
│   └── QuizEngine.js     ← Moteur de quiz réutilisable
├── styles/
│   └── globals.css
├── next.config.js
└── package.json
```

## Ajouter des questions

Édite `data/cours.js` et ajoute des objets dans le tableau `questions` du chapitre voulu :

```js
{
  id: "unique_id",
  question: "Ta question ici ?",
  choix: ["Option A", "Option B", "Option C", "Option D"],
  reponse: 0,  // index de la bonne réponse (0 = A)
  explication: "Explication détaillée de la réponse correcte...",
}
```
