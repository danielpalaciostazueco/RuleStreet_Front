import router from "@/router";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import jwtDecode from "jwt-decode";

export interface Usuario {
  IdUsuario: number;
  IdPolicia: number;
  IdCiudadano: number;
  NombreUsuario: string;
  Contrasena: string;
  IsPolicia: boolean;
}

interface Permiso {
  IdPermiso: number;
  Nombre: string;
  Name: string;
}

interface Rango {
  IdRango: number;
  Nombre: string;
  Name: string;
  Salario: number;
  IsLocal: boolean;
  Permisos: Permiso[];
}

interface Ciudadano {
  IdCiudadano: number;
  Nombre: string;
  Apellidos: string;
  Dni: string;
  Genero: string;
  Gender: string;
  Nacionalidad: string;
  Nationality: string;
  FechaNacimiento: Date;
  Direccion: string;
  Address: string;
  NumeroTelefono: number;
  NumeroCuentaBancaria: string;
  IsPoli: boolean;
  IsBusquedaYCaptura: boolean;
  IsPeligroso: boolean;
  Multas: any[];
  Vehiculos: any[];
}

export interface Policia {
  IdPolicia: number;
  IdCiudadano: number;
  Rango: Rango;
  NumeroPlaca: string;
  Ciudadano: Ciudadano;
  Contrasena?: string;
  IsPolicia: boolean;
}
interface Ayuntamiento {
  IdUsuarioAyuntamiento: number;
  Dni: string;
  Contrasena: string;
}

export const useListadoAuth = defineStore("listadoAuth", () => {
  const apiUrl = `http://localhost:8001`;
  let infoUsuarios: Usuario = {
    IdUsuario: 0,
    IdPolicia: 0,
    IdCiudadano: 0,
    NombreUsuario: "",
    Contrasena: "",
    IsPolicia: false,
  };

  let infoPolicias: Policia = {
    IdPolicia: 0,
    IdCiudadano: 0,
    Rango: {
      IdRango: 0,
      Nombre: "",
      Name: "",
      Salario: 0,
      IsLocal: false,
      Permisos: [],
    },
    NumeroPlaca: "",
    Ciudadano: {
      IdCiudadano: 0,
      Nombre: "",
      Apellidos: "",
      Dni: "",
      Genero: "",
      Gender: "",
      Nacionalidad: "",
      Nationality: "",
      FechaNacimiento: new Date(),
      Direccion: "",
      Address: "",
      NumeroTelefono: 0,
      NumeroCuentaBancaria: "",
      IsPoli: false,
      IsBusquedaYCaptura: false,
      IsPeligroso: false,
      Multas: [],
      Vehiculos: [],
    },
    Contrasena: "",
    IsPolicia: false,
  };

  let infoAyuntamiento: Ayuntamiento = {
    IdUsuarioAyuntamiento: 0,
    Dni: "",
    Contrasena: "",
  };

  const Datos = ref({
    Dni: "",
    NombreUsuario: "",
    Contrasena: "",
  });

  const DatosRegistro = ref({
    IdUsuario: 0,
    Dni: "",
    NombreUsuario: "",
    Contrasena: "",
  });

  const DatosPolicia = ref({
    numeroPlaca: "",
    Contrasena: "",
  });

  const DatosAyuntamiento = ref({
    Dni: "",
    Contrasena: "",
  });

  async function resetAndAssign(decoded: any, target: any) {
    Object.keys(target).forEach((key) => (target[key] = 0));
    Object.assign(target, decoded);
  }

  async function LoginPolicia() {
    try {
      const response = await fetch(`${apiUrl}/Auth/Login/Policia`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(DatosPolicia.value),
      });
      if (!response.ok)
        throw new Error(`Error en la solicitud: ${await response.text()}`);
      const token = await response.text();
      localStorage.setItem("tokenPolicia", token);
      resetAndAssign(jwtDecode(token), infoPolicias);
      console.log(infoPolicias);
      router.push("/");
    } catch (error) {
      console.error("Error en LoginPolicia:", error);
    }
  }

  function loadPoliceInfo() {
    const token = localStorage.getItem("tokenPolicia");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        resetAndAssign(decoded, infoPolicias);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }

  function getCitizenIdFromToken() {
    const token =
      localStorage.getItem("tokenUsuario") ||
      localStorage.getItem("tokenPolicia");
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.IdCiudadano;
    }
    return null;
  }

  async function LoginUsuario() {
    try {
      const response = await fetch(`${apiUrl}/Auth/Login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Datos.value),
      });
      if (!response.ok)
        throw new Error(`Error en la solicitud: ${await response.text()}`);
      const token = await response.text();
      localStorage.setItem("tokenUsuario", token);
      console.log(localStorage.getItem("tokenUsuario"));
      resetAndAssign(jwtDecode(token), infoUsuarios);

      router.push("/");
    } catch (error) {
      console.error("Error en LoginUsuario:", error);
    }
  }

  async function registroUsuario() {
    const url = `${apiUrl}/Auth/Register`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(DatosRegistro.value),
      });
      router.push("/login");
      if (response.ok) {
        const usuarioRegistrado: Usuario = await response.json();
        infoUsuarios = usuarioRegistrado;
        localStorage.setItem("usuario", JSON.stringify(usuarioRegistrado));
      } else {
        console.error("Error en el registro:", response.statusText);
      }
    } catch (error) {
      console.error("Error en el registro:", error);
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
  async function LoginAyuntamiento() {
    try {
      const response = await fetch(`${apiUrl}/Auth/Login/Ayuntamiento`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(DatosAyuntamiento.value),
      });
      if (!response.ok)
        throw new Error(`Error en la solicitud: ${await response.text()}`);
      const token = await response.text();
      localStorage.setItem("tokenAyuntamiento", token);
      resetAndAssign(jwtDecode(token), infoAyuntamiento);
      router.push("/");
    } catch (error) {
      console.error("Error en LoginAyuntamiento:", error);
    }
  }

  return {
    infoUsuarios,
    Datos,
    DatosRegistro,
    DatosPolicia,
    infoPolicias,
    DatosAyuntamiento,
    infoAyuntamiento,
    LoginUsuario,
    LoginPolicia,
    LoginAyuntamiento,
    registroUsuario,
    formatearFecha,
    loadPoliceInfo,
    getCitizenIdFromToken,
  };
});
