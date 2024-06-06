import { defineStore } from "pinia";
import { reactive } from "vue";
import { useListadoAuth } from "./storeAuth";
const storeAuth = useListadoAuth();

interface Vehiculo {
  idVehiculo: number;
  matricula: string;
  marca: string;
  modelo: string;
  color: string;
  enColor: string;
  idCiudadano: number;
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
interface Multa {
  idMulta: number;
  idPolicia: number;
  fecha: string;
  precio: number;
  articuloPenal: string;
  descripcion: string;
  description: string;
  pagada: boolean;
  idCiudadano: number;
  codigoPenal: CodigoPenal[];
}


interface Notas {
  idNota : number,
  titulo: string,
  title: string,
  descripcion: string,
  description: string,
  fecha: Date,
  idPolicia: number,
  idCiudadano: number
}

export interface Ciudadano {
  idCiudadano: number;
  nombre: string;
  apellidos: string;
  dni: string;
  genero: string;
  gender: string;
  nacionalidad: string;
  nationality: string;
  fechaNacimiento: Date;
  direccion: string;
  address: string;
  numeroTelefono: string;
  numeroCuentaBancaria: string;
  isPoli: boolean;
  isBusquedaYCaptura: boolean;
  imagenUrl: string;
  isPeligroso: boolean;
  diaIntroducidoListaCaptura: Date;
  multas: Multa[];
  vehiculos: Vehiculo[];
  trabajo: string;
  notas: Notas[]
}

interface Deudores {
  idCiudadano: number;
  nombre: string;
  apellidos: string;
  dni: string;
  genero: string;
  gender: string;
  nacionalidad: string;
  nationality: string;
  fechaNacimiento: Date;
  cantidad: number;
  imagenUrl: string;
}

interface CiudadanoBusquedaCaptura {
  idCiudadano: number;
  nombre: string;
  apellidos: string;
  dni: string;
  genero: string;
  gender: string;
  nacionalidad: string;
  nationality: string;
  fechaNacimiento: Date;
  direccion: string;
  address: string;
  numeroTelefono: string;
  numeroCuentaBancaria: string;
  isPoli: boolean;
  isBusquedaYCaptura: boolean;
  imagenUrl: string;
  isPeligroso: boolean;
  diaIntroducidoListaCaptura: Date;
  multas: Multa[];
  vehiculos: Vehiculo[];
  trabajo: string;
  diaBusquedaCaptura: Date;
}

export const useListadoCiudadanos = defineStore("listadoCiduadanos", () => {
  //const apiUrl = `https://rulestreetapi.retocsv.es`;

  const apiUrl = `http://localhost:8001`;
  const infoCiudadanos = reactive<Array<Ciudadano>>([]);
  const infoCiudadanosBusquedaCaptura = reactive<
    Array<CiudadanoBusquedaCaptura>
  >([]);
  let infoCiudadano = {
    idCiudadano: 0,
    nombre: "",
    apellidos: "",
    dni: "",
    genero: "",
    gender: "",
    nacionalidad: "",
    nationality: "",
    fechaNacimiento: new Date(),
    direccion: "",
    address: "",
    numeroTelefono: "",
    numeroCuentaBancaria: "",
    isPoli: false,
    isBusquedaYCaptura: false,
    isPeligroso: false,
    multas: [],
    vehiculos: [],
    trabajo: "",
    notas: []
  };

  const infoDeudores = reactive<Array<Deudores>>([]);
  let token = "";

  async function cargarDatosCiudadanos() {
    try {
      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(apiUrl + "/Ciudadano", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok)
        throw new Error("Error al cargar los datos de los ciudadanos");
      const data = await response.json();
      infoCiudadanos.splice(0, infoCiudadanos.length);
      data.forEach((ciudadano: Ciudadano) => {
        infoCiudadanos.push(ciudadano);
      });
    } catch (error) {
      console.error("Error al cargar la información de los ciudadanos:", error);
    }
  }

  async function cargarDatosCiudadanosDeudores() {
    try {
      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(apiUrl + "/Deudores", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok)
        throw new Error("Error al cargar los datos de los ciudadanos deudores");
      const data = await response.json();
      infoDeudores.splice(0, infoDeudores.length);
      data.forEach((deudores: Deudores) => {
        infoDeudores.push(deudores);
      });
    } catch (error) {
      console.error(
        "Error al cargar la información de los ciudadanos deudores:",
        error
      );
    }
  }

  async function actualizarCiudadanoPartial(
    ciudadanoId: number,
    updateData: Partial<Ciudadano>
  ) {
    if (localStorage.getItem("tokenUsuario") !== null) {
      token = localStorage.getItem("tokenUsuario") ?? "";
    } else {
      token = localStorage.getItem("tokenPolicia") ?? "";
    }
    try {
      const response = await fetch(`${apiUrl}/Ciudadano/${ciudadanoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Error al actualizar la información del ciudadano: ${errorBody}`
        );
      }

      await cargarDatosCiudadanos();
    } catch (error) {
      console.error("Error al actualizar la información del ciudadano:", error);
    }
  }

  async function cargarDatosCiudadanosBusquedaCaptura() {
    try {
      const response = await fetch(apiUrl + "/BusquedaCaptura", {
        headers: {},
      });
      if (!response.ok)
        throw new Error(
          "Error al cargar los datos de los ciudadanos que están en busqueda y captura"
        );
      const data = await response.json();
      infoCiudadanosBusquedaCaptura.splice(
        0,
        infoCiudadanosBusquedaCaptura.length
      );
      data.forEach((ciudadano: CiudadanoBusquedaCaptura) => {
        infoCiudadanosBusquedaCaptura.push(ciudadano);
      });
    } catch (error) {
      console.error(
        "Error al cargar la información de los ciudadanos en búsqueda y captura:",
        error
      );
    }
  }

  async function cargarDatosCiudadanosId(ciudadanoId: number) {
    try {
      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(
        apiUrl + "/Ciudadano/" + ciudadanoId.toString(),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok)
        throw new Error("Error al cargar los datos del ciudadano");
      const data = await response.json();

      const index = infoCiudadanos.findIndex(
        (c) => c.idCiudadano === ciudadanoId
      );
      Object.assign(infoCiudadano, data);
      console.log("infociudadano back after update:", infoCiudadano);
    } catch (error) {
      console.error("Error al cargar la información del ciudadano:", error);
    }
  }

  async function guardarCiudadano(ciudadano: Ciudadano) {
    try {
      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(apiUrl + "/Ciudadano", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ciudadano),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Error al guardar la información del ciudadano: ${errorBody}`
        );
      }

      await cargarDatosCiudadanos();
    } catch (error) {
      console.error("Error al guardar la información del ciudadano:", error);
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

  async function actualizarCiudadano(ciudadano: Ciudadano) {
    if (localStorage.getItem("tokenUsuario") !== null) {
      token = localStorage.getItem("tokenUsuario") ?? "";
    } else {
      token = localStorage.getItem("tokenPolicia") ?? "";
    }
    try {
      const response = await fetch(apiUrl + "/Ciudadano", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ciudadano),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Error al actualizar la información del ciudadano: ${errorBody}`
        );
      }

      await cargarDatosCiudadanos();
    } catch (error) {
      console.error("Error al actualizar la información del ciudadano:", error);
    }
  }

  async function borrarDatosCiudadano(ciudadanoId: number) {
    if (localStorage.getItem("tokenUsuario") !== null) {
      token = localStorage.getItem("tokenUsuario") ?? "";
    } else {
      token = localStorage.getItem("tokenPolicia") ?? "";
    }
    try {
      const response = await fetch(
        apiUrl + "/Ciduadano/" + ciudadanoId.toString(),
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok)
        throw new Error("Error al borrar la información del ciudadano");
      await cargarDatosCiudadanos();
    } catch (error) {
      console.error("Error al borrar la información del ciudadano", error);
    }
  }

  return {
    cargarDatosCiudadanos,
    cargarDatosCiudadanosId,
    borrarDatosCiudadano,
    actualizarCiudadano,
    infoCiudadanos,
    guardarCiudadano,
    cargarDatosCiudadanosBusquedaCaptura,
    infoCiudadanosBusquedaCaptura,
    cargarDatosCiudadanosDeudores,
    infoDeudores,
    infoCiudadano,
    actualizarCiudadanoPartial,
  };
});
