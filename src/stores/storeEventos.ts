

import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useListadoAuth } from './storeAuth';
const storeAuth = useListadoAuth();


export interface Evento {
   idEventos : number;
   imagen : string;
   descripcion : string;
   fecha : Date;
}

const  eventoEditando = reactive<Evento>({
  idEventos: 0,
  imagen: '',
  descripcion: '',
  fecha: new Date()
});
export const useListadoEvento = defineStore('listadoEventos', () => {

  const  eventoEditando = reactive<Evento>({
    idEventos: 0,
    imagen: '',
    descripcion: '',
    fecha: new Date()
  });
  const apiUrl = `http://localhost:8001`;
  const infoEventos = reactive<Array<Evento>>([]);
  let token = "";
  async function cargarDatosEventos() {
    try {
      token = localStorage.getItem('tokenAyuntamiento') ?? '';
      const response = await fetch(apiUrl + '/Evento' ,{
        headers: { 'Authorization': `Bearer ${token}` } 
      
      });
      if (!response.ok) throw new Error('Error al cargar los datos de los policias');
      const data = await response.json();
      infoEventos.splice(0, infoEventos.length); 
      data.forEach((evento : Evento) => {
        infoEventos.push(evento); 
      });
    } catch (error) {
      console.error('Error al cargar la información de los eventos:', error);
    }
  }

  async function cargarDatosEventosId(eventoId : number) {
    try {
      token = localStorage.getItem('tokenAyuntamiento') ?? '';
      const response = await fetch(apiUrl + '/Evento/' + eventoId.toString(), {
        headers: { 'Authorization': `Bearer ${token}` } 
      });
      
      if (!response.ok) throw new Error('Error al cargar los datos de los eventos');
      const data = await response.json();
      infoEventos.splice(0, infoEventos.length); 
      data.forEach((evento : Evento) => {
        infoEventos.push(evento); 
      });
    } catch (error) {
      console.error('Error al cargar la información de los eventos:', error);
    }
  }


async function guardarEvento(evento : Evento) {
  try {
    token = localStorage.getItem('tokenAyuntamiento') ?? '';
    const response = await fetch(apiUrl + '/Evento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(evento),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error al guardar la información del evento: ${errorBody}`);
    }

    await cargarDatosEventos();
  } catch (error) {
    console.error('Error al guardar la información del eventos:', error);
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


async function actualizarEventos(evento : Evento) { 
  
  try {
    token = localStorage.getItem('tokenAyuntamiento') ?? '';
    const response = await fetch(apiUrl + '/Evento', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(evento),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error al actualizar la información del evento: ${errorBody}`);
    }

    await cargarDatosEventos();
  } catch (error) {
    console.error('Error al actualizar la información del evento:', error);
  }
}

async function borrarDatosEvento(eventoId: number) {
    try {
     token = localStorage.getItem('tokenAyuntamiento') ?? '';
      const response = await fetch(apiUrl + '/Evento/' + eventoId.toString(), {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Error al borrar la información del evento');
      await cargarDatosEventos();
    } catch (error) {
      console.error('Error al borrar la información del evento', error);
    }
  }

  function setObraEditando(evento: Evento) {
    Object.assign(eventoEditando, evento);
  }

  function resetEventoEditando() {
    Object.assign(eventoEditando, {
      idEventos: 0,
      imagen: '',
      descripcion: '',
      fecha: new Date()
    });
  }

  return {cargarDatosEventos, infoEventos, cargarDatosEventosId, guardarEvento, formatearFecha, actualizarEventos, borrarDatosEvento, eventoEditando,resetEventoEditando};
});