import type { ContactPayload, LeadTemperature } from '@/lib/contact'
import { SITE } from '@/lib/site'

/**
 * Mails du formulaire. Même empreinte que les affiches
 * (nuit teal, papier, pastille noire, cyan, pied téléphone + site),
 * recomposée pour une boîte mail — pas une copie du 1080×1350.
 */

const MARK = 'https://flowsurmesure.com/brand/flow-mark.png'
const DISPLAY = "Manrope,'Segoe UI',Helvetica,Arial,sans-serif"
const TEXT = "Inter,'Segoe UI',Helvetica,Arial,sans-serif"

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function offer(product: string, fr: boolean): {
  kicker: string
  noun: string
  pills: [string, string, string]
  proof: string
} {
  const p = product.toLowerCase()
  if (p.includes('plateforme') || p.includes('platform')) {
    return {
      kicker: fr ? 'PLATEFORMES' : 'PLATFORMS',
      noun: fr ? 'plateforme' : 'platform',
      pills: fr ? ['Accès', 'Abo', 'Rôles'] : ['Access', 'Plan', 'Roles'],
      proof: fr
        ? 'Ils s’inscrivent, paient, accèdent. Vous décidez qui entre.'
        : 'They sign up, pay, and get in. You decide who enters.',
    }
  }
  if (p.includes('application') || p.includes('métier') || p.includes('business') || p.includes('app')) {
    return {
      kicker: fr ? 'APPLICATIONS' : 'APPS',
      noun: fr ? 'outil' : 'tool',
      pills: fr ? ['Dossiers', 'Étapes', 'Équipe'] : ['Files', 'Steps', 'Team'],
      proof: fr
        ? 'Dossier, étape, responsable. Toute l’équipe voit la même chose.'
        : 'File, step, owner. The whole team sees the same thing.',
    }
  }
  if (p.includes('sais pas') || p.includes('not sure') || p.includes('yet')) {
    return {
      kicker: fr ? 'PROJET' : 'PROJECT',
      noun: fr ? 'projet' : 'project',
      pills: fr ? ['Site', 'App', 'Plateforme'] : ['Site', 'App', 'Platform'],
      proof: fr
        ? 'Site, application métier, plateforme. De l’idée à la mise en production.'
        : 'Website, business app, platform. From the idea to production.',
    }
  }
  if (p.includes('e-commerce') || p.includes('commerce') || p.includes('site')) {
    return {
      kicker: p.includes('commerce') ? 'E-COMMERCE' : fr ? 'SITES WEB' : 'WEBSITES',
      noun: p.includes('commerce') ? (fr ? 'boutique' : 'store') : fr ? 'site' : 'website',
      pills: fr ? ['Offre', 'RDV', 'Paiement'] : ['Offer', 'Book', 'Pay'],
      proof: fr
        ? 'Ils voient l’offre, prennent rendez-vous, et paient.'
        : 'They see the offer, book, and pay.',
    }
  }
  return {
    kicker: fr ? 'PROJET' : 'PROJECT',
    noun: fr ? 'projet' : 'project',
    pills: fr ? ['Site', 'App', 'Plateforme'] : ['Site', 'App', 'Platform'],
    proof: fr
      ? 'De l’idée à la mise en production.'
      : 'From the idea to production.',
  }
}

function shell(preheader: string, inner: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Flow</title>
</head>
<body style="margin:0;padding:0;background:#10282c;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#10282c" style="background:#10282c;margin:0;padding:0;">
  <tr>
    <td align="center" style="padding:28px 16px 36px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        ${inner}
      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}

function header(kicker: string, aside?: string): string {
  return `<tr>
  <td style="padding:4px 8px 22px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td valign="middle">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td valign="middle" style="padding-right:10px;">
                <img src="${MARK}" width="28" height="28" alt="" style="display:block;width:28px;height:28px;border:0;">
              </td>
              <td valign="middle" style="font-family:${DISPLAY};font-size:22px;font-weight:800;letter-spacing:-0.04em;color:#FFFCFA;">Flow</td>
            </tr>
          </table>
        </td>
        <td valign="middle" align="right" style="font-family:${TEXT};font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#FFFCFA;">
          ${esc(kicker)}${aside ? `<br><span style="letter-spacing:0.14em;color:#7DF4FF;">${aside}</span>` : ''}
        </td>
      </tr>
    </table>
  </td>
</tr>`
}

function pills(words: string[]): string {
  const cells = words
    .map(
      (word, index) =>
        `${index ? '<td width="12" style="width:12px;font-size:0;line-height:0;">&nbsp;</td>' : ''}<td width="92" height="92" align="center" valign="middle" bgcolor="#131313" style="width:92px;height:92px;background:#131313;border-radius:46px;font-family:${TEXT};font-size:10px;font-weight:600;letter-spacing:0.04em;line-height:1.2;text-transform:uppercase;color:#FFFCFA;">${esc(word)}</td>`
    )
    .join('')
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;"><tr>${cells}</tr></table>`
}

function footer(): string {
  return `<tr>
  <td style="padding:22px 8px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td valign="middle" style="font-family:${DISPLAY};font-size:15px;font-weight:800;letter-spacing:-0.03em;color:#7DF4FF;">
          <a href="${SITE.phoneHref}" style="color:#7DF4FF;text-decoration:none;">${SITE.phoneDisplay}</a>
        </td>
        <td valign="middle" align="right" style="font-family:${TEXT};font-size:13px;font-weight:600;color:#FFFCFA;">
          <a href="https://flowsurmesure.com" style="color:#FFFCFA;text-decoration:none;">flowsurmesure.com</a>
        </td>
      </tr>
    </table>
  </td>
</tr>`
}

function paperOpen(): string {
  return `<tr>
  <td bgcolor="#FFFCFA" style="background:#FFFCFA;border-radius:36px 36px 0 0;padding:36px 32px 28px;">`
}

function paperClose(): string {
  return `</td></tr>`
}

function cyanBand(lines: string[]): string {
  const body = lines
    .map(
      (line, index) =>
        `<p style="margin:${index ? '10px' : '0'} 0 0;font-family:${index === lines.length - 1 ? DISPLAY : TEXT};font-size:${index === lines.length - 1 ? '18px' : '15px'};font-weight:${index === lines.length - 1 ? '800' : '400'};letter-spacing:${index === lines.length - 1 ? '-0.03em' : '0'};line-height:1.45;color:#10282c;">${line}</p>`
    )
    .join('')
  return `<tr>
  <td bgcolor="#1ecad2" style="background:#1ecad2;border-radius:0 0 40px 40px;padding:28px 32px 32px;">
    ${body}
  </td>
</tr>`
}

export function renderAckEmail(
  payload: ContactPayload,
  firstName: string
): { preheader: string; html: string } {
  const fr = payload.locale !== 'en'
  const { kicker, noun, pills: steps, proof } = offer(payload.product, fr)
  const preheader = fr
    ? `Adams vous recontacte sous 24–48 h ouvrées. Un appel pour cadrer votre ${noun}.`
    : `Adams will get back to you within 1–2 business days. A call to frame your ${noun}.`

  const title = fr
    ? `Votre projet<br>est bien <span style="display:inline-block;background:#131313;color:#FFFCFA;border-radius:999px;padding:0 12px 2px;line-height:1.15;">reçu.</span>`
    : `We have<br>your <span style="display:inline-block;background:#131313;color:#FFFCFA;border-radius:999px;padding:0 12px 2px;line-height:1.15;">project.</span>`

  const hello = fr
    ? `Bonjour ${esc(firstName)}, merci. Nous avons bien reçu ce que vous voulez construire.`
    : `Hi ${esc(firstName)}, thank you. We have what you want to build.`

  const needLabel = fr ? 'Votre besoin' : 'Your need'
  const followUp = fr
    ? 'Adams vous recontacte sous 24–48 h ouvrées.'
    : 'Adams will get back to you within 1–2 business days.'
  const cta = fr ? `Un appel pour cadrer votre ${esc(noun)}.` : `A call to frame your ${esc(noun)}.`

  const inner = `
${header(kicker)}
${paperOpen()}
  <h1 style="margin:0;font-family:${DISPLAY};font-size:36px;font-weight:800;letter-spacing:-0.045em;line-height:1.05;color:#131313;">${title}</h1>
  <p style="margin:22px 0 0;font-family:${TEXT};font-size:16px;line-height:1.55;color:#131313;">${hello}</p>
  <p style="margin:26px 0 8px;font-family:${TEXT};font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#C45E32;">${needLabel}</p>
  <p style="margin:0;font-family:${TEXT};font-size:16px;line-height:1.55;color:#131313;">${esc(payload.need.trim())}</p>
  ${pills(steps)}
${paperClose()}
${cyanBand([proof, followUp, cta])}
${footer()}
`
  return { preheader, html: shell(preheader, inner) }
}

function temperatureBadge(temperature: LeadTemperature): string {
  if (temperature === 'chaud') {
    return `<span style="display:inline-block;background:#C45E32;color:#FFFCFA;border-radius:999px;padding:4px 10px;font-family:${TEXT};font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;">Chaud</span>`
  }
  const label = temperature === 'tiède' ? 'Tiède' : 'Info'
  return `<span style="display:inline-block;background:#131313;color:#FFFCFA;border-radius:999px;padding:4px 10px;font-family:${TEXT};font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;">${label}</span>`
}

function field(label: string, value: string): string {
  return `<tr>
  <td style="padding:10px 0;border-top:1px solid #E7E1D8;">
    <p style="margin:0 0 3px;font-family:${TEXT};font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:#C45E32;">${esc(label)}</p>
    <p style="margin:0;font-family:${TEXT};font-size:15px;line-height:1.5;color:#131313;">${esc(value)}</p>
  </td>
</tr>`
}

export function renderOwnerEmail(
  payload: ContactPayload,
  temperature: LeadTemperature,
  draft: string,
  firstName: string
): { preheader: string; html: string } {
  const phone = payload.phone?.trim() || 'Non renseigné'
  const preheader = `${payload.product} · ${temperature} · ${payload.email}`
  const title = `${esc(payload.product)}<br><span style="display:inline-block;background:#131313;color:#FFFCFA;border-radius:999px;padding:0 12px 2px;line-height:1.15;">${esc(firstName)}.</span>`

  const inner = `
${header('NOUVEAU PROJET', temperature === 'chaud' ? 'CHAUD' : temperature.toUpperCase())}
${paperOpen()}
  <h1 style="margin:0 0 8px;font-family:${DISPLAY};font-size:34px;font-weight:800;letter-spacing:-0.045em;line-height:1.05;color:#131313;">${title}</h1>
  <p style="margin:0 0 18px;">${temperatureBadge(temperature)}</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    ${field('Besoin', payload.need.trim())}
    ${field('Avancement', payload.stage)}
    ${field('Budget', payload.budget)}
    ${field('Démarrage', payload.timeline)}
    ${field('Email', payload.email.trim())}
    ${field('Téléphone', phone)}
  </table>
  <p style="margin:26px 0 8px;font-family:${TEXT};font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#C45E32;">Brouillon à valider</p>
  <div style="background:#F3EBE1;border-radius:16px;padding:16px 18px;font-family:${TEXT};font-size:14px;line-height:1.55;color:#131313;white-space:pre-wrap;">${esc(draft)}</div>
${paperClose()}
${cyanBand([
  'Répondre à ce mail part vers le prospect.',
  esc(payload.email.trim()),
])}
${footer()}
`
  return { preheader, html: shell(preheader, inner) }
}
