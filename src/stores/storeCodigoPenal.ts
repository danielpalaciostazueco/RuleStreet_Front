

import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useListadoAuth } from './storeAuth';
const storeAuth = useListadoAuth();


export interface CodigoPenal {
  idCodigoPenal: number;
  articulo: string;
  article: string;
  descripcion: string;
  description: string;
  precio: number;
  sentencia: string;

}


export const useListadoCodigoPenal = defineStore('listadoCodigoPenal', () => {
  const apiUrl = `http://localhost:8001`;
  const infoCodigoPenal = reactive<Array<CodigoPenal>>([]);
  let token = '';
  
  
  async function cargarDatosCodigoPenal() {
    try {
      if (localStorage.getItem('tokenUsuario') !== null) {
        token = localStorage.getItem('tokenUsuario') ?? '';
      } else {
        token = localStorage.getItem('tokenPolicia') ?? '';
      }
      const response = await fetch(apiUrl + '/CodigoPenal', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Error al cargar los datos del código penal');
      const data = await response.json();
      infoCodigoPenal.splice(0, infoCodigoPenal.length);
      data.forEach((cp: CodigoPenal) => {
        infoCodigoPenal.push(cp);
      });
    } catch (error) {
      console.error('Error al cargar la información del código penal:', error);
    }
  }

  async function cargarDatosCodigoPenalIdioma() {
    try {
      if (localStorage.getItem('tokenUsuario') !== null) {
        token = localStorage.getItem('tokenUsuario') ?? '';
      } else {
        token = localStorage.getItem('tokenPolicia') ?? '';
      }
      const response = await fetch(apiUrl + '/CodigoPenal/English', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Error al cargar los datos del código penal');
      const data = await response.json();
      infoCodigoPenal.splice(0, infoCodigoPenal.length);
      data.forEach((cp: CodigoPenal) => {
        infoCodigoPenal.push(cp);
      });
    } catch (error) {
      console.error('Error al cargar la información del código penal:', error);
    }
  }

  async function cargarDatosCodigoPenalIdiomaId(codigoPenalId: number) {
    try {
      if (localStorage.getItem('tokenUsuario') !== null) {
        token = localStorage.getItem('tokenUsuario') ?? '';
      } else {
        token = localStorage.getItem('tokenPolicia') ?? '';
      }
      const response = await fetch(apiUrl + '/CodigoPenal/English/' + codigoPenalId.toString(), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Error al cargar los datos del código penal');
      const codigoPenal = await response.json();

      const index = infoCodigoPenal.findIndex(c => c.idCodigoPenal === codigoPenalId);
      if (index !== -1) {
        infoCodigoPenal[index] = codigoPenal;
      } else {
        infoCodigoPenal.push(codigoPenal);
      }

      return codigoPenal;
    } catch (error) {
      console.error('Error al cargar la información del código penal:', error);
      return null;  
    }
  }

  async function cargarDatosCodigoPenalId(codigoPenalId: number) {
    try {
      if (localStorage.getItem('tokenUsuario') !== null) {
        token = localStorage.getItem('tokenUsuario') ?? '';
      } else {
        token = localStorage.getItem('tokenPolicia') ?? '';
      }
      const response = await fetch(apiUrl + '/CodigoPenal/' + codigoPenalId.toString(), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Error al cargar los datos del código penal');
      const codigoPenal = await response.json();

      const index = infoCodigoPenal.findIndex(c => c.idCodigoPenal === codigoPenalId);
      if (index !== -1) {
        infoCodigoPenal[index] = codigoPenal;
      } else {
        infoCodigoPenal.push(codigoPenal);
      }

      return codigoPenal;
    } catch (error) {
      console.error('Error al cargar la información del código penal:', error);
      return null;  
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



  async function borrarDatosCodigoPenal(cpId: number) {
    try {
      if (localStorage.getItem('tokenUsuario') !== null) {
        token = localStorage.getItem('tokenUsuario') ?? '';
      } else {
        token = localStorage.getItem('tokenPolicia') ?? '';
      }
      const response = await fetch(apiUrl + '/CodigoPenal/' + cpId.toString(), {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Error al borrar la información del código penal');
      await cargarDatosCodigoPenal();
    } catch (error) {
      console.error('Error al borrar la información del código penal', error);
    }
  }

  return { cargarDatosCodigoPenal, cargarDatosCodigoPenalId, borrarDatosCodigoPenal, infoCodigoPenal 
           ,cargarDatosCodigoPenalIdioma, cargarDatosCodigoPenalIdiomaId
  };
});