import { createClient } from '@pankod/refine-supabase';

const SUPABASE_URL = 'https://iwdfzvfqbtokqetmbmbp.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMDU2NzAxMCwiZXhwIjoxOTQ2MTQzMDEwfQ._gr6kXGkQBi9BM9dx5vKaNKYj_DJN1xlkarprGpM_fU';

// const SUPABASE_URL = "https://yptaiwrpdgumqsvfhssl.supabase.co";
// const SUPABASE_KEY =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwdGFpd3JwZGd1bXFzdmZoc3NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI1OTI3OTQsImV4cCI6MTk4ODE2ODc5NH0.fIzLNPbbPOM0VyOaLcx02vjK1jweNsAEb3d7QWPSIO0";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
