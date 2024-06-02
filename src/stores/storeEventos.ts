import { defineStore } from "pinia";
import { reactive } from "vue";
import { useListadoAuth } from "./storeAuth";
const storeAuth = useListadoAuth();

export interface Evento {
  idEventos: number;
  imagen: string;
  descripcion: string | null;
  description: string | null;
  fecha: Date;
}

export const useListadoEvento = defineStore("listadoEventos", () => {
  const eventoEditando = reactive<Evento>({
    idEventos: 0,
    imagen: "",
    descripcion: null,
    description: null,
    fecha: new Date(),
  });

  const apiUrl = `http://rulestreetapi.retocsv.es`;
  const infoEventos = reactive<Array<Evento>>([]);
  let token = "";

  async function cargarDatosEventos() {
    try {
      token = localStorage.getItem("tokenAyuntamiento") ?? "";
      const response = await fetch(apiUrl + "/Evento", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok)
        throw new Error("Error al cargar los datos de los eventos");
      const data = await response.json();
      infoEventos.splice(0, infoEventos.length);
      data.forEach((evento: Evento) => {
        infoEventos.push(evento);
      });
    } catch (error) {
      console.error("Error al cargar la información de los eventos:", error);
    }
  }

  async function cargarDatosEventosId(eventoId: number) {
    try {
      token = localStorage.getItem("tokenAyuntamiento") ?? "";
      const response = await fetch(apiUrl + "/Evento/" + eventoId.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok)
        throw new Error("Error al cargar los datos de los eventos");
      const data = await response.json();
      infoEventos.splice(0, infoEventos.length);
      data.forEach((evento: Evento) => {
        infoEventos.push(evento);
      });
    } catch (error) {
      console.error("Error al cargar la información de los eventos:", error);
    }
  }

  async function traducirTexto(texto: string, target: string) {
    const res = await fetch("https://es.libretranslate.com/translate", {
      method: "POST",
      body: JSON.stringify({
        q: texto,
        source: "auto",
        target: target,
        format: "text",
        api_key: "",
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data.translatedText;
  }

  async function guardarEvento(evento: Evento) {
    try {
      if (!evento.descripcion) {
        evento.descripcion = await traducirTexto(evento.description!, "es");
      }

      if (!evento.description) {
        evento.description = await traducirTexto(evento.descripcion!, "en");
      }

      token = localStorage.getItem("tokenAyuntamiento") ?? "";
      const response = await fetch(apiUrl + "/Evento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(evento),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Error al guardar la información del evento: ${errorBody}`
        );
      }

      await cargarDatosEventos();
    } catch (error) {
      console.error("Error al guardar la información del evento:", error);
    }
  }

  async function actualizarEventos(evento: Evento) {
    try {
      if (!evento.descripcion) {
        evento.descripcion = await traducirTexto(evento.description!, "es");
      }

      if (!evento.description) {
        evento.description = await traducirTexto(evento.descripcion!, "en");
      }

      token = localStorage.getItem("tokenAyuntamiento") ?? "";
      const response = await fetch(apiUrl + "/Evento/" + evento.idEventos, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(evento),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Error al actualizar la información del evento: ${errorBody}`
        );
      }

      await cargarDatosEventos();
    } catch (error) {
      console.error("Error al actualizar la información del evento:", error);
    }
  }

  async function borrarDatosEvento(eventoId: number) {
    try {
      token = localStorage.getItem("tokenAyuntamiento") ?? "";
      const response = await fetch(apiUrl + "/Evento/" + eventoId.toString(), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok)
        throw new Error("Error al borrar la información del evento");
      await cargarDatosEventos();
    } catch (error) {
      console.error("Error al borrar la información del evento", error);
    }
  }

  function setObraEditando(evento: Evento) {
    Object.assign(eventoEditando, evento);
  }

  function resetEventoEditando() {
    Object.assign(eventoEditando, {
      idEventos: 0,
      imagen: "",
      descripcion: null,
      description: null,
      fecha: new Date(),
    });
  }

  return {
    cargarDatosEventos,
    infoEventos,
    cargarDatosEventosId,
    guardarEvento,
    actualizarEventos,
    borrarDatosEvento,
    eventoEditando,
    resetEventoEditando,
    setObraEditando,
  };
});
