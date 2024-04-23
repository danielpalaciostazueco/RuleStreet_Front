<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<template>
    <div class="ciudadano_menu_izquierda_contenedor">
        <p>REALIZA UNA BUSQUEDA PARA MOSTRAR RESULTADOS</p>
    </div>
</template>

<style>
.ciudadano_menu_derecha {
    background-color: var(--colorFondoCiudadano2);
    width: 75%;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    gap: 2rem;
}

.ciudadano_menu_derecha_titulo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.ciudadano_menu_derecha_titulo h2 {
    background-color: var(--colorFondoCiudadano);
    border-radius: 0.7rem;
    height: 2.5rem;
    color: var(--colorTextoTarjeta);
    display: flex;
    align-items: center;
    width: 80%;
    display: flex;
    justify-content: center;
}

.ciudadano_perfil {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.ciudadano_perfil p {
    color: var(--colorTextoTarjeta);
    font-size: 2.5rem;
}

.ciudadano_boton_contenedor {
    display: flex;
    justify-content: center;
}
</style>