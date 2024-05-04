

import { defineStore } from 'pinia';
import { reactive } from 'vue';


export interface CodigoPenal {
    idCodigoPenal: number;
    articulo: string;
    descripcion: string;
    precio : number;
    sentencia : string;
    
}


export const useListadoCodigoPenal = defineStore('listadoCodigoPenal', () => {
  const apiUrl = `http://localhost:8001`;
  const infoCodigoPenal = reactive<Array<CodigoPenal>>([]);
  
  async function cargarDatosCodigoPenal() {
    try {
      const response = await fetch(apiUrl + '/CodigoPenal', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
      } );
      if (!response.ok) throw new Error('Error al cargar los datos del código penal');
      const data = await response.json();
      infoCodigoPenal.splice(0, infoCodigoPenal.length); 
      data.forEach((cp : CodigoPenal) => {
        infoCodigoPenal.push(cp); 
      });
    } catch (error) {
      console.error('Error al cargar la información del código penal:', error);
    }
  }

  async function cargarDatosCodigoPenalId(cpId : number) {
    try {
      const response = await fetch(apiUrl + '/CodigoPenal/' + cpId.toString(), {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
      
      } );
      if (!response.ok) throw new Error('Error al cargar los datos del código penal');
      const data = await response.json();
      infoCodigoPenal.splice(0, infoCodigoPenal.length); 
      data.forEach((cp : CodigoPenal) => {
        infoCodigoPenal.push(cp); 
      });
    } catch (error) {
      console.error('Error al cargar la información del código penal:', error);
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
      const response = await fetch(apiUrl + '/CodigoPenal/' + cpId.toString(), {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      if (!response.ok) throw new Error('Error al borrar la información del código penal');
      await cargarDatosCodigoPenal();
    } catch (error) {
      console.error('Error al borrar la información del código penal', error);
    }
  }

  return {cargarDatosCodigoPenal ,cargarDatosCodigoPenalId, borrarDatosCodigoPenal, infoCodigoPenal  };
});