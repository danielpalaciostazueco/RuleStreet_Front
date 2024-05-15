<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useListadoCodigoPenal } from '@/stores/storeCodigoPenal';

export default defineComponent({
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:visible'],
    setup(props, { emit }) {
        const newMulta = ref({
            descripcion: '',
            monto: 0
        });

        const { cargarDatosCodigoPenal, infoCodigoPenal, cargarDatosCodigoPenalId } = useListadoCodigoPenal();
        const articuloSeleccionado = ref({
            articulo: '',
            descripcion: '',
            precio: 0,
            sentencia: ''
        });
        const filtro = ref('');

        onMounted(async () => {
            await cargarDatosCodigoPenal();
        });

        const close = () => {
            newMulta.value = { descripcion: '', monto: 0 };
            articuloSeleccionado.value = { articulo: '', descripcion: '', precio: 0, sentencia: '' };
            filtro.value = ''; 
            emit('update:visible', false);
        };

        const guardarId = async (id: number) => {
            const response = await cargarDatosCodigoPenalId(id);
            if (response) {
                articuloSeleccionado.value = response;
            }
        };

        const articulosFiltrados = computed(() => {
            return infoCodigoPenal.filter(item =>
                item.descripcion.toLowerCase().includes(filtro.value.toLowerCase())
            );
        });

        return {
            newMulta,
            infoCodigoPenal,
            articulosFiltrados,
            submitMulta: close,
            close,
            guardarId,
            articuloSeleccionado,
            filtro
        };
    }
});
</script>
<template>
  <div v-if="visible" class="fixed w-full h-full bg-[color:var(--colorFondoPantallaModal)] flex justify-center items-center left-0 top-0" @click.self="close">
      <div class="w-[90%] h-[90%] md:w-[70%] md:h-[50rem] flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-5 rounded-[10px] bg-[color:var(--colorFondoModal)]">
          <div class="flex w-full md:w-3/5 flex-col gap-4 md:gap-8">
              <div class="w-full">
                  <h1 class="bg-[color:var(--colorTituloModal)] flex items-center h-12 md:h-16 justify-center text-[color:var(--colorBlanco)] rounded-[0.7rem]">CODIGO PENAL</h1>
              </div>
              <div>
                  <input class="w-full h-8 md:h-10 bg-[color:var(--colorNegro)] text-[color:var(--colorBlanco)] pl-4 md:pl-8 rounded-[0.7rem] border-[none] outline-none" type="text" v-model="filtro" placeholder="Buscar en el código criminal...">
              </div>
              <div class="overflow-y-auto">
                  <table class="w-full border-collapse">
                      <thead>
                          <tr class="bg-[color:var(--colorNegro)] text-[color:var(--colorBlanco)]">
                              <th class="p-2 md:p-3">ARTICULO</th>
                              <th class="p-2 md:p-3">DESCRIPCIÓN</th>
                              <th class="p-2 md:p-3">CANTIDAD</th>
                              <th class="p-2 md:p-3">SENTENCIA</th>
                              <th class="p-2 md:p-3">Añadir</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="item in articulosFiltrados" :key="item.idCodigoPenal" class="bg-[color:var(--colorFondoTablaModal)] text-[color:var(--colorTextoTarjeta)] hover:bg-gray-200">
                              <td class="p-2 md:p-3">{{ item.articulo }}</td>
                              <td class="p-2 md:p-3">{{ item.descripcion }}</td>
                              <td class="p-2 md:p-3">{{ item.precio }}</td>
                              <td class="p-2 md:p-3">{{ item.sentencia }}</td>
                              <td class="p-2 md:p-3 cursor-pointer" @click="guardarId(item.idCodigoPenal)">Añadir</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
          <div class="flex w-full md:w-2/5 flex-col gap-4 md:gap-8 mt-4 md:mt-0">
              <div class="w-full">
                  <h1 class="bg-[color:var(--colorTituloModal)] flex items-center h-12 md:h-16 justify-center text-[color:var(--colorBlanco)] rounded-[0.7rem]">MAS</h1>
              </div>
              <div class="bg-[color:var(--colorFondoTablaModal)] h-full flex flex-col gap-4 md:gap-8 justify-between p-4 md:p-8">
                  <div class="flex flex-col gap-4 md:gap-8">
                      <p class="text-[color:var(--colorTextoTarjeta)]">CONCEPTO DE MULTA</p>
                      <div class="flex justify-between bg-[color:var(--colorTarjetaModal)] border border-[color:var(--colorBlanco)] w-full h-10 md:h-12 items-center px-2 md:px-4 rounded-[0.2rem] border-solid" v-if="articuloSeleccionado.articulo">
                          <div class="flex gap-2 md:gap-4">
                              <p>{{ articuloSeleccionado.articulo }}</p>
                              <p>{{ articuloSeleccionado.sentencia }}</p>
                          </div>
                          <div>
                              <p>{{ articuloSeleccionado.precio }}€</p>
                          </div>
                      </div>
                  </div>
                  <div class="flex justify-center w-full">
                      <button class="w-20 md:w-24 h-8 md:h-10 bg-[color:var(--colorTarjetaModal)] text-[color:var(--colorTextoTarjeta)] border-[none] hover:cursor-pointer hover:text-[color:var(--colorBlanco)] hover:bg-[color:var(--colorFondoPantallaModal)]">Añadir</button>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<style scoped>
.modal_fondo {
  @apply fixed w-full h-full bg-[color:var(--colorFondoPantallaModal)] flex justify-center items-center left-0 top-0;
}

.modal_container {
  @apply w-[90%] h-[90%] md:w-[70%] md:h-[50rem] flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-5 rounded-[10px] bg-[color:var(--colorFondoModal)];
}

.modal_izquierda {
  @apply flex w-full md:w-3/5 flex-col gap-4 md:gap-8;
}

.modal_derecha {
  @apply flex w-full md:w-2/5 flex-col gap-4 md:gap-8 mt-4 md:mt-0;
}

.modal_titulo {
  @apply w-full;
}

.modal_titulo h1 {
  @apply bg-[color:var(--colorTituloModal)] flex items-center h-12 md:h-16 justify-center text-[color:var(--colorBlanco)] rounded-[0.7rem];
}

.model_buscador {
  @apply w-full h-8 md:h-10 bg-[color:var(--colorNegro)] text-[color:var(--colorBlanco)] pl-4 md:pl-8 rounded-[0.7rem] border-[none] outline-none;
}

.model_buscador::placeholder {
  @apply text-[color:var(--colorTextoTarjeta)];
}

.model_tabla {
  @apply w-full border-collapse;
}

.model_tabla th, .model_tabla td {
  @apply p-2 md:p-3 text-left;
}

.model_tabla th {
  @apply bg-[color:var(--colorNegro)] text-[color:var(--colorBlanco)];
}

.model_tabla tr:nth-child(even) {
  @apply bg-[color:var(--colorFondoTablaModal)];
}

.model_tabla tr:hover {
  @apply bg-gray-200;
}

@media (max-width: 768px) {
  .modal_container {
    @apply w-[90%] h-[90%] flex flex-col gap-4;
  }

  .modal_izquierda, .modal_derecha {
    @apply w-full;
  }

  .modal_derecha {
    @apply mt-4;
  }

  .model_tabla th, .model_tabla td {
    @apply text-sm p-2;
  }

  .model_buscador {
    @apply h-8;
  }

  .modal_derecha_container_tarjeta {
    @apply text-sm px-2;
  }

  .modal_boton {
    @apply w-20 h-8 text-sm;
  }
}

@media (max-width: 480px) {
  .modal_container {
    @apply w-[95%] h-[90%] flex flex-col gap-2 p-2;
  }

  .model_tabla {
    @apply block;
  }

  .model_tabla th, .model_tabla td {
    @apply block text-xs p-1;
  }

  .model_tabla tr {
    @apply flex flex-col mb-2;
  }

  .modal_derecha {
    @apply mt-4;
  }

  .model_buscador {
    @apply h-8;
  }

  .modal_derecha_container_tarjeta {
    @apply text-xs px-1;
  }

  .modal_boton {
    @apply w-16 h-6 text-xs;
  }
}
</style>
