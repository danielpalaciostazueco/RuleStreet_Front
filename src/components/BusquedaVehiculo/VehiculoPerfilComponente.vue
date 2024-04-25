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
    <div class="vehiculo_menu_derecha">
        <div class="vehiculo_menu_derecha_titulo">
            <h2>PERFIL DEL VEHICULO</h2>
        </div>
        <div class="vehiculo_perfil">
            <p>SELECIONA UN VEHICULO PARA CARGAR LA INFORMACIÓN</p>
            <return-button />
        </div>
    </div>
</template>

<style scoped>

.vehiculo_menu_derecha {
    background-color: var(--colorFondoCiudadano2);
    width: 75%;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    gap: 2rem;
}

.vehiculo_menu_derecha_titulo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.vehiculo_menu_derecha_titulo h2 {
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


.vehiculo_perfil {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.vehiculo_perfil p {
    color: var(--colorTextoTarjeta);
    font-size: 2.5rem;
}

.vehiculo_boton_contenedor {
    display: flex;
    justify-content: center;
}

.vehiculo_contenedor_tarjeta{
    display: flex;
    flex-direction: column;
    gap: 2rem;
}



</style>
