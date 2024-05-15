<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { useListadoAuth } from '@/stores/storeAuth';
const store = useListadoAuth();

const submitForm = async () => {

    await store.registroUsuario();
};
</script>

<template>
    <div class=" bg-cyan-800 rounded-md">
        <form @submit.prevent="submitForm" class="flex flex-col gap-8 m-10">
            <h2 class="text-white text-2xl text-center">Regístrate</h2>
            <input type="text" v-model="store.DatosRegistro.Dni" class="rounded-md text-center  bg-cyan-500"
                placeholder="Dni Completo">
            <input type="text" v-model="store.DatosRegistro.NombreUsuario" class="rounded-md text-center bg-cyan-500 "
                placeholder="Nombre de usuario">
            <input type="password" v-model="store.DatosRegistro.Contrasena" class="rounded-md text-center bg-cyan-500 "
                placeholder="Contraseña">
            <button type="submit" class="px-16  bg-cyan-700 rounded text-white">Enviar</button>
            <p>¿Tienes una cuenta? <RouterLink class="register_cuenta" to="/login">Inicia sesión</RouterLink>
            </p>
        </form>
    </div>
</template>
