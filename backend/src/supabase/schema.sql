alter policy "Anyone can read properties"


on "public"."properties"


to public


using (
  true

);

alter policy "Authenticated can create properties"


on "public"."properties"


to authenticated


with check (

  true

);

alter policy "Authenticated can delete properties"


on "public"."properties"


to authenticated


using (

  true

);

alter policy "Authenticated can update their property"


on "public"."properties"


to authenticated


using (

  true

) with check (

  true

);
