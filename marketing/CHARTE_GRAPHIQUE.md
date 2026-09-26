# Flow — charte graphique

Source de vérité visuelle. Complète `SYSTEME_COM.md` (voix / canaux) et le design system vivant : `/hq/design-system`.

**Marque :** Flow  
**Tagline :** *Build digital. Make it flow.*  
**Ligne :** Sites web · Applications métier · Plateformes digitales  
**Positionnement :** ingénieur qui livre des produits digitaux — pas « freelance sites vitrine ».  
**Température :** froid dans le produit, chaud dans la rencontre.

Décidé : **cyan seul en CTA** (électrique la nuit, profond le jour).  
Décidé : le mix suit le **switch dark / light** du site.

- **Nuit** — ink + cyan. Terre = 1 badge max. Pas de fond beige.
- **Jour** — blanc + **cyan gardé** + calcaire / terre pour la chaleur.

---

## 1. Personnalité

Flow n’est plus seulement « sombre + neon ». Le switch dark / light change le mix, pas le logo. Nuit = produit cyan. Jour = même cyan, plus de chaleur (calcaire, terre).

| On est | On n’est pas |
|--------|----------------|
| Précis, concret, preuve | Catalogue, superlatifs, « synergie » |
| Dual : nuit cyan **et** jour chaud | Agence pastel, startup rainbow, café Instagram |
| Un picto, un mot | Deux logos (chevron + F à barres) |
| Manrope + Inter | Serif, script, display fun |
| Un accent interactif : cyan | Cyan **et** orange comme deux CTA |

Voix écrite : voir `SYSTEME_COM.md`. Perso Adams = « je ». Page Flow = « nous ». Jamais le même texte.

---

## 2. Logo

**Picto officiel : le chevron source.** Copie PNG, pas un SVG redessiné. Les variantes ne changent que la couleur des pixels.

Fichiers :

| Fichier | Usage |
|---------|--------|
| `public/brand/flow-mark.png` | Picto officiel — copie de la source, même forme |
| `public/brand/flow-mark-ink.png` | Même pixels, teinte ink |
| `public/brand/flow-mark-ombre.png` | Même pixels, teinte ombre |
| `public/brand/flow-mark-source.png` | Fichier source recopié, intact |
| `public/export.png` | Navbar / hero (pas encore migré) |
| `public/icon.png` | Favicon |
| `public/photo.jpg` | Portrait officiel |
| `public/linkedin-banner.png` | Bannière LinkedIn perso |
| `public/linkedin-banner-b.png` | Bannière page entreprise |

### Lockups

1. **Picto seul** — favicon, avatar, 24–40 px.
2. **Picto + « Flow »** — navbar, footer. Manrope ExtraBold, title case, tracking tight.
3. **FLOW + tagline** — bannières. FLOW en capitales, tracking large (~0.35em).
4. **Picto large + FLOW + tagline** — hero, cover.
5. **Picto ombre sur calcaire** — print, About, documents. C’est le lockup hoodie.

### Fonds

| Fond | Picto |
|------|--------|
| Ink `#131313` | Cyan |
| Calcaire `#F3EBE1` | Ombre (`flow-mark-ombre.png`) — même forme, autre teinte |
| Blanc `#FFFCFA` | Cyan **ou** ombre |
| Cyan `#00F0FF` | Ink |

### Interdit

- Le **logo F à barres** des visuels WhatsApp — non officiel.
- Picto recolorié en terre / or / sable.
- Cyan `#00F0FF` en texte sur blanc.
- Cyan et terre en grands fills côte à côte.
- Étirement, rotation, contour, ombre gratuite.

---

## 3. Couleurs

Le site a un switch **dark / light**. Même palette de marque, mix différent.

Règle : **CTA toujours cyan.** Terre n’est jamais un bouton. `#00F0FF` n’est jamais du texte sur beige.

### Nuit (dark)

| Rôle | Couleur | Hex |
|------|---------|-----|
| Fond | Ink | `#131313` |
| Logo, CTA, labels | Cyan électrique | `#00F0FF` |
| Lueur / dégradé | Ice | `#7DF4FF` |
| Preuve (rare) | Terre | `#C45E32` |

Pas de calcaire, pas de blanc cassé en fond. La nuit reste froide.

### Jour (light)

| Rôle | Couleur | Hex |
|------|---------|-----|
| Fond page | Blanc | `#FFFCFA` |
| Bandes, cartes secondaires | Calcaire | `#F3EBE1` |
| Filets | Sable | `#D9C4A8` |
| CTA, liens | Cyan profond | `#00A8B2` |
| Logo | Cyan électrique | `#00F0FF` (petit) |
| Kickers, cadre photo | Terre | `#C45E32` |
| Titres | Ink | `#131313` |

Le cyan reste. Beige et terre **chauffent** le jour — ils ne remplacent pas le logo ni le bouton.

### Famille complète

**Froid :** Ink `#131313` · Cyan `#00F0FF` · Ice `#7DF4FF` · Teal / cyan profond `#005F66`–`#00A8B2`  
**Chaud :** Blanc `#FFFCFA` · Calcaire `#F3EBE1` · Sable `#D9C4A8` · Terre `#C45E32` · Ombre `#3F2C24`

### Archivé (ne plus utiliser en neuf)

| Nom | Hex | Pourquoi |
|-----|-----|----------|
| Or | `#FED639` | Double Terre, trop fintech |
| Paper froid | `#F8FBFC` | Bleu-gris, combat le beige |

Tokens CSS : `app/globals.css` (migré). PDF : `marketing/CHARTE_FLOW.pdf`.

---

## 4. Typographie

| Rôle | Police | Poids | Usage |
|------|--------|-------|--------|
| Titres | **Manrope** | 600 / 700 / 800 | H1–H4, wordmark |
| Corps | **Inter** | 400 / 500 | Paragraphes |
| Labels | **Inter** | 500 / 600 | Kickers, nav, boutons |

Kickers : Inter 14px, uppercase, `tracking-[0.2em]`. Nuit → cyan. Jour → terre (liens / CTA restent cyan profond).

Tagline : toujours *Build digital. Make it flow.* — anglais, pas traduite.

Esprit document : beaucoup d’air, un filet sable, peu de cartes identiques, pas de glass sur le papier.

---

## 5. Composants

- **CTA primaire** : cyan électrique la nuit ; cyan profond `#00A8B2` le jour. Jamais terre.
- **CTA secondaire** : filet cyan (nuit) ou cyan profond (jour).
- **Carte nuit** : fond container, filet discret.
- **Bande jour** : calcaire, kicker terre, logo cyan.
- **Focus** : outline cyan (nuit) ou cyan profond (jour).
- Rayons : **8 px boutons**, **16 px cartes**, **pill 9999 px**.

---

## 6. Mise en page & motion

- Conteneur site : `max-w-7xl`, `px-6 md:px-8`.
- Espace entre sections : `mt-32 md:mt-40`.
- Lueurs cyan : **nuit seulement**.
- Hover CTA : scale 1.03. Cartes : `y: -4`.
- `prefers-reduced-motion`.

---

## 7. Applications

### Site

Le switch dark / light porte les deux mix. Jour = blanc + bandes calcaire, pas 100 % beige.

### LinkedIn

- Logo page : chevron cyan crop serré.
- Bannière nuit actuelle OK.
- Visuel « humain » : calcaire + photo + picto ombre.

### WhatsApp

- Offre / preuve tech : fond ink, chevron cyan.
- Réseau / perso : fond calcaire, picto ombre.
- 3–5 lignes + 1 CTA. Pas de F à barres.

### Print

- Calcaire ou blanc. Titres ombre. Couverture nuit OK (`CHARTE_FLOW.pdf`).

---

## 8. À corriger (reste)

1. Remplacer le F à barres WhatsApp par le chevron.
2. Visuels LinkedIn encore éventuellement à aligner.

---

## Fichiers

- Constantes : `lib/brand.ts`
- Page vivante : `/hq/design-system`
- CSS : `app/globals.css`
- PDF : `marketing/CHARTE_FLOW.pdf`
