import React, { useEffect, useState } from "react";

export default function App({ claveAcceso, dbVales }) {
  const [desbloqueado, setDesbloqueado] = useState(false);
  const [clave, setClave] = useState("");
  const [vales, setVales] = useState([]);
  const comprobar = () => {
    return clave === claveAcceso;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const desbloquear = comprobar(clave);
    setDesbloqueado(desbloquear);
  };

  useEffect(() => {
    (desbloqueado)&&setVales(dbVales)
  }, [desbloqueado]);

  if (desbloqueado) {
    return <p>{vales.length}</p>;
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
              type="text"
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
