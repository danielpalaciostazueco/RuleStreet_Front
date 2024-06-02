
export interface Vehiculo {
    idVehiculo: number;
    matricula: string;
    marca: string;
    modelo: string;
    color: string;
    enColor: string;
    idCiudadano: number;
    photo: string;
    ciudadano: Ciudadano;
}

export interface CodigoPenal {
    idCodigoPenal: number;
    articulo: string;
    article: string;
    descripcion: string;
    description: string;
    precio: number;
    sentencia: string;
}

export interface Multa {
    idMulta: number;
    idPolicia: number;
    fecha: Date;
    precio: number;
    articuloPenal: string;
    descripcion: string;
    description: string;
    pagada: boolean;
    idCiudadano: number;
    codigoPenal: CodigoPenal;
}

export interface Ciudadano {
                idCiudadano: number;
                nombre: string;
                apellidos: string;
                dni: string;
                genero: string;
                gender: string;
                nacionalidad: string;
                nationality: string;
                fechaNacimiento: Date;
                direccion: string;
                address: string;
                numeroTelefono: string; 
                numeroCuentaBancaria: string;
                isPoli: boolean;
                isBusquedaYCaptura: boolean;
                isPeligroso: boolean;
                multas: Multa[];
                vehiculos: Vehiculo[];
                trabajo : string;
            }

export interface Policia {
  idPolicia: number;
  idCiudadano: number;
  rango: Rango;
  numeroPlaca: string;
  ciudadano: Ciudadano;
  contrasena?: string;
  isPolicia: boolean;
}

export interface Rango {
  idRango: number;
  nombre: string;
  name: string;
  salario: number;
  isLocal: boolean;
  permisos: { idPermiso: number; nombre: string; name: string; }[];
}
