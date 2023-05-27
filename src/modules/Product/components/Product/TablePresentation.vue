<script setup lang="ts">
  const props = defineProps<{ presentations: [] }>()
</script>

<template>
  <div class="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
    <table id="id_tab_presentacion" class="w-full text-sm text-left text-gray-500 dark:text-gray-400" width="100%">
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
        <tr>       
          <th class="px-6 py-3 bg-gray-50 bg-base-200">IntCod</th>           
          <th class="px-6 py-3">BarCod</th>        
          <th class="px-6 py-3 bg-gray-50 bg-base-200">Precio</th>
          <th class="px-6 py-3">StockMin</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200">StockMax</th>
          <th class="px-6 py-3">Estatus</th>                  
          <th class="px-6 py-3 bg-gray-50 bg-base-200">Acción(es)</th>
        </tr>
      </thead>
      <tbody>      
        <tr v-for="presentation in presentations" :key="presentation.id">                
          <td class="px-6 py-3 bg-gray-50 bg-base-200">{{presentation.bar_cod}}</td>
          <td class="px-6 py-3">{{presentation.int_cod}}</td>
          <td class="px-6 py-3 bg-gray-50 bg-base-200" :id='presentation.packing'>{{presentation.packing_deployed}}</td>
          <td class="px-6 py-3">{{presentation.stock_min}}</td>
          <td class="px-6 py-3 bg-gray-50 bg-base-200">{{presentation.stock_max}}</td>
          <td class="px-6 py-3">{{presentation.status}}</td>
          <td class="px-6 py-3 bg-gray-50 bg-base-200">
            <div class="flex items-center space-x-1">                
              <AppBtn
                class="btn btn-primary btn-xs"                    
                @click=""
              >
                Editar
              </AppBtn>
              <AppBtn
                @click=""                    
                class="btn btn-danger btn-xs"                    
              >
                Eliminar
              </AppBtn>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
