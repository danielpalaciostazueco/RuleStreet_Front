
import router from '@/router';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import jwtDecode from 'jwt-decode';



export interface Usuario {
 IdUsuario: number;
  IdPolicia: number;
  IdCiudadano: number;
 NombreUsuario: string;
 Contrasena: string;
 IsPolicia: boolean;
}

interface Policia {
   IdPolicia : number;
   IdCiudadano : number;
   Rango : number;
   NumeroPlaca: string;
  IsPolicia : boolean;
}

interface Ayuntamiento{
 IdUsuarioAyuntamiento: number;
  Dni: string;
 Contrasena: string;
}


export const useListadoAuth = defineStore('listadoAuth', () => {
  const apiUrl = `http://localhost:8001`;
  let infoUsuarios: Usuario = {
   IdUsuario: 0,
    IdPolicia: 0,
    IdCiudadano: 0,
   NombreUsuario: "",
   Contrasena: "",
   IsPolicia: false
  };

    let infoPolicias: Policia = { 
      IdPolicia : 0,
      IdCiudadano : 0,
      Rango : 0,
      NumeroPlaca: "",
     IsPolicia : false
    };


    let infoAyuntamiento: Ayuntamiento = {
     IdUsuarioAyuntamiento: 0,
      Dni: "",
     Contrasena: ""
    };




  const Datos = ref({
    Dni: '',
   NombreUsuario: '',
   Contrasena: '',
  });

  
  const DatosRegistro = ref({
   IdUsuario: 0,
    Dni: '',
   NombreUsuario: '',
   Contrasena: '',
  });

  const DatosPolicia = ref({
    numeroPlaca: '',
   Contrasena : '',
  });


  const DatosAyuntamiento = ref({
    Dni: '',
   Contrasena: '',
  });

  async function resetAndAssign(decoded : any, target : any) {
    Object.keys(target).forEach(key => target[key] = 0); 
    Object.assign(target, decoded);
  }

  async function LoginPolicia() {
    try {
      const response = await fetch(`${apiUrl}/Auth/Login/Policia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(DatosPolicia.value)
      });
      if (!response.ok) throw new Error(`Error en la solicitud: ${await response.text()}`);
      const token = await response.text();
      localStorage.setItem('tokenPolicia', token);
      resetAndAssign(jwtDecode(token), infoPolicias);
      router.push('/');
    } catch (error) {
      console.error('Error en LoginPolicia:', error);
    }
  }

async function LoginUsuario() {
    try {
      const response = await fetch(`${apiUrl}/Auth/Login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Datos.value)
      });
      if (!response.ok) throw new Error(`Error en la solicitud: ${await response.text()}`);
      const token = await response.text();
      localStorage.setItem('tokenUsuario', token);
      resetAndAssign(jwtDecode(token), infoUsuarios);
      router.push('/');
    } catch (error) {
      console.error('Error en LoginUsuario:', error);
    }
  }


  async function registroUsuario() {
    const url = `${apiUrl}/Auth/Register`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(DatosRegistro.value),

      });
      router.push('/login');
      if (response.ok) {
        const usuarioRegistrado: Usuario = await response.json();
        infoUsuarios = usuarioRegistrado;
        localStorage.setItem('usuario', JSON.stringify(usuarioRegistrado));
  
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
async function LoginAyuntamiento() {
    try {
      const response = await fetch(`${apiUrl}/Auth/Login/Ayuntamiento`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(DatosAyuntamiento.value)
      });
      if (!response.ok) throw new Error(`Error en la solicitud: ${await response.text()}`);
      const token = await response.text();
      localStorage.setItem('tokenAyuntamiento', token);
      resetAndAssign(jwtDecode(token), infoAyuntamiento);
      router.push('/');
    } catch (error) {
      console.error('Error en LoginAyuntamiento:', error);
    }
  }

  return { LoginUsuario, registroUsuario, formatearFecha, infoUsuarios, Datos, DatosPolicia,LoginPolicia, infoPolicias, DatosRegistro, DatosAyuntamiento, LoginAyuntamiento, infoAyuntamiento};
});