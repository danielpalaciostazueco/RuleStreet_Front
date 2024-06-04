<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue';
import { useListadoCodigoPenal } from '@/stores/storeCodigoPenal';
import { useListadoAuth } from '@/stores/storeAuth';
import { useListadoMultas } from '@/stores/storeMulta';
import { useListadoAuditorias } from '@/stores/storeAuditoria';
import { useListadoPolicias } from '@/stores/storePolicia';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

// Define interfaces
interface CodigoPenal {
  idCodigoPenal: number;
  articulo: string;
  article: string;
  descripcion: string;
  description: string;
  precio: number;
  sentencia: string;
}

interface Multa {
  idMulta: number;
  idPolicia: number;
  idCodigoPenal: number;
  fecha: Date;
  articuloPenal: string;
  descripcion: string;
  description: string;
  pagada: boolean;
  idCiudadano: number;
  precio: number;
  codigoPenal: CodigoPenal;
}

interface Auditoria {
  idAuditoria: number;
  titulo: string;
  descripcion: string;
  fecha: Date;
  idPolicia: number;
}

interface Policia {
  idPolicia: number;
  rango: { nombre: string };
  ciudadano: { nombre: string };
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
    const idCiudadano = ref(0);
    const { t, locale } = useI18n();
    const { cargarDatosCodigoPenal, infoCodigoPenal, cargarDatosCodigoPenalId } = useListadoCodigoPenal();
    const { infoPoliciasAuth, loadPoliceInfo } = useListadoAuth();
    const { guardarMulta } = useListadoMultas();
    const { guardarAuditoria} = useListadoAuditorias();
    const { infoPolicias, cargarDatosPolicias } = useListadoPolicias();

    const newMulta = ref({
      descripcion: '',
      monto: 0
    });

    const articuloSeleccionado = ref({
      idCodigoPenal: 0,
      articulo: '',
      descripcion: '',
      description: '',
      precio: 0,
      sentencia: ''
    });

    const filtro = ref('');

    const updateIdCiudadano = () => {
      const rawId = route.params.id;
      idCiudadano.value = Array.isArray(rawId) ? parseInt(rawId[0], 10) : parseInt(rawId, 10);
    };

    watch(() => route.params.id, () => {
      updateIdCiudadano();
    }, { immediate: true });

    onMounted(async () => {
      loadPoliceInfo();
      await cargarDatosCodigoPenal();
      await cargarDatosPolicias();
    });

    const close = () => {
      newMulta.value = { descripcion: '', monto: 0 };
      articuloSeleccionado.value = { idCodigoPenal: 0, articulo: '', descripcion: '', description: '', precio: 0, sentencia: '' };
      filtro.value = '';
      emit('update:visible', false);
      emit('onModalClose');
    };

    const guardarId = async (id: number) => {
      const response = await cargarDatosCodigoPenalId(id);
      if (response) {
        articuloSeleccionado.value = response;
      }
    };

    const submitMulta = async () => {
      await cargarDatosPolicias();
      const multaData: Multa = {
        idMulta: 0,
        idPolicia: infoPoliciasAuth.IdPolicia,
        fecha: new Date(),
        idCodigoPenal: articuloSeleccionado.value.idCodigoPenal as number,
        pagada: false,
        descripcion: articuloSeleccionado.value.descripcion,
        idCiudadano: idCiudadano.value,
        precio: articuloSeleccionado.value.precio,
        articuloPenal: articuloSeleccionado.value.articulo,
        description: articuloSeleccionado.value.description,
        codigoPenal: articuloSeleccionado.value as CodigoPenal
      };

      const policiaInfo = infoPolicias[0];

      const descripcionAuditoria = `El ${policiaInfo.rango.nombre} ${policiaInfo.ciudadano.nombre} ha creado la multa con articulo: ${multaData.articuloPenal}, precio: ${multaData.precio}€ el dia ${multaData.fecha}`;

      const auditoriaData: Auditoria = {
        idAuditoria: 0,
        titulo: 'Multa',
        descripcion: descripcionAuditoria,
        fecha: new Date(),
        idPolicia: multaData.idPolicia,

      };

      await guardarMulta(multaData);
      await guardarAuditoria(auditoriaData);

      close();
    };

    const articulosFiltrados = computed(() => {
      return infoCodigoPenal.filter((item: CodigoPenal) =>
        item.descripcion.toLowerCase().includes(filtro.value.toLowerCase())
      );
    });

    return {
      newMulta,
      infoCodigoPenal,
      articulosFiltrados,
      submitMulta,
      close,
      guardarId,
      articuloSeleccionado,
      filtro,
      locale
    };
  }
});
</script>


<template>
  <div v-if="visible" class="modal_fondo" @click.self="close">
    <div class="modal_container">
      <div class="modal_izquierda">
        <div class="modal_titulo">
          <h1>{{ $t('MultaCiudadano.Penal') }}</h1>
        </div>
        <div>
          <input class="model_buscador" type="text" v-model="filtro" placeholder="Buscar en el código criminal...">
        </div>
        <div class="model_tabla">
          <div class="model_tabla_encabezado">{{ $t('MultaCiudadano.Article') }}</div>
          <div class="model_tabla_encabezado">{{ $t('MultaCiudadano.Description') }}</div>
          <div class="model_tabla_encabezado">{{ $t('MultaCiudadano.Cuantity') }}</div>
          <div class="model_tabla_encabezado">{{ $t('MultaCiudadano.Sentencia') }}</div>
          <div class="model_tabla_encabezado">{{ $t('MultaCiudadano.Add') }}</div>

          <div v-for="item in articulosFiltrados" :key="item.idCodigoPenal" class="model_tabla_fila">
            <div class="model_tabla_item">{{ item.articulo }}</div>
            <div v-if="locale === 'es'" class="model_tabla_item_texto">{{ item.descripcion }}</div>
            <div v-if="locale === 'en'" class="model_tabla_item_texto">{{ item.description }}</div>
            <div class="model_tabla_item">{{ item.precio }}</div>
            <div class="model_tabla_item">{{ item.sentencia }}</div>
            <div class="model_tabla_item_filtro" @click="guardarId(item.idCodigoPenal)">{{ $t('MultaCiudadano.Add') }}
            </div>
          </div>

        </div>
      </div>
      <div class="modal_derecha">
        <div class="modal_titulo">
          <h1>{{ $t('MultaCiudadano.More') }}</h1>
        </div>
        <div class="modal_derecha_div">
          <div class="modal_derecha_container">
            <p>{{ $t('MultaCiudadano.Concept') }}</p>
            <div class="modal_derecha_container_tarjeta" v-if="articuloSeleccionado.articulo">
              <div class="izquierda">
                <p>{{ articuloSeleccionado.articulo }}</p>
              </div>
              <div class="derecha">
                <p>{{ articuloSeleccionado.sentencia }}</p>
                <p>{{ articuloSeleccionado.precio }}€</p>
              </div>
            </div>
          </div>
          <div class="boton_container">
            <button class="modal_boton" @click="submitMulta">{{ $t('MultaCiudadano.AddMulta') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal_fondo {
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

.modal_container {
  background: var(--colorFondoModal);
  padding: 20px;
  border-radius: 10px;
  width: 70%;
  height: 50rem;
  display: flex;
  gap: 2rem;
}

.modal_izquierda {
  display: flex;
  width: 60%;
  flex-direction: column;
  gap: 2rem;
}

.modal_derecha {
  display: flex;
  width: 40%;
  flex-direction: column;
  gap: 2rem;
}

.modal_titulo {
  width: 100%;
}

.modal_titulo h1 {
  background-color: var(--colorTituloModal);
  border-radius: 0.7rem;
  display: flex;
  align-items: center;
  height: 4rem;
  justify-content: center;
  color: var(--colorBlanco);
}

.model_buscador {
  width: 100%;
  border-radius: 0.7rem;
  height: 1.5rem;
  background-color: var(--colorNegro);
  outline: none;
  border: none;
  padding-left: 2rem;
  color: var(--colorBlanco);
}

.model_buscador::placeholder {
  color: var(--colorTextoTarjeta);
}

.model_tabla {
  display: grid;
  grid-template-columns: 0.5fr 5fr 0.5fr 0.5fr 0.5fr;
  gap: 0.5rem;
  width: 100%;
  overflow-y: auto;
  padding: 10px;
}

.model_tabla::-webkit-scrollbar {
  width: 8px;
}

.model_tabla::-webkit-scrollbar-thumb {
  background-color: var(--colorBlanco);
  border-radius: 4px;
}

.model_tabla::-webkit-scrollbar-thumb:hover {
  background-color: var(--colorFondoTablaModal);
  cursor: pointer;
}

.model_tabla_encabezado {
  font-weight: bold;
  padding: 12px;
  background-color: var(--colorNegro);
  color: var(--colorBlanco);
  text-align: center;
}

.model_tabla_fila {
  display: contents;
}

.model_tabla_item {
  padding: 10px;
  background-color: var(--colorFondoTablaModal);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--colorTextoTarjeta);
}

.model_tabla_item_filtro {
  padding: 10px;
  background-color: var(--colorFondoTablaModal);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--colorTextoTarjeta);
}

.model_tabla_item_filtro:hover {
  cursor: pointer;
}

.model_tabla_item:hover,
.model_tabla_item_texto:hover {
  cursor: default;
}

.model_tabla_item_texto {
  padding: 10px;
  background-color: var(--colorFondoTablaModal);
  display: flex;
  align-items: center;
  color: var(--colorTextoTarjeta);
}

.modal_derecha_div {
  background-color: var(--colorFondoTablaModal);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  justify-content: space-between;
}

.modal_derecha_div p {
  color: var(--colorTextoTarjeta);
}

.modal_derecha_container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.modal_derecha_container_tarjeta {
  display: flex;
  justify-content: space-between;
  background-color: var(--colorTarjetaModal);
  border: 1px solid var(--colorBlanco);
  width: 100%;
  height: 2rem;
  align-items: center;
  border-radius: 0.2rem;
  padding: 0rem 1rem 0rem 1rem;
}

.derecha {
  display: flex;
  gap: 1rem;
}

.modal_boton {
  width: 6rem;
  height: 1.5rem;
  background-color: var(--colorTarjetaModal);
  color: var(--colorTextoTarjeta);
  border: none;
}

.modal_boton:hover {
  cursor: pointer;
  color: var(--colorBlanco);
  background-color: var(--colorFondoPantallaModal);
}

.boton_container {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>