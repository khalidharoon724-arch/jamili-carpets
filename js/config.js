/* ============================================================
   JAMILI CARPETS — Supabase Configuration
   ============================================================
   INSTRUCTIONS:
   1. Create a free project at https://supabase.com
   2. Go to Project Settings → API
   3. Copy your Project URL and anon/public key below
   4. Run supabase-schema.sql in the SQL Editor
   5. Create a storage bucket named: jamili-carpets
   ============================================================ */

window.SUPABASE_CONFIG = {
  // TODO: Replace with your actual Supabase URL
  url: 'https://YOUR-PROJECT-REF.supabase.co',
  // TODO: Replace with your actual Supabase anon key
  anonKey: 'YOUR-SUPABASE-ANON-KEY',
  // Storage bucket name (created by supabase-schema.sql)
  bucket: 'jamili-carpets'
};
