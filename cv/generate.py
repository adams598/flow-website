# -*- coding: utf-8 -*-
"""Génère les 4 CV : FR/EN × visuel (photo) / ATS (sans photo)."""
from __future__ import annotations

import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PHOTO = ROOT / "assets" / "photo.png"
CHROME = Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe")
OUT = ROOT / "out"
HTML_DIR = ROOT / "html"

CONTACT = {
    "email": "adamsdexter3@gmail.com",
    "phone": "07 49 17 83 91",
    "phone_en": "+33 7 49 17 83 91",
    "city": "Mantes-la-Ville (78711)",
    "linkedin": "linkedin.com/in/adams-dexter-tchatchoua-3609931a9",
    "linkedin_href": "https://www.linkedin.com/in/adams-dexter-tchatchoua-3609931a9/",
    "github": "github.com/adams598",
    "github_href": "https://github.com/adams598",
}

FR = {
    "lang": "fr",
    "name": "Adams Dexter Tchatchoua",
    "kicker": "Curriculum vitae",
    "role": "Ingénieur informatique — Full-stack",
    "tagline": "Fondateur de Flow · 2 ans d’expérience",
    "location": "Mantes-la-Ville (78711) · Mobilité France · Remote / hybride",
    "phone": CONTACT["phone"],
    "profil_title": "Profil",
    "exp_title": "Expérience",
    "edu_title": "Formation",
    "skills_title": "Compétences",
    "certs_title": "Certifications",
    "lang_title": "Langues",
    "interests_title": "Centres d’intérêt",
    "links_title": "Liens",
    "profil": (
        "Ingénieur informatique diplômé CTI (3iL), fondateur de Flow. "
        "Je conçois et livre des produits web de bout en bout : sites, applications métier "
        "et plateformes (paiement, abonnement, e-learning, back-office). "
        "4 produits en production. Stack : Next.js, React, TypeScript, Node.js."
    ),
    "jobs": [
        {
            "title": "Ingénieur logiciel — Flow",
            "dates": "Septembre 2024 – Aujourd’hui",
            "place": "Mantes-la-Ville · France",
            "intro": (
                "Conception et mise en production de sites, applications métier et plateformes. "
                "Interlocuteur unique : cadrage, build, déploiement, maintenance."
            ),
            "projects": [
                {
                    "name": "Objectif TCF",
                    "desc": "Plateforme e-learning : abonnements, Stripe, simulations, back-office. En production.",
                    "url": "objectif-tcf.org",
                },
                {
                    "name": "BAI Consulting & Formation",
                    "desc": "Plateforme B2B multi-rôles, chatbot. En production, maintenance.",
                    "url": "bai-consultingetformation.com",
                },
                {
                    "name": "Drivin & Chill",
                    "desc": "Réservation, Stripe, QR codes. En production, maintenance.",
                    "url": "drivinnchill.fr",
                },
                {
                    "name": "Application de suivi financier",
                    "desc": "Suivi des finances et dépenses, livré en production.",
                },
                {
                    "name": "H&S Services",
                    "desc": "Site vitrine, SEO, conversion.",
                    "url": "hsservices-ci.com",
                },
                {
                    "name": "Parcours paiement",
                    "desc": "Webhooks Stripe idempotents et réconciliation paiement / droits d’accès.",
                },
            ],
            "bullets_ats": [
                "<strong>Objectif TCF</strong> — Plateforme e-learning (parcours, abonnements, Stripe, back-office, analytics). En production. objectif-tcf.org",
                "<strong>BAI Consulting & Formation</strong> — Plateforme B2B multi-rôles, chatbot, maintenance. bai-consultingetformation.com",
                "<strong>Drivin & Chill</strong> — Réservation, Stripe, QR codes. drivinnchill.fr — App de suivi financier livrée en production — <strong>H&S Services</strong> : site, SEO, conversion (hsservices-ci.com)",
                "<strong>Parcours paiement</strong> — Webhooks Stripe idempotents et réconciliation paiement / droits d’accès.",
            ],
        },
        {
            "title": "Ingénieur développeur & MOA — Orange",
            "dates": "Janvier 2024 – Juillet 2024",
            "place": "Toulouse · Stage de fin d’études",
            "intro": "Migration de Plazza vers Microsoft 365 (Teams, SharePoint, Viva Engage).",
            "bullets": [
                "Cartographie des communautés, moteur de recommandation M365, application Zip & Go.",
                "Déploiements intégration / UAT / production. Tests Selenium.",
            ],
            "bullets_ats": [
                "Cartographie des communautés Plazza, moteur de recommandation M365, application Zip & Go.",
                "Déploiements intégration / UAT / production. Tests automatisés (Selenium).",
            ],
        },
        {
            "title": "Développeur full-stack — Data Driven France",
            "dates": "Mai 2023 – Septembre 2023",
            "place": "Clichy · Stage",
            "intro": "",
            "bullets": [
                "Modules web internes, intégration de données recrutement, qualité des dashboards.",
            ],
            "bullets_ats": [
                "Modules web internes, intégration de données recrutement, qualité des dashboards.",
            ],
        },
    ],
    "education": {
        "title": "Diplôme d’ingénieur informatique (CTI) — 3iL Ingénieurs, Limoges",
        "dates": "Septembre 2019 – Avril 2025",
        "detail": "Développement web et mobile, bases de données, sécurité, IA, réseaux, gestion de projet.",
    },
    "certs": [
        "Prompt Engineering — 2025",
        "DevOps CI/CD — Udemy, novembre 2024 (pipelines, infrastructure as code)",
        "React.js & Redux — Udemy, octobre – décembre 2023 (Hooks, Router, Context)",
    ],
    "skills": [
        ("Produit", "Next.js · React · TypeScript · Node.js · Stripe · e-learning · back-office"),
        ("Données", "PostgreSQL · SQL · Python"),
        ("Déploiement", "Docker · Kubernetes · Ansible · GitHub Actions · Vercel · AWS"),
        ("Méthodes", "Git · Scrum · Jira · cadrage client · recette"),
        ("IA", "Prompt engineering · chatbot · outillage quotidien"),
    ],
    "languages": [
        "Français — courant (DELF B2)",
        "Anglais — professionnel (Linguaskill B2)",
    ],
    "interests": "Musique (piano, guitare, batterie) · Football · Accompagnement / coaching",
}

EN = {
    "lang": "en",
    "name": "Adams Dexter Tchatchoua",
    "kicker": "Curriculum vitae",
    "role": "Software Engineer — Full-stack",
    "tagline": "Founder of Flow · 2 years of experience",
    "location": "Mantes-la-Ville, France (78711) · Open to relocate · Remote / hybrid",
    "phone": CONTACT["phone_en"],
    "profil_title": "Profile",
    "exp_title": "Experience",
    "edu_title": "Education",
    "skills_title": "Skills",
    "certs_title": "Certifications",
    "lang_title": "Languages",
    "interests_title": "Interests",
    "links_title": "Links",
    "profil": (
        "Software engineer with a CTI-accredited French engineering degree (3iL) and founder of Flow. "
        "I design and ship web products end-to-end: websites, business apps and platforms "
        "(payments, subscriptions, e-learning, admin). 4 products in production. "
        "Stack: Next.js, React, TypeScript, Node.js."
    ),
    "jobs": [
        {
            "title": "Software Engineer — Flow",
            "dates": "September 2024 – Present",
            "place": "Mantes-la-Ville · France",
            "intro": (
                "Design and production delivery of websites, business apps and platforms. "
                "Single counterpart: scoping, build, deployment, maintenance."
            ),
            "projects": [
                {
                    "name": "Objectif TCF",
                    "desc": "E-learning platform: subscriptions, Stripe, simulations, admin. In production.",
                    "url": "objectif-tcf.org",
                },
                {
                    "name": "BAI Consulting & Training",
                    "desc": "Multi-role B2B platform, chatbot. In production, maintenance.",
                    "url": "bai-consultingetformation.com",
                },
                {
                    "name": "Drivin & Chill",
                    "desc": "Booking, Stripe, QR codes. In production, maintenance.",
                    "url": "drivinnchill.fr",
                },
                {
                    "name": "Finance tracker",
                    "desc": "Finance and expense tracking, delivered to production.",
                },
                {
                    "name": "H&S Services",
                    "desc": "Company website, SEO, conversion.",
                    "url": "hsservices-ci.com",
                },
                {
                    "name": "Payments",
                    "desc": "Idempotent Stripe webhooks and payment-to-access reconciliation.",
                },
            ],
            "bullets_ats": [
                "<strong>Objectif TCF</strong> — E-learning platform (journeys, subscriptions, Stripe, admin, analytics). In production. objectif-tcf.org",
                "<strong>BAI Consulting & Training</strong> — Multi-role B2B platform, chatbot, maintenance. bai-consultingetformation.com",
                "<strong>Drivin & Chill</strong> — Booking, Stripe, QR codes. drivinnchill.fr — Finance tracker delivered to production — <strong>H&S Services</strong>: website, SEO, conversion (hsservices-ci.com)",
                "<strong>Payments</strong> — Idempotent Stripe webhooks and payment-to-access reconciliation.",
            ],
        },
        {
            "title": "Software Engineer & Business Analyst — Orange",
            "dates": "January 2024 – July 2024",
            "place": "Toulouse · End-of-studies internship",
            "intro": "Migration of Plazza to Microsoft 365 (Teams, SharePoint, Viva Engage).",
            "bullets": [
                "Community mapping, M365 recommendation engine, Zip & Go app.",
                "Releases across integration / UAT / production. Selenium tests.",
            ],
            "bullets_ats": [
                "Plazza community mapping, M365 recommendation engine, Zip & Go migration app.",
                "Releases across integration / UAT / production. Automated tests (Selenium).",
            ],
        },
        {
            "title": "Full-stack Developer — Data Driven France",
            "dates": "May 2023 – September 2023",
            "place": "Clichy · Internship",
            "intro": "",
            "bullets": [
                "Internal web modules, recruitment data integration, dashboard data quality.",
            ],
            "bullets_ats": [
                "Internal web modules, recruitment data integration, dashboard data quality.",
            ],
        },
    ],
    "education": {
        "title": "Diplôme d’ingénieur (CTI-accredited Master’s-level) — 3iL Ingénieurs, Limoges",
        "dates": "September 2019 – April 2025",
        "detail": "Web & mobile development, databases, security, AI, networks, project management.",
    },
    "certs": [
        "Prompt Engineering — 2025",
        "DevOps CI/CD — Udemy, November 2024 (pipelines, infrastructure as code)",
        "React.js & Redux — Udemy, October – December 2023 (Hooks, Router, Context)",
    ],
    "skills": [
        ("Product", "Next.js · React · TypeScript · Node.js · Stripe · e-learning · admin back-office"),
        ("Data", "PostgreSQL · SQL · Python"),
        ("Delivery", "Docker · Kubernetes · Ansible · GitHub Actions · Vercel · AWS"),
        ("Ways of working", "Git · Scrum · Jira · client scoping · UAT"),
        ("AI", "Prompt engineering · chatbot · daily AI-assisted delivery"),
    ],
    "languages": [
        "French — fluent (DELF B2)",
        "English — professional (Linguaskill B2)",
    ],
    "interests": "Music (piano, guitar, drums) · Football · Coaching / mentoring",
}

VISUAL_CSS = r"""
@page { size: A4; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body {
  width: 210mm;
  height: 297mm;
  font-family: Poppins, "Segoe UI", Helvetica, Arial, sans-serif;
  color: #1a1a1a;
  background: #fff;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
a { color: inherit; text-decoration: none; }
.page {
  width: 210mm;
  height: 297mm;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-left: 2.4mm solid #c4a35a;
}
.header {
  background: #101010;
  color: #f4efe6;
  padding: 5.5mm 10mm 5.5mm 11mm;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8mm;
  flex-shrink: 0;
}
.kicker {
  font-size: 6.8pt;
  font-weight: 600;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: #c4a35a;
  margin-bottom: 1.8mm;
}
.name {
  font-family: Poppins, sans-serif;
  font-weight: 600;
  font-size: 20pt;
  letter-spacing: -0.03em;
  line-height: 1.06;
  color: #f4efe6;
}
.rule {
  width: 20mm;
  height: 1px;
  background: #c4a35a;
  margin: 2mm 0 1.8mm;
  border: 0;
}
.role { font-size: 10pt; font-weight: 500; color: #f4efe6; }
.tagline { margin-top: 0.8mm; font-size: 8.4pt; color: #c4bdb2; }
.meta { margin-top: 2.4mm; font-size: 7.6pt; color: #cfc8be; line-height: 1.5; }
.meta a { color: #efe8dc; }
.meta a.github { color: #c4a35a; font-weight: 600; }
.photo-wrap {
  flex-shrink: 0;
  width: 27mm;
  height: 27mm;
  border-radius: 50%;
  padding: 1.4px;
  background: #c4a35a;
}
.photo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 12%;
  display: block;
  border: 2px solid #101010;
}
.body {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 58mm;
  gap: 6mm;
  padding: 5mm 10mm 5.5mm 11mm;
  min-height: 0;
}
h2 {
  font-size: 7.2pt;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #c4a35a;
  border-bottom: 0.7px solid #1a1a1a;
  padding-bottom: 1.3mm;
  margin: 0 0 2.2mm;
}
.profil { font-size: 8.2pt; line-height: 1.36; color: #2a2a2a; margin-bottom: 3.6mm; }
.job { margin-bottom: 3mm; }
.job-head { display: flex; justify-content: space-between; gap: 3mm; align-items: baseline; }
.job-title {
  font-family: Poppins, sans-serif;
  font-size: 9.4pt;
  font-weight: 600;
  color: #111;
  line-height: 1.2;
}
.job-dates { font-size: 7.4pt; color: #7a746c; white-space: nowrap; font-weight: 600; }
.job-place { font-size: 7.4pt; color: #8a847c; margin: 0.4mm 0 1mm; }
.job-intro { font-size: 8pt; line-height: 1.32; color: #333; margin-bottom: 1.3mm; }
ul { padding-left: 3.4mm; }
li { font-size: 8pt; line-height: 1.32; color: #2a2a2a; margin-bottom: 0.8mm; }
ul.projects { list-style: none; padding: 0; }
.proj {
  margin-bottom: 1.2mm;
  padding: 1.3mm 2mm 1.4mm;
  background: #f4ede3;
  border-left: 1.8px solid #c4a35a;
}
.proj-name {
  display: inline-block;
  font-family: Poppins, sans-serif;
  font-weight: 700;
  font-size: 8pt;
  color: #8a6a32;
  margin-right: 1.5mm;
}
.proj-desc { color: #3a3a3a; }
.url { color: #9a7540; font-weight: 600; overflow-wrap: anywhere; }
.aside-block { margin-bottom: 3.2mm; }
.skill-card { background: #f4ede3; padding: 1.7mm 2mm 1.6mm; margin-bottom: 1.5mm; }
.skill-label {
  font-size: 6.4pt;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #b0894f;
  margin-bottom: 0.6mm;
}
.skill-value { font-size: 7.5pt; line-height: 1.34; color: #1a1a1a; }
.aside-list { list-style: none; padding: 0; }
.aside-list li { font-size: 7.5pt; line-height: 1.34; margin-bottom: 1.1mm; padding-left: 0; }
.interest { font-size: 7.5pt; line-height: 1.34; color: #2a2a2a; }
.edu-title { font-size: 8.4pt; font-weight: 600; color: #111; line-height: 1.25; }
.edu-dates { font-size: 7.4pt; color: #7a746c; font-weight: 600; margin: 0.5mm 0; }
.edu-detail { font-size: 7.8pt; line-height: 1.32; color: #2a2a2a; }
"""

ATS_CSS = r"""
@page { size: A4; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body {
  font-family: Poppins, Calibri, Arial, sans-serif;
  color: #111;
  background: #fff;
  font-size: 10pt;
  line-height: 1.26;
}
body { padding: 11mm 14mm; }
h1 { font-size: 16pt; font-weight: 700; margin-bottom: 1pt; }
.role { font-size: 11pt; font-weight: 700; margin-bottom: 1pt; }
.tagline, .meta { font-size: 9.5pt; margin-bottom: 1pt; }
.meta a { color: #111; text-decoration: none; }
h2 {
  font-size: 11pt;
  text-transform: uppercase;
  border-bottom: 1px solid #222;
  margin: 7pt 0 3.5pt;
  padding-bottom: 1.5pt;
}
h3 { font-size: 10.5pt; margin: 5.5pt 0 0.5pt; }
.dates { font-size: 9.5pt; }
p { margin-bottom: 3pt; }
ul { margin: 1pt 0 3.5pt 14pt; }
li { margin-bottom: 1.8pt; }
"""


def render_job_visual(job: dict) -> str:
    intro = f'<p class="job-intro">{job["intro"]}</p>' if job.get("intro") else ""
    if job.get("projects"):
        items = []
        for project in job["projects"]:
            url = (
                f' <span class="url">{project["url"]}</span>'
                if project.get("url")
                else ""
            )
            items.append(
                f'<li class="proj"><span class="proj-name">{project["name"]}</span> '
                f'<span class="proj-desc">{project["desc"]}</span>{url}</li>'
            )
        body = intro + f'<ul class="projects">{"".join(items)}</ul>'
    else:
        bullets = "".join(f"<li>{b}</li>" for b in job.get("bullets", []))
        body = intro + f"<ul>{bullets}</ul>"
    return f"""
            <article class="job">
              <div class="job-head">
                <p class="job-title">{job["title"]}</p>
                <p class="job-dates">{job["dates"]}</p>
              </div>
              <p class="job-place">{job["place"]}</p>
              {body}
            </article>
            """


def visual_html(data: dict) -> str:
    jobs = [render_job_visual(job) for job in data["jobs"]]
    skills = "".join(
        f'<div class="skill-card"><p class="skill-label">{label}</p>'
        f'<p class="skill-value">{value}</p></div>'
        for label, value in data["skills"]
    )
    certs = "".join(f"<li>{c}</li>" for c in data["certs"])
    langs = "".join(f"<li>{c}</li>" for c in data["languages"])
    photo = PHOTO.as_uri()
    return f"""<!DOCTYPE html>
<html lang="{data["lang"]}">
<head>
  <meta charset="utf-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>{VISUAL_CSS}</style>
</head>
<body>
  <div class="page">
    <header class="header">
      <div class="brand">
        <p class="kicker">{data.get("kicker", "Curriculum vitae")}</p>
        <p class="name">{data["name"]}</p>
        <div class="rule"></div>
        <p class="role">{data["role"]}</p>
        <p class="tagline">{data["tagline"]}</p>
        <p class="meta">
          {data["location"]}<br />
          <a href="mailto:{CONTACT["email"]}">{CONTACT["email"]}</a>
          · {data["phone"]}<br />
          <a href="{CONTACT["linkedin_href"]}">{CONTACT["linkedin"]}</a>
          · <a class="github" href="{CONTACT["github_href"]}">{CONTACT["github"]}</a>
        </p>
      </div>
      <div class="photo-wrap"><img class="photo" src="{photo}" alt="{data["name"]}" /></div>
    </header>
    <main class="body">
      <section>
        <h2>{data["profil_title"]}</h2>
        <p class="profil">{data["profil"]}</p>
        <h2>{data["exp_title"]}</h2>
        {"".join(jobs)}
        <h2>{data["edu_title"]}</h2>
        <p class="edu-title">{data["education"]["title"]}</p>
        <p class="edu-dates">{data["education"]["dates"]}</p>
        <p class="edu-detail">{data["education"]["detail"]}</p>
      </section>
      <aside>
        <div class="aside-block">
          <h2>{data["skills_title"]}</h2>
          {skills}
        </div>
        <div class="aside-block">
          <h2>{data["certs_title"]}</h2>
          <ul class="aside-list">{certs}</ul>
        </div>
        <div class="aside-block">
          <h2>{data["lang_title"]}</h2>
          <ul class="aside-list">{langs}</ul>
        </div>
        <div class="aside-block">
          <h2>{data["interests_title"]}</h2>
          <p class="interest">{data["interests"]}</p>
        </div>
      </aside>
    </main>
  </div>
</body>
</html>
"""


def ats_html(data: dict) -> str:
    jobs = []
    for job in data["jobs"]:
        items = job.get("bullets_ats") or job["bullets"]
        bullets = "".join(f"<li>{b}</li>" for b in items)
        jobs.append(
            f"""
            <h3>{job["title"]}</h3>
            <p class="dates">{job["dates"]} | {job["place"]}</p>
            <ul>{bullets}</ul>
            """
        )
    skills = " | ".join(f"<strong>{label} :</strong> {value}" for label, value in data["skills"])
    certs = " · ".join(data["certs"])
    langs = " · ".join(data["languages"])
    return f"""<!DOCTYPE html>
<html lang="{data["lang"]}">
<head>
  <meta charset="utf-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>{ATS_CSS}</style>
</head>
<body>
  <h1>{data["name"]}</h1>
  <p class="role">{data["role"]}</p>
  <p class="tagline">{data["tagline"]}</p>
  <p class="meta">{data["location"]}</p>
  <p class="meta">
    {CONTACT["email"]} | {data["phone"]}<br />
    {CONTACT["linkedin"]}<br />
    {CONTACT["github"]}
  </p>

  <h2>{data["profil_title"]}</h2>
  <p>{data["profil"]}</p>

  <h2>{data["exp_title"]}</h2>
  {"".join(jobs)}

  <h2>{data["edu_title"]}</h2>
  <h3>{data["education"]["title"]}</h3>
  <p class="dates">{data["education"]["dates"]}</p>
  <p>{data["education"]["detail"]}</p>

  <h2>{data["skills_title"]}</h2>
  <p>{skills}</p>

  <h2>{data["certs_title"]}</h2>
  <p>{certs}</p>

  <h2>{data["lang_title"]}</h2>
  <p>{langs}</p>

  <h2>{data["interests_title"]}</h2>
  <p>{data["interests"]}</p>
</body>
</html>
"""



def export_docx(pdf_path: Path, dest: Path) -> None:
    from pdf2docx import Converter

    cv = Converter(str(pdf_path))
    cv.convert(str(dest))
    cv.close()

def print_pdf(html_path: Path, pdf_path: Path) -> None:
    pdf_path.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        str(CHROME),
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--no-first-run",
        "--no-default-browser-check",
        f"--virtual-time-budget=12000",
        f"--print-to-pdf={pdf_path}",
        html_path.resolve().as_uri(),
    ]
    subprocess.run(cmd, check=True, capture_output=True)


def preview(pdf_path: Path) -> Path:
    import pymupdf

    doc = pymupdf.open(pdf_path)
    img = ROOT / "out" / f"preview-{pdf_path.stem}.png"
    for i, page in enumerate(doc):
        pix = page.get_pixmap(matrix=pymupdf.Matrix(1.5, 1.5), alpha=False)
        dest = ROOT / "out" / f"preview-{pdf_path.stem}-p{i+1}.png"
        pix.save(str(dest))
        if i == 0:
            pix.save(str(img))
    print(f"{pdf_path.name}: {doc.page_count} page(s)")
    return img


def main() -> None:
    HTML_DIR.mkdir(parents=True, exist_ok=True)
    OUT.mkdir(parents=True, exist_ok=True)
    if not PHOTO.exists():
        raise SystemExit(f"Photo manquante: {PHOTO}")

    specs = [
        ("Adams_Dexter_Tchatchoua_CV_FR", FR, visual_html, True),
        ("Adams_Dexter_Tchatchoua_CV_FR_ATS", FR, ats_html, False),
        ("Adams_Dexter_Tchatchoua_CV_EN", EN, visual_html, True),
        ("Adams_Dexter_Tchatchoua_CV_EN_ATS", EN, ats_html, False),
    ]
    for name, data, builder, _visual in specs:
        html_path = HTML_DIR / f"{name}.html"
        html_path.write_text(builder(data), encoding="utf-8")
        pdf_path = OUT / f"{name}.pdf"
        print_pdf(html_path, pdf_path)
        preview(pdf_path)
        dest = ROOT.parent / f"{name}.pdf"
        shutil.copyfile(pdf_path, dest)
        print("wrote", dest)
        docx_path = ROOT.parent / f"{name}.docx"
        export_docx(pdf_path, docx_path)
        print("wrote", docx_path)


if __name__ == "__main__":
    main()
