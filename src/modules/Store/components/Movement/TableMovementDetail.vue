<script setup lang="ts">
import { toRaw, ref, inject } from "vue"

//import MovementDetailService from "@/modules/Inventory/services/MovementDetail"
import type { MovementDetail } from "../../types/Movement/MovementDetail";

//const props = defineProps<{ movement_details: MovementDetail[] }>()

const { movement: { details } }: {
  movement: any //Movement
} = inject('movement');

const emits = defineEmits<{
  (e: 'removeDetail', detailId: string): void
  (e: 'getDetails' ): void
}>()

const removeDetail =  (detailId: string) => {
  emits("removeDetail", detailId)
};
</script>

<template>
  <div class="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
    <table id="id_tab_presentacion" class="w-full text-sm text-left text-gray-500 dark:text-gray-400" width="100%">
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
        <tr>
          
          <th class="px-6 py-3 bg-gray-50 bg-base-200 text-center">CÓDIGO INTERNO</th>
          <th class="px-6 py-3 text-center text-center">NOMBRE DEL ARTÍCULO</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200 text-center">Cantidad</th>
          <!--th class="px-6 py-3 bg-gray-50 bg-base-200">close</th>
          <th class="px-6 py-3 ">user_insert_id</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200">user_update_id</th-->
          <!--th class="px-6 py-3 text-center">Acción(es)</th-->
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
          <!--td class="px-6 py-3">
            <div class="flex items-center space-x-1 justify-center">
              <AppBtn
                @click="removeDetail(detail.id)"                    
                class="btn btn-danger btn-xs"                    
              >
                Eliminar
              </AppBtn>
            </div>
          </td-->

        </tr>
      </tbody>
    </table>    
  </div>  
</template>
