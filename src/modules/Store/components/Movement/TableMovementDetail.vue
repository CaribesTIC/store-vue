<script setup lang="ts">
import { toRaw, ref } from "vue"
//import MovementDetailService from "@/modules/Inventory/services/MovementDetail"
import type { MovementDetail } from "../../types/Movement/MovementDetail";

const props = defineProps<{ movement_details: MovementDetail[] }>()

const emits = defineEmits<{
  (e: 'editMovementDetail', movement_detailId: object): void
  (e: 'removeMovementDetail', movement_detailId: string): void
  (e: 'getMovementDetails' ): void
}>()

const editMovementDetail =  (movement_detail: object) => {
  emits("editMovementDetail", toRaw(movement_detail))
};

const removeMovementDetail =  (movement_detailId: string) => {
  emits("removeMovementDetail", movement_detailId)
};

const movement_detailId = ref("")

</script>

<template>
  <div class="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
    <table id="id_tab_presentacion" class="w-full text-sm text-left text-gray-500 dark:text-gray-400" width="100%">
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
        <tr>
          
          <th class="px-6 py-3 bg-gray-50 bg-base-200">movement_id / movement_detail_id</th>
          <th class="px-6 py-3">article_id</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200">quantity</th>
          <!--th class="px-6 py-3 bg-gray-50 bg-base-200">close</th>
          <th class="px-6 py-3 ">user_insert_id</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200">user_update_id</th-->
          <th class="px-6 py-3">Acción(es)</th>
        </tr>
      </thead>
      <tbody>      
        <tr v-for="movement_detail in props.movement_details" :key="movement_detail.id">
          <td class="px-6 py-3 bg-gray-50 bg-base-200">
            {{movement_detail.movement_id}} / {{movement_detail.id}}
          </td>
          <td class="px-6 py-3">
            {{movement_detail.article_id}}
          </td>        
          <td class="px-6 py-3 bg-gray-50 bg-base-200">
            {{movement_detail.quantity}}
          </td> 
          <td class="px-6 py-3">
            <div class="flex items-center space-x-1">
             <AppBtn
                class="btn btn-primary btn-xs"                    
                @click="editMovementDetail(movement_detail)"
              >
                Editar
              </AppBtn>
              <AppBtn
                @click="removeMovementDetail(movement_detail.id)"                    
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
