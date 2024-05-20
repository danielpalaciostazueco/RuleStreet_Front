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
    <div class="login-container">
        <form @submit.prevent="submitForm" class="login-form">
            <h2>{{ $t('LoginPolicia.Title') }}</h2>
            <input type="text" v-model="store.DatosPolicia.numeroPlaca" :placeholder="{{ $t('LoginPolicia.NumeroPlaca') }}">
            <input type="password" v-model="store.DatosPolicia.Contrasena" :placeholder="{{ $t('LoginPolicia.Password') }}">
            <p class="links">
                <RouterLink to="/Login">{{ $t('LoginPolicia.Usuario') }}</RouterLink>
                <RouterLink to="/register">{{ $t('LoginPolicia.Cuenta') }}</RouterLink>
            </p>
            <button type="submit">{{ $t('LoginPolicia.Login') }}</button>
            <p>
                <RouterLink to="/">{{ $t('LoginPolicia.Principal') }}</RouterLink>
            </p>
        </form>
    </div>
</template>
<style scoped>
.login-container {
    @apply flex justify-center items-center min-h-screen bg-[var(--colorFondo)];
}

.login-form {
    @apply bg-[var(--colorFondoTarjeta)] p-8 rounded-xl shadow-md text-center w-11/12 max-w-md;
}

.login-form h2 {
    @apply text-2xl mb-4 text-[var(--colorBlanco)];
}

.login-form input {
    @apply bg-[var(--colorTextoTarjeta)] border border-blue-500 text-black py-2 rounded-md mb-4 w-full text-base;
}

.login-form button {
    @apply bg-blue-500 text-white py-2 rounded-md cursor-pointer w-auto text-xl transition-colors duration-300;
}

.login-form button:hover {
    @apply bg-blue-600;
}

.login-form p {
    @apply mt-4 text-[var(--colorBlanco)];
}

.login-form .links a {
    @apply text-[var(--colorBlanco)] block mb-2 text-left;
}

.login-form .links a:hover {
    @apply text-blue-600;
}

@media (max-width: 768px) {
    .login-form {
        @apply p-6;
    }

    .login-form h2 {
        @apply text-lg;
    }

    .login-form input,
    .login-form button {
        @apply text-sm;
    }
}

@media (max-width: 480px) {
    .login-form {
        @apply p-4;
    }

    .login-form h2 {
        @apply text-base;
    }

    .login-form input,
    .login-form button {
        @apply text-xs;
    }
}
</style>