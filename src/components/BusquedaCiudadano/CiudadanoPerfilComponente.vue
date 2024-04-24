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
            <h2>PERFIL DEL CIUDADANO</h2>
        </div>
        <div class="ciudadano_perfil">
            <p>SELECIONA UN CIUDADANO PARA CARGAR LA INFORMACIÓN</p>
            <return-button />
        </div>
    </div>
</template>

<style>
.ciudadano_menu_izquierda_contenedor {
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    height: 100%;
    overflow-y: auto;
    align-items: center;
}

.ciudadano_menu_izquierda_contenedor p {
    color: var(--colorTextoTarjeta);
}

.ciudadano_menu_izquierda_contenedor::-webkit-scrollbar {
    width: 8px;
}

.ciudadano_menu_izquierda_contenedor::-webkit-scrollbar-track {
    background-color: var(--colorFondoCiudadano2);
}

.ciudadano_menu_izquierda_contenedor::-webkit-scrollbar-thumb {
    background-color: var(--colorBlanco);
    border-radius: 4px;
}

.ciudadano_menu_izquierda_contenedor::-webkit-scrollbar-thumb:hover {
    background-color: var(--colorFondoCiudadano);
}
</style>
