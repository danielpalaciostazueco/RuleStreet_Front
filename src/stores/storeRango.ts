import { defineStore } from "pinia";
import { reactive } from "vue";
import { useListadoAuth } from "./storeAuth";
const storeAuth = useListadoAuth();
export interface Rango {
  idRango: number;
  idPolicia: number;
  nombre: string;
  name: string;
  salario: number;
  isLocal: boolean;
  permisos: Permiso[];
  active: boolean;
}
export interface Permiso {
  idPermiso: number;
  nombre: string | null;
  name: string | null;
  idRango: number | null;
  active: boolean;
}

export const useListadoRangos = defineStore("listadoRangos", () => {
  //const apiUrl = `https://rulestreetapi.retocsv.es`;
  const apiUrl = `http://localhost:8001`;
  const infoRangos = reactive<Array<Rango>>([]);
  let token = "";

  async function cargarDatosRangos() {
    try {
      token =
        localStorage.getItem("tokenUsuario") ??
        localStorage.getItem("tokenPolicia") ??
        "";
      const response = await fetch(apiUrl + "/Rango", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok)
        throw new Error("Error al cargar los datos de los rangos");
      const data = await response.json();
      infoRangos.splice(0, infoRangos.length, ...data);
    } catch (error) {
      console.error("Error al cargar la información de los rangos:", error);
    }
  }

  async function cargarDatosRangosId(rangoId: number) {
    try {
      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(apiUrl + "/Rango/" + rangoId.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Error al cargar los datos del rango");
      const rango = await response.json();
      const index = infoRangos.findIndex((r) => r.idRango === rangoId);
      if (index !== -1) {
        infoRangos[index] = rango;
      } else {
        infoRangos.push(rango);
      }
    } catch (error) {
      console.error("Error al cargar la información del rango:", error);
    }
  }

  function formatearFecha(fecha: string) {
    const fechaObj = new Date(fecha);
    const opciones: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const fechaFormateada = fechaObj.toLocaleDateString("es-ES", opciones);
    const horaFormateada = fechaObj.toLocaleTimeString("es-ES", opciones);

    const fechaMatch = fechaFormateada.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    const horaMatch = horaFormateada.match(/(\d{2}):(\d{2})/);

    if (fechaMatch && horaMatch) {
      return `${fechaMatch[3]}-${fechaMatch[2]}-${fechaMatch[1]} ${horaMatch[1]}:${horaMatch[2]}`;
    } else {
      console.error("No se pudo formatear la fecha:", fecha);
      return "";
    }
  }

  async function actualizarRango(rango: Rango) {
    try {
      const token =
        localStorage.getItem("tokenUsuario") ||
        localStorage.getItem("tokenPolicia") ||
        "";

      const response = await fetch(apiUrl + "/Rango/" + rango.idRango, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(rango),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Error al actualizar la información del rango: ${errorBody}`
        );
      }

      await cargarDatosRangos();
    } catch (error) {
      console.error("Error al actualizar la información del rango:", error);
    }
  }

  return {
    cargarDatosRangos,
    cargarDatosRangosId,
    formatearFecha,
    actualizarRango,
    infoRangos,
  };
});
