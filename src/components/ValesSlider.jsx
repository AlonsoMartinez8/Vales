import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ValesSlider({ claveAcceso, dbVales, dbConsumidos }) {
  const [desbloqueado, setDesbloqueado] = useState(false);
  const [clave, setClave] = useState("");
  const [vales, setVales] = useState([]);
  const sliderRef = useRef(null);
  const comprobar = () => {
    return clave === claveAcceso;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const desbloquear = comprobar(clave);
    setDesbloqueado(desbloquear);
  };

  useEffect(() => {
    desbloqueado && setVales(dbVales);
  }, [desbloqueado]);

  if (desbloqueado) {
    return (
      <div className="w-fit max-w-full overflow-hidden flex flex-col gap-10" ref={sliderRef}>
        <h1 class="text-2xl text-blue-950 font-semibold w-full text-center">V A L E S * E N * P A R E J A</h1>
        <motion.ul
          drag="x"
          dragConstraints={sliderRef}
          className="flex gap-2 w-fit h-auto px-4"
        >
          {vales.map((v) => (
            <li
              key={v.id}
              className={`${v.consumido&&"opacity-40 pointer-events-none"} w-80 md:w-96 flex flex-col items-center justify-between bg-gradient-to-r from-black/50 to-blue-500/80 border-[1px] shadow-lg aspect-video rounded-xl p-4`}
            >
              <header className="w-full">
                <h2 className="text-white text-center text-2xl font-bold text-wrap">
                  {v.titulo}
                </h2>
              </header>
              <main className="w-full">
                <p className="text-white text-wrap text-center">
                  {v.descripcion}
                </p>
              </main>
              <footer className="w-full flex items-center justify-between">
                <span className="text-white">{v.cantidad} &#x2764;</span>
                <form action="api/consumir" method="POST">
                  <input type="hidden" name="id" value={v.id} />
                  <button
                    type="submit"
                    className="px-2 py-1 border-blue-950 border-2 rounded-full text-blue-950 font-semibold hover:scale-95"
                  >
                    Consumir
                  </button>
                </form>
              </footer>
            </li>
          ))}
        </motion.ul>

        <motion.ul
          drag="x"
          dragConstraints={sliderRef}
          className="flex gap-2 w-fit h-auto px-4"
        >
          {dbConsumidos.map((c) => (
            <li
              key={c.id}
              className="pointer-events-none w-80 md:w-96 flex flex-col items-center justify-between bg-black/80 border-[1px] shadow-lg aspect-video rounded-xl p-4"
            >
              <header className="w-full">
                <h1 className="text-red-300 text-center text-2xl font-bold text-wrap">CONSUMIDO</h1>
                <h2 className="text-white text-center text-xl font-bold text-wrap">
                  {c.titulo}
                </h2>
              </header>
              <main className="w-full">
                <p className="text-white text-wrap text-center">
                  {c.descripcion}
                </p>
              </main>
              <small>{c.id}</small>
            </li>
          ))}
        </motion.ul>
      </div>
    );
  } else {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <fieldset>
          <label
            htmlFor="clave"
            className="flex flex-col items-center justify-center gap-2"
          >
            <span className="text-slate-600">CLAVE DE ACCESO</span>
            <input
              type="password"
              name="clave"
              id="clave"
              onChange={(e) => setClave(e.target.value)}
              className="outline-none px-2 py-1"
            />
          </label>
        </fieldset>
        <button
          type="submit"
          className="px-2 py-1 bg-slate-800 text-slate-100 hover:bg-slate-700 cursor-pointer w-full"
        >
          Check
        </button>
      </form>
    );
  }
}
