<template>
    <div class="p-4">
        <div id="chart-container"
            class="relative h-96 overflow-hidden rounded-lg shadow-lg bg-gradient-to-br from-white to-gray-200"></div>
        <div class="botones">
            <BotonPaginaPrincipalComponente />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useListadoCiudadanos } from '@/stores/storeCiudadano';
import * as echarts from 'echarts';
import BotonPaginaPrincipalComponente from '../ComponentesGenerales/BotonPaginaPrincipalComponente.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const store = useListadoCiudadanos();
const { infoCiudadanosBusquedaCaptura, cargarDatosCiudadanosBusquedaCaptura } = store;
const searchQuery = ref('');
const filterField = ref('nombre');

const daysOfWeek = computed(() => [
    t('days.Mon'),
    t('days.Tue'),
    t('days.Wed'),
    t('days.Thu'),
    t('days.Fri'),
    t('days.Sat'),
    t('days.Sun')
]);

const ciudadanosPorDia = computed(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => infoCiudadanosBusquedaCaptura.filter((ciudadano: any) =>
        new Date(ciudadano.diaBusquedaCaptura).getDay() === days.indexOf(day) + 1
    ).length);
});

function fieldDisplayName(field: keyof { [key: string]: string }) {
    const names: { [key: string]: string } = {
        nombre: 'Nombre',
        apellidos: 'Apellidos',
        dni: 'DNI',
        genero: 'Género',
        nacionalidad: 'Nacionalidad',
        fechaNacimiento: 'Fecha de Nacimiento',
        isPeligroso: 'Peligroso'
    };
    return names[field] || field;
}

onMounted(() => {
    cargarDatosCiudadanosBusquedaCaptura().then(() => {
        const chartContainer = document.getElementById('chart-container');
        if (chartContainer) {
            const chart = echarts.init(chartContainer);

            const isMobile = window.innerWidth <= 768;
            const titleFontSize = isMobile ? 14 : 18;
            const subTitleFontSize = isMobile ? 10 : 12;

            const option = {
                title: {
                    text: t('graficaTraduccion.Title'),
                    subtext: t('graficaTraduccion.DisSemanal'),
                    left: 'center',
                    textStyle: {
                        fontSize: titleFontSize
                    },
                    subtextStyle: {
                        fontSize: subTitleFontSize
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: daysOfWeek.value,
                    axisTick: {
                        alignWithLabel: true
                    }
                },
                yAxis: {
                    type: 'value',
                    min: 0,
                    max: 14,
                    interval: 2,
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: [{
                    data: ciudadanosPorDia.value,
                    type: 'line',
                    smooth: true,
                    areaStyle: {}
                }]
            };
            chart.setOption(option);
            window.addEventListener('resize', () => {
                chart.resize();
            });
        }
    });
});
</script>

<style scoped>
.botones {
    display: flex;
    width: 100%;
    padding: 2rem;
    justify-content: center;
}

@media (max-width: 768px) {
    #chart-container {
        height: 16rem;
    }
}
</style>
