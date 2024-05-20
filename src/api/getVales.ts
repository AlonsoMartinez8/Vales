import { Vale, db } from "astro:db";

export async function getVales(): Promise<
  {
    id: string;
    titulo: string;
    descripcion: string;
    cantidad: number;
    consumido: boolean;
  }[]
> {
  const vales = await db.select().from(Vale);
  return vales != null || vales != undefined ? vales : [];
}
