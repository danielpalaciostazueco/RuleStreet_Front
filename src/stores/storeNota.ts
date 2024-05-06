

import { defineStore } from 'pinia';
import { reactive } from 'vue';


export interface Nota {

   idNota : number ;
   titulo : string | null;
   descripcion : string | null;
   fecha : Date | null;
   idPolicia : number | null;
   idCiudadano : number | null;
}


export const useListadoNotas = defineStore('listadoNotas', () => {
  const apiUrl = `http://localhost:8001`;
  const infoNotas = reactive<Array<Nota>>([]);
  let token = localStorage.getItem('token');
   
  async function cargarDatosNotas() {
    try {
       if(token === null) {
        token = localStorage.getItem('tokenPolicia');
      }
      const response = await fetch(apiUrl + '/Nota', {
        headers: { 'Authorization': `Bearer ${token}` } 
      
      } );
      if (!response.ok) throw new Error('Error al cargar los datos de las notas');
      const data = await response.json();
      infoNotas.splice(0, infoNotas.length); 
      data.forEach((nota : Nota) => {
        infoNotas.push(nota); 
      });
    } catch (error) {
      console.error('Error al cargar la información de las notas:', error);
    }
  }

  async function cargarDatosNotasId(notaId : number) {
    try {
       if(token === null) {
        token = localStorage.getItem('tokenPolicia');
      }
      const response = await fetch(apiUrl + '/Nota/' + notaId.toString(), {
        headers: { 'Authorization': `Bearer ${token}` } 
      });
   
      if (!response.ok) throw new Error('Error al cargar los datos de las notas');
      const data = await response.json();
      infoNotas.splice(0, infoNotas.length); 
      data.forEach((nota : Nota) => {
        infoNotas.push(nota); 
      });
    } catch (error) {
      console.error('Error al cargar la información de las notas:', error);
    }
  }


async function guardarNotas(nota : Nota) {
  try {
     if(token === null) {
        token = localStorage.getItem('tokenPolicia');
      }
    const response = await fetch(apiUrl + '/Nota', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(nota),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error al guardar la información de la nota: ${errorBody}`);
    }

    await cargarDatosNotas();
  } catch (error) {
    console.error('Error al guardar la información de la nota:', error);
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


async function actualizarNotas(nota : Nota) { 
  try {
     if(token === null) {
        token = localStorage.getItem('tokenPolicia');
      }
    const response = await fetch(apiUrl + '/Nota', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(nota),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error al actualizar la información de la nota: ${errorBody}`);
    }

    await cargarDatosNotas();
  } catch (error) {
    console.error('Error al actualizar la información de la nota:', error);
  }
}

async function borrarDatosNotas(notaId: number) {
    try {
       if(token === null) {
        token = localStorage.getItem('tokenPolicia');
      }
      const response = await fetch(apiUrl + '/Nota/' + notaId.toString(), {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Error al borrar la información de la nota');
      await cargarDatosNotas();
    } catch (error) {
      console.error('Error al borrar la información de la nota', error);
    }
  }

  return {cargarDatosNotas ,cargarDatosNotasId, borrarDatosNotas, actualizarNotas, infoNotas, guardarNotas  };
});