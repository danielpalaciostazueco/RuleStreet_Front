<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import PoliciaCard from '@/components/BusquedaPolicia/TarjetaPoliciaComponente.vue';

export default defineComponent({
    components: {
        PoliciaCard
    },
    props: {
        policias: Array as PropType<Array<{ idPolicia: number; idCiudadano: number, rango: string, numeroPlaca: string }>>
    }
});
</script>

<template>
    <div class="policia_menu_izquierda_contenedor">
        <div class="policia_contenedor_tarjeta" v-if="policias && policias.length > 0">
            <policia-card v-for="poli in policias" :key="poli.idPolicia" :policia="{
                idPolicia: poli.idPolicia,
                nombre: poli.ciudadano.nombre,
                apellidos: poli.ciudadano.apellidos,
                rango: poli.rango,
                numeroPlaca: poli.numeroPlaca
            }" />
        </div>
        <p v-else>No se encontraron resultados para tu búsqueda.</p>
    </div>
</template>

<style scoped>
.policia_contenedor_tarjeta {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}


.policia_menu_izquierda_contenedor {
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    height: 100%;
    overflow-y: auto;
}

.policia_menu_izquierda_contenedor p {
    color: var(--colorTextoTarjeta);
}

.policia_menu_izquierda_contenedor::-webkit-scrollbar {
    width: 8px;
}

.policia_menu_izquierda_contenedor::-webkit-scrollbar-track {
    background-color: var(--colorFondoCiudadano2);
}

.vpolicia_menu_izquierda_contenedor::-webkit-scrollbar-thumb {
    background-color: var(--colorBlanco);
    border-radius: 4px;
}

.policia_menu_izquierda_contenedor::-webkit-scrollbar-thumb:hover {
    background-color: var(--colorFondoCiudadano);
}
</style>