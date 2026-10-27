import Form from "next/form";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FilterBarProps = {
  values: FilterFormValues;
};

const PRICE_ITEMS = [
  { value: null, label: "Alla priser" },
  ...[500, 750, 1000, 1500, 2000, 3000].map((n) => ({
    value: String(n),
    label: `${n} kr`,
  })),
];

const GUEST_ITEMS = [
  { value: null, label: "Alla" },
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({
    value: String(n),
    label: n === 9 ? "9+" : String(n),
  })),
];

const SORT_ITEMS = [
  { value: null, label: "Nyast först" },
  { value: "price_asc", label: "Pris: lägst först" },
  { value: "price_desc", label: "Pris: högst först" },
];

export default function FilterBar({ values }: FilterBarProps) {
  return (
    <Form
      action="/"
      className="mb-8 flex flex-wrap items-end gap-4 rounded-xl border p-4"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="location">Plats</Label>
        <Input
          id="location"
          name="location"
          defaultValue={values.location}
          placeholder="t.ex. Åre"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="max_price">Maxpris / natt</Label>
        <Select
          name="max_price"
          items={PRICE_ITEMS}
          defaultValue={values.max_price ?? null}
        >
          <SelectTrigger id="max_price" className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PRICE_ITEMS.map((item) => (
              <SelectItem key={item.label} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="max_guests">Antal gäster</Label>
        <Select
          name="max_guests"
          items={GUEST_ITEMS}
          defaultValue={values.max_guests ?? null}
        >
          <SelectTrigger id="max_guests" className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {GUEST_ITEMS.map((item) => (
              <SelectItem key={item.label} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="sort">Sortera</Label>
        <Select
          name="sort"
          items={SORT_ITEMS}
          defaultValue={values.sort ?? null}
        >
          <SelectTrigger id="sort" className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_ITEMS.map((item) => (
              <SelectItem key={item.label} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Sök</Button>
      <Link href="/" className={buttonVariants({ variant: "ghost" })}>
        Rensa
      </Link>
    </Form>
  );
}
