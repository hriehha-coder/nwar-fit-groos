import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NWARE FIT — Vente en Gros | Streetwear Nike, Adidas, Jordan, Lacoste</title>
        <meta
          name="description"
          content="NWARE FIT — Grossiste streetwear à Casablanca. T-shirts oversize, shorts et ensembles Nike, Adidas, Jordan, Lacoste, STWTZ. Commande minimum 10 pièces. Contact WhatsApp direct."
        />
        <link rel="icon" href="/static/brand/nware-fit-logo.jpg" type="image/jpeg" />

        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        {/* Font Awesome */}
        <link
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"
          rel="stylesheet"
        />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />

        <link href="/static/style.css" rel="stylesheet" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      gold: {
                        DEFAULT: '#D4AF37',
                        light: '#E9CD6E',
                        dark: '#9C7A22'
                      }
                    },
                    fontFamily: {
                      display: ['Bebas Neue', 'sans-serif'],
                      body: ['Poppins', 'sans-serif']
                    }
                  }
                }
              }
            `,
          }}
        ></script>
      </head>
      <body class="bg-black font-body text-white antialiased">{children}</body>
    </html>
  )
})
