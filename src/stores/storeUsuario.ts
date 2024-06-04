import router from "@/router";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useListadoAuth } from "./storeAuth";
const storeAuth = useListadoAuth();

export interface Usuario {
  idUsuario: number;
  idPolicia: number;
  idCiudadano: number;
  nombre: string;
  contrasena: string;
  isPoli: boolean;
}

export const useListadoUsuarios = defineStore("listadoUsuarios", () => {
  const apiUrl = `https://rulestreetapi.retocsv.es`;
  //const apiUrl = `http://localhost:8001`;
  const infoUsuarios = reactive<Array<Usuario>>([]);
  const Datos = ref({
    nombre: "",
    nombreUsuario: "",
    contrasena: "",
  });

  let token = "";
  async function cargarDatosUsuarios() {
    try {
      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(apiUrl + "/Usuario", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok)
        throw new Error("Error al cargar los datos de los usuarios");
      const data = await response.json();
      infoUsuarios.splice(0, infoUsuarios.length);
      data.forEach((usuario: Usuario) => {
        infoUsuarios.push(usuario);
      });
    } catch (error) {
      console.error("Error al cargar la información de los usuarios:", error);
    }
  }

  async function cargarDatosUsuariosId(usuarioId: number) {
    try {
      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(
        apiUrl + "/Usuario/" + usuarioId.toString(),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok)
        throw new Error("Error al cargar los datos de los usuarios");
      const data = await response.json();
      infoUsuarios.splice(0, infoUsuarios.length);
      data.forEach((usuario: Usuario) => {
        infoUsuarios.push(usuario);
      });
    } catch (error) {
      console.error("Error al cargar la información de los usuarios:", error);
    }
  }

  async function guardarUsuario() {
    try {
      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(apiUrl + "/Usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(Datos.value),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Error al guardar la información del usuario: ${errorBody}`
        );
      }

      await cargarDatosUsuarios();
    } catch (error) {
      console.error("Error al guardar la información del usuario:", error);
    }
  }

  async function registroUsuario() {
    if (localStorage.getItem("tokenUsuario") !== null) {
      token = localStorage.getItem("tokenUsuario") ?? "";
    } else {
      token = localStorage.getItem("tokenPolicia") ?? "";
    }

    const url = `${apiUrl}/Usuario/Register`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(Datos.value),
      });

      if (response.ok) {
        const usuarioRegistrado: Usuario = await response.json();
        infoUsuarios.push(usuarioRegistrado);
        infoUsuarios.splice(0, infoUsuarios.length, usuarioRegistrado);
        localStorage.setItem("usuario", JSON.stringify(usuarioRegistrado));
        router.push("/");
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

  async function actualizarUsuario(usuario: Usuario) {
    try {
      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }
      const response = await fetch(apiUrl + "/Usuario", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Error al actualizar la información del usuario: ${errorBody}`
        );
      }

      await cargarDatosUsuarios();
    } catch (error) {
      console.error("Error al actualizar la información del usuario:", error);
    }
  }

  async function borrarDatosUsuario(usuarioId: number) {
    try {
      if (localStorage.getItem("tokenUsuario") !== null) {
        token = localStorage.getItem("tokenUsuario") ?? "";
      } else {
        token = localStorage.getItem("tokenPolicia") ?? "";
      }

      const response = await fetch(
        apiUrl + "/Usuario/" + usuarioId.toString(),
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok)
        throw new Error("Error al borrar la información del usuario");
      await cargarDatosUsuarios();
    } catch (error) {
      console.error("Error al borrar la información del usuario", error);
    }
  }

  return {
    cargarDatosUsuarios,
    cargarDatosUsuariosId,
    borrarDatosUsuario,
    actualizarUsuario,
    infoUsuarios,
    guardarUsuario,
    registroUsuario,
    Datos,
    formatearFecha,
  };
});
