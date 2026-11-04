```
npm install
npm run dev
```

```
open http://localhost:3000
```

Krav uppfyllda: G1-G16

# Konto och inloggning

G1. Skapa konto, logga in, logga ut

Backend: routes/auth.ts: POST /auth/register, /login, /logout. authValidator kontrollerar e-post och lösenord.
Frontend: lib/authApi.ts anropen till backend, context/AuthContext.tsx (login, register, logout), components/AuthForm.tsx, app/login, app/register

G2. Inloggningen finns kvar vid omladdning, appen vet vem som är inloggad

Backend: GET /auth/me i routes/auth.ts. optionalAuth i middleware/auth.ts kör getUser() på varje anrop.
Frontend: useEffect i AuthContext.tsx anropar getCurrentUser() en gång när appen startar.

G3. Navigeringen skiljer på inloggad och utloggad

components/Navbar.tsx använder useAuth() och visar tre lägen: laddar, inloggad, utloggad.

# Boenden

G4. Lista och detaljsida

Backend: GET /properties och GET /properties/:id i routes/properties.ts, database/property.ts
Frontend: app/page.tsx (lista), components/PropertyCard.tsx, app/properties/[id]/page.tsx (detalj)

G5. Filter på plats, maxpris och antal gäster

Backend: validators/propertyQueryValidator.ts (validerar och gör om text till tal med z.coerce), getProperties i database/property.ts (ilike, lte, gte)
Frontend: components/FilterBar.tsx, app/page.tsx läser searchParams, och getProperties(filters) i lib/api.ts bygger query-strängen med URLSearchParams

G6. Bara inloggade får skapa, ändra och ta bort, i API:t och i databasen

API: requireAuth på POST, PUT, DELETE i routes/properties.ts. Svaret blir 401 om man inte är inloggad.
Databas: RLS-policyerna för properties i schema.sql, to authenticated

G7. Formulär för att skapa boende

Frontend: components/PropertyForm.tsx, app/properties/new/page.tsx, components/RequireAuth.tsx, createProperty i lib/api.ts

G8. Sortering på pris, i backend

Backend: sort_by och sort_order i propertyQueryValidator.ts, .order(...) i getProperties
Frontend: valet sort i FilterBar.tsx översätts till sort_by + sort_order i app/page.tsx

# Bokningar

G9. Boka från detaljsidan, utloggad uppmanas att logga in

Backend: POST /bookings/properties/:propertyId i routes/bookings.ts
Frontend: components/BookingForm.tsx med tre lägen (laddar, utloggad: “Logga in för att boka”, inloggad: formulär)

G10. Ogiltig bokning nekas, felet visas begripligt

API: validators/bookingValidator.ts: z.email(), .min(1) för gäster, .refine() för utcheckning efter incheckning
Databas: check-constraints i schema.sql: bookings_guests_positive, bookings_dates_in_order
Frontend: getErrorMessage i lib/api.ts gör om { errors: [[fält, meddelande]] } till text som visas i formuläret

G11. Antal nätter och totalpris innan man bokar

Frontend: countNights i lib/booking.ts, uträkningen i BookingForm.tsx

G12. Se, ändra och ta bort bokningar

Backend: GET /bookings, PUT /bookings/:id, DELETE /bookings/:id i routes/bookings.ts. Joinen properties(...) i getBookingsForUser.
Frontend: app/bookings/page.tsx, components/MyBookings.tsx, components/EditBookingForm.tsx

# Kvalitet

G13. Laddningsvy, felvy, egen sida när boendet inte finns

Frontend: app/loading.tsx, app/error.tsx, app/properties/[id]/not-found.tsx (+ app/not-found.tsx för okända URL:er)

G14. Rätt statuskoder

Backend: alla routes

G15. Databasen skyddar sina tabeller själv

schema.sql: enable row level security för båda tabellerna och policyerna

G16. All data är typad

Backend: types/database.types.ts (genereras med npm run gen:types), types/property.ts och types/booking.ts pekar på Row och Insert. AppSupabaseClient i types/supabase.ts.
Frontend: globala .d.ts-filer i types/