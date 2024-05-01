<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<template>
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
                <p>Desempleado</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.ciudadano_perfil_usuario {
    display: flex;
    width: 100%;
    gap: 3rem;
}

.ciudadano_perfil_usuario_izquierda {
    display: flex;
    justify-content: center;
    align-items: center;
}

.ciudadano_perfil_usuario_izquierda img {
    width: 15rem;
    height: 15rem;
}
.ciudadano_perfil_usuario_derecha {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.ciudadano_tarjeta {
    background-color: var(--colorBusquedaCiudadanoTarjeta);
    border-radius: 0.7rem;
    width: 12rem;
    height: 4rem;
    display: flex;
    flex-direction: column;
    padding-left: 2rem;
    justify-content: center;
    gap: 0.5rem;
}

.ciudadano_tarjeta p {
    font-size: 16px;
}
</style>