<script setup lang="ts">
import { toRaw, ref } from "vue"
import ModalImage from './ModalImage.vue'
import PresentationService from "@/modules/Product/services/PresentationService"
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

const imageUpload = (id: string) => {
  presentationId.value=id.toString()
  isOpenModal.value = true
}
const isOpenModal = ref(false)
const presentationId = ref("")

const acceptModal= (f) => {
  
  console.log(f)
  alert("subir imagen")
  uploadFile(f)
}

const uploadFile = (file) => {
  //const payload = {};
  
  console.log(file.files)
  
  const formData = new FormData();
  formData.append("file", file.files.preview);
  //payload.file = formData;
  //payload.endpoint = this.endpoint;
  //this.clearMessage();
  PresentationService.uploadFilePresentation(formData, presentationId.value)
  .then(() => {
    //this.message = "File uploaded.";
    //this.$emit("fileUploaded");
  })
  .catch((error) => (this.error = getError(error)));
}

const imgPath = (presentationId) => `http://127.0.0.1:8000/storage/Product/presentations/presentation-${presentationId}`

</script>

<template>
  <div class="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
    <table id="id_tab_presentacion" class="w-full text-sm text-left text-gray-500 dark:text-gray-400" width="100%">
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
        <tr>
          <th class="px-6 py-3 bg-gray-50 bg-base-200">Imagen</th>
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
          <td class="px-6 py-3 bg-gray-50 bg-base-200">
            <AppBtn
                class="btn btn-success btn-xs"                    
                @click="imageUpload(presentation.id)"
              >
                Imagen
            </AppBtn>
            
            <img :src=imgPath(presentation.id)>
            
          </td>               
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
      :presentationId="presentationId"
      @closeModal="isOpenModal = false"
      @acceptModal="acceptModal"
    />
  </div>  
</template>
