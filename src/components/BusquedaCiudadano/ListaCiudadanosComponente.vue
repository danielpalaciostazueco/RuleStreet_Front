<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import CitizenCard from '@/components/BusquedaCiudadano/TarjetaCiudadanoComponente.vue';

export default defineComponent({
    components: {
        CitizenCard
    },
    props: {
        citizens: Array as PropType<Array<{ id: number; name: string; dni: string; photo: string }>>
    }
});
</script>

<template>
    <div class="ciudadano_menu_izquierda_contenedor">
        <div class="ciudadano_contenedor_tarjetas" v-if="citizens && citizens.length > 0">
            <citizen-card v-for="citizen in citizens" :key="citizen.id" :citizen="citizen" />
        </div>
        <p v-else>REALIZA UNA BUSQUEDA PARA MOSTRAR RESULTADOS</p>
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

.ciudadano_contenedor_tarjetas {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
</style>