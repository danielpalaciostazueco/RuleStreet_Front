<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import ReturnButton from '@/components/ComponentesGenerales/BotonPaginaPrincipalComponente.vue';
import { useRoute } from 'vue-router';
import { useListadoPolicias } from '@/stores/storePolicia';
import { useListadoDenuncias } from '@/stores/storeDenuncia';

export default defineComponent({
  components: {
    ReturnButton,
  },
  setup() {
    const route = useRoute();
    const storeDenuncias = useListadoDenuncias();
    const storePolicias = useListadoPolicias();
    const denunciaId = ref(parseInt(parseRouteParam(route.params.id) || '0'));
    const canEdit = ref(false);

    const reloadDenunciaDetails = () => {
      if (denunciaId.value) {
        storeDenuncias.cargarDatosDenunciasId(denunciaId.value);
      }
    };

    const denunciaDetails = computed(() => {
      return storeDenuncias.infoDenuncias.find(d => d.idDenuncia === denunciaId.value) || {
        idDenuncia: 0,
        titulo: '',
        descripcion: '',
        fecha: new Date(),
        idPolicia: 0,
        idCiudadano: 0
      };
    });

    const getNombrePolicia = (idPolicia: number) => {
      const policia = storePolicias.infoPolicias.find(p => p.idPolicia === idPolicia);
      return policia ? policia.ciudadano.nombre + " " + policia.ciudadano.apellidos : 'Desconocido';
    };

    const toggleEdit = () => {
      canEdit.value = !canEdit.value;
    };

    watch(() => route.params.id, (newId) => {
      const parsedId = parseInt(parseRouteParam(newId));
      if (parsedId) {
        denunciaId.value = parsedId;
        storeDenuncias.cargarDatosDenunciasId(parsedId);
      }
    }, { immediate: true });

    onMounted(async () => {
      await storePolicias.cargarDatosPolicias();
      await storeDenuncias.cargarDatosDenuncias();
      if (denunciaId.value) {
        storeDenuncias.cargarDatosDenunciasId(denunciaId.value);
      }
    });

    return {
      denunciaDetails,
      denunciaId,
      reloadDenunciaDetails,
      getNombrePolicia,
      canEdit,
      toggleEdit,
    };
  }
});

function parseRouteParam(param: string | string[]): string {
  return Array.isArray(param) ? param[0] : param || '0';
}
</script>

<template>
  <div class="denuncia_menu_derecha">
    <div class="denuncia_menu_derecha_titulo">
      <h2>DENUNCIA</h2>
      <button @click="toggleEdit">Editar</button>
    </div>
    <div class="denuncia_perfil">
      <p v-if="!denunciaId">SELECCIONA UNA DENUNCIA PARA CARGAR LA INFORMACIÓN</p>
      <template v-else>
        <div class="denuncia_div_info">
          <div class="item">
            <p>NOMBRE DE LA DENUNCIA</p>
            <input type="text" v-model="denunciaDetails.titulo" :disabled="!canEdit">
          </div>
          <div class="item">
            <p>ID DE LA DENUNCIA</p>
            <p>{{ denunciaDetails.idDenuncia }}</p>
          </div>
          <div class="item">
            <p>FECHA Y HORA</p>
            <p>{{ new Date(denunciaDetails.fecha).toLocaleDateString('es-ES') }} - {{ new
              Date(denunciaDetails.fecha).toLocaleTimeString('es-ES') }}</p>
          </div>
          <div class="item">
            <p>AGENTE A CARGO</p>
            <p>{{ getNombrePolicia(denunciaDetails.idPolicia) }}</p>
          </div>
          <div class="item">
            <p>LOCALIZACION</p>
            <input type="text">
          </div>
        </div>
        <div class="denuncia_div_descripcion">
          <div class="denuncia_div_descripcion_titulo">
            <svg class="denuncia_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H288V368c0-26.5 21.5-48 48-48H448V96c0-35.3-28.7-64-64-64H64zM448 352H402.7 336c-8.8 0-16 7.2-16 16v66.7V480l32-32 64-64 32-32z" />
            </svg>
            <p>DESCRIPCION DE LA DENUNCIA</p>
          </div>
          <textarea class="denuncia_descripcion_contenido" v-model="denunciaDetails.descripcion"
            placeholder="Ingresa la descripción aquí" :disabled="!canEdit"></textarea>
        </div>
      </template>
      <return-button />
    </div>
  </div>
</template>

<style scoped>
.denuncia_menu_derecha {
  background-color: var(--colorFondoCiudadano2);
  width: 70%;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  gap: 2rem;
}

.denuncia_menu_derecha_titulo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.denuncia_menu_derecha_titulo h2 {
  background-color: var(--colorFondoCiudadano);
  border-radius: 0.7rem;
  height: 2.5rem;
  color: var(--colorTextoTarjeta);
  display: flex;
  align-items: center;
  width: 80%;
  display: flex;
  justify-content: center;
  font-size: 18px;
}


.denuncia_perfil {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.denuncia_perfil p {
  color: var(--colorTextoTarjeta);
}

.denuncia_div_info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
}

.item {
  width: calc(100% / 3 - 10px);
  margin: 5px;
  background-color: var(--colorFondoTarjeta);
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 0.7rem;
}

.item:nth-child(4),
.item:nth-child(5) {
  width: calc(50% - 10px);
}

.item input {
  background-color: var(--colorFondoTarjeta);
  color: var(--colorBlanco);
  border: none;
  border-bottom: 1px solid var(--colorBlanco);
  outline: none;
  width: calc(100% - 3rem);
  box-sizing: border-box;
}

.denuncia_div_descripcion {
  display: flex;
  background-color: var(--colorFondoTarjeta);
  width: 100%;
  height: 20rem;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  padding-top: 0;
  border-radius: 0.7rem;
}

.denuncia_div_descripcion_titulo {
  display: flex;
  width: 100%;
  height: 3rem;
  align-items: center;
}

.denuncia_icono {
  width: 2rem;
  height: 1rem;
  fill: var(--colorBlanco);
}

.denuncia_descripcion_contenido {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  resize: none;
  box-sizing: border-box;
  padding: 10px;
  background-color: var(--colorTituloTarjetaPoliciaRango);
  color: var(--colorTextoTarjeta);
  outline: none;
  border-radius: 0.7rem;
}

.denuncia_descripcion_contenido::-webkit-scrollbar {
  width: 8px;
}

.denuncia_descripcion_contenido::-webkit-scrollbar-track {
  background-color: var(--colorTituloTarjetaPoliciaRango);
}

.denuncia_descripcion_contenido::-webkit-scrollbar-thumb {
  background-color: var(--colorBlanco);
  border-radius: 4px;
}

.denuncia_descripcion_contenido::-webkit-scrollbar-thumb:hover {
  background-color: var(--colorFondoCiudadano);
}
</style>
