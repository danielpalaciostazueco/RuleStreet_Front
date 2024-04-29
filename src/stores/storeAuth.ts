
import router from '@/router';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import jwtDecode from 'jwt-decode';



export interface Usuario {
  idUsuario: number;
  idPolicia: number;
  idCiudadano: number;
  nombre: string;
  contrasena: string;
  isPoli: boolean;
}


export const useListadoAuth = defineStore('listadoAuth', () => {


  const apiUrl = `http://localhost:8001`;
  let infoUsuarios: Usuario = {
    idUsuario: 0,
    idPolicia: 0,
    idCiudadano: 0,
    nombre: "",
    contrasena: "",
    isPoli: false



  };
  const Datos = ref({
    nombre: '',
    nombreUsuario: '',
    contrasena: '',
  });



  async function LoginUsuario() {
    try {
        const response = await fetch(apiUrl + '/Auth/Login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(Datos.value),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Error al guardar la información del usuario: ${errorBody}`);
        }

        const token = await response.text(); 
        localStorage.setItem('token', token);
        
      

        infoUsuarios = jwtDecode(token) as { idUsuario: number, idPolicia: number, idCiudadano: number, nombre: string, contrasena: string, isPoli: boolean };
        
        router.push('/');
    } catch (error) {
        console.error('Error al guardar la información del usuario:', error);
    }
}
  async function registroUsuario() {
    const url = `${apiUrl}/Auth/Register`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(Datos.value),

      });

      if (response.ok) {
        const usuarioRegistrado: Usuario = await response.json();
        infoUsuarios = usuarioRegistrado;
        localStorage.setItem('usuario', JSON.stringify(usuarioRegistrado));
        router.push('/login');
      } else {
        console.error('Error en el registro:', response.statusText);
      }
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  }


  function formatearFecha(fecha: string) {
    const fechaObj = new Date(fecha);
    const opciones: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };


    const fechaFormateada = fechaObj.toLocaleDateString('es-ES', opciones);
    const horaFormateada = fechaObj.toLocaleTimeString('es-ES', opciones);

    const fechaMatch = fechaFormateada.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    const horaMatch = horaFormateada.match(/(\d{2}):(\d{2})/);

    if (fechaMatch && horaMatch) {

      return `${fechaMatch[3]}-${fechaMatch[2]}-${fechaMatch[1]} ${horaMatch[1]}:${horaMatch[2]}`;
    } else {
      console.error('No se pudo formatear la fecha:', fecha);
      return '';
    }
  }


  return { LoginUsuario, registroUsuario, formatearFecha, infoUsuarios, Datos };
});