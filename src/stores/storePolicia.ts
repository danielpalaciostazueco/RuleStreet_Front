

import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useListadoAuth } from './storeAuth';
const storeAuth = useListadoAuth();


interface Permiso {
  idPermiso: number;
  nombre: string;
}

interface Rango {
  idRango: number;
  nombre: string;
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
  nacionalidad: string;
  fechaNacimiento: Date;
  direccion: string;
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


export const useListadoPolicias = defineStore('listadoPolicias', () => {
  const apiUrl = `http://localhost:8001`;
  const infoPolicias = reactive<Array<Policia>>([]);
  let token = "";
  async function cargarDatosPolicias() {
    try {
      if (localStorage.getItem('tokenUsuario') !== null) {
        token = localStorage.getItem('tokenUsuario') ?? '';
      } else {
        token = localStorage.getItem('tokenPolicia') ?? '';
      }
      const response = await fetch(apiUrl + '/Policia', {
        headers: { 'Authorization': `Bearer ${token}` }

      });
      if (!response.ok) throw new Error('Error al cargar los datos de los policias');
      const data = await response.json();
      infoPolicias.splice(0, infoPolicias.length);
      data.forEach((policia: Policia) => {
        infoPolicias.push(policia);
      });
    } catch (error) {
      console.error('Error al cargar la información de los policia:', error);
    }
  }

  async function cargarDatosPoliciasId(policiaId: number) {
    try {
      if (localStorage.getItem('tokenUsuario') !== null) {
        token = localStorage.getItem('tokenUsuario') ?? '';
      } else {
        token = localStorage.getItem('tokenPolicia') ?? '';
      }
      const response = await fetch(apiUrl + '/Policia/' + policiaId.toString(), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Error al cargar los datos del policia');
      const policia = await response.json();

      const index = infoPolicias.findIndex(c => c.idPolicia === policiaId);
      if (index !== -1) {
        infoPolicias[index] = policia;
      } else {
        infoPolicias.push(policia);
      }
    } catch (error) {
      console.error('Error al cargar la información del ciudadano:', error);
    }
  }


  async function guardarPolicia(policia: Policia) {
    try {
      if (localStorage.getItem('tokenUsuario') !== null) {
        token = localStorage.getItem('tokenUsuario') ?? '';
      } else {
        token = localStorage.getItem('tokenPolicia') ?? '';
      }
      const response = await fetch(apiUrl + '/Policia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(policia),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Error al guardar la información del policia: ${errorBody}`);
      }

      await cargarDatosPolicias();
    } catch (error) {
      console.error('Error al guardar la información del policia:', error);
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


  async function actualizarPolicia(policia: Policia) {

    try {
      if (localStorage.getItem('tokenUsuario') !== null) {
        token = localStorage.getItem('tokenUsuario') ?? '';
      } else {
        token = localStorage.getItem('tokenPolicia') ?? '';
      }
      const response = await fetch(apiUrl + '/Policia', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(policia),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Error al actualizar la información del policia: ${errorBody}`);
      }

      await cargarDatosPolicias();
    } catch (error) {
      console.error('Error al actualizar la información del policia:', error);
    }
  }

  async function borrarDatosPolicia(policiaId: number) {
    try {
      if (localStorage.getItem('tokenUsuario') !== null) {
        token = localStorage.getItem('tokenUsuario') ?? '';
      } else {
        token = localStorage.getItem('tokenPolicia') ?? '';
      }
      const response = await fetch(apiUrl + '/Policia/' + policiaId.toString(), {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Error al borrar la información del policia');
      await cargarDatosPolicias();
    } catch (error) {
      console.error('Error al borrar la información del policia', error);
    }
  }

  return { cargarDatosPolicias, cargarDatosPoliciasId, borrarDatosPolicia, actualizarPolicia, infoPolicias, guardarPolicia };
});