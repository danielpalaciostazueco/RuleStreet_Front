

import { defineStore } from 'pinia';
import { reactive } from 'vue';


export interface Vehiculo {
  idVehiculo : number;
  matricula : string;
  marca : string;
  modelo : string;
  color : string;
  idCiudadano : number,
  photo : string;
}


export const useListadoVehiculos = defineStore('listadoVehiculos', () => {
  const apiUrl = `http://localhost:8001`;
  const infoVehiculos = reactive<Array<Vehiculo>>([]);
  
  let token = localStorage.getItem('token');
  async function cargarDatosVehiculos() {
    try {
        if(token === null) {
        token = localStorage.getItem('tokenPolicia');
      }
        const response = await fetch(apiUrl + '/Vehiculo', {
            headers: { 'Authorization': `Bearer ${token}` } 
        });
        if (!response.ok) throw new Error('Error al cargar los datos de los vehiculos');
        const data = await response.json();
        infoVehiculos.splice(0, infoVehiculos.length); 
        data.forEach((vehiculo: Vehiculo) => {
            infoVehiculos.push(vehiculo); 
        });
    } catch (error) {
        console.error('Error al cargar la información de los vehiculos:', error);
    }
}

  async function cargarDatosVehiculosId(vehiculoId: number) {
    try {
       if(token === null) {
        token = localStorage.getItem('tokenPolicia');
      }
      const response = await fetch(apiUrl + '/Vehiculo/' + vehiculoId.toString(), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Error al cargar los datos del vehiculo');
      const ciudadano = await response.json();

      const index = infoVehiculos.findIndex(c => c.idCiudadano === vehiculoId);
      if (index !== -1) {
        infoVehiculos[index] = ciudadano;
      } else {
        infoVehiculos.push(ciudadano); 
      }
    } catch (error) {
      console.error('Error al cargar la información del vehiculo:', error);
    }
  }
  
async function guardarObra(vehiculo : Vehiculo) {
  try {
  
    if(token === null) {
        token = localStorage.getItem('tokenPolicia');
      }
    const response = await fetch(apiUrl + '/Vehiculo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(vehiculo),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error al guardar la información del vehiculo: ${errorBody}`);
    }

    await cargarDatosVehiculos();
  } catch (error) {
    console.error('Error al guardar la información del vehiculo:', error);
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


async function actualizarVehiculo(vehiculo : Vehiculo) {
  try {
 if(token === null) {
        token = localStorage.getItem('tokenPolicia');
      }
    const response = await fetch(apiUrl + '/Vehiculo', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(vehiculo),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error al actualizar la información del vehiculo: ${errorBody}`);
    }

    await cargarDatosVehiculos();
  } catch (error) {
    console.error('Error al actualizar la información del vehiculo:', error);
  }
}

  async function borrarDatosVehiculos(vehiculoId: number) {
    
    try {
        if(token === null) {
        token = localStorage.getItem('tokenPolicia');
      }
      const response = await fetch(apiUrl + '/Vehiculo/' + vehiculoId.toString(), {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Error al borrar la información del vehiculo');
      await cargarDatosVehiculos();
    } catch (error) {
      console.error('Error al borrar la información del vehiculo', error);
    }
  }

  


  return {cargarDatosVehiculos,cargarDatosVehiculosId, borrarDatosVehiculos, actualizarVehiculo, infoVehiculos  };
});