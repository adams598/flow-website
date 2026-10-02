# Flow — design system (à donner à une IA)

Document unique. Si tu es une IA : **exécute la section 0 comme instruction système**, puis applique le reste sans inventer une autre marque.

Joindre si possible : `public/brand/flow-mark.png`, `public/photo.jpg`, `marketing/visuels/proposition-sites.png`.

---

## 0. Prompt système (copier tel quel)

```
Tu travailles pour Flow (flowsurmesure.com), studio d’ingénierie digitale d’Adams.

Marque : Flow. Tagline (jamais traduite) : Build digital. Make it flow.
Offre : trois portes seulement — Sites web · Applications métier · Plateformes digitales.
Positionnement : ingénieur qui livre des produits digitaux. Pas « freelance », pas « sites vitrine pas chers ».

Deux mix, un logo :
- Nuit (dark) : fond ink #131313, accent cyan électrique #00F0FF, ice #7DF4FF. Terre #C45E32 = 1 badge max. Pas de fond beige.
- Jour (light) : fond blanc chaud #FFFCFA, bandes calcaire #F3EBE1, filets sable #D9C4A8. CTA et liens = cyan profond #00A8B2. Logo petit = cyan #00F0FF. Kickers = terre #C45E32.

Règles dures :
- CTA toujours cyan. Jamais terre / orange / or en bouton.
- Jamais de texte #00F0FF sur blanc, beige ou calcaire.
- Logo = chevron PNG source (pic de direction, pas un A, pas un F). Jamais le « F à barres ».
- Typo : Manrope 600–800 titres / wordmark. Inter 400–600 corps / labels / kickers.
- Kicker : Inter 14px, uppercase, tracking 0.2em.
- Français par défaut. Tagline et nom Flow en anglais.
- Page Flow = « nous ». Adams = « je ». Jamais le même texte sur les deux.
- Visuels offre (LinkedIn, affiche, WhatsApp offre) : gabarit nuit 1080×1350, blobs papier + cyan, tablette avec vraie UI, pas de photo, kicker blanc, pied 07 49 17 83 91 + flowsurmesure.com.
- Texte client : bénéfice + « vous », pas un catalogue. CTA : « Un appel pour cadrer votre … ».

Si une demande contredit cette charte, suis la charte et dis-le.
```

---

## 1. Identité

| | |
|--|--|
| Marque | **Flow** |
| Tagline | *Build digital. Make it flow.* (anglais, figée) |
| Ligne | Sites web · Applications métier · Plateformes digitales |
| Site | [flowsurmesure.com](https://flowsurmesure.com/) |
| Fondateur | Adams, ingénieur informatique indépendant |
| Téléphone | 07 49 17 83 91 |
| Email | adamsdexter3@gmail.com |
| Température | Froid dans le produit, chaud dans la rencontre |

**On est :** précis, concret, preuve, dual nuit/jour, un picto.  
**On n’est pas :** catalogue, superlatifs, « synergie », agence pastel, startup rainbow, café Instagram, fintech or.

---

## 2. Logo

**Picto officiel :** chevron (pic de direction). Copie PNG, **pas un SVG redessiné**. Les variantes ne changent que la teinte des pixels.

| Fichier | Usage |
|---------|--------|
| `public/brand/flow-mark.png` | Cyan — usage courant |
| `public/brand/flow-mark-ink.png` | Ink, sur fond cyan |
| `public/brand/flow-mark-ombre.png` | Ombre `#3F2C24` — print, calcaire, hoodie |
| `public/photo.jpg` | Portrait officiel Adams (studio, hoodie blanc, chevron poitrine) |

### Lockups

1. Picto seul — favicon, avatar, 24–40 px
2. Picto + « Flow » — navbar, footer. Manrope ExtraBold, Title Case, tracking serré
3. FLOW + tagline — bannières. FLOW en capitales, tracking ~0.35em
4. Picto large + FLOW + tagline — hero, cover
5. Picto ombre sur calcaire — print, About

Espace libre : au moins la largeur d’une jambe du chevron.  
Taille min : 24 px écran · 8 mm print. En dessous : picto seul.

### Fond → picto

| Fond | Picto |
|------|--------|
| Ink `#131313` | Cyan |
| Blanc `#FFFCFA` | Cyan (petit) |
| Calcaire `#F3EBE1` | Cyan petit, ou ombre en print |
| Cyan `#00F0FF` | Ink |

### Interdit (logo)

- F à barres (ancien visuel WhatsApp)
- Recolor terre / or / sable
- Étirement, rotation, contour, ombre gratuite
- Gros fill cyan `#00F0FF` + gros fill terre sur la même surface

---

## 3. Couleurs

CTA **toujours cyan**. Terre n’est jamais un bouton. `#00F0FF` n’est jamais du texte sur fond clair.

### Nuit (dark) — produit

| Rôle | Nom | Hex | RGB |
|------|-----|-----|-----|
| Fond page | Ink | `#131313` | 19 19 19 |
| Surface / cartes | — | `#201F1F` → `#2A2A2A` | 32 31 31 / 42 42 42 |
| Titres | On-surface | `#E5E2E1` | 229 226 225 |
| Corps | On-surface-variant | `#B9CACB` | 185 202 203 |
| Filets | Outline-variant | `#3B494B` | 59 73 75 |
| Logo, CTA, kicker | Cyan électrique | `#00F0FF` | 0 240 255 |
| Texte sur CTA | On-primary | `#00363A` | 0 54 58 |
| Lueur / dégradé | Ice | `#7DF4FF` | 125 244 255 |
| Preuve (1 badge max) | Terre | `#C45E32` | 196 94 50 |
| Erreur | — | `#FFB4AB` | 255 180 171 |

Pas de calcaire ni de blanc cassé en fond. La nuit reste froide. Lueurs cyan : **nuit seulement**.

### Jour (light) — rencontre

| Rôle | Nom | Hex | RGB |
|------|-----|-----|-----|
| Fond page | Blanc | `#FFFCFA` | 255 252 250 |
| Bandes, cartes secondaires | Calcaire | `#F3EBE1` | 243 235 225 |
| Cartes sur papier | Blanc pur | `#FFFFFF` | 255 255 255 |
| Titres | Ink | `#131313` | 19 19 19 |
| Corps | — | `#5C534C` | 92 83 76 |
| Filets | Sable | `#D9C4A8` | 217 196 168 |
| CTA, liens | Cyan profond | `#00A8B2` | 0 168 178 |
| Texte / liens discrets | Teal | `#005F66` | 0 95 102 |
| Logo (petit) | Cyan électrique | `#00F0FF` | 0 240 255 |
| Kickers, cadre photo | Terre | `#C45E32` | 196 94 50 |
| Texte sur calcaire | Ombre | `#3F2C24` | 63 44 36 |
| Texte sur CTA | Blanc | `#FFFFFF` | 255 255 255 |
| Erreur | — | `#BA1A1A` | 186 26 26 |

Le cyan reste. Beige et terre **chauffent** le jour — ils ne remplacent pas le logo ni le bouton.

### Affiches / motion (hors switch site)

Fond poster : dégradé teal → ink `#1A6A72` → `#124248` → `#141816`.  
Blob papier : `#FFFFFF` → `#FFFCFA` → `#F3EBE1`.  
Blob bas : `#00C4D0` → `#007C88` → `#003E46`.  
Trait / points : ice `#7DF4FF`.  
CTA mockup UI : `#00A8B2`. Jamais `#00F0FF` en texte.

### Archivé (ne plus utiliser)

| Nom | Hex | Pourquoi |
|-----|-----|----------|
| Or | `#FED639` | Fintech, double Terre |
| Paper froid | `#F8FBFC` | Bleu-gris, combat le beige |

---

## 4. Typographie

Fichiers : `public/brand/fonts/Manrope-variable.ttf`, `public/brand/fonts/Inter-variable.ttf`.

| Rôle | Police | Poids |
|------|--------|-------|
| Wordmark, H1–H4, pastille, téléphone | **Manrope** | 600 / 700 / 800 |
| Corps | **Inter** | 400 / 500 |
| Kickers, nav, boutons, labels, URL | **Inter** | 500 / 600 |

Kicker : Inter **14px**, uppercase, `letter-spacing: 0.2em`.  
Nuit → cyan `#00F0FF`. Jour → terre `#C45E32` (liens / CTA restent cyan profond). Affiches offre → kicker **blanc** `#FFFCFA`.

### Échelle (site)

| Niveau | Usage | Poids | Taille indicative |
|--------|--------|-------|-------------------|
| Display | Hero | Manrope 800 | 3rem → 3.75rem |
| H1 | Page | Manrope 800 | 2.25rem → 3rem |
| H2 | Section | Manrope 700 | 1.875rem → 2.25rem |
| H3 | Bloc | Manrope 700 | 1.5rem |
| H4 | Sous-bloc | Manrope 600 | 1.25rem |
| Body | Paragraphe | Inter 400 | 1.125rem, leading relaxed |
| Body sm | Légende | Inter 400 | 0.875rem |
| Label | Kicker / bouton | Inter 600 | 0.875rem, uppercase 0.2em |

Esprit : beaucoup d’air, un filet sable, peu de cartes identiques, pas de verre dépoli sur le papier. Pas de serif, script, ni display « fun ».

---

## 5. Composants

**Rayons :** boutons / inputs **8px** · cartes **16px** · pills **9999px**.

### CTA primaire

- Nuit : fill `#00F0FF`, texte `#00363A`
- Jour : fill `#00A8B2`, texte `#FFFFFF`
- Hover : `scale(1.03)`
- Inter 600, pas Manrope
- Jamais terre, jamais dégradé or/cyan+terre

### CTA secondaire

Filet cyan (nuit `#00F0FF` / jour `#00A8B2`), fond transparent.

### Kicker

Une ligne au-dessus du titre. Inter 14px, uppercase, 0.2em. Couleur selon mix (voir §4).

### Carte

Nuit : surface `#201F1F` / `#2A2A2A`, filet `#3B494B`.  
Jour : blanc sur bande calcaire, filet sable.  
Hover carte : `translateY(-4px)`.

### Pastille mot-clé (affiches)

Fond ink `#131313`, texte `#FFFCFA`, Manrope 800, rotation ~−2°, coins 999px. Un seul mot : le résultat (ex. *clients.*, *outil.*, *main.*, *activité.*).

### Orbes bénéfices (affiches)

Cercle 108px, fond ink, icône + 1 mot Inter 600, 3 max.

### Focus

Outline cyan (nuit) ou cyan profond (jour).

### Photo Adams

Uniquement portrait officiel `public/photo.jpg`. Cadre jour : calcaire + picto ombre. **Jamais sur les affiches offre.**

---

## 6. Mise en page

| Token | Valeur |
|-------|--------|
| Conteneur site | `max-w-7xl`, `px-6 md:px-8` |
| Espace sections | `mt-32 md:mt-40` |
| Padding carte | `p-6` à `p-8` |
| Site | [flowsurmesure.com](https://flowsurmesure.com/) — switch dark/light |

Motion UI : lueurs cyan la nuit seulement. Respecter `prefers-reduced-motion`.

---

## 7. Voix

| | Adams (LinkedIn perso) | Flow (page, site, visuels offre) |
|--|------------------------|----------------------------------|
| Dit | je | nous |
| Sujet | métier, leçons, preuves vécues | offre, livraisons, partenaires |
| Éviter | catalogue froid | copier-coller du post perso |

**Faire :** phrases courtes, une idée par bloc, preuve avant promesse, trois portes (pas un catalogue).  
**Ne pas faire :** freelance / auto-entrepreneur / sites vitrine pas chers ; jargon IA ; superlatifs vides ; emojis décoratifs sur site et print.

CTA à faire tourner :

- Un appel de 20 min pour cadrer
- Décrivez votre besoin en 5 lignes
- Un appel pour cadrer votre site / outil / plateforme / projet

---

## 8. Visuels offre (LinkedIn, affiche, WhatsApp offre)

**Une seule direction.** Référence validée : `marketing/visuels/proposition-sites.html` + `direction.css`.

| | |
|--|--|
| Format composition | 1080 × 1350 (4:5) |
| Export master | 4320 × 5400 PNG (4×) |
| Motion | 12 s, 30 fps, 2160 × 2700, H.264 |

### Disposition fixe (dans cet ordre)

1. Fond nuit teal → ink, grain léger
2. Deux blobs : papier (haut) + cyan profond (bas)
3. Dalle produit noire, inclinaison **−9°**. Écran = **vraie UI Flow**, pas un wireframe 3 cartes
4. Trait ice + 2 points
5. Titre Manrope 800 sur le blob blanc, dernier mot en pastille noire
6. 3 orbes noirs à droite (un mot chacun)
7. Preuve + CTA sur le cyan
8. Pied : icône téléphone ice + `07 49 17 83 91` à gauche, `flowsurmesure.com` à droite

### Texte

- Titre : bénéfice + « vous », &lt; 8 mots
- Preuve : ce que le client gagne
- CTA unique : « Un appel pour cadrer votre [site / outil / plateforme / projet]. »

### Série actuelle

| Offre | Titre | Pastilles |
|-------|--------|-----------|
| Sites web | Vos visiteurs deviennent des **clients.** | Offre · RDV · Paiement |
| Applications métier | Tout le suivi tient dans un **outil.** | Dossiers · Étapes · Équipe |
| Plateformes | Vos clients entrent. Vous gardez la **main.** | Accès · Abo · Rôles |
| Solutions | Conçu pour votre **activité.** | Site · App · Plateforme |

### Interdit visuel offre

Autre direction · fond beige · photo · F à barres · cyan `#00F0FF` en texte · terre en bouton · UI générique / wireframe.

### Autres canaux

- **WhatsApp réseau / perso :** fond calcaire, picto ombre, 3–5 lignes + 1 CTA
- **Print :** calcaire ou blanc, titres ombre ; couverture nuit OK
- **Film marque (16:9) :** ink, photo officielle, tagline, trois portes, téléphone — voir `marketing/visuels/motion/motion-flow.mp4`

---

## 9. Fichiers à joindre à l’autre IA

Minimum :

1. Ce fichier : `marketing/DESIGN_SYSTEM.md`
2. Picto : `public/brand/flow-mark.png`
3. Affiche référence : `marketing/visuels/proposition-sites.png`

Utile ensuite : `public/photo.jpg` · `public/brand/fonts/Manrope-variable.ttf` · `public/brand/fonts/Inter-variable.ttf` · `marketing/visuels/DIRECTION.md`

Sources repo : `lib/brand.ts` · `app/globals.css` · `marketing/CHARTE_GRAPHIQUE.md` · `marketing/SYSTEME_COM.md`
