# NWARE FIT — Site Wholesale (Jemla)

## Vue d'ensemble du projet
- **Nom** : NWARE FIT
- **Objectif** : Site vitrine e-commerce **vente en gros uniquement** (jemla) pour la revente de streetwear réplica premium (Nike, Adidas, Jordan, Lacoste, STWTZ) à Casablanca, Maroc.
- **Cible** : Revendeurs / commerçants souhaitant s'approvisionner en quantité (commande minimum 10 pièces).
- **Contact business** :
  - WhatsApp / Téléphone : **06 49 01 37 10**
  - Instagram : [@nware_fit_gros](https://www.instagram.com/nware_fit_gros)
  - Email : lmnawaryassir@gmail.com

## Fonctionnalités actuellement complétées
- ✅ Page d'accueil complète en one-page (Hono + JSX, rendu côté serveur)
- ✅ Hero avec le **logo NWARE FIT utilisé en image de fond** (dégradé noir + logo)
- ✅ Header fixe avec logo, navigation, bouton WhatsApp et menu mobile (hamburger)
- ✅ Bandeau défilant (marquee) des marques : NIKE / ADIDAS / JORDAN / LACOSTE / STWTZ
- ✅ Section **Tarifs** avec les 4 grilles de prix :
  - T-shirt Simple (STWTZ) : 55 DH
  - T-shirt Oversize (Nike/Adidas/Jordan/Lacoste) : 60 DH
  - Short Oversize : 70 DH
  - Ensemble (t-shirt + short assorti) : 130 DH
- ✅ Section **Catalogue** avec les **71 images produits** fournies par le client, chacune avec :
  - Filtre par marque (Nike, Adidas, Jordan, Lacoste, STWTZ, Tous)
  - Filtre par catégorie (T-shirt Oversize, T-shirt Simple, Short, Ensemble, Tout)
  - Zoom (lightbox) au clic sur l'image
  - Bouton WhatsApp dédié par produit (message pré-rempli avec le nom + prix)
- ✅ Section **Comment Commander** (4 étapes : choisir → contacter → min. 10 pcs → paiement/livraison)
- ✅ Section **Avis Clients** (6 témoignages en Darija, style Moroccan reseller, avec étoiles — **placeholders à remplacer par de vrais avis client dès que disponibles**)
- ✅ Bannière CTA finale (fond logo NWARE FIT)
- ✅ Footer complet avec logo, navigation, marques, contact (WhatsApp, Instagram, email, ville)
- ✅ **Bouton WhatsApp flottant** (coin bas-droit, animation pulse, visible sur toutes les pages/sections)
- ✅ Design 100% responsive (mobile / tablette / desktop), palette noir & or cohérente avec le logo

## URLs
- **Aperçu sandbox (temporaire)** : https://3000-ipm6uz3vka1g5vvnzxwe1-3844e1b6.sandbox.novita.ai
- **Production** : non déployé encore (à faire — voir section Déploiement)
- **GitHub** : non connecté encore

## Structure de données
- `src/data/products.ts` : catalogue de 71 produits générés automatiquement à partir des noms de fichiers d'image (`/public/static/products/`). Chaque produit contient : `id`, `file`, `name`, `brand` (Nike/Adidas/Jordan/Lacoste/STWTZ/Nike & Adidas), `category` (tshirt-oversize / tshirt-simple / short / ensemble), `price`, `color`.
- Aucune base de données externe utilisée — le catalogue est statique (données en dur dans le code), adapté à un site vitrine sans besoin de CMS dynamique pour le moment.

## Stockage des assets
- `public/static/products/` — 71 photos produits (t-shirts, shorts, ensembles)
- `public/static/brand/nware-fit-logo.jpg` — logo NWARE FIT (utilisé en favicon + fond hero + header + footer)
- `public/static/style.css` — styles personnalisés (fond logo, animations, lightbox, marquee...)
- `public/static/app.js` — interactions front (filtres, menu mobile, lightbox, scroll header)

## Guide d'utilisation (visiteur)
1. Arrivée sur la page d'accueil → voit immédiatement la marque NWARE FIT et le message "vente en gros".
2. Consulte les **Tarifs** pour connaître les prix par catégorie.
3. Parcourt le **Catalogue**, filtre par marque/catégorie, clique sur une image pour zoomer.
4. Clique sur **Commander** (bouton vert WhatsApp) sur un produit précis, ou sur le bouton flottant WhatsApp à tout moment → ouvre WhatsApp avec un message pré-rempli.
5. Lit les **Avis Clients** pour se rassurer sur le sérieux du fournisseur.
6. Utilise le footer pour trouver Instagram, email ou téléphone si besoin d'un autre canal.

## Fonctionnalités non implémentées (pistes futures)
- Vrais avis clients (remplacer les 6 témoignages placeholders)
- Formulaire de commande structuré (actuellement tout passe par WhatsApp, ce qui correspond à la demande initiale du client)
- Système de compte revendeur / historique de commandes
- Multi-langue (actuellement en français avec messages WhatsApp pré-remplis en Darija)
- Back-office pour que le client mette à jour lui-même le catalogue (actuellement nécessite une intervention développeur)

## Prochaines étapes recommandées
1. Le client peut envoyer d'autres photos produits si besoin (facile à ajouter dans `public/static/products/` + `src/data/products.ts`)
2. Remplacer les avis placeholders par de vrais avis clients quand disponibles
3. Choisir la méthode de déploiement (Cloudflare — compte du client ou hébergement Genspark) puis déployer en production
4. Connecter un nom de domaine personnalisé si souhaité (ex: nwarefit.ma)

## Déploiement
- **Plateforme** : Cloudflare Pages (Hono + Vite)
- **Statut** : ✅ Fonctionnel en local (sandbox) — ❌ Pas encore déployé en production
- **Stack technique** : Hono + TypeScript (JSX) + TailwindCSS (CDN) + Font Awesome + Google Fonts
- **Dernière mise à jour** : 26 juillet 2026
