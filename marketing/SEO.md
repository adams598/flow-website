# Référencement (SEO) — flowsurmesure.com

Personne ne peut garantir la 1re place sur Google : le classement dépend de Google et de la concurrence.
Ce document liste ce qui est fait sur le site et ce qui reste à faire en dehors, par ordre d'impact.

## Fait sur le site (octobre 2026)

| Élément | Où |
|---|---|
| Titre et description orientés recherche (« création de site internet et application sur mesure »), en FR et EN | `lib/i18n/fr.ts`, `lib/i18n/en.ts` (`meta`) |
| Un vrai titre `h1` qui dit ce que fait Flow (le slogan reste affiché, en paragraphe) | `components/Hero.tsx`, `hero.h1` |
| Adresse canonique, versions de langue (hreflang fr / en / x-default) | `app/[locale]/layout.tsx` (`metadataBase`) |
| Image de partage 1200 × 630 (LinkedIn, WhatsApp, Facebook, X) | `public/og-image.png` (source : `marketing/visuels/v2/og-image.html`) |
| Données structurées schema.org : Organisation / Service professionnel, Site, Services, Réalisations, fil d'Ariane | `lib/seo.ts`, `components/JsonLd.tsx` |
| `robots.txt` (l'espace `/hq` et l'API exclus) | `app/robots.ts` |
| Plan du site `sitemap.xml` avec équivalents de langue | `app/sitemap.ts` |
| Balises de validation Google / Bing (via variables d'environnement) | `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION` |
| Page FAQ (8 questions visibles + données `FAQPage`), liée depuis le pied de page | `app/[locale]/faq/page.tsx`, `lib/i18n/fr.ts` |
| Pages service : titre de recherche, texte propre, description et partage (Open Graph) distincts de l’accueil | `app/[locale]/services/[slug]/page.tsx` |
| Réalisations : description de recherche, partage social, lien vers la solution correspondante | `app/[locale]/realisations/[slug]/page.tsx` |
| Fil d’Ariane visible, aligné sur les données structurées | `components/Breadcrumb.tsx` |

## À faire par Adams (dans l'ordre)

1. **Google Search Console** — ajouter `flowsurmesure.com`, coller le code de validation dans la variable
   `GOOGLE_SITE_VERIFICATION` sur l'hébergeur, redéployer, puis soumettre `https://flowsurmesure.com/sitemap.xml`.
   Faire de même sur **Bing Webmaster Tools** (alimente aussi ChatGPT et Copilot).
2. **Fiche Google Business Profile** — c'est elle qui fait apparaître Flow dans Google Maps et dans les
   recherches « création site internet + ville », sans que le nom soit tapé. Catégorie « Concepteur de sites Web »,
   zone desservie, téléphone, site, photos des réalisations, horaires.
3. **Avis clients** — demander un avis Google à chaque client livré (Drivin & Chill, BAI, Objectif TCF).
   Le nombre et la fraîcheur des avis pèsent directement sur le classement local.
4. **Annuaires et citations** (nom, adresse, téléphone identiques partout) : Pages Jaunes, Malt, LinkedIn page
   entreprise, Codeur.com, Sortlist, La Fabrique du Net.
5. **Liens vers le site** — demander aux clients un « Site réalisé par Flow » en pied de page avec lien vers
   flowsurmesure.com (Drivin & Chill, BAI, Objectif TCF). Un lien depuis un vrai site client vaut beaucoup.
6. **Remettre drivinnchill.fr en ligne** (déploiement Vercel en pause) : un lien de réalisation cassé nuit à la confiance.

## Prochaines étapes sur le site (si besoin)

- **Pages locales** : « Création de site internet à [ville] » pour les villes visées (contenu réel et distinct,
  pas de copier-coller : Google pénalise les pages dupliquées).
- **Articles de blog** qui répondent aux questions des clients (« Combien coûte un site avec réservation en ligne ? »,
  « Site vitrine ou application métier ? ») : c'est ce qui fait apparaître Flow sur des recherches où son nom n'est pas tapé.
- Mesurer avec Search Console : positions, requêtes, pages indexées, une fois par mois.
