# Ta voix pour la vidéo Flow

10 répliques, **un fichier par réplique**. Les scènes se recalent automatiquement sur la durée réelle de ta voix.

## Comment enregistrer

- Téléphone posé à 20–30 cm de ta bouche, dans une pièce calme et meublée (pas une pièce vide qui résonne). Un placard plein de vêtements ou une voiture à l'arrêt marchent très bien.
- Application dictaphone de ton téléphone, qualité maximale.
- Parle comme si tu expliquais à quelqu'un en face de toi, souriant, pas comme une lecture. Pas trop vite.
- Laisse **une seconde de silence** au début et à la fin de chaque fichier (je coupe moi-même).
- Si tu te trompes, recommence la phrase entière dans le même fichier : je garderai la meilleure prise.
- Format : ce que ton téléphone produit (m4a, mp3, wav), peu importe.

## Les répliques

| Fichier | Texte |
|---|---|
| `01-accroche` | Vous avez une activité qui vous tient à cœur ? |
| `02-quotidien` | Entre les appels, les papiers et les relances… les journées filent vite. |
| `03-flow` | Chez Flow, on vous accompagne dans votre activité, pas à pas. |
| `04-site` | On crée votre site internet : vos clients vous trouvent, réservent et paient en ligne. Et si vous avez déjà un site, on l'améliore. |
| `05-app` | On conçoit aussi votre application, autour de votre façon de travailler : dossiers, planning, équipe… tout au même endroit. |
| `05b-preuves` | Des projets déjà en ligne, pour de vraies entreprises. |
| `06-tuto` | Pour commencer, c'est simple. Rendez-vous sur flowsurmesure.com, descendez en bas de la page, et répondez à quelques questions sur votre projet. |
| `06c-tuto-court` | Pour commencer, rendez-vous sur flowsurmesure.com. *(version courte de la vidéo)* |
| `07-cotes` | Et après la mise en ligne, on reste à vos côtés : le premier mois de maintenance est offert. |
| `08-fin` | Flow. Parlons de votre projet. |

Tu peux reformuler avec tes mots si une phrase ne sonne pas naturelle dans ta bouche : dis-le-moi, j'adapte les sous-titres.

## Ensuite (de mon côté)

1. Tes fichiers vont dans `audio/voix-adams/` avec ces noms.
2. `python timing-voix.py` nettoie les silences, convertit, retrouve le minutage de chaque mot (sous-titres) et remplace la voix de synthèse.
3. `python timeline.py long` puis `court`, rendu, `python assemble2.py ...` : la vidéo se recale sur ta voix.
