<script lang="ts">
import { defineComponent } from 'vue';
import ReturnButton from '@/components/ComponentesGenerales/BotonPaginaPrincipalComponente.vue';

export default defineComponent({
    components: {
        ReturnButton
    }
});
</script>

<template>
    <div class="ciudadano_menu_derecha">
        <div class="ciudadano_menu_derecha_titulo">
            <h2>PERFIL DEL POLICIA</h2>
        </div>
        <div class="ciudadano_perfil">
            <p>SELECIONA UN POLICIA PARA CARGAR LA INFORMACIÓN</p>
            <div class="ciudadano_perfil_usuario">
                <div class="ciudadano_perfil_usuario_izquierda">
                    <img src="https://via.placeholder.com/150" alt="">
                </div>
                <div class="ciudadano_perfil_usuario_derecha">
                    <div class="ciudadano_tarjeta">
                        <p>Nombre</p>
                        <p>Diego</p>
                    </div>
                    <div class="ciudadano_tarjeta">
                        <p>Apellidos</p>
                        <p>Gimenez</p>
                    </div>
                    <div class="ciudadano_tarjeta">
                        <p>Genero</p>
                        <p>Male</p>
                    </div>
                    <div class="ciudadano_tarjeta">
                        <p>Nacionalidad</p>
                        <p>Española</p>
                    </div>
                    <div class="ciudadano_tarjeta">
                        <p>Fecha de nacimiento</p>
                        <p>17/08/2003</p>
                    </div>
                    <div class="ciudadano_tarjeta">
                        <p>ID</p>
                        <p>1</p>
                    </div>
                    <div class="ciudadano_tarjeta">
                        <p>Numero de telefono</p>
                        <p>601221242</p>
                    </div>
                    <div class="ciudadano_tarjeta">
                        <p>Numero de cuenta</p>
                        <p>432432322432</p>
                    </div>
                    <div class="ciudadano_tarjeta">
                        <p>Trabajo</p>
                        <p>Policia</p>
                    </div>
                </div>
            </div>
            <div class="ciudadano_perfil_botones">
                <div class="ciudadano_perfil_botones_izquierda">
                    <h2>RANGO</h2>
                    <div class="ciudadano_perfil_boton">
                
                    </div>
                </div>
                <div class="ciudadano_perfil_botones_derecha">
                    <h2>NUMERO DE PLACA</h2>
                    <div class="ciudadano_perfil_boton">
                       
                    </div>
                </div>
            </div>
            <div class="ciudadano_perfil_otros">
                <div class="ciudadano_perfil_otros_container">
                    <div class="ciudadano_perfil_notasdiv">
                        <svg class="ciudadano_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path
                                d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H288V368c0-26.5 21.5-48 48-48H448V96c0-35.3-28.7-64-64-64H64zM448 352H402.7 336c-8.8 0-16 7.2-16 16v66.7V480l32-32 64-64 32-32z" />
                        </svg>
                        <p>NOTAS</p>
                    </div>
                </div>
                <div class="ciudadano_perfil_otros_container">
                    <div class="ciudadano_perfil_notasdiv">
                        <svg class="ciudadano_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path
                                d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                        </svg>
                       
                    </div>
                    <div class="ciudadano_perfil_multas">
                       <p>INFORMES</p>
                    </div>
                </div>
                <div class="ciudadano_perfil_otros_container">
                    <div class="ciudadano_perfil_notasdiv">
                        <svg class="ciudadano_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path
                                d="M576 128c0-35.3-28.7-64-64-64H64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64l352 0 0-128c0-17.7 14.3-32 32-32H576V128zM448 448L576 320H448l0 128zM96 128a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                        </svg>
                        <p>DENUNCIAS</p>
                    </div>
                </div>
                <div class="ciudadano_perfil_otros_container">
                    <div class="ciudadano_perfil_notasdiv">
                        <svg class="ciudadano_icono" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512">
                            <path
                                d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                        </svg>
                        <p>VEHICULOS</p>
                    </div>
                </div>
            </div>
            <return-button />
        </div>
    </div>
</template>

<style>
.ciudadano_menu_izquierda_contenedor {
  @apply flex flex-col h-full overflow-y-auto items-center px-8 rounded-lg;
}
.ciudadano_menu_izquierda_contenedor p {
  @apply text-[color:var(--colorTextoTarjeta)];
}
.ciudadano_menu_izquierda_contenedor::-webkit-scrollbar {
  @apply w-2;
}
.ciudadano_menu_izquierda_contenedor::-webkit-scrollbar-track {
  @apply bg-[color:var(--colorFondoCiudadano2)];
}
.ciudadano_menu_izquierda_contenedor::-webkit-scrollbar-thumb {
  @apply bg-[color:var(--colorBlanco)] rounded hover:bg-[color:var(--colorFondoCiudadano)];
}
.ciudadano_perfil_usuario {
  @apply flex w-full gap-12;
}
.ciudadano_perfil_usuario_izquierda {
  @apply flex justify-center items-center;
}
.ciudadano_perfil_usuario_izquierda img {
  @apply w-60 h-60;
}
.ciudadano_perfil_usuario_derecha {
  @apply grid grid-cols-[repeat(3,1fr)] gap-4 justify-center items-center w-full;
}
.ciudadano_tarjeta {
  @apply bg-[color:var(--colorBusquedaCiudadanoTarjeta)] w-48 h-16 flex flex-col justify-center gap-2 pl-8 rounded-[0.7rem];
}
.ciudadano_tarjeta p {
  @apply text-base;
}
.ciudadano_perfil_botones {
  @apply flex gap-8 bg-[color:var(--colorBusquedaCiudadanoTarjeta)] w-full h-32 justify-center items-center rounded-[0.7rem];
}
.ciudadano_perfil_boton input[type="radio"] {
  @apply hidden;
}
.ciudadano_perfil_boton label {
  @apply inline-block w-52 text-center text-[color:var(--colorBlanco)] bg-[color:var(--colorBusquedaCiudadanoTarjeta)] cursor-pointer border border-[color:var(--colorTextoTarjeta)] text-[color:var(--colorTextoTarjeta)] p-2.5 border-solid;
}
#no_izquierda:checked + label,
#no_derecha:checked + label {
  @apply bg-[color:var(--colorBusquedaCiudadanoPerfilBoton)] text-[color:var(--colorTextoTarjeta)];
}
#yes_izquierda:checked + label,
#yes_derecha:checked + label {
  @apply bg-[color:var(--colorBusquedaCiudadanoPerfilBoton)] text-[color:var(--colorTextoTarjeta)];
}
.ciudadano_perfil_botones_derecha {
  @apply flex flex-col items-center gap-4;
}
.ciudadano_perfil_botones_izquierda {
  @apply flex flex-col items-center gap-4;
}
.ciudadano_perfil_botones_derecha h2 {
  @apply text-[color:var(--colorTextoTarjeta)];
}
.ciudadano_perfil_botones_izquierda h2 {
  @apply text-[color:var(--colorTextoTarjeta)];
}
.ciudadano_perfil_otros {
  @apply grid grid-cols-[repeat(2,1fr)] gap-4 justify-center items-center w-full;
}
.ciudadano_perfil_otros_container {
  @apply flex bg-[color:var(--colorBusquedaCiudadanoTarjeta)] w-full h-80 rounded-[0.7rem];
}
.ciudadano_icono {
  @apply w-8 h-4;
}
.ciudadano_perfil_notasdiv {
  @apply flex w-full gap-2 p-4;
}
.ciudadano_perfil_notasdiv p {
  @apply text-base;
}
.ciudadano_perfil_multas {
  @apply flex w-full justify-end p-4;
}
.ciudadano_perfil_multas p {
  @apply text-base;
}
.ciudadano_perfil {
  @apply flex items-center justify-center flex-col justify-between h-full p-8;
}
.ciudadano_perfil p {
  @apply text-[color:var(--colorTextoTarjeta)];
}

</style>
