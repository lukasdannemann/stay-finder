  -- PROPERTIES

  create table public.properties (
    property_id uuid not null default gen_random_uuid (),
    title text not null,
    description text not null,
    location text not null,
    price_per_night integer not null,
    max_guests integer not null,
    created_at timestamp with time zone not null default now(),
    kind text not null default 'apartment'::text,
    image_url text null,
    user_id uuid null default auth.uid (),
    constraint properties_pkey primary key (property_id),
    constraint properties_user_id_fkey foreign KEY (user_id) references auth.users (id),
    constraint properties_kind_check check (
      (
        kind = any (
          array['apartment'::text, 'house'::text, 'cabin'::text]
        )
      )
    ),
    constraint properties_max_guests_check check ((max_guests > 0)),
    constraint properties_price_per_night_check check ((price_per_night > 0))
  ) TABLESPACE pg_default;

  -- BOOKINGS

  create table public.bookings (
    booking_id uuid not null default gen_random_uuid (),
    property_id uuid not null,
    user_id uuid null default auth.uid (),
    guest_name text not null,
    guest_email text not null,
    check_in date not null,
    check_out date not null,
    guests integer not null,
    status text not null default 'pending'::text,
    created_at timestamp with time zone not null default now(),
    constraint bookings_pkey primary key (booking_id),
    constraint bookings_property_id_fkey foreign KEY (property_id) references properties (property_id) on delete CASCADE,
    constraint bookings_user_id_fkey foreign KEY (user_id) references auth.users (id),
    constraint bookings_dates_in_order check ((check_out > check_in)),
    constraint bookings_guests_positive check ((guests > 0)),
    constraint bookings_status_valid check (
      (
        status = any (
          array[
            'pending'::text,
            'confirmed'::text,
            'cancelled'::text
          ]
        )
      )
    )
  ) TABLESPACE pg_default;


  -- RLS: allt nekas tills en policy tillåter det
alter table public.properties enable row level security;
alter table public.bookings enable row level security;


  -- POLICIES

  --Bookings

  create policy "Guests and owners can read bookings" on public.bookings as PERMISSIVE for SELECT to authenticated using (((user_id = auth.uid()) OR (EXISTS ( SELECT 1
    FROM properties
    WHERE ((properties.property_id = bookings.property_id) AND (properties.user_id = auth.uid()))))));

  create policy "Users can create own bookings" on public.bookings as PERMISSIVE for INSERT to authenticated with check ((user_id = auth.uid()));

  create policy "Guests can update own bookings" on public.bookings as PERMISSIVE for UPDATE to authenticated using ((user_id = auth.uid())) with check ((user_id = auth.uid()));

  create policy "Guests can delete own bookings" on public.bookings as PERMISSIVE for DELETE to authenticated using ((user_id = auth.uid()));

  --Properties

  create policy "Anyone can read properties" on public.properties as PERMISSIVE for SELECT to public using (true);

  create policy "Authenticated can create properties" on public.properties as PERMISSIVE for INSERT to authenticated with check (true);

  create policy "Authenticated can update their property" on public.properties as PERMISSIVE for UPDATE to authenticated using (true) with check (true);

  create policy "Authenticated can delete properties" on public.properties as PERMISSIVE for DELETE to authenticated using (true);