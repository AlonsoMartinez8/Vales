import { column, defineDb, defineTable } from "astro:db";

const Vale = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    titulo: column.text({ optional: false, default: "" }),
    descripcion: column.text({ optional: false, default: "" }),
    cantidad: column.number({ optional: false, default: 1 }),
    consumido: column.boolean({ optional: false, default: false }),
  },
});

const Consumido = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    idVale: column.text({ references: () => Vale.columns.id }),
    titulo: column.text({ optional: false, default: "" }),
    descripcion: column.text({ optional: false, default: "" }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Vale, Consumido },
});
