import { defineStore } from "pinia";
import { reactive } from "vue";

interface Vehiculo {
  idVehiculo: number;
  matricula: string;
  marca: string;
  modelo: string;
  color: string;
  enColor: string;
  idCiudadano: number;
  photo: string;
  ciudadano: Ciudadano;
}

interface CodigoPenal {
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

interface Ciudadano {
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
}

export const useListadoVehiculos = defineStore("listadoVehiculos", () => {

  //const apiUrl = `https://rulestreetapi.retocsv.es`;

  const apiUrl = `http://localhost:8001`;
  const infoVehiculos = reactive<Array<Vehiculo>>([]);

  let vehiculo: Vehiculo = {
    idVehiculo: 0,
    matricula: "",
    marca: "",
    modelo: "",
    color: "",
    enColor: "",
    idCiudadano: 0,
    photo: "",
    ciudadano: {
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
      imagenUrl: "",
      isPeligroso: false,
      diaIntroducidoListaCaptura: new Date(),
      multas: [],
      vehiculos: [],
    },
  };

  let token = "";

  async function cargarDatosVehiculos() {
    try {
      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(apiUrl + "/Vehiculo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok)
        throw new Error("Error al cargar los datos de los vehiculos");
      const data = await response.json();
      infoVehiculos.splice(0, infoVehiculos.length);
      data.forEach((vehiculo: Vehiculo) => {
        infoVehiculos.push(vehiculo);
      });
    } catch (error) {
      console.error("Error al cargar la información de los vehiculos:", error);
    }
  }
  async function cargarDatosVehiculosId(vehiculoId: number) {
    try {
      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(
        apiUrl + "/Vehiculo/" + vehiculoId.toString(),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      Object.assign(vehiculo, data);
    } catch (error) {
      console.error("Error al cargar la información del vehiculo:", error);
    }
  }

  async function guardarVehiculo(vehiculo: Vehiculo) {
    try {
      if (vehiculo.enColor == null) {
        const res = await fetch("https://es.libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: vehiculo.color,
            source: "auto",
            target: "en",
            format: "text",
            api_key: "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        vehiculo.enColor = data.translatedText;
      }

      if (vehiculo.color == null) {
        const res = await fetch("https://es.libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: vehiculo.enColor,
            source: "auto",
            target: "es",
            format: "text",
            api_key: "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        vehiculo.color = data.translatedText;
      }
      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(apiUrl + "/Vehiculo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(vehiculo),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Error al guardar la información del vehiculo: ${errorBody}`
        );
      }

      await cargarDatosVehiculos();
    } catch (error) {
      console.error("Error al guardar la información del vehiculo:", error);
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

  async function actualizarVehiculo(vehiculo: Vehiculo) {
    try {
      if (vehiculo.enColor == null) {
        const res = await fetch("https://es.libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: vehiculo.color,
            source: "auto",
            target: "en",
            format: "text",
            api_key: "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        vehiculo.enColor = data.translatedText;
      }

      if (vehiculo.color == null) {
        const res = await fetch("https://es.libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: vehiculo.enColor,
            source: "auto",
            target: "es",
            format: "text",
            api_key: "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        vehiculo.color = data.translatedText;
      }

      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(apiUrl + "/Vehiculo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(vehiculo),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Error al actualizar la información del vehiculo: ${errorBody}`
        );
      }

      await cargarDatosVehiculos();
    } catch (error) {
      console.error("Error al actualizar la información del vehiculo:", error);
    }
  }

  async function borrarDatosVehiculos(vehiculoId: number) {
    try {
      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(
        apiUrl + "/Vehiculo/" + vehiculoId.toString(),
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok)
        throw new Error("Error al borrar la información del vehiculo");
      await cargarDatosVehiculos();
    } catch (error) {
      console.error("Error al borrar la información del vehiculo", error);
    }
  }

  return {
    cargarDatosVehiculos,
    cargarDatosVehiculosId,
    borrarDatosVehiculos,
    actualizarVehiculo,
    infoVehiculos,
    guardarVehiculo,
    formatearFecha,
    vehiculo,
  };
});
