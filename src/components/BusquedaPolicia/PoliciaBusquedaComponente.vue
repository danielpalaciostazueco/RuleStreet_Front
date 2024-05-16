<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useListadoPolicias } from '@/stores/storePolicia';
import PoliciaList from '@/components/BusquedaPolicia/ListaPoliciaComponente.vue';

export default defineComponent({
    components: {
        PoliciaList
    },
    setup() {
        const store = useListadoPolicias();

        onMounted(() => {
            store.cargarDatosPolicias();
        });

        interface Policia {
            idPolicia: number,
            idCiudadano: number,
            rango: string,
            numeroPlaca: string
        }

        const hasSearched = ref(false);
        const searchQuery = ref('');
        const Policia = ref<Policia[]>([]);

        function searchPolicia() {
            hasSearched.value = true;
            if (searchQuery.value.trim()) {
                Policia.value = store.infoPolicias.filter(policia =>
                    policia.ciudadano.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
                );
            } else {
                Policia.value = [];
            }
        }

        return {
            hasSearched,
            searchQuery,
            Policia,
            searchPolicia
        };
    }
});

</script>

<template>
    <div class="policia_menu_izquierda">
        <div class="policia_menu_izquierda_titulo">
            <h2>LISTA DE POLICIAS</h2>
        </div>
        <div class="policia_busqueda">
            <input type="text" placeholder="Policia" v-model="searchQuery">
            <button @click="searchPolicia">
                <svg class="policia_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
            </button>
        </div>
        <PoliciaList :policias="Policia" />
    </div>
</template>

<style scoped>

.policia_menu_izquierda {
    background-color: var(--colorFondoCiudadano2);
    width: 25%;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    gap: 2rem;
}

.policia_menu_izquierda_titulo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.policia_menu_izquierda_titulo h2 {
    background-color: var(--colorFondoCiudadano);
    border-radius: 0.7rem;
    height: 2.5rem;
    color: var(--colorTextoTarjeta);
    display: flex;
    align-items: center;
    width: 90%;
    display: flex;
    justify-content: center;
}

.policia_busqueda {
    display: flex;
    align-items: center;
    justify-content: center;
}

.policia_busqueda input {
    height: 2rem;
    outline: none;
    background-color: var(--colorBusquedaCiudadanoBusqueda);
    border: 1px solid var(--colorBusquedaCiudadanoBusqueda);
    color: var(--colorBlanco);
    padding-left: 1rem;
}

.policia_busqueda input::placeholder {
    color: var(--colorBlanco);
}

.policia_busqueda button {
    width: 5rem;
    height: 2rem;
    background-color: var(--colorBotonBusquedaCiudadano);
    border: none;
}

.policia_busqueda button:hover {
    background-color: var(--colorBotonBusquedaCiudadanoActivo);
    cursor: pointer;
}

.policia_icono {
    width: 1rem;
    height: 1rem;
    fill: var(--colorSvg);
    transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;

}

</style>