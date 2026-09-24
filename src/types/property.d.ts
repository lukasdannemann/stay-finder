interface NewProperty {
  title: string;
  description: string;
  location: string;
  price_per_night: number;
  max_guests: number;
}

interface Property extends NewProperty {
 id: string;
}