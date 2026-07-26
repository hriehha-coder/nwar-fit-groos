// ===== NWARE FIT — Frontend interactions =====

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle')
  const mobileMenu = document.getElementById('mobile-menu')
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden')
    })
    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'))
    })
  }

  // ---- Product filtering (brand + category) ----
  let activeBrand = 'all'
  let activeCat = 'all'

  const grid = document.getElementById('product-grid')
  const cards = grid ? Array.from(grid.querySelectorAll('.product-card')) : []
  const noResults = document.getElementById('no-results')

  function applyFilters() {
    let visibleCount = 0
    cards.forEach((card) => {
      const brand = card.getAttribute('data-brand')
      const cat = card.getAttribute('data-category')
      const brandMatch = activeBrand === 'all' || brand === activeBrand
      const catMatch = activeCat === 'all' || cat === activeCat
      const show = brandMatch && catMatch
      card.style.display = show ? '' : 'none'
      if (show) {
        visibleCount++
        card.classList.add('fade-in')
      }
    })
    if (noResults) {
      noResults.classList.toggle('hidden', visibleCount > 0)
    }
  }

  const brandFilters = document.getElementById('brand-filters')
  if (brandFilters) {
    brandFilters.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        brandFilters.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'))
        btn.classList.add('active')
        activeBrand = btn.getAttribute('data-brand')
        applyFilters()
      })
    })
  }

  const catFilters = document.getElementById('cat-filters')
  if (catFilters) {
    catFilters.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        catFilters.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'))
        btn.classList.add('active')
        activeCat = btn.getAttribute('data-cat')
        applyFilters()
      })
    })
  }

  // Header shadow on scroll
  const header = document.getElementById('site-header')
  window.addEventListener('scroll', () => {
    if (!header) return
    if (window.scrollY > 10) {
      header.classList.add('shadow-lg')
    } else {
      header.classList.remove('shadow-lg')
    }
  })
})

// ---- Lightbox ----
function openLightbox(src, caption) {
  const lb = document.getElementById('lightbox')
  const img = document.getElementById('lightbox-img')
  const cap = document.getElementById('lightbox-caption')
  if (!lb || !img) return
  img.src = src
  img.alt = caption || ''
  if (cap) cap.textContent = caption || ''
  lb.classList.add('open')
  document.body.style.overflow = 'hidden'
}

function closeLightbox(e) {
  const lb = document.getElementById('lightbox')
  if (!lb) return
  // Only close if clicking the backdrop or a close control, not the image itself
  if (e && e.target && e.target.id === 'lightbox-img') return
  lb.classList.remove('open')
  document.body.style.overflow = ''
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox()
})
