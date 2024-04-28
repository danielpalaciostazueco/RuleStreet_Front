

import { defineStore } from 'pinia';
import { reactive } from 'vue';


export interface Multa {

    idMulta : number;
    idPolicia : number;
    fecha : Date;
    precio : number;
    articuloPenal : string;
    descripcion : string;
    pagada : boolean;
    idCiudadano : number;
}


export const useListadoMultas = defineStore('listadoMultas', () => {
  const apiUrl = `http://localhost:8001`;
  const infoMultas = reactive<Array<Multa>>([]);
  
  async function cargarDatosMultas() {
    try {
      const response = await fetch(apiUrl + '/Multa' );
      if (!response.ok) throw new Error('Error al cargar los datos de las multas');
      const data = await response.json();
      infoMultas.splice(0, infoMultas.length); 
      data.forEach((multa : Multa) => {
        infoMultas.push(multa); 
      });
    } catch (error) {
      console.error('Error al cargar la información de las multas:', error);
    }
  }

  async function cargarDatosMultasId(multaId : number) {
    try {
      const response = await fetch(apiUrl + '/Multa/' + multaId.toString() );
      if (!response.ok) throw new Error('Error al cargar los datos de las multas');
      const data = await response.json();
      infoMultas.splice(0, infoMultas.length); 
      data.forEach((multa : Multa) => {
        infoMultas.push(multa); 
      });
    } catch (error) {
      console.error('Error al cargar la información de las multas:', error);
    }
  }


async function guardarMulta(multa : Multa) {
  try {

    const response = await fetch(apiUrl + '/Multa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(multa),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error al guardar la información de la multa: ${errorBody}`);
    }

    await cargarDatosMultas();
  } catch (error) {
    console.error('Error al guardar la información de la multa:', error);
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


async function actualizarMulta(multa : Multa) { 
  try {
    const response = await fetch(apiUrl + '/Multa', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(multa),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error al actualizar la información de la multa: ${errorBody}`);
    }

    await cargarDatosMultas();
  } catch (error) {
    console.error('Error al actualizar la información de la multa:', error);
  }
}

async function borrarDatosMulta(multaId: number) {
    try {
      const response = await fetch(apiUrl + '/Multa/' + multaId.toString(), {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al borrar la información de la multa');
      await cargarDatosMultas();
    } catch (error) {
      console.error('Error al borrar la información de la multa', error);
    }
  }

  return {cargarDatosMultas ,cargarDatosMultasId, borrarDatosMulta, actualizarMulta, infoMultas, guardarMulta  };
});