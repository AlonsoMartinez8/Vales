import type { APIContext } from "astro";
import { Vale, db, eq } from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  const id = formData.get("id");
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
  } else {
    const nuevaCantidad = vale.cantidad - 1;
    await db
      .update(Vale)
      .set({ cantidad: nuevaCantidad })
      .where(eq(Vale.id, vale.id));
  }
  return context.redirect("/");
}
