

import { defineStore } from 'pinia';
import { reactive } from 'vue';


export interface Rango {
    idRange : number;
    idPolicia : number;
    nombre : string;
    salario : number;
    isLocal : boolean;
}


export const useListadoRangos = defineStore('listadoRangos', () => {
  const apiUrl = `http://localhost:8001`;
  const infoRangos = reactive<Array<Rango>>([]);
  
  async function cargarDatosCiudadanos() {
    try {
      const response = await fetch(apiUrl + '/Rango' );
      if (!response.ok) throw new Error('Error al cargar los datos de los rangos');
      const data = await response.json();
      infoRangos.splice(0, infoRangos.length); 
      data.forEach((rango : Rango) => {
        infoRangos.push(rango); 
      });
    } catch (error) {
      console.error('Error al cargar la información de los rangos:', error);
    }
  }
  

  async function cargarDatosCiudadanosId(rangoId: number) {
    try {
      const response = await fetch(apiUrl + '/Rango/' +rangoId.toString() );
      if (!response.ok) throw new Error('Error al cargar los datos de los rangos');
      const data = await response.json();
      infoRangos.splice(0, infoRangos.length); 
      data.forEach((rango : Rango) => {
        infoRangos.push(rango); 
      });
    } catch (error) {
      console.error('Error al cargar la información de los rangos:', error);
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


async function actualizarCiudadano(rango : Rango) { 
  try {
    const response = await fetch(apiUrl + '/Rango', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rango),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error al actualizar la información del rango: ${errorBody}`);
    }

    await cargarDatosCiudadanos();
  } catch (error) {
    console.error('Error al actualizar la información del rango:', error);
  }
}



  return {cargarDatosCiudadanos ,cargarDatosCiudadanosId, actualizarCiudadano, infoRangos };
});