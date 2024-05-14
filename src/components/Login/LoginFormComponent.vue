<script setup lang="ts">
import { ref } from 'vue';

import { useRouter } from 'vue-router';
import { useListadoAuth } from '@/stores/storeAuth';

const store = useListadoAuth();
const NombreUsuario = ref('');
const Contraseña = ref('');
const router = useRouter();


const submitForm = async () => {
    try {
        await store.LoginUsuario();
    } catch (error) {
        console.error('Error al enviar formulario:', error);
    }
};
</script>
<template class="flex flex-col">
    <div class="bg-cyan-900 ">
        <form @submit.prevent="submitForm" class="flex flex-col mx-auto gap-8">
            <h2 class="text-white text-2xl mx-auto">Login</h2>
            <input type="text" v-model="store.Datos.Dni" placeholder="Dni Completo"
                class="mx-auto rounded-md text-center bg-cyan-600 px-2" maxlength="9">
            <input type="text" v-model="store.Datos.NombreUsuario" placeholder="Nombre de usuario"
                class="mx-auto rounded-md text-center bg-cyan-600 px-2">
            <input type="password" v-model="store.Datos.Contrasena" placeholder="Contraseña"
                class="mx-auto rounded-md text-center bg-cyan-600 px-2">
            <p class="mx-auto  text-gray-300">¿No tienes cuenta? <RouterLink to="/register">Regístrate</RouterLink>
            </p>
            <p class="mx-auto text-gray-300">¿Eres policía? <RouterLink to="/loginPolicia">Ir al login para la policia
                </RouterLink>
            </p>

            <button type="submit" class="text-gray-300 bg-blue-500 mx-auto w-32 rounded-xl h-12">Iniciar Sesion
            </button>
        </form>
    </div>
</template>
