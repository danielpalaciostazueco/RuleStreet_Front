

import { defineStore } from 'pinia';
import { reactive } from 'vue';


export interface Denuncia{
   idDenuncia : number;
   titulo : string;
    descripcion : string;
    fecha : Date;
    idPolicia : number;
    idCiudadano: number;
}


export const useListadoDenuncias = defineStore('listadoDenuncias', () => {
  const apiUrl = `http://localhost:8001`;
  const infoDenuncias = reactive<Array<Denuncia>>([]);
  
  async function cargarDatosDenuncias() {
    try {
      const response = await fetch(apiUrl + '/Denuncia' );
      if (!response.ok) throw new Error('Error al cargar los datos de las denuncias');
      const data = await response.json();
      infoDenuncias.splice(0, infoDenuncias.length); 
      data.forEach((denuncia : Denuncia) => {
        infoDenuncias.push(denuncia); 
      });
    } catch (error) {
      console.error('Error al cargar la información de las denuncias:', error);
    }
  }

  async function cargarDatosDenunciasId(denunciaId : number) {
    try {
      const response = await fetch(apiUrl + '/Denuncia/' + denunciaId.toString() );
      if (!response.ok) throw new Error('Error al cargar los datos de las denuncias');
      const data = await response.json();
      infoDenuncias.splice(0, infoDenuncias.length); 
      data.forEach((denuncia : Denuncia) => {
        infoDenuncias.push(denuncia); 
      });
    } catch (error) {
      console.error('Error al cargar la información de las denuncias:', error);
    }
  }


async function guardarDenuncia(denuncia : Denuncia) {
  try {

    const response = await fetch(apiUrl + '/Denuncia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(denuncia),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error al guardar la información de la denuncia: ${errorBody}`);
    }

    await cargarDatosDenuncias();
  } catch (error) {
    console.error('Error al guardar la información de la denuncia:', error);
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


async function actualizarDenuncia(denuncia : Denuncia) { 
  try {
    const response = await fetch(apiUrl + '/Denuncia', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(denuncia),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error al actualizar la información de la denuncia: ${errorBody}`);
    }

    await cargarDatosDenuncias();
  } catch (error) {
    console.error('Error al actualizar la información de la denuncia:', error);
  }
}

async function borrarDatosDenuncia(denunciaId: number) {
    try {
      const response = await fetch(apiUrl + '/Denuncia/' + denunciaId.toString(), {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al borrar la información de la denuncia');
      await cargarDatosDenuncias();
    } catch (error) {
      console.error('Error al borrar la información de la denuncia', error);
    }
  }

  return {cargarDatosDenuncias ,cargarDatosDenunciasId, borrarDatosDenuncia, actualizarDenuncia, infoDenuncias, guardarDenuncia  };
});