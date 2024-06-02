import { defineStore } from "pinia";
import { reactive } from "vue";
import { useListadoAuth } from "./storeAuth";

const storeAuth = useListadoAuth();

export interface Multa {
  idMulta: number;
  idPolicia: number;
  fecha: Date;
  precio: number;
  articuloPenal: string;
  descripcion: string;
  description: string;
  pagada: boolean;
  idCiudadano: number;
  codigoPenal: CodigoPenal;
}

export interface CodigoPenal {
  idCodigoPenal: number;
  articulo: string;
  article: string;
  descripcion: string;
  description: string;
  precio: number;
  sentencia: string;
}

export const useListadoMultas = defineStore("listadoMultas", () => {
  //const apiUrl = `http://rulestreetapi.retocsv.es`;
  const apiUrl = `http://localhost:8001`;
  const infoMultas = reactive<Array<Multa>>([]);
  let token = localStorage.getItem("token");

  async function cargarDatosMultas(idPolicia?: number) {
    try {
      let token =
        localStorage.getItem("tokenUsuario") ??
        localStorage.getItem("tokenPolicia") ??
        "";
      let url = apiUrl + "/Multa";
      if (idPolicia !== undefined) {
        url += `?idPolicia=${idPolicia}`;
      }

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok)
        throw new Error("Error al cargar los datos de las multas");

      const data = await response.json();
      infoMultas.splice(0, infoMultas.length);
      data.forEach((multa: Multa) => {
        infoMultas.push(multa);
      });
    } catch (error) {
      console.error("Error al cargar la información de las multas:", error);
    }
  }

  async function cargarDatosMultasId(multaId: number) {
    try {
      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(apiUrl + "/Multa/" + multaId.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok)
        throw new Error("Error al cargar los datos de las multas");
      const data = await response.json();
      infoMultas.splice(0, infoMultas.length);
      data.forEach((multa: Multa) => {
        infoMultas.push(multa);
      });
    } catch (error) {
      console.error("Error al cargar la información de las multas:", error);
    }
  }

  async function guardarMulta(multa: Multa) {
    try {
      if (multa.descripcion == null) {
        const res = await fetch("https://es.libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: multa.descripcion,
            source: "auto",
            target: "en",
            format: "text",
            api_key: "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        multa.description = data.translatedText;
      }

      if (multa.description == null) {
        const res = await fetch("https://es.libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: multa.descripcion,
            source: "auto",
            target: "en",
            format: "text",
            api_key: "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        multa.description = data.translatedText;
      }

      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(apiUrl + "/Multa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(multa),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Error al guardar la información de la multa: ${errorBody}`
        );
      }

      await cargarDatosMultas();
    } catch (error) {
      console.error("Error al guardar la información de la multa:", error);
    }
  }

  async function actualizarMulta(multa: Multa) {
    try {
      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario");
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(`${apiUrl}/Multa/${multa.idMulta}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(multa),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Error al actualizar la información de la multa: ${errorBody}`
        );
      }

      await cargarDatosMultas();
    } catch (error) {
      console.error("Error al actualizar la información de la multa:", error);
    }
  }

  async function borrarDatosMulta(multaId: number) {
    try {
      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(apiUrl + "/Multa/" + multaId.toString(), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok)
        throw new Error("Error al borrar la información de la multa");
      await cargarDatosMultas();
    } catch (error) {
      console.error("Error al borrar la información de la multa", error);
    }
  }

  return {
    cargarDatosMultas,
    cargarDatosMultasId,
    borrarDatosMulta,
    actualizarMulta,
    infoMultas,
    guardarMulta,
  };
});
