

import { defineStore } from 'pinia';
import { reactive } from 'vue';


export interface Permiso {
  idPermiso : number ;
  nombre : string | null;
  idRango : number | null;
}


export const useListadoPermisos = defineStore('listadoPermisos', () => {
  const apiUrl = `http://localhost:8001`;
  const infoPermiso = reactive<Array<Permiso>>([]);
  let token = localStorage.getItem('token');
  async function cargarDatosPermisos() {
    try {
       if(token === null) {
        token = localStorage.getItem('tokenPolicia');
      }
      const response = await fetch(apiUrl + '/Permiso', {
        headers: { 'Authorization': `Bearer ${token}` }
      
      } );
      if (!response.ok) throw new Error('Error al cargar los datos de las permisos');
      const data = await response.json();
      infoPermiso.splice(0, infoPermiso.length); 
      data.forEach((permiso : Permiso) => {
        infoPermiso.push(permiso); 
      });
    } catch (error) {
      console.error('Error al cargar la información de los permisos:', error);
    }
  }

  async function cargarDatosPermisosId(permisoId: number) {
    try {
       if(token === null) {
        token = localStorage.getItem('tokenPolicia');
      }
      const response = await fetch(apiUrl + '/Multa/' + permisoId.toString(), {
        headers: { 'Authorization': `Bearer ${token}` }
      
      } );
      if (!response.ok) throw new Error('Error al cargar los datos de los permisos');
      const data = await response.json();
      infoPermiso.splice(0, infoPermiso.length); 
      data.forEach((permiso : Permiso) => {
        infoPermiso.push(permiso); 
      });
    } catch (error) {
      console.error('Error al cargar la información de los permisos:', error);
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


async function actualizarMulta(permiso : Permiso) { 
  try {
     if(token === null) {
        token = localStorage.getItem('tokenPolicia');
      }
    const response = await fetch(apiUrl + '/Permiso', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(permiso),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error al actualizar la información del permiso ${errorBody}`);
    }

    await cargarDatosPermisos();
  } catch (error) {
    console.error('Error al actualizar la información del permiso :', error);
  }
}

async function borrarDatosMulta(permisoId: number) {
    try {
       if(token === null) {
        token = localStorage.getItem('tokenPolicia');
      }
      const response = await fetch(apiUrl + '/Permiso/' + permisoId.toString(), {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Error al borrar la información del permiso');
      await cargarDatosPermisos();
    } catch (error) {
      console.error('Error al borrar la información del permiso', error);
    }
  }

  return {cargarDatosPermisos ,cargarDatosPermisosId, borrarDatosMulta, actualizarMulta, infoPermiso };
});