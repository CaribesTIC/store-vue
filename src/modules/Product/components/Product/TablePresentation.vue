<script setup lang="ts">
import { toRaw, ref } from "vue"
import ModalImage from './ModalImage.vue'
import type { Presentation } from "../../types/Presentation";

const props = defineProps<{ presentations: Presentation[] }>()

const emits = defineEmits<{
  (e: 'edit', presentationId: object): void
  (e: 'remove', presentationId: string): void
}>()

const edit =  (presentation: object) => {
  emits("edit", toRaw(presentation))
};

const remove =  (presentationId: string) => {
  emits("remove", presentationId)
};

const imageUpload = (presentationId: string) => {
  isOpenModal.value = true
}
const isOpenModal = ref(false)

const acceptModal= (files) => {
  console.log(files)
  alert("subir imagen")
}
</script>

<template>
  <div class="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
    <table id="id_tab_presentacion" class="w-full text-sm text-left text-gray-500 dark:text-gray-400" width="100%">
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
        <tr>       
          <th class="px-6 py-3 bg-gray-50 bg-base-200">IntCod</th>           
          <th class="px-6 py-3">BarCod</th>        
          <th class="px-6 py-3 bg-gray-50 bg-base-200">Empaque</th>
          <th class="px-6 py-3">Precio</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200">StockMin</th>
          <th class="px-6 py-3">StockMax</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200">Estatus</th>                  
          <th class="px-6 py-3">Acción(es)</th>
        </tr>
      </thead>
      <tbody>      
        <tr v-for="presentation in props.presentations" :key="presentation.id">                
          <td class="px-6 py-3 bg-gray-50 bg-base-200">{{presentation.bar_cod}}</td>
          <td class="px-6 py-3">{{presentation.int_cod}}</td>
          <td class="px-6 py-3 bg-gray-50 bg-base-200" :id='presentation.packing'>{{presentation.packing_deployed}}</td>
          <td class="px-6 py-3 text-right">{{presentation.price}}</td>
          <td class="px-6 py-3 bg-gray-50 bg-base-200 text-right">{{presentation.stock_min}}</td>
          <td class="px-6 py-3 text-right">{{presentation.stock_max}}</td>
          <td class="px-6 py-3 bg-gray-50 bg-base-200">{{presentation.status}}</td>
          <td class="px-6 py-3">
            <div class="flex items-center space-x-1">
             <AppBtn
                class="btn btn-primary btn-xs"                    
                @click="edit(presentation)"
              >
                Editar
              </AppBtn>
              <AppBtn
                class="btn btn-success btn-xs"                    
                @click="imageUpload(presentation.id)"
              >
                Imagen
              </AppBtn>
              <AppBtn
                @click="remove(presentation.id)"                    
                class="btn btn-danger btn-xs"                    
              >
                Eliminar
              </AppBtn>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <ModalImage
      v-if="isOpenModal"
      @closeModal="isOpenModal = false"
      @acceptModal="acceptModal"
    />
  </div>  
</template>
