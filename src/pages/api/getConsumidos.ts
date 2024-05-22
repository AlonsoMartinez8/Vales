import { Consumido, db, desc } from "astro:db";

export async function getConsumidos(): Promise<
  {
    id: string;
    idVale: string;
    titulo: string;
    descripcion: string;
  }[]
> {
  const consumidos = await db.select().from(Consumido).orderBy(desc(Consumido.id));
  return consumidos != null || consumidos != undefined ? consumidos : [];
}