-- ============================================================
-- JAMILI CARPETS — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. SITE SETTINGS TABLE (logo, hero, contact info, social links)
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  logo_url TEXT DEFAULT 'https://placehold.co/400x120/0D1B2A/C99A47?text=JAMILI+CARPETS',
  hero_type TEXT DEFAULT 'image',
  hero_url TEXT DEFAULT 'https://placehold.co/1920x1080/0D1B2A/C99A47?text=Jamili+Carpets',
  hero_title TEXT DEFAULT 'Handcrafted Afghan Carpets Since 1980',
  hero_subtitle TEXT DEFAULT 'Authentic handmade carpets woven with tradition, artistry, and the finest materials from the heart of Kabul.',
  hero_button_text TEXT DEFAULT 'Explore Our Collection',
  company_name TEXT DEFAULT 'JAMILI CARPETS',
  phone TEXT DEFAULT '+93777697777',
  whatsapp TEXT DEFAULT 'https://wa.me/+93777697777',
  email TEXT DEFAULT 'jamili.carpets@gmail.com',
  address TEXT DEFAULT 'Shahre-Naw, Chicken Street, Khoja Amini Market Shop #7, Kabul, Afghanistan',
  google_maps TEXT DEFAULT 'https://goo.gl/maps/YyvTKm8dLEf3ZVju6',
  instagram TEXT DEFAULT 'https://www.instagram.com/jamili_carpets',
  facebook TEXT DEFAULT 'https://www.facebook.com/share/14rVypPHCJm/',
  opening_hours TEXT DEFAULT 'Saturday to Thursday, 9:00 AM to 6:00 PM',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO site_settings (id) VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- 2. HOME PAGE CONTENT
CREATE TABLE IF NOT EXISTS home_content (
  id INTEGER PRIMARY KEY DEFAULT 1,
  section1_title TEXT DEFAULT 'Welcome to Jamili Carpets',
  section1_text TEXT DEFAULT 'For over four decades, Jamili Carpets has been at the forefront of Afghan carpet manufacturing, combining ancient weaving techniques with contemporary design sensibilities. From our humble beginnings with just two looms in 1980, we have grown into one of Afghanistan''s most respected carpet manufacturers, serving clients across the globe.',
  section1_image TEXT DEFAULT 'https://placehold.co/800x600/1B365D/E6C17A?text=Our+Story',
  section2_title TEXT DEFAULT 'Why Choose Jamili Carpets?',
  section2_text TEXT DEFAULT 'Every carpet we produce is a testament to Afghan craftsmanship. We use only the finest wool, silk, and cotton, dyed with natural pigments and woven by master artisans who have inherited their skills through generations.',
  section3_title TEXT DEFAULT 'Our Heritage',
  section3_text TEXT DEFAULT 'Founded in Kabul in 1980, Jamili Carpets began with just two looms and a vision to preserve and celebrate the rich tradition of Afghan carpet weaving. Today, we operate multiple workshops and our carpets adorn homes, offices, and galleries worldwide.',
  section3_image TEXT DEFAULT 'https://placehold.co/800x600/1B365D/C99A47?text=Our+Heritage',
  feature1_title TEXT DEFAULT 'Authentic Handmade',
  feature1_text TEXT DEFAULT 'Every carpet is hand-woven by skilled Afghan artisans.',
  feature1_icon TEXT DEFAULT 'hand',
  feature2_title TEXT DEFAULT 'Premium Materials',
  feature2_text TEXT DEFAULT 'Finest wool, silk, and cotton sourced from local regions.',
  feature2_icon TEXT DEFAULT 'gem',
  feature3_title TEXT DEFAULT 'Natural Dyes',
  feature3_text TEXT DEFAULT 'Traditional natural dyeing techniques for lasting colors.',
  feature3_icon TEXT DEFAULT 'palette',
  feature4_title TEXT DEFAULT 'Global Shipping',
  feature4_text TEXT DEFAULT 'We ship our carpets worldwide with secure packaging.',
  feature4_icon TEXT DEFAULT 'globe',
  stats1_number TEXT DEFAULT '44+',
  stats1_label TEXT DEFAULT 'Years of Experience',
  stats2_number TEXT DEFAULT '10000+',
  stats2_label TEXT DEFAULT 'Carpets Woven',
  stats3_number TEXT DEFAULT '50+',
  stats3_label TEXT DEFAULT 'Countries Served',
  stats4_number TEXT DEFAULT '100%',
  stats4_label TEXT DEFAULT 'Handmade',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO home_content (id) VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- 3. ABOUT PAGE CONTENT
CREATE TABLE IF NOT EXISTS about_content (
  id INTEGER PRIMARY KEY DEFAULT 1,
  hero_title TEXT DEFAULT 'Our Story',
  hero_subtitle TEXT DEFAULT 'From two looms in Kabul to a globally recognized name in Afghan carpets.',
  hero_image TEXT DEFAULT 'https://placehold.co/1920x600/0D1B2A/C99A47?text=About+Jamili+Carpet',
  story_title TEXT DEFAULT 'The Jamili Journey',
  story_text TEXT DEFAULT 'Jamili Carpets was founded in 1980 in the bustling streets of Kabul, Afghanistan. What began as a modest workshop with just two looms has grown into one of the most recognized names in Afghan carpet manufacturing. Our founder, driven by a passion for the ancient art of carpet weaving, set out to preserve and promote the rich heritage of Afghan craftsmanship.

The early years were marked by dedication and hard work. With only two looms, every carpet was a labor of love, taking months to complete. The founder personally oversaw every stage of production, from selecting the finest raw materials to guiding the weavers and inspecting the final product. This commitment to quality quickly earned Jamili Carpets a reputation for excellence.

As demand grew, so did our operations. We expanded our workshop, added more looms, and employed more artisans, many of whom came from families with generations of weaving experience. Despite this growth, we never compromised on our core values: authenticity, quality, and fair treatment of our artisans.

Over the decades, Jamili Carpets has participated in numerous international exhibitions, showcasing the beauty and craftsmanship of Afghan carpets to a global audience. Our carpets have found homes in over 50 countries, from private residences to luxury hotels and corporate offices.

Today, Jamili Carpets stands as a testament to the enduring appeal of handmade Afghan carpets. We continue to innovate while staying true to our roots, blending traditional techniques with contemporary designs to create carpets that are both timeless and modern.',
  story_image TEXT DEFAULT 'https://placehold.co/800x600/1B365D/C99A47?text=Our+Story',
  mission_title TEXT DEFAULT 'Our Mission',
  mission_text TEXT DEFAULT 'Our mission is to preserve and promote the ancient art of Afghan carpet weaving while providing our artisans with fair wages and a dignified livelihood. We believe that every carpet tells a story — of the artisan who wove it, of the traditions passed down through generations, and of the cultural heritage of Afghanistan. By choosing a Jamili carpet, you are not just buying a floor covering; you are investing in a piece of living history and supporting the livelihoods of Afghan artisans and their families.',
  mission_image TEXT DEFAULT 'https://placehold.co/800x600/1B365D/E6C17A?text=Our+Mission',
  vision_title TEXT DEFAULT 'Our Vision',
  vision_text TEXT DEFAULT 'To be the world''s most trusted and respected name in handmade Afghan carpets, known for our unwavering commitment to quality, authenticity, and the well-being of our artisans. We envision a future where Afghan carpets are celebrated globally for their artistry and craftsmanship, and where the artisans who create them are recognized and rewarded for their skill and dedication.',
  vision_image TEXT DEFAULT 'https://placehold.co/800x600/1B365D/C99A47?text=Our+Vision',
  values_title TEXT DEFAULT 'Our Core Values',
  values_text TEXT DEFAULT 'At Jamili Carpets, our values are woven into every carpet we create. They guide our decisions, shape our relationships, and define who we are as a company.',
  value1_title TEXT DEFAULT 'Authenticity',
  value1_text TEXT DEFAULT 'We stay true to traditional Afghan weaving techniques, ensuring every carpet is genuinely handmade.',
  value1_icon TEXT DEFAULT 'shield',
  value2_title TEXT DEFAULT 'Quality',
  value2_text TEXT DEFAULT 'We use only the finest materials and maintain rigorous quality standards at every stage.',
  value2_icon TEXT DEFAULT 'star',
  value3_title TEXT DEFAULT 'Fair Trade',
  value3_text TEXT DEFAULT 'We pay our artisans fair wages and provide safe working conditions.',
  value3_icon TEXT DEFAULT 'handshake',
  value4_title TEXT DEFAULT 'Sustainability',
  value4_text TEXT DEFAULT 'We use natural dyes and sustainable materials, minimizing environmental impact.',
  value4_icon TEXT DEFAULT 'leaf',
  milestone1_year TEXT DEFAULT '1980',
  milestone1_title TEXT DEFAULT 'The Beginning',
  milestone1_text TEXT DEFAULT 'Jamili Carpets is founded in Kabul with just two looms.',
  milestone2_year TEXT DEFAULT '1990',
  milestone2_title TEXT DEFAULT 'Growing Demand',
  milestone2_text TEXT DEFAULT 'Expanded our workshop and added more looms to meet growing demand.',
  milestone3_year TEXT DEFAULT '2000',
  milestone3_title TEXT DEFAULT 'Going Global',
  milestone3_text TEXT DEFAULT 'Began exporting carpets internationally, reaching customers in over 20 countries.',
  milestone4_year TEXT DEFAULT '2010',
  milestone4_title TEXT DEFAULT 'International Recognition',
  milestone4_text TEXT DEFAULT 'Participated in major international carpet exhibitions and received recognition for quality.',
  milestone5_year TEXT DEFAULT '2020',
  milestone5_title TEXT DEFAULT 'Digital Transformation',
  milestone5_text TEXT DEFAULT 'Launched our online presence, making our carpets accessible to customers worldwide.',
  milestone6_year TEXT DEFAULT '2025',
  milestone6_title TEXT DEFAULT 'Continuing the Legacy',
  milestone6_text TEXT DEFAULT 'With over four decades of experience, we continue to innovate while preserving tradition.',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO about_content (id) VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- 4. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Product Name',
  size TEXT DEFAULT 'Custom Size Available',
  quality TEXT DEFAULT '10x10',
  material TEXT DEFAULT 'Wool',
  description TEXT DEFAULT 'Product description goes here.',
  washing_type TEXT DEFAULT 'Regular',
  country_of_origin TEXT DEFAULT 'Afghanistan',
  price TEXT DEFAULT 'Enquire via WhatsApp',
  image_front TEXT DEFAULT 'https://placehold.co/600x800/1B365D/C99A47?text=Front',
  image_back TEXT DEFAULT 'https://placehold.co/600x800/1B365D/E6C17A?text=Back',
  image_detail TEXT DEFAULT 'https://placehold.co/600x800/1B365D/F5EBDD?text=Detail',
  category TEXT DEFAULT 'Handmade',
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO products (name, size, quality, material, description, washing_type, category, is_featured, display_order) VALUES
('Kabul Heritage Rug', '300x200 cm', '20x20', 'Wool', 'A stunning traditional Afghan rug featuring geometric medallion patterns in deep indigo and warm gold tones. Hand-knotted by master weavers in Kabul, this rug embodies centuries of Afghan weaving tradition. The intricate border design and central medallion are characteristic of the Kabul region, making it a true collector''s piece.', 'Regular', 'Traditional', true, 1),
('Silk Mazar-e-Sharif Runner', '400x80 cm', '25x25', 'Silk', 'An exquisite silk runner rug featuring floral motifs inspired by the gardens of Mazar-e-Sharif. The fine silk threads create a luminous quality that changes with the light, making this runner a sophisticated addition to any hallway or corridor. Each knot is meticulously tied by hand, resulting in an extraordinarily detailed pattern.', 'Regular', 'Silk', true, 2),
('Herati Garden Carpet', '350x250 cm', '15x15', 'Wool/Silk', 'Inspired by the legendary gardens of Herat, this carpet features a lush array of floral and botanical motifs. The combination of wool and silk creates a rich texture and visual depth. The Herati pattern, one of the most iconic in Afghan carpet weaving, is rendered here with exceptional skill and attention to detail.', 'Regular', 'Traditional', true, 3),
('Nomadic Baluch Tribal Rug', '250x150 cm', '10x10', 'Wool', 'Authentic Baluch tribal rug woven by nomadic artisans in southwestern Afghanistan. The deep reds and dark blues are characteristic of Baluch weaving, with geometric tribal motifs that tell stories of nomadic life. Each rug is unique, reflecting the individual weaver''s personal expression and tribal heritage.', 'Regular', 'Tribal', false, 4),
('Royal Kunduz Prayer Rug', '180x120 cm', '20x20', 'Wool', 'A beautifully crafted prayer rug featuring a mihrab arch design with intricate floral fillings. Made in Kunduz, this rug uses high-quality wool dyed with natural pigments. The prayer rug holds special significance in Afghan culture and this piece represents the finest craftsmanship in this category.', 'Regular', 'Prayer', false, 5),
('Golden Gazni Wool Carpet', '300x300 cm', '15x15', 'Wool', 'Made from premium Gazni wool, known for its exceptional softness and durability. This carpet features an all-over geometric pattern in warm earth tones. The natural lanolin in Gazni wool gives this carpet a subtle sheen and makes it incredibly soft underfoot while being highly durable.', 'Regular', 'Modern', false, 6),
('Antique Turkoman Design Rug', '280x180 cm', '20x20', 'Wool', 'A faithful reproduction of classic Turkoman designs, featuring the iconic gul (elephant) motif repeated across the field. The deep red base color is achieved using traditional madder root dye. This rug represents the rich cultural exchange between Turkoman and Afghan weaving traditions.', 'Hard Wash', 'Traditional', false, 7),
('Silk & Wool Peshawar Blend', '250x200 cm', '15x15', 'Wool/Silk', 'A harmonious blend of wool and silk, this carpet features a subtle geometric pattern with silk highlights that catch the light. The wool provides warmth and durability while the silk adds elegance and visual interest. A versatile piece that complements both traditional and contemporary interiors.', 'Regular', 'Modern', true, 8),
('Kabul Star Medallion Rug', '300x200 cm', '20x20', 'Wool', 'Featuring a striking central star medallion surrounded by intricate corner spandrels, this rug is a masterpiece of Kabul weaving. The deep navy field is complemented by gold and ivory accents. The star medallion is a symbol of guidance and spirituality in Afghan culture.', 'Regular', 'Traditional', false, 9),
('Aqcha Tribal Floor Covering', '400x300 cm', '10x10', 'Wool', 'A large tribal floor covering from the Aqcha region, featuring bold geometric patterns in rich reds and blues. This substantial piece is perfect for large living spaces. The robust construction and thick pile make it both comfortable and long-lasting.', 'Regular', 'Tribal', false, 10),
('Fine Silk Chobi Rug', '200x150 cm', '25x25', 'Silk', 'An ultra-fine silk rug with a delicate Chobi (wood) color palette. The subtle gradations of color are achieved through a specialized washing process. This rug represents the pinnacle of fine Afghan weaving, with an extraordinarily high knot count that allows for remarkable detail.', 'Hard Wash', 'Silk', true, 11),
('Maimana Kilim Flatweave', '300x200 cm', 'Flatweave', 'Wool', 'A traditional flatweave kilim from Maimana, featuring bold geometric patterns in vibrant natural colors. Unlike knotted carpets, kilims are woven flat, making them lighter and more versatile. This piece showcases the distinctive Maimana style with its sharp geometric designs and rich color palette.', 'Regular', 'Kilim', false, 12),
('Royal Palace Silk Carpet', '350x250 cm', '25x25', 'Silk', 'A luxurious silk carpet fit for royalty, featuring an intricate all-over floral pattern. The fine silk threads create a carpet that is both visually stunning and incredibly soft. This piece represents the highest level of Afghan silk weaving, with thousands of knots per square inch.', 'Regular', 'Silk', false, 13),
('Highland Wool Gabbeh', '200x150 cm', '10x10', 'Wool', 'A rustic, thick-pile gabbeh rug woven by highland artisans. The simple, bold geometric designs and thick, soft pile are characteristic of gabbeh weaving. Made with undyed or naturally dyed wool, this rug has a warm, organic feel that brings comfort and character to any space.', 'Regular', 'Tribal', false, 14),
('Kandahar Ziegler Design Rug', '300x250 cm', '15x15', 'Wool', 'A Ziegler-design rug with soft, muted tones and an elegant all-over pattern. Originally developed in Kandahar, this design combines traditional Afghan motifs with a softer, more contemporary color palette. The result is a carpet that bridges the gap between traditional and modern aesthetics.', 'Regular', 'Modern', false, 15);
-- 5. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services_content (
  id INTEGER PRIMARY KEY DEFAULT 1,
  hero_title TEXT DEFAULT 'Our Services',
  hero_subtitle TEXT DEFAULT 'Beyond crafting exquisite carpets, we offer a comprehensive range of services to ensure your carpets remain beautiful for generations.',
  hero_image TEXT DEFAULT 'https://placehold.co/1920x600/0D1B2A/C99A47?text=Our+Services',
  intro_text TEXT DEFAULT 'At Jamili Carpets, our commitment to our customers extends far beyond the sale of a carpet. We offer a full suite of services designed to help you find the perfect carpet, maintain its beauty, and ensure it remains a cherished part of your home or office for decades to come. Our team of experts brings decades of experience in every aspect of carpet care and consultation.',
  service1_title TEXT DEFAULT 'Custom Carpet Design & Manufacturing',
  service1_text TEXT DEFAULT 'We offer bespoke carpet design and manufacturing services tailored to your exact specifications. Whether you need a specific size, color palette, pattern, or material, our master weavers can bring your vision to life. From initial design consultation to the final product, we work closely with you at every step. Our custom carpets are woven with the same care and attention to detail as our signature collections, ensuring a one-of-a-kind piece that perfectly complements your space.',
  service1_icon TEXT DEFAULT 'paint-brush',
  service2_title TEXT DEFAULT 'Professional Carpet Washing & Cleaning',
  service2_text TEXT DEFAULT 'Over time, even the finest carpets accumulate dust, dirt, and allergens. Our professional washing service uses traditional and modern techniques to deep-clean your carpets without damaging the fibers or colors. We offer both regular washing for routine maintenance and hard washing for deeply soiled carpets. Our process includes dust removal, hand washing with mild, pH-neutral solutions, rinsing, and careful drying in controlled conditions to preserve the carpet''s integrity.',
  service2_icon TEXT DEFAULT 'droplet',
  service3_title TEXT DEFAULT 'Carpet Repair & Restoration',
  service3_text TEXT DEFAULT 'Whether your carpet has suffered damage from wear, pests, or accidents, our skilled artisans can repair and restore it to its former glory. Our services include re-knotting damaged areas, re-fringing, edge binding, patching, and color restoration. We use matching materials and traditional techniques to ensure repairs are virtually invisible. For antique and valuable carpets, we take extra care to preserve the carpet''s character and value.',
  service3_icon TEXT DEFAULT 'wrench',
  service4_title TEXT DEFAULT 'Carpet Appraisal & Valuation',
  service4_text TEXT DEFAULT 'Our experts provide professional appraisal and valuation services for insurance, resale, or estate purposes. We assess factors including age, origin, material, knot count, condition, and rarity to determine the fair market value of your carpet. Each appraisal comes with a detailed written report. This service is particularly valuable for collectors and those who have inherited carpets and need to understand their worth.',
  service4_icon TEXT DEFAULT 'clipboard',
  service5_title TEXT DEFAULT 'Worldwide Shipping & Export',
  service5_text TEXT DEFAULT 'We provide secure, insured worldwide shipping for all our carpets. Each carpet is carefully rolled (never folded) and packaged in protective materials to ensure it arrives in perfect condition. We handle all export documentation and customs paperwork, making the process seamless for our international customers. We ship to over 50 countries and can arrange expedited shipping when needed.',
  service5_icon TEXT DEFAULT 'globe',
  service6_title TEXT DEFAULT 'Interior Design Consultation',
  service6_text TEXT DEFAULT 'Choosing the right carpet can transform a space. Our interior design consultation service helps you select the perfect carpet for your home or office. We consider factors such as room size, existing décor, lighting, and traffic patterns to recommend carpets that will enhance your space. We can also provide guidance on carpet placement, padding, and care to maximize the lifespan and beauty of your investment.',
  service6_icon TEXT DEFAULT 'home',
  service7_title TEXT DEFAULT 'Carpet Stain Removal',
  service7_text TEXT DEFAULT 'Accidents happen, but they don''t have to ruin your carpet. Our stain removal experts can treat a wide range of stains including wine, coffee, ink, pet stains, and more. We use specialized cleaning agents that are tough on stains but gentle on carpet fibers and dyes. For best results, we recommend bringing the carpet to our facility where we can treat it under controlled conditions.',
  service7_icon TEXT DEFAULT 'spray',
  service8_title TEXT DEFAULT 'Trade & Wholesale Services',
  service8_text TEXT DEFAULT 'For retailers, designers, and bulk buyers, we offer trade and wholesale pricing on our carpet collections. We can produce carpets in quantity while maintaining our exacting quality standards. We also offer custom labeling and branding options for trade customers. Our wholesale program is designed to provide competitive pricing and reliable supply for businesses that rely on quality carpets.',
  service8_icon TEXT DEFAULT 'briefcase',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO services_content (id) VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- 6. FAQ TABLE
CREATE TABLE IF NOT EXISTS faq_content (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO faq_content (question, answer, display_order) VALUES
('How can I tell if a carpet is truly handmade?', 'A genuine handmade carpet will have slight irregularities in the pattern — no two knots are exactly identical. Look at the back of the carpet: in a handmade carpet, the pattern is clearly visible on the back and the knots are slightly irregular. Machine-made carpets have perfectly uniform knots and a grid-like appearance on the back. Additionally, handmade carpets typically have a softer, more pliable feel. At Jamili Carpets, every carpet we sell is guaranteed handmade, and our experts can guide you through the characteristics of authentic handmade carpets.', 1),
('What is the difference between wool and silk carpets?', 'Wool carpets are known for their durability, warmth, and natural resilience. They are ideal for high-traffic areas and offer excellent value. Wool naturally repels stains and is fire-resistant. Silk carpets, on the other hand, are finer, lighter, and have a luxurious sheen that changes with the light. Silk allows for much higher knot counts, resulting in more intricate patterns. Silk carpets are best suited for low-traffic areas and are often used as wall hangings or in formal settings. We also offer wool/silk blends that combine the durability of wool with the elegance of silk.', 2),
('How long does it take to make a handmade carpet?', 'The time required depends on the size, quality (knot count), and complexity of the design. A small, simple carpet with a 10x10 knot density might take 2-3 months, while a large, intricate silk carpet with a 25x25 knot density can take 12-18 months or more. For example, a 300x200 cm wool carpet with 20x20 quality typically takes 6-8 months. Our master weavers work 6-8 hours a day, tying each knot by hand. This time-intensive process is what makes handmade carpets so special and valuable.', 3),
('How do I care for my handmade carpet?', 'Proper care will ensure your carpet lasts for generations. Vacuum regularly using a low-power setting and avoid the beater bar on delicate carpets. Rotate the carpet every 6-12 months to ensure even wear. Avoid prolonged exposure to direct sunlight, which can fade colors. Clean spills immediately by blotting (never rubbing) with a clean, dry cloth. Have your carpet professionally washed every 3-5 years. Use a good quality underlay to prevent slipping and reduce wear. Never fold a handmade carpet — always roll it for storage or transport.', 4),
('Do you ship internationally?', 'Yes, we ship worldwide to over 50 countries. All carpets are carefully rolled and packaged in protective materials to ensure safe transit. We handle all export documentation and customs paperwork. Shipping costs vary depending on the destination and the size of the carpet. Each shipment is fully insured. Delivery times typically range from 7-21 business days depending on the destination. For specific shipping quotes, please contact us via WhatsApp or email.', 5),
('Can I request a custom-designed carpet?', 'Absolutely. We offer bespoke carpet design services where you can specify the size, colors, pattern, and material. Our design team will work with you to create a custom pattern, and our master weavers will bring it to life. Custom carpets typically take longer to produce (6-18 months depending on complexity) but result in a truly one-of-a-kind piece. Contact us with your requirements and we will provide a detailed quote and timeline.', 6),
('What does the quality number (like 10x10 or 20x20) mean?', 'The quality number refers to the knot density — specifically, the number of knots per linear inch in each direction (length x width). For example, a 10x10 quality carpet has approximately 100 knots per square inch, while a 20x20 quality carpet has approximately 400 knots per square inch. Higher knot counts allow for more intricate patterns and finer detail but take significantly longer to weave. The quality number is one of the key factors that determine a carpet''s value, along with material, design, and condition.', 7),
('Are the dyes used in your carpets natural or synthetic?', 'We use primarily natural dyes derived from plants, minerals, and insects. Natural dyes produce richer, more varied colors that age beautifully and are more environmentally friendly. Common natural dye sources include madder root (red), indigo (blue), walnut husks (brown), and pomegranate (yellow). For some contemporary designs, we may use high-quality synthetic dyes that offer color consistency. We can always provide information about the dyeing process used for any specific carpet in our collection.', 8),
('What is the return policy?', 'We want you to be completely satisfied with your purchase. If for any reason you are not, we accept returns within 14 days of delivery, provided the carpet is in its original condition. Custom-designed carpets are non-returnable unless there is a manufacturing defect. Return shipping costs are the responsibility of the customer unless the carpet was damaged in transit or there was an error on our part. Please contact us before returning any item so we can guide you through the process.', 9),
('How can I get a price for a specific carpet?', 'All our carpet prices are available on request. We believe that each carpet is unique and its price reflects factors such as size, material, knot density, age, and design complexity. To get a price, simply contact us via WhatsApp at +93 777 69 7777 or email us at jamili.carpets@gmail.com with the product name. We will respond promptly with pricing and availability information.', 10),
('What sizes are available?', 'We offer carpets in a wide range of sizes, from small prayer rugs (approximately 180x120 cm) to large room-sized carpets (400x300 cm and larger). Common sizes include runners (400x80 cm), area rugs (250x150 cm, 300x200 cm, 300x250 cm), and square carpets (300x300 cm). We also offer custom sizes — if you need a specific size to fit your space, we can manufacture a carpet to your exact dimensions. Contact us with your size requirements.', 11),
('Do you offer wholesale or trade pricing?', 'Yes, we offer competitive wholesale and trade pricing for retailers, interior designers, and bulk buyers. Our wholesale program includes volume discounts, custom labeling options, and priority production scheduling. We can produce carpets in quantity while maintaining our quality standards. If you are a trade professional interested in our wholesale program, please contact us with details about your business and requirements, and we will provide our trade catalog and pricing structure.', 12);

-- 7. CONTACT PAGE CONTENT
CREATE TABLE IF NOT EXISTS contact_content (
  id INTEGER PRIMARY KEY DEFAULT 1,
  hero_title TEXT DEFAULT 'Get in Touch',
  hero_subtitle TEXT DEFAULT 'We''d love to hear from you. Whether you''re looking for a specific carpet, need advice, or want to learn more about our services, we''re here to help.',
  hero_image TEXT DEFAULT 'https://placehold.co/1920x600/0D1B2A/C99A47?text=Contact+Us',
  form_title TEXT DEFAULT 'Send Us a Message',
  form_text TEXT DEFAULT 'Fill out the form below and we''ll get back to you as soon as possible. For urgent inquiries, please contact us via WhatsApp.',
  map_title TEXT DEFAULT 'Visit Our Showroom',
  map_text TEXT DEFAULT 'Come visit us at our showroom in Kabul to see our collection in person. We''re open Saturday through Thursday, 9:00 AM to 6:00 PM.',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO contact_content (id) VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- 8. CONTACT MESSAGES TABLE (for form submissions)
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. ENABLE ROW LEVEL SECURITY
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE services_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- 10. RLS POLICIES
CREATE POLICY "Public read access for site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read access for home_content" ON home_content FOR SELECT USING (true);
CREATE POLICY "Public read access for about_content" ON about_content FOR SELECT USING (true);
CREATE POLICY "Public read access for products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read access for services_content" ON services_content FOR SELECT USING (true);
CREATE POLICY "Public read access for faq_content" ON faq_content FOR SELECT USING (true);
CREATE POLICY "Public read access for contact_content" ON contact_content FOR SELECT USING (true);

CREATE POLICY "Public can submit contact messages" ON contact_messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin full access site_settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access home_content" ON home_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access about_content" ON about_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access products" ON products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access services_content" ON services_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access faq_content" ON faq_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access contact_content" ON contact_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access contact_messages" ON contact_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 11. STORAGE BUCKET
INSERT INTO storage.buckets (id, name, public)
VALUES ('jamili-carpets', 'jamili-carpets', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read storage" ON storage.objects FOR SELECT USING (bucket_id = 'jamili-carpets');
CREATE POLICY "Authenticated upload storage" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'jamili-carpets');
CREATE POLICY "Authenticated update storage" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'jamili-carpets');
CREATE POLICY "Authenticated delete storage" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'jamili-carpets');

-- 12. UPDATED_AT TRIGGERS
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_home_content_updated_at BEFORE UPDATE ON home_content FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_about_content_updated_at BEFORE UPDATE ON about_content FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_services_content_updated_at BEFORE UPDATE ON services_content FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_contact_content_updated_at BEFORE UPDATE ON contact_content FOR EACH ROW EXECUTE FUNCTION update_updated_at();
