

import { defineStore } from 'pinia';
import { reactive } from 'vue';


export interface Usuario {
    idUsuario : number;
    idPolicia : number;
    idCiudadano : number;
    nombre : string;
    contrasena : string;
}


export const useListadoUsuarios = defineStore('listadoUsuarios', () => {
  const apiUrl = `http://localhost:8001`;
  const infoUsuarios = reactive<Array<Usuario>>([]);
  
  async function cargarDatosUsuarios() {
    try {
      const response = await fetch(apiUrl + '/Usuario' );
      if (!response.ok) throw new Error('Error al cargar los datos de los usuarios');
      const data = await response.json();
      infoUsuarios.splice(0, infoUsuarios.length); 
      data.forEach((usuario : Usuario) => {
        infoUsuarios.push(usuario); 
      });
    } catch (error) {
      console.error('Error al cargar la información de los usuarios:', error);
    }
  }

  async function cargarDatosUsuariosId(usuarioId : number) {
    try {
      const response = await fetch(apiUrl + '/Usuario/' + usuarioId.toString() );
      if (!response.ok) throw new Error('Error al cargar los datos de los usuarios');
      const data = await response.json();
      infoUsuarios.splice(0, infoUsuarios.length); 
      data.forEach((usuario : Usuario) => {
        infoUsuarios.push(usuario); 
      });
    } catch (error) {
      console.error('Error al cargar la información de los usuarios:', error);
    }
  }


async function guardarUsuario(usuario : Usuario) {
  try {

    const response = await fetch(apiUrl + '/Usuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error al guardar la información del usuario: ${errorBody}`);
    }

    await cargarDatosUsuarios();
  } catch (error) {
    console.error('Error al guardar la información del usuario:', error);
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


async function actualizarUsuario(usuario : Usuario) { 
  try {
    const response = await fetch(apiUrl + '/Usuario', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error al actualizar la información del usuario: ${errorBody}`);
    }

    await cargarDatosUsuarios();
  } catch (error) {
    console.error('Error al actualizar la información del usuario:', error);
  }
}

async function borrarDatosUsuario(usuarioId: number) {
    try {
      const response = await fetch(apiUrl + '/Usuario/' + usuarioId.toString(), {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al borrar la información del usuario');
      await cargarDatosUsuarios();
    } catch (error) {
      console.error('Error al borrar la información del usuario', error);
    }
  }

  return {cargarDatosUsuarios ,cargarDatosUsuariosId, borrarDatosUsuario, actualizarUsuario, infoUsuarios, guardarUsuario  };
});