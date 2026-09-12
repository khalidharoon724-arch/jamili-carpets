# JAMILI CARPETS — Enterprise Website

A high-performance, SEO-optimized, multi-page enterprise website for Jamili Carpets, built with vanilla HTML/CSS/JS and powered by Supabase for real-time admin control.

## Pages
- `index.html` — Home
- `about.html` — About
- `products.html` — Products (15 products, 3 images each)
- `services.html` — Services
- `faq.html` — FAQ
- `contact.html` — Contact
- `admin.html` — Admin Panel (Supabase-powered)

## Features
- Real-time content management via Supabase
- Fully responsive (mobile, tablet, desktop)
- SEO-optimized (meta tags, Open Graph, structured data)
- Maximum performance (no frameworks, vanilla JS)
- Custom color scheme
- Admin panel for editing: logo, hero, products, about, FAQ, services, home, contact

## Setup
1. Create a Supabase project at https://supabase.com
2. Update `js/config.js` with your Supabase URL and Anon Key
3. Run the SQL schema in `supabase-schema.sql` in your Supabase SQL Editor
4. Upload images to your Supabase Storage bucket named `jamili-carpets`
5. Deploy to Cloudflare Pages or any static host

## File Structure
├── index.html ├── about.html ├── products.html ├── services.html ├── faq.html ├── contact.html ├── admin.html ├── css/ │ └── style.css ├── js/ │ ├── config.js │ ├── supabase-client.js │ ├── main.js │ ├── products.js │ └── admin.js ├── supabase-schema.sql └── README.md
