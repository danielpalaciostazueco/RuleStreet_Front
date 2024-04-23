<script lang="ts">
import { defineComponent, ref } from 'vue';
import CitizenList from '@/components/BusquedaCiudadano/ListaCiudadanosComponente.vue';

interface Citizen {
    id: number;
    name: string;
    dni: string;
    photo: string;
}

export default defineComponent({
    components: {
        CitizenList
    },
    setup() {

        const citizens = ref<Citizen[]>([]);

        const allCitizens = [
            { id: 1, name: "Diego Gimenez", dni: "12345678A", photo: "https://via.placeholder.com/150" },
            { id: 2, name: "Daniel Palacios", dni: "87654321B", photo: "https://via.placeholder.com/150" },
            { id: 3, name: "Jaime Vijuesca", dni: "23456789C", photo: "https://via.placeholder.com/150" },
            { id: 4, name: "Ainhoa Galicia", dni: "24567543A", photo: "https://via.placeholder.com/150" },
            { id: 5, name: "Samuel Morales", dni: "64576543P", photo: "https://via.placeholder.com/150" },
            { id: 6, name: "Adrian Castelar", dni: "64576543P", photo: "https://via.placeholder.com/150" }
        ];

        function searchCitizens() {
            citizens.value = allCitizens;
        }

        return { citizens, searchCitizens };
    }
});
</script>

<template>
    <div class="ciudadano_menu_izquierda">
        <div class="ciudadano_menu_izquierda_titulo">
            <h2>LISTA DE CIUDADANOS</h2>
        </div>
        <div class="ciudadano_busqueda">
            <input type="text" placeholder="Ciudadano">
            <button @click="searchCitizens">
                <svg class="ciudadano_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
            </button>
        </div>
        <citizen-list :citizens="citizens" />
    </div>
</template>

<style>
.ciudadano_menu_izquierda {
    background-color: var(--colorFondoCiudadano2);
    width: 25%;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    gap: 2rem;
}

.ciudadano_menu_izquierda_titulo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.ciudadano_menu_izquierda_titulo h2 {
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

.ciudadano_busqueda {
    display: flex;
    align-items: center;
    justify-content: center;
}

.ciudadano_busqueda input {
    height: 2rem;
    outline: none;
    background-color: var(--colorBusquedaCiudadanoBusqueda);
    border: 1px solid var(--colorBusquedaCiudadanoBusqueda);
    color: var(--colorBlanco);
}

.ciudadano_busqueda input::placeholder {
    color: var(--colorBlanco);
}

.ciudadano_busqueda button {
    width: 5rem;
    height: 2rem;
    background-color: var(--colorBotonBusquedaCiudadano);
    border: none;
}

.ciudadano_busqueda button:hover {
    background-color: var(--colorBotonBusquedaCiudadanoActivo);
    cursor: pointer;
}

.ciudadano_icono {
    width: 1rem;
    height: 1rem;
    fill: var(--colorSvg);
    transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
}
</style>