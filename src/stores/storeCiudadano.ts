

import { defineStore } from 'pinia';
import { reactive } from 'vue';


export interface Ciudadano {
    idCiudadano : number;
    nombre : string;
    apellidos : string;
    dni : string;
    genero : string;
    fechaNacimiento : Date;
    direccion : string;
    numeroTelefono : string;
    numeroCuentaBancaria : string;
    isPoli : boolean;
    isBusquedaYCaptura : boolean;
    isPeligoso : boolean;

}


export const useListadoCiudadanos = defineStore('listadoCiduadanos', () => {
  const apiUrl = `http://localhost:8001`;
  const infoCiudadanos = reactive<Array<Ciudadano>>([]);
  
  async function cargarDatosCiudadanos() {
    try {
      const response = await fetch(apiUrl + '/Ciudadano' );
      if (!response.ok) throw new Error('Error al cargar los datos de los ciudadanos');
      const data = await response.json();
      infoCiudadanos.splice(0, infoCiudadanos.length); 
      data.forEach((ciudadano : Ciudadano) => {
        infoCiudadanos.push(ciudadano); 
      });
    } catch (error) {
      console.error('Error al cargar la información de los ciudadanos:', error);
    }
  }

  async function cargarDatosCiudadanosId(ciudadanoId : number) {
    try {
      const response = await fetch(apiUrl + '/Ciudadano/' + ciudadanoId.toString() );
      if (!response.ok) throw new Error('Error al cargar los datos de los ciduadanos');
      const data = await response.json();
      infoCiudadanos.splice(0, infoCiudadanos.length); 
      data.forEach((ciudadano : Ciudadano) => {
        infoCiudadanos.push(ciudadano); 
      });
    } catch (error) {
      console.error('Error al cargar la información de los ciudadanos:', error);
    }
  }


async function guardarCiudadano(ciudadano : Ciudadano) {
  try {

    const response = await fetch(apiUrl + '/Ciudadano', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ciudadano),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error al guardar la información del ciudadano: ${errorBody}`);
    }

    await cargarDatosCiudadanos();
  } catch (error) {
    console.error('Error al guardar la información del ciudadano:', error);
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


async function actualizarCiudadano(ciudadano : Ciudadano) { 
  try {
    const response = await fetch(apiUrl + '/Ciudadano', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ciudadano),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error al actualizar la información del ciudadano: ${errorBody}`);
    }

    await cargarDatosCiudadanos();
  } catch (error) {
    console.error('Error al actualizar la información del ciudadano:', error);
  }
}

async function borrarDatosCiudadano(ciudadanoId: number) {
    try {
      const response = await fetch(apiUrl + '/Ciduadano/' + ciudadanoId.toString(), {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al borrar la información del ciudadano');
      await cargarDatosCiudadanos();
    } catch (error) {
      console.error('Error al borrar la información del ciudadano', error);
    }
  }

  return {cargarDatosCiudadanos ,cargarDatosCiudadanosId, borrarDatosCiudadano, actualizarCiudadano, infoCiudadanos, guardarCiudadano  };
});