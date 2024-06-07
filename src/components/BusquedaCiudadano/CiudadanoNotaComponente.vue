<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useListadoNotas } from '@/stores/storeNota';
import { useListadoAuth } from '@/stores/storeAuth';
import { useListadoPolicias } from '@/stores/storePolicia';
import { useI18n } from 'vue-i18n';

interface Nota {
  idNota: number;
  titulo: string | null;
  descripcion: string | null;
  description: string | null;
  fecha: Date | null;
  idPolicia: number | null;
  idCiudadano: number | null;
}

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:visible', 'onModalClose'],
  setup(props, { emit }) {
    const route = useRoute();
    const storeNotas = useListadoNotas();
    const storeAuth = useListadoAuth();
    const storePolicia = useListadoPolicias();
    const { t, locale } = useI18n();
    const tituloNota = ref('');
    const descripcionNota = ref('');

    const idCiudadano = ref(0);
    const policiaActualId = ref(0);

    const updateIdCiudadano = () => {
      const rawId = route.params.id;
      idCiudadano.value = Array.isArray(rawId) ? parseInt(rawId[0], 10) : parseInt(rawId, 10);
    };

    watch(() => route.params.id, updateIdCiudadano, { immediate: true });

    onMounted(async () => {
      updateIdCiudadano();
      await storeAuth.loadPoliceInfo();
      if (storeAuth.infoPoliciasAuth.IdPolicia) {
        policiaActualId.value = storeAuth.infoPoliciasAuth.IdPolicia;
        await storePolicia.cargarDatosPoliciasId(policiaActualId.value);
      }
    });

    const close = () => {
      tituloNota.value = '';
      descripcionNota.value = '';
      emit('update:visible', false);
      emit('onModalClose');
    };

    const submitNota = async () => {
      if (tituloNota.value && descripcionNota.value) {
        const nota: Nota = {
          idNota: 0,
          titulo: tituloNota.value,
          descripcion: descripcionNota.value,
          description: null,
          fecha: new Date(),
          idPolicia: policiaActualId.value,
          idCiudadano: idCiudadano.value
        };
        await storeNotas.guardarNotas(nota);
        close();
      }
    };

    return {
      tituloNota,
      descripcionNota,
      submitNota,
      close,
      locale
    };
  }
});
</script>

<template>
  <div v-if="visible" class="modal_background" @click.self="close">
    <div class="modal_content">
      <div class="modal_header">
        <h1>Añadir nota</h1>
      </div>
      <input v-model="tituloNota" placeholder="titulo" />
      <textarea v-model="descripcionNota" placeholder="descripcion"></textarea>
      <div class="button_container">
        <button class="submit_button" @click="submitNota">Añadir</button>
        <button class="cancel_button" @click="close">Cancelar</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.modal_background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--colorFondoPantallaModal);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal_content {
  background: var(--colorFondoModal);
  padding: 20px;
  border-radius: 10px;
  width: 50%;
  display: flex;
  flex-direction: column;
}

.modal_header h1 {
  text-align: center;
  color: var(--colorTextoTarjeta);
}
input{
  outline: none;
  padding-left: 10px;
  background-color: var(--colorTarjetaModal);
  color: var(--colorBlanco);
}

textarea {
  height: 150px;
  margin: 10px 0;
  padding: 10px;
  resize: none;
  outline: none;
  background-color: var(--colorTarjetaModal);
  color: var(--colorBlanco);
}

.button_container {
  display: flex;
  justify-content: space-around;
}

.submit_button,
.cancel_button {
  padding: 10px 20px;
  cursor: pointer;
}

.submit_button {
  background-color: var(--colorVerde);
  color: var(--colorBlanco);
}

.cancel_button {
  background-color: var(--colorRojo);
  color: var(--colorBlanco);
}
</style>
