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
  @apply flex flex-col h-full overflow-y-auto px-8 rounded-lg;
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
.ciudadano_boton_contenedor {
  @apply flex justify-center;
}
.ciudadano_contenedor_tarjetas {
  @apply flex flex-col gap-8;
}

</style>