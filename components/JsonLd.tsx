/** Données structurées schema.org injectées dans la page (lues par Google, invisibles à l'écran). */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Contenu généré côté serveur à partir des textes du site : pas d'entrée utilisateur.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
