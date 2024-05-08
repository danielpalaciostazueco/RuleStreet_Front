
import router from '@/router';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import jwtDecode from 'jwt-decode';



export interface Usuario {
  idUsuario: number;
  idPolicia: number;
  idCiudadano: number;
  nombreUsuario: string;
  contrasena: string;
  isPolicia: boolean;
}

interface Policia {
   idPolicia : number;
   idCiudadano : number;
   rango : number;
   numeroPlaca : string;
   isPolicia : boolean;
}

interface Ayuntamiento{
  idUsuarioAyuntamiento: number;
  dni: string;
  contrasena: string;
}


export const useListadoAuth = defineStore('listadoAuth', () => {

  let tokenUsuario;
  let tokenPolicia;
  let tokenAyuntamiento;



  const apiUrl = `http://localhost:8001`;
  let infoUsuarios: Usuario = {
    idUsuario: 0,
    idPolicia: 0,
    idCiudadano: 0,
    nombreUsuario: "",
    contrasena: "",
    isPolicia: false
  };

    let infoPolicias: Policia = { 
      idPolicia : 0,
      idCiudadano : 0,
      rango : 0,
      numeroPlaca : "",
      isPolicia : false
    };


    let infoAyuntamiento: Ayuntamiento = {
      idUsuarioAyuntamiento: 0,
      dni: "",
      contrasena: ""
    };




  const Datos = ref({
    dni: '',
    nombreUsuario: '',
    contrasena: '',
  });

  
  const DatosRegistro = ref({
    idUsuario: 0,
    dni: '',
    nombreUsuario: '',
    contrasena: '',
  });

  const DatosPolicia = ref({
    numeroPlaca: '',
    contrasena : '',
  });


  const DatosAyuntamiento = ref({
    dni: '',
    contrasena: '',
  });

  async function LoginPolicia() {
    try {
        const response = await fetch(apiUrl + '/Auth/Login/Policia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(DatosPolicia.value),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Error al guardar la información del usuario de policia: ${errorBody}`);
        }

        tokenPolicia = await response.text(); 
        

        infoPolicias = jwtDecode(tokenPolicia) as { idPolicia: number, idCiudadano: number, rango: number, numeroPlaca: string, isPolicia: boolean};
        
        router.push('/');
    } catch (error) {
        console.error('Error al guardar la información del usuario de policia:', error);
    }
}


  async function LoginUsuario() {
    try {
        const response = await fetch(apiUrl + '/Auth/Login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(Datos.value),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Error al guardar la información del usuario: ${errorBody}`);
        }

        tokenUsuario = await response.text(); 
       
        
      

        infoUsuarios = jwtDecode(tokenUsuario) as { idUsuario: number, idPolicia: number, idCiudadano: number, nombreUsuario: string, contrasena: string, isPolicia: boolean };
        
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
        const response = await fetch(apiUrl + '/Auth/Login/Ayuntamiento', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(DatosAyuntamiento.value),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Error al guardar la información del usuario del ayuntamiento: ${errorBody}`);
        }

        tokenAyuntamiento = await response.text(); 
       
        
      

        infoAyuntamiento = jwtDecode(tokenAyuntamiento) as { idUsuarioAyuntamiento: number, dni: string, contrasena: string};
        router.push('/');
    } catch (error) {
        console.error('Error al guardar la información del usuario del ayuntamiento:', error);
    }
}

  return { LoginUsuario, registroUsuario, formatearFecha, infoUsuarios, Datos, DatosPolicia,LoginPolicia, infoPolicias, DatosRegistro, DatosAyuntamiento, LoginAyuntamiento, infoAyuntamiento, tokenAyuntamiento, tokenUsuario, tokenPolicia};
});