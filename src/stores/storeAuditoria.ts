

import { defineStore } from 'pinia';
import { reactive } from 'vue';


export interface Auditoria {
    idAuditoria : number;
    titulo : string;
    descripcion : string;
    fecha : Date;
    idPolicia : number;
}


export const useListadoAuditorias = defineStore('listadoAuditorias', () => {
  const apiUrl = `http://localhost:8001`;
  const infoAuditorias = reactive<Array<Auditoria>>([]);
  
  async function cargarDatosAuditorias() {
    try {
      const response = await fetch(apiUrl + '/Auditoria' );
      if (!response.ok) throw new Error('Error al cargar los datos de las auditorias');
      const data = await response.json();
      infoAuditorias.splice(0, infoAuditorias.length); 
      data.forEach((auditoria : Auditoria) => {
        infoAuditorias.push(auditoria); 
      });
    } catch (error) {
      console.error('Error al cargar la información de las auditorias:', error);
    }
  }

  async function cargarDatosAuditoriasId(auditoriaId : number) {
    try {
      const response = await fetch(apiUrl + '/Auditoria/' + auditoriaId.toString() );
      if (!response.ok) throw new Error('Error al cargar los datos de las auditorias');
      const data = await response.json();
      infoAuditorias.splice(0, infoAuditorias.length); 
      data.forEach((auditoria : Auditoria) => {
        infoAuditorias.push(auditoria); 
      });
    } catch (error) {
      console.error('Error al cargar la información de las auditorias:', error);
    }
  }


async function guardarPolicia(auditoria : Auditoria) {
  try {

    const response = await fetch(apiUrl + '/Auditoria', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(auditoria),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error al guardar la información de la auditoria: ${errorBody}`);
    }

    await cargarDatosAuditorias();
  } catch (error) {
    console.error('Error al guardar la información de la auditoria:', error);
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


async function actualizarPolicia(auditoria : Auditoria) { 
  try {
    const response = await fetch(apiUrl + '/Auditoria', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(auditoria),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error al actualizar la información de la auditoria: ${errorBody}`);
    }

    await cargarDatosAuditorias();
  } catch (error) {
    console.error('Error al actualizar la información de la auditoria:', error);
  }
}

async function borrarDatosPolicia(auditoriaId: number) {
    try {
      const response = await fetch(apiUrl + '/Auditoria/' + auditoriaId.toString(), {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al borrar la información de la auditoria');
      await cargarDatosAuditorias();
    } catch (error) {
      console.error('Error al borrar la información de la auditoria', error);
    }
  }

  return {cargarDatosAuditorias ,cargarDatosAuditoriasId, borrarDatosPolicia, actualizarPolicia, infoAuditorias, guardarPolicia  };
});