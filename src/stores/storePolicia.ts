import { defineStore } from "pinia";
import { reactive } from "vue";
import { useListadoAuth } from "./storeAuth";
const storeAuth = useListadoAuth();

interface Permiso {
  idPermiso: number;
  nombre: string;
  name: string;
}

interface Rango {
  idRango: number;
  nombre: string;
  name: string;
  salario: number;
  isLocal: boolean;
  permisos: Permiso[];
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
  numeroTelefono: number;
  numeroCuentaBancaria: string;
  isPoli: boolean;
  isBusquedaYCaptura: boolean;
  isPeligroso: boolean;
  multas: any[];
  vehiculos: any[];
}

export interface Policia {
  idPolicia: number;
  idCiudadano: number;
  rango: Rango;
  numeroPlaca: string;
  ciudadano: Ciudadano;
  contrasena?: string;
  isPolicia: boolean;
}

export const useListadoPolicias = defineStore("listadoPolicias", () => {
  const apiUrl = `http://localhost:8001`;
  const infoPolicias = reactive<Array<Policia>>([]);
  let token = "";

  async function cargarDatosPolicias() {
    try {
      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(apiUrl + "/Policia", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok)
        throw new Error("Error al cargar los datos de los policias");
      const data = await response.json();
      infoPolicias.splice(0, infoPolicias.length);
      data.forEach((policia: Policia) => {
        infoPolicias.push(policia);
      });
    } catch (error) {
      console.error("Error al cargar la información de los policia:", error);
    }
  }

  async function cargarDatosPoliciasId(policiaId: number) {
    try {
      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(
        apiUrl + "/Policia/" + policiaId.toString(),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok)
        throw new Error("Error al cargar los datos del policia");
      const policia = await response.json();

      const index = infoPolicias.findIndex((c) => c.idPolicia === policiaId);
      if (index !== -1) {
        infoPolicias[index] = policia;
      } else {
        infoPolicias.push(policia);
      }
    } catch (error) {
      console.error("Error al cargar la información del ciudadano:", error);
    }
  }

  async function guardarPolicia(policia: Policia) {
    try {
      if (policia.ciudadano.genero == null) {
        const res = await fetch("https://es.libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: policia.ciudadano.gender,
            source: "auto",
            target: "es",
            format: "text",
            api_key: "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        policia.ciudadano.genero = data.translatedText;
      }

      if (policia.ciudadano.gender == null) {
        const res = await fetch("https://es.libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: policia.ciudadano.genero,
            source: "auto",
            target: "en",
            format: "text",
            api_key: "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        policia.ciudadano.gender = data.translatedText;
      }

      if (policia.ciudadano.nacionalidad == null) {
        const res = await fetch("https://es.libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: policia.ciudadano.nationality,
            source: "auto",
            target: "es",
            format: "text",
            api_key: "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        policia.ciudadano.nacionalidad = data.translatedText;
      }

      if (policia.ciudadano.nationality == null) {
        const res = await fetch("https://es.libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: policia.ciudadano.nacionalidad,
            source: "auto",
            target: "en",
            format: "text",
            api_key: "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        policia.ciudadano.nationality = data.translatedText;
      }

      if (policia.ciudadano.direccion == null) {
        const res = await fetch("https://es.libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: policia.ciudadano.address,
            source: "auto",
            target: "es",
            format: "text",
            api_key: "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        policia.ciudadano.direccion = data.translatedText;
      }

      if (policia.ciudadano.address == null) {
        const res = await fetch("https://es.libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: policia.ciudadano.direccion,
            source: "auto",
            target: "en",
            format: "text",
            api_key: "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        policia.ciudadano.address = data.translatedText;
      }

      if (policia.rango.nombre == null) {
        const res = await fetch("https://es.libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: policia.rango.name,
            source: "auto",
            target: "es",
            format: "text",
            api_key: "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        policia.rango.nombre = data.translatedText;
      }

      if (policia.rango.name == null) {
        const res = await fetch("https://es.libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: policia.rango.nombre,
            source: "auto",
            target: "en",
            format: "text",
            api_key: "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        policia.rango.name = data.translatedText;
      }
      for (let i = 0; i < policia.rango.permisos.length; i++) {
        if (policia.rango.permisos[i].nombre == null) {
          const res = await fetch("https://es.libretranslate.com/translate", {
            method: "POST",
            body: JSON.stringify({
              q: policia.rango.permisos[i].name,
              source: "auto",
              target: "es",
              format: "text",
              api_key: "",
            }),
            headers: { "Content-Type": "application/json" },
          });
          const data = await res.json();
          policia.rango.permisos[i].nombre = data.translatedText;
        }

        if (policia.rango.permisos[i].name == null) {
          const res = await fetch("https://es.libretranslate.com/translate", {
            method: "POST",
            body: JSON.stringify({
              q: policia.rango.permisos[i].nombre,
              source: "auto",
              target: "en",
              format: "text",
              api_key: "",
            }),
            headers: { "Content-Type": "application/json" },
          });
          const data = await res.json();
          policia.rango.permisos[i].name = data.translatedText;
        }
      }

      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(apiUrl + "/Policia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(policia),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Error al guardar la información del policia: ${errorBody}`
        );
      }

      await cargarDatosPolicias();
    } catch (error) {
      console.error("Error al guardar la información del policia:", error);
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

  async function actualizarPolicia(policia: Policia) {
    try {
      if (policia.ciudadano.genero == null) {
        const res = await fetch("https://es.libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: policia.ciudadano.gender,
            source: "auto",
            target: "es",
            format: "text",
            api_key: "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        policia.ciudadano.genero = data.translatedText;
      }

      if (policia.ciudadano.gender == null) {
        const res = await fetch("https://es.libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: policia.ciudadano.genero,
            source: "auto",
            target: "en",
            format: "text",
            api_key: "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        policia.ciudadano.gender = data.translatedText;
      }

      if (policia.ciudadano.nacionalidad == null) {
        const res = await fetch("https://es.libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: policia.ciudadano.nationality,
            source: "auto",
            target: "es",
            format: "text",
            api_key: "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        policia.ciudadano.nacionalidad = data.translatedText;
      }

      if (policia.ciudadano.nationality == null) {
        const res = await fetch("https://es.libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: policia.ciudadano.nacionalidad,
            source: "auto",
            target: "en",
            format: "text",
            api_key: "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        policia.ciudadano.nationality = data.translatedText;
      }

      if (policia.ciudadano.direccion == null) {
        const res = await fetch("https://es.libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: policia.ciudadano.address,
            source: "auto",
            target: "es",
            format: "text",
            api_key: "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        policia.ciudadano.direccion = data.translatedText;
      }

      if (policia.ciudadano.address == null) {
        const res = await fetch("https://es.libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: policia.ciudadano.direccion,
            source: "auto",
            target: "en",
            format: "text",
            api_key: "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        policia.ciudadano.address = data.translatedText;
      }

      if (policia.rango.nombre == null) {
        const res = await fetch("https://es.libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: policia.rango.name,
            source: "auto",
            target: "es",
            format: "text",
            api_key: "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        policia.rango.nombre = data.translatedText;
      }

      if (policia.rango.name == null) {
        const res = await fetch("https://es.libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: policia.rango.nombre,
            source: "auto",
            target: "en",
            format: "text",
            api_key: "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        policia.rango.name = data.translatedText;
      }
      for (let i = 0; i < policia.rango.permisos.length; i++) {
        if (policia.rango.permisos[i].nombre == null) {
          const res = await fetch("https://es.libretranslate.com/translate", {
            method: "POST",
            body: JSON.stringify({
              q: policia.rango.permisos[i].name,
              source: "auto",
              target: "es",
              format: "text",
              api_key: "",
            }),
            headers: { "Content-Type": "application/json" },
          });
          const data = await res.json();
          policia.rango.permisos[i].nombre = data.translatedText;
        }

        if (policia.rango.permisos[i].name == null) {
          const res = await fetch("https://es.libretranslate.com/translate", {
            method: "POST",
            body: JSON.stringify({
              q: policia.rango.permisos[i].nombre,
              source: "auto",
              target: "en",
              format: "text",
              api_key: "",
            }),
            headers: { "Content-Type": "application/json" },
          });
          const data = await res.json();
          policia.rango.permisos[i].name = data.translatedText;
        }
      }
      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(apiUrl + "/Policia", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(policia),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Error al actualizar la información del policia: ${errorBody}`
        );
      }

      await cargarDatosPolicias();
    } catch (error) {
      console.error("Error al actualizar la información del policia:", error);
    }
  }

  async function borrarDatosPolicia(policiaId: number) {
    try {
      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(
        apiUrl + "/Policia/" + policiaId.toString(),
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok)
        throw new Error("Error al borrar la información del policia");
      await cargarDatosPolicias();
    } catch (error) {
      console.error("Error al borrar la información del policia", error);
    }
  }

  return {
    cargarDatosPolicias,
    cargarDatosPoliciasId,
    borrarDatosPolicia,
    actualizarPolicia,
    infoPolicias,
    guardarPolicia,
    formatearFecha,
  };
});
