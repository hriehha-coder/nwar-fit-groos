import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { PRODUCTS, BRANDS, CATEGORY_LABELS, type Product } from './data/products'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './public' }))
app.use(renderer)

const WHATSAPP_NUMBER = '212649013710' // 0649013710 en format international
const IG_URL = 'https://www.instagram.com/nware_fit_gros'
const EMAIL = 'lmnawaryassir@gmail.com'
const PHONE_DISPLAY = '06 49 01 37 10'

function waLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

const CATS: { key: string; label: string; icon: string }[] = [
  { key: 'all', label: 'Tout', icon: 'fa-border-all' },
  { key: 'tshirt-oversize', label: 'T-shirts Oversize', icon: 'fa-shirt' },
  { key: 'tshirt-simple', label: 'T-shirts Simple', icon: 'fa-shirt' },
  { key: 'short', label: 'Shorts', icon: 'fa-socks' },
  { key: 'ensemble', label: 'Ensembles', icon: 'fa-layer-group' },
]

function ProductCard({ p }: { p: Product }) {
  const msg = `Salam, bghit nchri ${p.name} — prix ${p.price} DH (commande jemla min 10 pcs). Feblan momkin?`
  return (
    <div
      class="product-card card-hover bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden group"
      data-brand={p.brand}
      data-category={p.category}
    >
      <div class="product-img-wrap relative">
        <img
          src={`/static/products/${p.file}`}
          alt={p.name}
          loading="lazy"
          class="cursor-zoom-in"
          onclick={`openLightbox('/static/products/${p.file}', '${p.name.replace(/'/g, "\\'")}')`}
        />
        <span class="absolute top-2 left-2 bg-gold text-black text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide shadow">
          {p.brand}
        </span>
      </div>
      <div class="p-4">
        <h3 class="font-semibold text-sm sm:text-base text-white leading-snug mb-1 line-clamp-2">
          {p.name}
        </h3>
        <p class="text-xs text-zinc-400 mb-3">{CATEGORY_LABELS[p.category]} · Min. 10 pcs</p>
        <div class="flex items-center justify-between gap-2">
          <span class="text-gold font-display text-2xl">{p.price} <span class="text-sm">DH</span></span>
          <a
            href={waLink(msg)}
            target="_blank"
            rel="noopener"
            class="bg-[#25D366] hover:bg-[#1fb855] text-white text-xs sm:text-sm font-semibold px-3 py-2 rounded-full flex items-center gap-1.5 transition-colors"
          >
            <i class="fab fa-whatsapp text-base"></i>
            <span class="hidden sm:inline">Commander</span>
          </a>
        </div>
      </div>
    </div>
  )
}

const reviews = [
  {
    name: 'Yassine B.',
    city: 'Casablanca',
    text: 'Khdamt m3ahom mora min chhar, jodda top w les prix mzyanin bezaf pour la revente. Wselni f wa9tha.',
    stars: 5,
  },
  {
    name: 'Salma E.',
    city: 'Marrakech',
    text: 'Bghit nchker NWARE FIT, homa serieux w kaytfahmo m3ak b WhatsApp f 5 min. Ensemble STWTZ top top.',
    stars: 5,
  },
  {
    name: 'Karim A.',
    city: 'Rabat',
    text: 'Kanbi3 f mahali w daba dima nakhod mn3end NWARE FIT, jodda dial les t-shirts oversize bnina bezaf.',
    stars: 5,
  },
  {
    name: 'Imane T.',
    city: 'Fès',
    text: 'Livraison rapide, packaging propre, w les modèles Jordan li 3ndhom kaymchiw f soug bla ma tsali.',
    stars: 4,
  },
  {
    name: 'Othmane L.',
    city: 'Tanger',
    text: 'Prix jemla vraiment intéressants, khddamt m3ahom b commande 20 pièce w kolchi kan ok.',
    stars: 5,
  },
  {
    name: 'Nawal S.',
    city: 'Agadir',
    text: 'Service top, kayjawbo daghya f WhatsApp w kaywriwk les photos ga3 dial les modèles disponibles.',
    stars: 5,
  },
]

function Stars({ n }: { n: number }) {
  return (
    <div class="flex gap-0.5 text-sm">
      {Array.from({ length: 5 }).map((_, i) => (
        <i class={`fa-star star-gold ${i < n ? 'fas' : 'far'}`}></i>
      ))}
    </div>
  )
}

app.get('/', (c) => {
  const heroMsg = 'Salam, bghit ma3lomat 3la les produits dial NWARE FIT jemla (min 10 pcs).'

  return c.render(
    <>
      {/* ================= HEADER ================= */}
      <header id="site-header" class="fixed top-0 inset-x-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
          <a href="#top" class="flex items-center gap-2 sm:gap-3">
            <img
              src="/static/brand/nware-fit-logo.jpg"
              alt="NWARE FIT logo"
              class="h-9 w-9 sm:h-11 sm:w-11 rounded-full object-cover border-2 gold-border"
            />
            <span class="font-display text-xl sm:text-2xl tracking-wider gold-gradient-text">NWARE FIT</span>
          </a>

          <nav class="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
            <a href="#catalogue" class="hover:text-gold transition-colors">Catalogue</a>
            <a href="#prix" class="hover:text-gold transition-colors">Tarifs</a>
            <a href="#comment" class="hover:text-gold transition-colors">Comment Commander</a>
            <a href="#avis" class="hover:text-gold transition-colors">Avis Clients</a>
            <a href="#contact" class="hover:text-gold transition-colors">Contact</a>
          </nav>

          <div class="flex items-center gap-2">
            <a
              href={waLink(heroMsg)}
              target="_blank"
              rel="noopener"
              class="hidden sm:flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors"
            >
              <i class="fab fa-whatsapp text-lg"></i> WhatsApp
            </a>
            <button id="menu-toggle" class="md:hidden text-white text-2xl px-2" aria-label="Menu">
              <i class="fas fa-bars"></i>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" class="hidden md:hidden bg-black border-t border-zinc-800 px-4 py-4 space-y-3 text-zinc-300">
          <a href="#catalogue" class="block hover:text-gold">Catalogue</a>
          <a href="#prix" class="block hover:text-gold">Tarifs</a>
          <a href="#comment" class="block hover:text-gold">Comment Commander</a>
          <a href="#avis" class="block hover:text-gold">Avis Clients</a>
          <a href="#contact" class="block hover:text-gold">Contact</a>
          <a
            href={waLink(heroMsg)}
            target="_blank"
            rel="noopener"
            class="flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-4 py-2.5 rounded-full"
          >
            <i class="fab fa-whatsapp text-lg"></i> Contacter sur WhatsApp
          </a>
        </div>
      </header>

      {/* ================= HERO (background = logo NWARE FIT) ================= */}
      <section id="top" class="hero-bg pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6 min-h-[92vh] flex items-center relative">
        <div class="max-w-7xl mx-auto w-full relative z-10 text-center">
          <img
            src="/static/brand/nware-fit-logo.jpg"
            alt="NWARE FIT"
            class="mx-auto h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover border-4 gold-border shadow-[0_0_40px_rgba(212,175,55,0.4)] mb-6"
          />
          <p class="uppercase tracking-[0.3em] text-gold text-xs sm:text-sm font-semibold mb-4">
            Grossiste Streetwear · Casablanca, Maroc
          </p>
          <h1 class="font-display text-4xl sm:text-6xl md:text-7xl leading-tight mb-5">
            <span class="gold-gradient-text">NWARE FIT</span>
            <br />
            <span class="text-white">VENTE EN GROS — JEMLA</span>
          </h1>
          <p class="text-zinc-300 max-w-2xl mx-auto text-base sm:text-lg mb-8">
            T-shirts oversize, shorts &amp; ensembles réplicas premium — Nike, Adidas, Jordan, Lacoste &amp; STWTZ.
            Commande minimum <span class="text-gold font-semibold">10 pièces</span>. Réponse rapide sur WhatsApp,
            livraison partout au Maroc.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={waLink(heroMsg)}
              target="_blank"
              rel="noopener"
              class="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white font-semibold px-7 py-3.5 rounded-full text-base transition-transform hover:scale-105"
            >
              <i class="fab fa-whatsapp text-xl"></i> Commander sur WhatsApp
            </a>
            <a
              href="#catalogue"
              class="w-full sm:w-auto flex items-center justify-center gap-2 border-2 gold-border text-gold font-semibold px-7 py-3.5 rounded-full text-base hover:bg-gold hover:text-black transition-colors"
            >
              <i class="fas fa-shirt"></i> Voir le Catalogue
            </a>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-14 text-zinc-400 text-xs sm:text-sm">
            <div class="flex items-center gap-2"><i class="fas fa-boxes-stacked text-gold"></i> 71+ Modèles Disponibles</div>
            <div class="flex items-center gap-2"><i class="fas fa-truck-fast text-gold"></i> Livraison Tout le Maroc</div>
            <div class="flex items-center gap-2"><i class="fas fa-tags text-gold"></i> Prix Jemla Direct Fournisseur</div>
          </div>
        </div>
      </section>

      {/* ================= MARQUEE BRANDS ================= */}
      <div class="bg-gold text-black py-3 overflow-hidden border-y border-black/10">
        <div class="marquee-track whitespace-nowrap font-display text-lg sm:text-xl tracking-widest">
          {Array.from({ length: 2 }).map(() => (
            <>
              <span class="mx-6">NIKE</span><span class="mx-2">★</span>
              <span class="mx-6">ADIDAS</span><span class="mx-2">★</span>
              <span class="mx-6">JORDAN</span><span class="mx-2">★</span>
              <span class="mx-6">LACOSTE</span><span class="mx-2">★</span>
              <span class="mx-6">STWTZ</span><span class="mx-2">★</span>
            </>
          ))}
        </div>
      </div>

      {/* ================= TARIFS ================= */}
      <section id="prix" class="pattern-bg py-20 px-4 sm:px-6">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-14">
            <p class="uppercase tracking-[0.3em] text-gold text-xs sm:text-sm font-semibold mb-3">Nos Tarifs Jemla</p>
            <h2 class="font-display text-3xl sm:text-5xl">TARIFS EN GROS</h2>
            <p class="text-zinc-400 mt-4 max-w-xl mx-auto">
              Commande minimum <span class="text-gold font-semibold">10 pièces</span> (mélange de modèles/couleurs autorisé). Contactez-nous sur WhatsApp pour confirmer les quantités disponibles.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'T-shirt Simple', desc: 'STWTZ · non-oversize', price: 55, icon: 'fa-shirt' },
              { title: 'T-shirt Oversize', desc: 'Nike, Adidas, Jordan, Lacoste', price: 60, icon: 'fa-shirt', highlight: true },
              { title: 'Short Oversize', desc: 'Toutes marques', price: 70, icon: 'fa-socks' },
              { title: 'Ensemble Complet', desc: 'T-shirt + Short assorti', price: 130, icon: 'fa-layer-group' },
            ].map((item) => (
              <div
                class={`rounded-2xl p-6 border text-center card-hover ${
                  item.highlight ? 'bg-gradient-to-b from-gold/20 to-black border-gold' : 'bg-zinc-950 border-zinc-800'
                }`}
              >
                <div class="h-14 w-14 rounded-full bg-gold/15 border border-gold flex items-center justify-center mx-auto mb-4">
                  <i class={`fas ${item.icon} text-gold text-xl`}></i>
                </div>
                <h3 class="font-semibold text-lg mb-1">{item.title}</h3>
                <p class="text-zinc-400 text-xs mb-4">{item.desc}</p>
                <p class="font-display text-4xl gold-gradient-text mb-1">{item.price} DH</p>
                <p class="text-zinc-500 text-xs">/ pièce, jemla</p>
              </div>
            ))}
          </div>

          <div class="mt-10 text-center">
            <a
              href={waLink('Salam, bghit ma3lomat ktar 3la tarifs jemla dial NWARE FIT.')}
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white font-semibold px-7 py-3.5 rounded-full transition-transform hover:scale-105"
            >
              <i class="fab fa-whatsapp text-xl"></i> Demander les Tarifs Complets
            </a>
          </div>
        </div>
      </section>

      {/* ================= CATALOGUE ================= */}
      <section id="catalogue" class="py-20 px-4 sm:px-6 bg-black">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-10">
            <p class="uppercase tracking-[0.3em] text-gold text-xs sm:text-sm font-semibold mb-3">Notre Collection</p>
            <h2 class="font-display text-3xl sm:text-5xl mb-4">CATALOGUE COMPLET</h2>
            <p class="text-zinc-400 max-w-xl mx-auto">
              {PRODUCTS.length} modèles disponibles en stock — filtrez par marque ou par type de produit.
            </p>
          </div>

          {/* Category tabs */}
          <div class="flex flex-wrap justify-center gap-2 mb-5" id="cat-filters">
            {CATS.map((cat) => (
              <button
                class={`tab-btn ${cat.key === 'all' ? 'active' : ''} flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-zinc-700 text-zinc-300 hover:border-gold transition-colors`}
                data-cat={cat.key}
              >
                <i class={`fas ${cat.icon}`}></i> {cat.label}
              </button>
            ))}
          </div>

          {/* Brand filters */}
          <div class="flex flex-wrap justify-center gap-2 mb-12" id="brand-filters">
            {BRANDS.map((b) => (
              <button
                class={`filter-btn ${b.key === 'all' ? 'active' : ''} px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border-2 gold-border text-gold hover:bg-gold hover:text-black transition-colors`}
                data-brand={b.key}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div id="product-grid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {PRODUCTS.map((p) => <ProductCard p={p} />)}
          </div>

          <p id="no-results" class="hidden text-center text-zinc-500 py-16">
            Aucun produit trouvé pour ce filtre.
          </p>
        </div>
      </section>

      {/* ================= COMMENT COMMANDER ================= */}
      <section id="comment" class="pattern-bg py-20 px-4 sm:px-6">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-14">
            <p class="uppercase tracking-[0.3em] text-gold text-xs sm:text-sm font-semibold mb-3">Processus Simple</p>
            <h2 class="font-display text-3xl sm:text-5xl">COMMENT COMMANDER ?</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choisissez vos modèles', desc: 'Parcourez le catalogue et sélectionnez vos t-shirts, shorts ou ensembles préférés.', icon: 'fa-magnifying-glass' },
              { step: '2', title: 'Contactez-nous', desc: 'Envoyez-nous votre liste directement via WhatsApp ou Instagram.', icon: 'fa-comment-dots' },
              { step: '3', title: 'Min. 10 pièces', desc: 'Confirmez votre commande jemla (mélange de modèles/tailles/couleurs possible).', icon: 'fa-boxes-stacked' },
              { step: '4', title: 'Paiement & Livraison', desc: 'On confirme le prix total, le mode de paiement et la livraison partout au Maroc.', icon: 'fa-truck-fast' },
            ].map((s) => (
              <div class="relative bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-center card-hover">
                <div class="absolute -top-4 left-1/2 -translate-x-1/2 h-9 w-9 rounded-full bg-gold text-black font-display text-lg flex items-center justify-center shadow-lg">
                  {s.step}
                </div>
                <div class="h-14 w-14 rounded-full bg-gold/15 border border-gold flex items-center justify-center mx-auto mt-4 mb-4">
                  <i class={`fas ${s.icon} text-gold text-xl`}></i>
                </div>
                <h3 class="font-semibold mb-2">{s.title}</h3>
                <p class="text-zinc-400 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>

          <div class="mt-14 text-center">
            <a
              href={waLink('Salam, bghit ndir commande jemla mn3end NWARE FIT.')}
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white font-semibold px-8 py-4 rounded-full text-lg transition-transform hover:scale-105"
            >
              <i class="fab fa-whatsapp text-2xl"></i> Démarrer ma Commande
            </a>
          </div>
        </div>
      </section>

      {/* ================= AVIS CLIENTS ================= */}
      <section id="avis" class="py-20 px-4 sm:px-6 bg-black">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-14">
            <p class="uppercase tracking-[0.3em] text-gold text-xs sm:text-sm font-semibold mb-3">Ils Nous Font Confiance</p>
            <h2 class="font-display text-3xl sm:text-5xl mb-3">AVIS DE NOS CLIENTS</h2>
            <div class="flex items-center justify-center gap-2 text-gold">
              <Stars n={5} />
              <span class="text-zinc-300 text-sm ml-1">4.9/5 — Revendeurs satisfaits partout au Maroc</span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div class="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 card-hover flex flex-col">
                <Stars n={r.stars} />
                <p class="text-zinc-300 text-sm mt-4 mb-5 leading-relaxed flex-1">&ldquo;{r.text}&rdquo;</p>
                <div class="flex items-center gap-3 pt-4 border-t border-zinc-800">
                  <div class="h-10 w-10 rounded-full bg-gold/20 border border-gold flex items-center justify-center font-display text-gold">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p class="font-semibold text-sm">{r.name}</p>
                    <p class="text-zinc-500 text-xs">{r.city}, Maroc</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section class="hero-bg py-16 px-4 sm:px-6 text-center">
        <div class="max-w-3xl mx-auto">
          <h2 class="font-display text-3xl sm:text-5xl mb-5">
            PRÊT À <span class="gold-gradient-text">LANCER VOTRE STOCK</span> ?
          </h2>
          <p class="text-zinc-300 mb-8">
            Rejoignez nos revendeurs partenaires partout au Maroc. Contactez NWARE FIT dès maintenant sur WhatsApp.
          </p>
          <a
            href={waLink('Salam, bghit ntfahem 3la stock jemla dial NWARE FIT.')}
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white font-semibold px-8 py-4 rounded-full text-lg transition-transform hover:scale-105"
          >
            <i class="fab fa-whatsapp text-2xl"></i> Contacter NWARE FIT
          </a>
        </div>
      </section>

      {/* ================= FOOTER / CONTACT ================= */}
      <footer id="contact" class="bg-zinc-950 border-t border-zinc-800 py-14 px-4 sm:px-6">
        <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <img
                src="/static/brand/nware-fit-logo.jpg"
                alt="NWARE FIT"
                class="h-11 w-11 rounded-full object-cover border-2 gold-border"
              />
              <span class="font-display text-xl gold-gradient-text">NWARE FIT</span>
            </div>
            <p class="text-zinc-500 text-sm leading-relaxed">
              Grossiste streetwear à Casablanca. Réplicas premium Nike, Adidas, Jordan, Lacoste &amp; STWTZ. Vente en gros uniquement, min. 10 pièces.
            </p>
          </div>

          <div>
            <h4 class="font-semibold text-gold mb-4 uppercase text-sm tracking-wide">Navigation</h4>
            <ul class="space-y-2 text-zinc-400 text-sm">
              <li><a href="#catalogue" class="hover:text-gold">Catalogue</a></li>
              <li><a href="#prix" class="hover:text-gold">Tarifs</a></li>
              <li><a href="#comment" class="hover:text-gold">Comment Commander</a></li>
              <li><a href="#avis" class="hover:text-gold">Avis Clients</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold text-gold mb-4 uppercase text-sm tracking-wide">Marques</h4>
            <ul class="space-y-2 text-zinc-400 text-sm">
              <li>Nike</li>
              <li>Adidas</li>
              <li>Jordan</li>
              <li>Lacoste</li>
              <li>STWTZ</li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold text-gold mb-4 uppercase text-sm tracking-wide">Contact</h4>
            <ul class="space-y-3 text-zinc-400 text-sm">
              <li>
                <a href={waLink('Salam NWARE FIT!')} target="_blank" rel="noopener" class="flex items-center gap-2 hover:text-gold">
                  <i class="fab fa-whatsapp text-[#25D366] text-lg"></i> {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={IG_URL} target="_blank" rel="noopener" class="flex items-center gap-2 hover:text-gold">
                  <i class="fab fa-instagram text-lg"></i> @nware_fit_gros
                </a>
              </li>
              <li class="flex items-center gap-2">
                <i class="fas fa-envelope text-gold"></i>
                <a href={`mailto:${EMAIL}`} class="hover:text-gold break-all">{EMAIL}</a>
              </li>
              <li class="flex items-center gap-2">
                <i class="fas fa-map-marker-alt text-gold"></i> Casablanca, Maroc
              </li>
            </ul>
          </div>
        </div>

        <div class="max-w-7xl mx-auto mt-10 pt-6 border-t border-zinc-800 text-center text-zinc-600 text-xs">
          &copy; {new Date().getFullYear()} NWARE FIT — Tous droits réservés. Vente en gros uniquement (jemla).
        </div>
      </footer>

      {/* ================= FLOATING WHATSAPP BUTTON ================= */}
      <a
        href={waLink('Salam, bghit ntfahem m3a NWARE FIT.')}
        target="_blank"
        rel="noopener"
        class="wa-float fixed bottom-5 right-5 z-50 h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-[#25D366] hover:bg-[#1fb855] flex items-center justify-center shadow-2xl"
        aria-label="Contacter sur WhatsApp"
      >
        <i class="fab fa-whatsapp text-white text-3xl"></i>
      </a>

      {/* ================= LIGHTBOX ================= */}
      <div id="lightbox" onclick="closeLightbox(event)">
        <div class="relative">
          <button
            class="absolute -top-10 right-0 text-white text-3xl hover:text-gold"
            onclick="closeLightbox(event)"
            aria-label="Fermer"
          >
            <i class="fas fa-times"></i>
          </button>
          <img id="lightbox-img" src="" alt="" />
          <p id="lightbox-caption" class="text-center text-gold font-semibold mt-3"></p>
        </div>
      </div>

      <script src="/static/app.js"></script>
    </>
  )
})

export default app
