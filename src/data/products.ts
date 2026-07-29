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
  lilac: 'Lilas', pink: 'Rose', mint: 'Menthe', peach: 'Pêche',
  mauve: 'Mauve', 'grey-black': 'Gris/Noir', 'red-cream': 'Rouge/Crème',
  'white-maroon': 'Blanc/Bordeaux', 'lilac-mint': 'Lilas/Menthe',
  'red-mint': 'Rouge/Menthe', 'pink-maroon': 'Rose/Bordeaux',
  'white-lilac': 'Blanc/Lilas', yellow2: 'Jaune',
  'trio-mauve': 'Trio Mauve', 'trio-yellow': 'Trio Jaune',
  'trio-pink-navy-lilac': 'Trio Rose/Marine/Lilas',
}

function humanizeColor(raw: string): string {
  return colorLabels[raw] || raw.charAt(0).toUpperCase() + raw.slice(1)
}

interface ParsedInfo {
  brand: ProductBrand
  style?: string
  colorKey: string
}

// Parses filenames such as:
//  tshirt-nike-cream.jpg              -> Nike, cream
//  tshirt-jordan-logobox-cream.jpg    -> Jordan (Logo Box), cream
//  tshirt-jordan-text-green.jpg       -> Jordan (Text), green
//  tshirt-jordan-bulls-cream.jpg      -> Jordan (Bulls), cream
//  tshirt-jordanair-white.jpg         -> Jordan (Air), white
//  tshirt-jordanairback-brown.jpg     -> Jordan (Air Dos), brown
//  tshirt-jordanlogoback-brown.jpg    -> Jordan (Logo Dos), brown
//  tshirt-lacoste-green.jpg           -> Lacoste, green
//  tshirt-adidas-black.jpg            -> Adidas, black
//  tshirt-stwtz-white.jpg             -> STWTZ, white
//  short-mix-trio-yellow.jpg          -> Nike & Adidas (Trio), yellow
//  short-mix-white.jpg                -> Nike & Adidas, white
//  short-jordan-yellow.jpg            -> Jordan, yellow
//  short-stwtz-grey-black.jpg         -> STWTZ, grey-black
function parseFile(file: string): Product {
  const base = file.replace('.jpg', '')
  const parts = base.split('-')
  const typeTag = parts[0] // tshirt | short
  const rest = parts.slice(1) // everything after tshirt/short-

  let brand: ProductBrand
  let style: string | undefined
  let colorKey: string

  const key = rest[0]

  if (key === 'nike') {
    brand = 'Nike'
    colorKey = rest.slice(1).join('-')
  } else if (key === 'jordan') {
    brand = 'Jordan'
    if (rest[1] === 'logobox' || rest[1] === 'text' || rest[1] === 'bulls') {
      style = rest[1]
      colorKey = rest.slice(2).join('-')
    } else {
      colorKey = rest.slice(1).join('-')
    }
  } else if (key === 'jordanair') {
    brand = 'Jordan'
    style = 'air'
    colorKey = rest.slice(1).join('-')
  } else if (key === 'jordanairback') {
    brand = 'Jordan'
    style = 'air-dos'
    colorKey = rest.slice(1).join('-')
  } else if (key === 'jordanlogoback') {
    brand = 'Jordan'
    style = 'logo-dos'
    colorKey = rest.slice(1).join('-')
  } else if (key === 'lacoste') {
    brand = 'Lacoste'
    colorKey = rest.slice(1).join('-')
  } else if (key === 'adidas') {
    brand = 'Adidas'
    colorKey = rest.slice(1).join('-')
  } else if (key === 'stwtz') {
    brand = 'STWTZ'
    colorKey = rest.slice(1).join('-')
  } else if (key === 'mix') {
    brand = 'Nike & Adidas'
    if (rest[1] === 'trio') {
      style = 'trio'
      colorKey = rest.slice(2).join('-')
    } else {
      colorKey = rest.slice(1).join('-')
    }
  } else {
    brand = 'Nike'
    colorKey = rest.join('-')
  }

  const styleLabels: Record<string, string> = {
    logobox: 'Logo Box',
    text: 'Text',
    bulls: 'Bulls',
    air: 'Air',
    'air-dos': 'Air Dos',
    'logo-dos': 'Logo Dos',
    trio: 'Trio',
  }

  let category: ProductCategory
  let price: number
  let namePrefix: string

  if (typeTag === 'short') {
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

  const colorLabel = humanizeColor(colorKey)
  const nameParts = [namePrefix, brand]
  if (style && styleLabels[style]) nameParts.push(styleLabels[style])
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
  'short-jordan-grey-black.jpg',
  'short-jordan-lilac.jpg',
  'short-jordan-pink-maroon.jpg',
  'short-jordan-red-mint.jpg',
  'short-jordan-white-lilac.jpg',
  'short-jordan-yellow.jpg',
  'short-jordan-yellow2.jpg',
  'short-mix-lilac.jpg',
  'short-mix-maroon.jpg',
  'short-mix-navyblue.jpg',
  'short-mix-peach.jpg',
  'short-mix-pink.jpg',
  'short-mix-purple.jpg',
  'short-mix-red.jpg',
  'short-mix-trio-mauve.jpg',
  'short-mix-trio-yellow.jpg',
  'short-mix-white.jpg',
  'short-stwtz-grey-black.jpg',
  'short-stwtz-lilac-mint.jpg',
  'short-stwtz-red-cream.jpg',
  'short-stwtz-trio-pink-navy-lilac.jpg',
  'short-stwtz-white-maroon.jpg',
  'tshirt-adidas-black.jpg',
  'tshirt-adidas-blue.jpg',
  'tshirt-adidas-green.jpg',
  'tshirt-adidas-lightblue.jpg',
  'tshirt-adidas-maroon.jpg',
  'tshirt-adidas-white.jpg',
  'tshirt-jordan-bulls-cream.jpg',
  'tshirt-jordan-bulls-green.jpg',
  'tshirt-jordan-logobox-cream.jpg',
  'tshirt-jordan-logobox-green.jpg',
  'tshirt-jordan-logobox-grey.jpg',
  'tshirt-jordan-logobox-olive.jpg',
  'tshirt-jordan-logobox-teal.jpg',
  'tshirt-jordan-text-brown.jpg',
  'tshirt-jordan-text-cream.jpg',
  'tshirt-jordan-text-green.jpg',
  'tshirt-jordan-text-olive.jpg',
  'tshirt-jordanair-black.jpg',
  'tshirt-jordanair-brown.jpg',
  'tshirt-jordanair-white.jpg',
  'tshirt-jordanairback-brown.jpg',
  'tshirt-jordanlogoback-brown.jpg',
  'tshirt-lacoste-black.jpg',
  'tshirt-lacoste-blue.jpg',
  'tshirt-lacoste-green.jpg',
  'tshirt-lacoste-lightblue.jpg',
  'tshirt-lacoste-white.jpg',
  'tshirt-nike-brown.jpg',
  'tshirt-nike-cream.jpg',
  'tshirt-nike-green.jpg',
  'tshirt-nike-olive.jpg',
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
