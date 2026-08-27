CREATE TABLE public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  role text not null check (role in ('candidate', 'employer')),
  message text,
  handled boolean not null default false
);

GRANT INSERT ON public.contact_submissions TO anon;
GRANT ALL ON public.contact_submissions TO service_role;

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact form"
  ON public.contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);