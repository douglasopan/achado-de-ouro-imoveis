-- Create properties table
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  price numeric(12,2) not null,
  location text not null,
  type text not null,
  badge text check (badge in ('gold','verified') or badge is null),
  discount_percent int,
  published boolean not null default false,
  main_image_url text,
  image_urls text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.properties enable row level security;

-- Policies
create policy if not exists "Public can view published properties"
  on public.properties for select
  using (published = true);

create policy if not exists "Authenticated users can view all properties"
  on public.properties for select to authenticated
  using (true);

create policy if not exists "Authenticated users can insert properties"
  on public.properties for insert to authenticated
  with check (true);

create policy if not exists "Authenticated users can update properties"
  on public.properties for update to authenticated
  using (true);

create policy if not exists "Authenticated users can delete properties"
  on public.properties for delete to authenticated
  using (true);

-- Timestamp update trigger
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_properties_updated_at on public.properties;
create trigger trg_properties_updated_at
before update on public.properties
for each row execute function public.update_updated_at_column();

-- Create storage bucket for property images
insert into storage.buckets (id, name, public)
values ('properties', 'properties', true)
on conflict (id) do nothing;

-- Storage policies for 'properties' bucket
create policy if not exists "Public can read property images"
  on storage.objects for select
  using (bucket_id = 'properties');

create policy if not exists "Authenticated users can upload property images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'properties');

create policy if not exists "Authenticated users can update property images"
  on storage.objects for update to authenticated
  using (bucket_id = 'properties');

create policy if not exists "Authenticated users can delete property images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'properties');