<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import VueApexCharts from "vue3-apexcharts";
import AppPageHeader from "@/components/AppPageHeader.vue";
import { useDashboardStore } from "@/modules/Auth/stores/dashboard/dashboardStore";

const dashboardStore = useDashboardStore();

// Function to generate localization settings
const createLocalizationOptions = (locale = 'es') => {
  const locales = [
    {
      name: locale,
      options: {
        months: [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ],
        shortMonths: [
          'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
          'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
        ],
        days: [
          'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
        ],
        shortDays: [
          'Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'
        ],
        toolbar: {
          exportToSVG:   'Descargar SVG',
          exportToPNG:   'Descargar PNG',
          exportToCSV:   'Descargar CSV',
          menu:         'Menú',
          selection:    'Selección',
          selectionZoom: 'Acercar Selección',
          zoomIn:       'Acercar',
          zoomOut:      'Alejar',
          pan:          'Mover',
          reset:        'Reiniciar Zoom',
        }
      }
    }
  ];

  return {
    locales: locales,
    defaultLocale: locale,
  };
};

const chartColors = {
  bar: {
    ranges: [
      { from: 0, to: 20, color: "#EF4444" },
      { from: 21, to: 50, color: "#F59E0B" },
      { from: 51, color: "#10B981" },
    ],
  },
  pie: ["#3B82F6", "#6366F1", "#8B5CF6", "#EC4899"],
};

const loading = computed(() => dashboardStore.loading);
const filters = ref({
  timeRange: "30d",
  warehouse: "all",
});

const stockByProductSeries = computed(() => [
  {
    name: "Stock",
    data: dashboardStore.existences.map((item) => item.stock_current),
  },
]);

const stockByProductOptions = computed(() => ({
  chart: {
    type: "bar",
    height: 350,
    toolbar: { show: true },  ...createLocalizationOptions('es'),
  },
  plotOptions: {
    bar: {
      horizontal: false,
      barHeight: 100,
      distributed: true,
      dataLabels: {
        position: "top",
        formatter: function (val: number) {
          return val > 0 ? val.toString() : "";
        },
      },
    },
  },
  colors: chartColors.bar.ranges.map((r) => r.color),
  xaxis: {
    categories: dashboardStore.existences.map((item) => item.int_cod), // Mostrar solo el código en el eje X
    title: { text: "Código de Producto" },
    labels: {
      rotate: -45, // Rotar las etiquetas para mejor legibilidad
    },
  },
  yaxis: {
    title: { text: "Unidades" },
  },
  tooltip: {
    y: { formatter: (val: number) => `${val} Unidades` },
    x: {
      formatter: function (val: string, opts: any) {
        const item = dashboardStore.existences[opts.dataPointIndex];
        return `${item.int_cod} - ${item.name}`; // Mostrar el código y nombre en el tooltip
      },
    },
  },
}));

const categoryDistributionSeries = computed(() =>
  dashboardStore.categoryDistributionData.map((c) => c.total_value)
);
const categoryDistributionOptions = computed(() => ({
  chart: { type: "pie", toolbar: { show: false },...createLocalizationOptions('es'), },
  labels: dashboardStore.categoryDistributionData.map((c) => c.category_name),
  colors: chartColors.pie,
  responsive: [
    {
      breakpoint: 480,
      options: { chart: { width: 200 }, legend: { position: "bottom" } },
    },
  ],
}));

const stockMovementSeries = computed(() =>
  dashboardStore.stockMovementsData.map((item) => ({
    name: item.series_name,
    data: [item.inputs, item.outputs],
  }))
);

const stockMovementOptions = computed(() => ({
  chart: {
    height: 350,
    type: "line",
    zoom: { enabled: false },
    toolbar: { show: false },...createLocalizationOptions('es'),
  },
  stroke: { curve: "straight" },
  xaxis: {
    categories: dashboardStore.stockMovementsData.map((item) => item.month),
    title: { text: "Mes" },
  },
  yaxis: {
    title: { text: "Unidades" },
  },
}));

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("es-ES", options);
};

const exportLowStock = () => {
  const csvContent = [
    "Producto,Stock Actual,Stock Mínimo,Última Entrada",
    ...dashboardStore.lowStockItems.map(
      (item) =>
        `${item.name},${item.stock_current},${item.stock_min},${formatDate(
          item.last_entry
        )}`
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "bajo_stock.csv";
  link.click();
};

onMounted(async () => {
  await dashboardStore.fetchExistences();
  await dashboardStore.fetchCategoryDistribution();
  await dashboardStore.fetchStockMovements();
  await dashboardStore.fetchLowStockItems();
  await dashboardStore.fetchWarehouses();
});

const kpis = computed(() => ({
  totalInventory: dashboardStore.existences.reduce((sum, item) => {
    return sum + Number(item.stock_current);
  }, 0),
  lowStockItems: dashboardStore.lowStockItems.length,
  nearExpiry: 3,
}));
</script>

<template>
  <div class="p-4 sm:p-6">
    <AppPageHeader> Panel de Control de Inventario </AppPageHeader>

    <!-- KPIs -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-blue-50 p-4 rounded-lg">
        <h3 class="text-sm text-blue-600 font-medium">Inventario Total</h3>
        <p class="text-2xl font-semibold mt-2">
          {{ kpis.totalInventory }} Unidades
        </p>
      </div>
      <div class="bg-orange-50 p-4 rounded-lg">
        <h3 class="text-sm text-orange-600 font-medium">
          Artículos con Bajo Stock
        </h3>
        <p class="text-2xl font-semibold mt-2">{{ kpis.lowStockItems }}</p>
      </div>
      <div class="bg-red-50 p-4 rounded-lg">
        <h3 class="text-sm text-red-600 font-medium">Próximos a Vencer</h3>
        <p class="text-2xl font-semibold mt-2">{{ kpis.nearExpiry }}</p>
      </div>
    </div>

    <!-- Gráficos -->
    <div v-if="loading" class="animate-pulse space-y-6">
      <div class="h-64 bg-gray-200 rounded"></div>
      <div class="h-64 bg-gray-200 rounded"></div>
      <div class="h-64 bg-gray-200 rounded"></div>
    </div>

    <div v-else class="space-y-6">
      <!-- Gráfico de Barras Verticales -->
      <div class="bg-white shadow rounded-lg p-4">
        <h2 class="text-lg font-medium mb-2">Nivel de Stock por Producto</h2>
        <VueApexCharts
          type="bar"
          :series="stockByProductSeries"
          :options="stockByProductOptions"
        />
      </div>

      <!-- Gráficos adicionales -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <!-- Gráfico de Torta -->
        <div class="bg-white shadow rounded-lg p-4">
          <h2 class="text-lg font-medium mb-2">Distribución de Categorías</h2>
          <VueApexCharts
            type="pie"
            :series="categoryDistributionSeries"
            :options="categoryDistributionOptions"
          />
        </div>

        <!-- Gráfico de Línea -->
        <div class="bg-white shadow rounded-lg p-4">
          <h2 class="text-lg font-medium mb-2">Movimiento de Stock</h2>
          <VueApexCharts
            type="line"
            :series="stockMovementSeries"
            :options="stockMovementOptions"
          />
        </div>
      </div>
    </div>

    <!-- Tabla de Bajo Stock -->
    <div class="mt-6 bg-white shadow rounded-lg p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-medium">Artículos con Bajo Stock</h2>
        <button
          @click="exportLowStock"
          class="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-sm"
        >
          Exportar CSV
        </button>
      </div>

      <table class="w-full">
        <thead>
          <tr class="text-left border-b text-sm">
            <th class="pb-2">Producto</th>
            <th class="pb-2">Stock Actual</th>
            <th class="pb-2">Stock Mínimo</th>
            <th class="pb-2">Última Entrada</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in dashboardStore.lowStockItems"
            :key="item.article_id"
            class="border-b hover:bg-gray-50 text-sm"
            :class="{ 'bg-red-50': item.stock_current < item.stock_min * 0.5 }"
          >
            <td class="py-3">
              <AppLink
                :to="`/products/edit/${item.article_id}`"
                class="text-blue-600 hover:underline"
              >
                {{ item.name }}
              </AppLink>
            </td>
            <td class="py-3">{{ item.stock_current }}</td>
            <td class="py-3">{{ item.stock_min }}</td>
            <td class="py-3">{{ formatDate(item.last_entry) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Estilos adicionales para mejorar la accesibilidad */
.chart-container .apexcharts-tooltip {
  @apply bg-white shadow-lg rounded border border-gray-200;
}
.apexcharts-menu-item:hover {
  @apply bg-gray-100;
}
</style>
