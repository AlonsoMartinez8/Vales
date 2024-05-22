import { Vale } from "astro:db";
import { db } from "astro:db";

export default async function seed() {
  // Define the data to seed
  await db.insert(Vale).values([
    {
      id: "1",
      titulo: "Vale 1",
      descripcion: "Descripción del vale 1",
      cantidad: 10,
      consumido: false,
    },
    {
      id: "2",
      titulo: "Vale 2",
      descripcion: "Descripción del vale 2",
      cantidad: 5,
      consumido: false,
    },
    {
      id: "3",
      titulo: "Vale 3",
      descripcion: "Descripción del vale 3",
      cantidad: 20,
      consumido: true,
    },
  ]);
}
