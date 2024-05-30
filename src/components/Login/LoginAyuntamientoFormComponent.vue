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
    await store.LoginAyuntamiento();
  } catch (error) {
    console.error('Error al enviar formulario:', error);
  }
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen" style="background-color: var(--colorFondo);">
    <form @submit.prevent="submitForm" class="bg-[var(--colorFondoTarjeta)] p-8 rounded-xl shadow-md text-center w-11/12 max-w-md">
      <h2 class="text-2xl mb-4" style="color: var(--colorBlanco);">{{$t('LoginAyuntamiento.Title')}}</h2>
      <input type="text" v-model="store.DatosAyuntamiento.Dni" :placeholder="$t('LoginAyuntamiento.Email')" class="bg-[var(--colorTextoTarjeta)] border border-blue-500 text-black py-2 rounded-md mb-4 w-full text-base"/>
      <input type="password" v-model="store.DatosAyuntamiento.Contrasena" :placeholder="$t('LoginAyuntamiento.Password')" class="bg-[var(--colorTextoTarjeta)] border border-blue-500 text-black py-2 rounded-md mb-4 w-full text-base"/>
      <p class="mt-4" style="color: var(--colorBlanco);">
        <RouterLink to="/loginPolicia" class="block mb-2 text-left" style="color: var(--colorBlanco);">{{$t('LoginAyuntamiento.Policia')}}</RouterLink>
        <RouterLink to="/loginAyuntamiento" class="block mb-2 text-left" style="color: var(--colorBlanco);">{{$t('LoginAyuntamiento.Ayuntamiento')}}</RouterLink>
        <RouterLink to="/register" class="block mb-2 text-left" style="color: var(--colorBlanco);">{{$t('LoginAyuntamiento.Cuenta')}}</RouterLink>
      </p>
      <button type="submit" class="bg-blue-500 text-white py-2 px-6 rounded-md cursor-pointer w-auto text-xl transition-colors duration-300 hover:bg-blue-600">{{$t('LoginAyuntamiento.Login')}}</button>
      <p class="mt-4" style="color: var(--colorBlanco);">
        <RouterLink to="/" class="block mb-2 text-left" style="color: var(--colorBlanco);">{{$t('LoginAyuntamiento.Principal')}}</RouterLink>
      </p>
    </form>
  </div>
</template>
<style scoped>
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