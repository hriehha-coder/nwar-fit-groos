// NWARE FIT — Wholesale product catalog
// Prices (wholesale, MOQ 10+ pcs):
//  - T-shirt oversize single brand (Jordan / Adidas / Nike / Lacoste): 60 DH
//  - T-shirt simple (STWTZ, non-oversize): 55 DH
//  - Short oversize: 70 DH
//  - Ensemble (t-shirt + short assorti): 130 DH

export type ProductCategory = 'tshirt-oversize' | 'tshirt-simple' | 'short' | 'ensemble'
export type ProductBrand = 'Nike' | 'Adidas' | 'Jordan' | 'Lacoste' | 'STWTZ' | 'Nike & Adidas'

export interface Product {
  id: string
  file: string
  name: string
  brand: ProductBrand
  category: ProductCategory
  price: number
  color: string
}

const colorLabels: Record<string, string> = {
  black: 'Noir', white: 'Blanc', blue: 'Bleu', lightblue: 'Bleu ciel',
  green: 'Vert', maroon: 'Bordeaux', brown: 'Marron', cream: 'Crème',
  olive: 'Olive', grey: 'Gris', teal: 'Vert canard', red: 'Rouge',
  purple: 'Violet', navyblue: 'Bleu marine', yellow: 'Jaune',
  lightyellow: 'Jaune clair', mauve: 'Mauve', pink: 'Rose',
  mint: 'Menthe', lightmint: 'Menthe clair', bright: 'Coloré',
  pastel1: 'Pastel', pastel2: 'Pastel', 'black-black': 'Noir/Noir',
  'black-grey': 'Noir/Gris', 'white-black': 'Blanc/Noir',
}

const brandLabels: Record<string, ProductBrand> = {
  adidas: 'Adidas',
  jordanair: 'Jordan', jordanbulls: 'Jordan', jordanlogoback: 'Jordan',
  jordanlogobox: 'Jordan', jordantext: 'Jordan', jordan: 'Jordan',
  lacoste: 'Lacoste',
  nikeswoosh: 'Nike', nike: 'Nike',
  stwtz: 'STWTZ',
  mix: 'Nike & Adidas',
}

const styleLabels: Record<string, string> = {
  jordanair: 'Air', jordanbulls: 'Bulls', jordanlogoback: 'Logo Dos',
  jordanlogobox: 'Logo Box', jordantext: 'Text', nikeswoosh: 'Swoosh',
  'nike-trio': 'Trio', mix: 'Mix',
}

function humanizeColor(raw: string): string {
  return colorLabels[raw] || raw.charAt(0).toUpperCase() + raw.slice(1)
}

// Parses filenames like:
//  tshirt-adidas-black.jpg          -> tshirt, adidas, black
//  tshirt-jordanlogobox-cream.jpg   -> tshirt, jordanlogobox, cream
//  short-mix-maroon-nike-adidas.jpg -> short, mix, maroon-nike-adidas
//  short-nike-trio-bright.jpg       -> short, nike-trio, bright
//  ensemble-stwtz-black-black.jpg   -> ensemble, stwtz, black-black
function parseFile(file: string): Product {
  const base = file.replace('.jpg', '')
  const parts = base.split('-')
  const typeTag = parts[0] // tshirt | short | ensemble

  let styleKey = parts[1]
  let colorKey: string

  if (base.startsWith('short-nike-trio-')) {
    styleKey = 'nike-trio'
    colorKey = parts.slice(3).join('-')
  } else if (base.startsWith('short-mix-')) {
    styleKey = 'mix'
    colorKey = parts[2] // color word only (nike-adidas suffix dropped for label)
  } else {
    colorKey = parts.slice(2).join('-')
  }

  const brand = brandLabels[styleKey] || 'Nike'
  const styleLabel = styleLabels[styleKey]
  const colorLabel = humanizeColor(colorKey)

  let category: ProductCategory
  let price: number
  let namePrefix: string

  if (typeTag === 'ensemble') {
    category = 'ensemble'
    price = 130
    namePrefix = 'Ensemble'
  } else if (typeTag === 'short') {
    category = 'short'
    price = 70
    namePrefix = 'Short Oversize'
  } else {
    // tshirt
    if (brand === 'STWTZ') {
      category = 'tshirt-simple'
      price = 55
      namePrefix = 'T-shirt'
    } else {
      category = 'tshirt-oversize'
      price = 60
      namePrefix = 'T-shirt Oversize'
    }
  }

  const nameParts = [namePrefix, brand]
  if (styleLabel) nameParts.push(styleLabel)
  nameParts.push(colorLabel)

  return {
    id: base,
    file,
    name: nameParts.join(' '),
    brand,
    category,
    price,
    color: colorLabel,
  }
}

export const PRODUCT_FILES: string[] = [
  'ensemble-jordanair-black.jpg',
  'ensemble-jordanair-white.jpg',
  'ensemble-stwtz-black-black.jpg',
  'ensemble-stwtz-black-grey.jpg',
  'ensemble-stwtz-white-black.jpg',
  'short-jordan-cream.jpg',
  'short-jordan-lightyellow.jpg',
  'short-jordan-maroon.jpg',
  'short-jordan-navyblue.jpg',
  'short-jordan-purple.jpg',
  'short-jordan-red.jpg',
  'short-jordan-white.jpg',
  'short-jordan-yellow.jpg',
  'short-mix-maroon-nike-adidas.jpg',
  'short-mix-mauve-nike-adidas.jpg',
  'short-mix-mint-nike-adidas.jpg',
  'short-mix-pink-nike-adidas.jpg',
  'short-mix-red-nike-adidas.jpg',
  'short-mix-white-nike-adidas.jpg',
  'short-mix-yellow-nike-adidas.jpg',
  'short-nike-trio-bright.jpg',
  'short-nike-trio-pastel1.jpg',
  'short-nike-trio-pastel2.jpg',
  'short-stwtz-lightmint.jpg',
  'short-stwtz-lightyellow.jpg',
  'short-stwtz-maroon.jpg',
  'short-stwtz-mauve.jpg',
  'short-stwtz-olive.jpg',
  'short-stwtz-pink.jpg',
  'short-stwtz-purple.jpg',
  'short-stwtz-red.jpg',
  'short-stwtz-yellow.jpg',
  'tshirt-adidas-black.jpg',
  'tshirt-adidas-blue.jpg',
  'tshirt-adidas-green.jpg',
  'tshirt-adidas-lightblue.jpg',
  'tshirt-adidas-maroon.jpg',
  'tshirt-adidas-white.jpg',
  'tshirt-jordanair-black.jpg',
  'tshirt-jordanair-brown.jpg',
  'tshirt-jordanair-white.jpg',
  'tshirt-jordanbulls-brown.jpg',
  'tshirt-jordanbulls-cream.jpg',
  'tshirt-jordanbulls-green.jpg',
  'tshirt-jordanbulls-olive.jpg',
  'tshirt-jordanlogoback-brown.jpg',
  'tshirt-jordanlogobox-cream.jpg',
  'tshirt-jordanlogobox-green.jpg',
  'tshirt-jordanlogobox-grey.jpg',
  'tshirt-jordanlogobox-olive.jpg',
  'tshirt-jordanlogobox-teal.jpg',
  'tshirt-jordantext-brown.jpg',
  'tshirt-jordantext-cream.jpg',
  'tshirt-jordantext-green.jpg',
  'tshirt-jordantext-olive.jpg',
  'tshirt-jordantext-teal.jpg',
  'tshirt-lacoste-black.jpg',
  'tshirt-lacoste-blue.jpg',
  'tshirt-lacoste-green.jpg',
  'tshirt-lacoste-lightblue.jpg',
  'tshirt-lacoste-white.jpg',
  'tshirt-nikeswoosh-brown.jpg',
  'tshirt-nikeswoosh-cream.jpg',
  'tshirt-nikeswoosh-green.jpg',
  'tshirt-nikeswoosh-grey.jpg',
  'tshirt-nikeswoosh-olive.jpg',
  'tshirt-nikeswoosh-red.jpg',
  'tshirt-nikeswoosh-teal.jpg',
  'tshirt-stwtz-black.jpg',
  'tshirt-stwtz-brown.jpg',
  'tshirt-stwtz-white.jpg',
]

export const PRODUCTS: Product[] = PRODUCT_FILES.map(parseFile)

export const BRANDS: { key: string; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'Nike', label: 'Nike' },
  { key: 'Adidas', label: 'Adidas' },
  { key: 'Jordan', label: 'Jordan' },
  { key: 'Lacoste', label: 'Lacoste' },
  { key: 'STWTZ', label: 'STWTZ' },
]

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  'tshirt-oversize': 'T-shirt Oversize',
  'tshirt-simple': 'T-shirt Simple',
  short: 'Short Oversize',
  ensemble: 'Ensemble',
}
