# JAMILI CARPETS — Deployment & Setup Guide

## Step 1: Create a Supabase Project

1. Go to https://supabase.com and sign up (free)
2. Click "New Project"
3. Name it "jamili-carpets"
4. Set a database password (save it!)
5. Choose a region close to your audience
6. Wait for the project to be ready

## Step 2: Get Your API Keys

1. Go to Project Settings → API
2. Copy the "Project URL" (looks like https://xxxxx.supabase.co)
3. Copy the "anon public" key

## Step 3: Configure the Website

1. Open `js/config.js`
2. Replace `YOUR-PROJECT-REF` with your Project URL
3. Replace `YOUR-SUPABASE-ANON-KEY` with your anon key

## Step 4: Create the Database Tables

1. In Supabase, go to SQL Editor
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql`
4. Paste it into the editor
5. Click "Run"
6. You should see "Success" — all tables, policies, and default data are created

## Step 5: Create an Admin User

1. In Supabase, go to Authentication → Users
2. Click "Add user"
3. Enter your email and a password
4. This will be your admin login for `admin.html`

## Step 6: Upload Images to Supabase Storage

The SQL schema automatically creates a storage bucket called `jamili-carpets`.
You can upload images:

**From the Admin Panel:**
- Go to `admin.html` on your website
- Log in with your admin credentials
- Use the upload buttons to upload logo, hero images, product images, etc.

**From Supabase Dashboard:**
- Go to Storage → jamili-carpets bucket
- Create folders: logo, home, about, services, contact, products
- Upload images to the appropriate folders

## Step 7: Image Naming Guide (for Supabase Storage)

When uploading images to Supabase, use these names so you can identify them:

### Logo
- `logo/jamili-carpets-logo.png`

### Hero Image/Video
- `home/hero-jamili-carpets.jpg` or `home/hero-jamili-carpets.mp4`

### Product Images (15 products, 3 images each)
- `products/01-kabul-heritage-front.jpg`
- `products/01-kabul-heritage-back.jpg`
- `products/01-kabul-heritage-detail.jpg`
- `products/02-silk-mazar-runner-front.jpg`
- `products/02-silk-mazar-runner-back.jpg`
- `products/02-silk-mazar-runner-detail.jpg`
- ... (continue for all 15 products)

### About Page Images
- `about/hero-about.jpg`
- `about/story.jpg`
- `about/mission.jpg`
- `about/vision.jpg`

### Services Page
- `services/hero-services.jpg`

### Contact Page
- `contact/hero-contact.jpg`

## Step 8: Deploy to Cloudflare Pages (Recommended)

1. Push all files to a GitHub repository
2. Go to https://dash.cloudflare.com
3. Navigate to Workers & Pages → Create → Pages → Connect to Git
4. Select your repository
5. Build settings:
   - Framework preset: None
   - Build command: (leave empty)
   - Build output directory: / (root)
6. Click "Save and Deploy"
7. Your site is live!

## Step 9: Custom Domain (Optional)

1. In Cloudflare Pages → Custom Domains
2. Add your domain (e.g., jamili-carpets.com)
3. Cloudflare will handle DNS and SSL automatically

## File Structure Summary

jamili-carpets/ ├── index.html ← Home page ├── about.html ← About page ├── products.html ← Products page ├── services.html ← Services page ├── faq.html ← FAQ page ├── contact.html ← Contact page ├── admin.html ← Admin panel ├── css/ │ └── style.css ← All styles ├── js/ │ ├── config.js ← Supabase config (EDIT THIS) │ ├── supabase-client.js ← Supabase SDK loader │ ├── main.js ← Header, footer, data loading │ ├── products.js ← Page renderers │ └── admin.js ← Admin panel logic ├── supabase-schema.sql ← Database schema (run in Supabase) ├── sitemap.xml ← SEO sitemap ├── robots.txt ← SEO robots └── README.md ← Project info


## Admin Panel Features

The admin panel at `/admin.html` lets you control everything in real time:

- **Site Settings**: Logo, hero image/video, contact info, social links, hours
- **Home Page**: All sections, features, stats
- **About Page**: Story, mission, vision, values, milestones
- **Products**: Add, edit, delete products with 3 images each
- **Services**: All 8 service descriptions
- **FAQ**: Add, edit, delete FAQ entries
- **Contact**: Hero, form text, map text
- **Messages**: View contact form submissions

All changes are saved to Supabase and appear on the website instantly.

## Performance Features

- No frameworks (pure HTML/CSS/JS) = fastest possible load
- Lazy loading for images
- Scroll reveal animations
- Optimized font loading (preconnect)
- Minimal JavaScript
- CDN-ready static files
- SEO: meta tags, Open Graph, structured data, sitemap, robots.txt

## SEO Features

- Unique title and meta description per page
- Open Graph tags for social sharing
- Twitter Card tags
- Structured data (JSON-LD) for Organization and FAQ
- XML sitemap
- robots.txt
- Semantic HTML
- Mobile-first responsive design
- Fast loading (Core Web Vitals friendly)
