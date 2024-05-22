import type { APIContext } from "astro";
import { Consumido, Vale, db, eq } from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  const id = formData.get("id");
  const consumidos = await db.select().from(Consumido);
  const consumidosCount = consumidos.length;
  const idConsumido = `${consumidosCount + 1}-${id}`;
  if (!id || typeof id != "string") {
    return new Response("Datos de formulario inválidos", { status: 401 });
  }
  const vale = (await db.select().from(Vale).where(eq(Vale.id, id))).at(0);
  if (!vale) {
    return new Response("Vale inválido", { status: 401 });
  }
  if (vale.cantidad <= 1) {
    await db
      .update(Vale)
      .set({ cantidad: 0, consumido: true })
      .where(eq(Vale.id, vale.id));
    await db.insert(Consumido).values({
      id: idConsumido,
      idVale: id,
      titulo: vale.titulo,
      descripcion: vale.descripcion,
    });
  } else {
    const nuevaCantidad = vale.cantidad - 1;
    await db
      .update(Vale)
      .set({ cantidad: nuevaCantidad })
      .where(eq(Vale.id, vale.id));
    await db.insert(Consumido).values({
      id: idConsumido,
      idVale: id,
      titulo: vale.titulo,
      descripcion: vale.descripcion,
    });
  }
  return context.redirect("/");
}
