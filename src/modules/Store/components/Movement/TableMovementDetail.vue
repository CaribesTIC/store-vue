<script setup lang="ts">
import { inject } from "vue"
import type { Movement } from "../../types/Movement";

const { movement: { details } }: {
  movement: Movement
} = inject('movement');
</script>

<template>
  <div class="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
    <table id="id_tab_presentacion" class="w-full text-sm text-left text-gray-500 dark:text-gray-400" width="100%">
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
        <tr>          
          <th class="px-6 py-3 bg-gray-50 bg-base-200 text-center">CÓDIGO INTERNO</th>
          <th class="px-6 py-3 text-center text-center">NOMBRE DEL ARTÍCULO</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200 text-center">Cantidad</th>
        </tr>
      </thead>
      <tbody>      
        <tr v-for="detail in details" :key="detail.id">
          <td class="px-6 py-3 bg-gray-50 bg-base-200">
            {{detail.int_cod}}
          </td>
          <td class="px-6 py-3 text-right">
            {{detail.name}}

          </td>        
          <td class="px-6 py-3 bg-gray-50 bg-base-200 text-right">
            {{detail.quantity}}
          </td>
        </tr>
      </tbody>
    </table>    
  </div>  
</template>
