# Agents IA pour Flow — rôles utiles

Objectif : te faire gagner du temps sur la **préparation**, pas remplacer ta présence humaine.

Détail des prompts : [`agents/PROMPTS.md`](agents/PROMPTS.md)  
Skill Cursor : [`.cursor/skills/flow-com/SKILL.md`](../.cursor/skills/flow-com/SKILL.md)

## Règle d’or

| Automatiser | Ne pas automatiser |
|-------------|-------------------|
| Brouillons de posts | Publication LinkedIn |
| Idées de sujets / calendrier | Commentaires / DMs LinkedIn en masse |
| Visuels / reformulations | Scraping de profils |
| Accusé + notif lead (Resend) | Envoi de réponses métier sans validation |
| Brouillon de réponse dans la notif | “Engagement pods” / faux likes |

## Agents

1. **Com Planner** — calendrier semaine (perso + page Flow)  
2. **Content Writer** — 3 posts profil  
3. **Company Page** — 1 post page Flow  
4. **Inbox Draft** — qualifier + brouillon (leads Resend déjà pré-brouillonnés ; skill pour le reste)  
5. **Pack WhatsApp** — 1–2× / mois  

## Setup

1. Dimanche : invoquer la skill `flow-com`  
2. Publier toi-même Lun / Mer / Ven (+ 1× page Flow)  
3. `RESEND_API_KEY` sur Vercel / `.env.local` pour le formulaire  
4. Domaine custom Resend plus tard (`faireflow.com`)
