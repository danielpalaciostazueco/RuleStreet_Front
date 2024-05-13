<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import CitizenCard from '@/components/BusquedaCiudadano/TarjetaCiudadanoComponente.vue';
import type { Ciudadano } from '@/stores/storeCiudadano'; 

export default defineComponent({
    components: {
        CitizenCard
    },
    props: {
        citizens: Array as PropType<Ciudadano[]>
    },
    methods: {
        selectCitizen(idCiudadano: number) {
            this.$emit('select-citizen', idCiudadano);
        }
    }
});
</script>

<template>
    <div class="ciudadano_menu_izquierda_contenedor">
        <div class="ciudadano_contenedor_tarjetas" v-if="citizens && citizens.length > 0">
            <citizen-card v-for="citizen in citizens" :key="citizen.idCiudadano" :citizen="{
                id: citizen.idCiudadano,
                name: citizen.nombre,
                dni: citizen.dni,
                photo: citizen.imagenUrl
            }" />
        </div>
        <p v-else>No se encontraron resultados para tu búsqueda.</p>
    </div>
</template>

<style scoped>

.ciudadano_menu_izquierda_contenedor {
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    height: 100%;
    overflow-y: auto;
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

.ciudadano_boton_contenedor {
    display: flex;
    justify-content: center;
}

.ciudadano_contenedor_tarjetas {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
</style>