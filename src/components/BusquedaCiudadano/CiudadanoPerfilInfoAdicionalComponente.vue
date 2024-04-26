<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<template>
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
                <p>MULTAS</p>
            </div>
            <div class="ciudadano_perfil_multas">
                <p>+ AÑADIR MULTA</p>
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
                <svg class="ciudadano_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                        d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                </svg>
                <p>VEHICULOS</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.ciudadano_perfil_otros {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.ciudadano_perfil_otros_container {
    display: flex;
    background-color: var(--colorBusquedaCiudadanoTarjeta);
    border-radius: 0.7rem;
    width: 100%;
    height: 20rem;
}

.ciudadano_icono {
    width: 2rem;
    height: 1rem;
}

.ciudadano_perfil_notasdiv {
    display: flex;
    width: 100%;
    padding: 1rem;
    gap: 0.5rem;
}

.ciudadano_perfil_notasdiv p {
    font-size: 16px;
}

.ciudadano_perfil_multas{
    display: flex;
    width: 100%;
    justify-content: flex-end;
    padding: 1rem;
}

.ciudadano_perfil_multas p{
    font-size: 16px;
}

.ciudadano_perfil_otros {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.ciudadano_perfil_otros_container {
    display: flex;
    background-color: var(--colorBusquedaCiudadanoTarjeta);
    border-radius: 0.7rem;
    width: 100%;
    height: 20rem;

}
</style>