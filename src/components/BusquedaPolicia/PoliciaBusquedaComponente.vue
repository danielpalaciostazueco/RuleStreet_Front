<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useListadoPolicias } from '@/stores/storePolicia';
import VehicleList from '@/components/BusquedaPolicia/ListaPoliciaComponente.vue';



interface Policia {
    idPolicia: number;
    idCiudadano: number;
    rango: string;
    numeroPlaca: string;
    ciudadano: Ciudadano[];
}

interface Ciudadano {
    idCiudadano: number;
    nombre: string;
    apellidos: string;
    dni: string;
    genero: string;
    nacionalidad: string;
    fechaNacimiento: Date;
    direccion: string;
    numeroTelefono: string;
    numeroCuentaBancaria: string;
    isPoli: boolean;
    isBusquedaYCaptura: boolean;
    isPeligroso: boolean;
}




export default defineComponent({
    components: {
        VehicleList
    },
    setup() {
        const store = useListadoPolicias();


        const searchQuery = ref('');
        const allPolicias = ref<Policia[]>([]);
        const filteredPolicias = ref<Policia[]>([]);
        const selectedPolicia = ref<Policia | null>(null);

        onMounted(async () => {
            await store.cargarDatosPolicias();
            allPolicias.value = store.infoPolicias.map((policias: Policia) => ({
                idPolicia: policias.idPolicia,
                idCiudadano: policias.idCiudadano,
                rango: policias.rango,
                numeroPlaca: policias.numeroPlaca,
                ciudadano: [policias.ciudadano[0]]
            }));

            filteredPolicias.value = [...allPolicias.value];
        });

        watch(searchQuery, (newQuery) => {
            if (newQuery.trim()) {
                filteredPolicias.value = allPolicias.value.filter(policia => policia.rango.toLowerCase().includes(newQuery.toLowerCase()) || policia.numeroPlaca.toLowerCase().includes(newQuery.toLowerCase()));
            } else {
                filteredPolicias.value = [...allPolicias.value];
            }
        }, { immediate: true });

        const handlePoliciaSelected = (policia: Policia) => {
            selectedPolicia.value = policia;
            console.log(selectedPolicia.value);
        };

        return {
            searchQuery,
            filteredPolicias,
            handlePoliciaSelected
        };
    }
});
</script>

<template>
    <div class="vehiculo_menu_izquierda">
        <div class="vehiculo_menu_izquierda_titulo">
            <h2>LISTA DE POLICIAS</h2>
        </div>
        <div class="vehiculo_busqueda">
            <input type="text" placeholder="Vehiculo" v-model="searchQuery">
            <button @click="searchVehicles">
                <svg class="vehiculo_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
            </button>
        </div>
        <VehicleList :vehicles="filteredPolicias" @vehicle-selected="handlePoliciaSelected" />
    </div>
</template>
<style scoped>
.vehiculo_menu_izquierda {
    background-color: var(--colorFondoCiudadano2);
    width: 25%;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    gap: 2rem;
}

.vehiculo_menu_izquierda_titulo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.vehiculo_menu_izquierda_titulo h2 {
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

.vehiculo_busqueda {
    display: flex;
    align-items: center;
    justify-content: center;
}

.vehiculo_busqueda input {
    height: 2rem;
    outline: none;
    background-color: var(--colorBusquedaCiudadanoBusqueda);
    border: 1px solid var(--colorBusquedaCiudadanoBusqueda);
    color: var(--colorBlanco);
    padding-left: 1rem;
}

.vehiculo_busqueda input::placeholder {
    color: var(--colorBlanco);
}

.vehiculo_busqueda button {
    width: 5rem;
    height: 2rem;
    background-color: var(--colorBotonBusquedaCiudadano);
    border: none;
}

.vehiculo_busqueda button:hover {
    background-color: var(--colorBotonBusquedaCiudadanoActivo);
    cursor: pointer;
}

.vehiculo_icono {
    width: 1rem;
    height: 1rem;
    fill: var(--colorSvg);
    transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
}
</style>