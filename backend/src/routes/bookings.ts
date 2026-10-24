import { Hono } from "hono";
import fs from 'fs'

const bookings = new Hono()


const fileContent = fs.readFileSync("src/data/bookings.json", "utf8");
const allBookings: Booking[] = JSON.parse(fileContent);

const saveProperties = () => {
  fs.writeFileSync('src/data/properties.json', JSON.stringify(allBookings, null, 2))
}

bookings.get("/", async (c) => {
  try {
    return c.json(allBookings);
  } catch (error) {
    return c.json([]);
  }
});

export default bookings
