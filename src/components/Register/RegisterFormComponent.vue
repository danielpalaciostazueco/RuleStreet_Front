<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { useListadoAuth } from '@/stores/storeAuth';

const store = useListadoAuth();

const submitForm = async () => {
    await store.registroUsuario();
};
</script>

<template>
    <div class="login-container" style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: var(--colorFondo);">
        <form @submit.prevent="submitForm" class="login-form" style="background-color: var(--colorFondoTarjeta); padding: 2rem; border-radius: 0.75rem; box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1); text-align: center; width: 91.666667%; max-width: 28rem;">
            <h2 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--colorBlanco);">{{ $t('Register.Title') }}</h2>
            <input type="text" v-model="store.DatosRegistro.Dni" :placeholder="$t('Register.Dni')" style="background-color: var(--colorTextoTarjeta); border: 1px solid blue; color: black; padding: 0.5rem; border-radius: 0.375rem; margin-bottom: 1rem; width: 100%; font-size: 1rem;">
            <input type="text" v-model="store.DatosRegistro.NombreUsuario" :placeholder="$t('Register.NombreUsuario')" style="background-color: var(--colorTextoTarjeta); border: 1px solid blue; color: black; padding: 0.5rem; border-radius: 0.375rem; margin-bottom: 1rem; width: 100%; font-size: 1rem;">
            <input type="password" v-model="store.DatosRegistro.Contrasena" :placeholder="$t('Register.Password')" style="background-color: var(--colorTextoTarjeta); border: 1px solid blue; color: black; padding: 0.5rem; border-radius: 0.375rem; margin-bottom: 1rem; width: 100%; font-size: 1rem;">
            <p class="links" style="margin-top: 1rem; color: var(--colorBlanco);">
                <RouterLink to="/loginPolicia" style="color: var(--colorBlanco); display: block; margin-bottom: 0.5rem; text-align: left;">{{ $t('Register.Policia') }}</RouterLink>
                <RouterLink to="/loginAyuntamiento" style="color: var(--colorBlanco); display: block; margin-bottom: 0.5rem; text-align: left;">{{ $t('Register.Ayuntamiento') }}</RouterLink>
                <RouterLink to="/register" style="color: var(--colorBlanco); display: block; margin-bottom: 0.5rem; text-align: left;">{{ $t('Register.Cuenta') }}</RouterLink>
            </p>
            <button type="submit" style="background-color: blue; color: white; padding: 0.5rem; border-radius: 0.375rem; cursor: pointer; width: auto; font-size: 1.25rem; transition: background-color 0.3s;">{{ $t('Register.Login') }}</button>
            <p style="margin-top: 1rem; color: var(--colorBlanco);">
                <RouterLink to="/" style="color: var(--colorBlanco);">{{ $t('Register.Principal') }}</RouterLink>
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
