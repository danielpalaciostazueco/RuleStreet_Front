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
        await store.LoginPolicia();
    } catch (error) {
        console.error('Error al enviar formulario:', error);
    }
};
</script>

<template>
    <div class="flex justify-center items-center min-h-screen" style="background-color: var(--colorFondo);">
        <form @submit.prevent="submitForm" class="bg-[var(--colorFondoTarjeta)] p-8 rounded-xl shadow-md text-center w-11/12 max-w-md">
            <h2 class="text-2xl mb-4" style="color: var(--colorBlanco);">{{ $t('LoginPolicia.Title') }}</h2>
            <input type="text" v-model="store.DatosPolicia.numeroPlaca" :placeholder="$t('LoginPolicia.NumeroPlaca')" class="bg-[var(--colorTextoTarjeta)] border border-blue-500 text-black py-2 rounded-md mb-4 w-full text-base" />
            <input type="password" v-model="store.DatosPolicia.Contrasena" :placeholder="$t('LoginPolicia.Password')" class="bg-[var(--colorTextoTarjeta)] border border-blue-500 text-black py-2 rounded-md mb-4 w-full text-base" />
            <p class="mt-4" style="color: var(--colorBlanco);">
                <RouterLink to="/Login" class="block mb-2 text-left" style="color: var(--colorBlanco);">{{ $t('LoginPolicia.Usuario') }}</RouterLink>
                <RouterLink to="/register" class="block mb-2 text-left" style="color: var(--colorBlanco);">{{ $t('LoginPolicia.Cuenta') }}</RouterLink>
            </p>
            <button type="submit" class="bg-blue-500 text-white py-2 px-6 rounded-md cursor-pointer w-auto text-xl transition-colors duration-300 hover:bg-blue-600">{{ $t('LoginPolicia.Login') }}</button>
            <p class="mt-4" style="color: var(--colorBlanco);">
                <RouterLink to="/" class="block mb-2 text-left" style="color: var(--colorBlanco);">{{ $t('LoginPolicia.Principal') }}</RouterLink>
            </p>
        </form>
    </div>
</template>


<style scoped>
@media (max-width: 768px) {
    .login-form {
        padding: 1.5rem !important;
    }

    .login-form h2 {
        font-size: 1.125rem !important;
    }

    .login-form input,
    .login-form button {
        font-size: 0.875rem !important;
    }
}

@media (max-width: 480px) {
    .login-form {
        padding: 1rem !important;
    }

    .login-form h2 {
        font-size: 1rem !important;
    }

    .login-form input,
    .login-form button {
        font-size: 0.75rem !important;
    }
}
</style>