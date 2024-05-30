<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { useListadoAuth } from '@/stores/storeAuth';

const store = useListadoAuth();

const submitForm = async () => {
    await store.registroUsuario();
};
</script>
<template>
    <div class="min-h-screen flex justify-center items-center bg-[var(--colorFondo)]">
        <form @submit.prevent="submitForm" class="bg-[var(--colorFondoTarjeta)] p-8 rounded-xl shadow-md text-center w-[91.666667%] max-w-[28rem]">
            <h2 class="text-xl md:text-2xl mb-4 text-[var(--colorBlanco)]">{{ $t('Register.Title') }}</h2>
            <input type="text" v-model="store.DatosRegistro.Dni" :placeholder="$t('Register.Dni')" class="bg-[var(--colorTextoTarjeta)] border border-blue-500 text-black py-2 rounded-md mb-4 w-full text-base">
            <input type="text" v-model="store.DatosRegistro.NombreUsuario" :placeholder="$t('Register.NombreUsuario')" class="bg-[var(--colorTextoTarjeta)] border border-blue-500 text-black py-2 rounded-md mb-4 w-full text-base">
            <input type="password" v-model="store.DatosRegistro.Contrasena" :placeholder="$t('Register.Password')" class="bg-[var(--colorTextoTarjeta)] border border-blue-500 text-black py-2 rounded-md mb-4 w-full text-base">
            <p class="mt-4 text-[var(--colorBlanco)]">
                <RouterLink to="/loginPolicia" class="block mb-2 text-left">{{ $t('Register.Policia') }}</RouterLink>
                <RouterLink to="/loginAyuntamiento" class="block mb-2 text-left">{{ $t('Register.Ayuntamiento') }}</RouterLink>
                <RouterLink to="/register" class="block mb-2 text-left">{{ $t('Register.Cuenta') }}</RouterLink>
            </p>
            <button type="submit" class="bg-blue-500 text-white py-2 px-6 rounded-md cursor-pointer w-auto text-xl transition-colors duration-300 hover:bg-blue-600">{{ $t('Register.Login') }}</button>
            <p class="mt-4 text-[var(--colorBlanco)]">
                <RouterLink to="/" class="block mb-2 text-left">{{ $t('Register.Principal') }}</RouterLink>
            </p>
        </form>
    </div>
</template>


<style scoped>
@media (max-width: 768px) {
    .login-form {
        padding: 1.5rem;
    }

    .login-form h2 {
        font-size: 1.125rem;
    }

    .login-form input,
    .login-form button {
        font-size: 0.875rem;
    }
}

@media (max-width: 480px) {
    .login-form {
        padding: 1rem;
    }

    .login-form h2 {
        font-size: 1rem;
    }

    .login-form input,
    .login-form button {
        font-size: 0.75rem;
    }
}
</style>
