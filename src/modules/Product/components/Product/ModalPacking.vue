<script setup lang="ts">
import { inject } from "vue"
import type { Ref } from "vue"

import FormPacking from "./FormPacking.vue"
import usePacking from "../../composables/Product/usePacking"
import type { Packing } from "../../types/Packing"

const emits = defineEmits<{
  (e: 'closeModal'): void  
  (e: 'acceptModal', payload: Packing): void
}>()

const closeModal = () => {
  emits('closeModal')
}

const accept = async () => {  
  const result = await v$.value.$validate();  
  if (result) {  
    emits('acceptModal', {
      packing_description: form.packing_description,
      packing_json: form.packing_json
    })
    closeModal()    
  }
}

const { measureUnit } = inject<{
    measureUnit: Ref<string>;
}>('measureUnit')

const {
  form,
  labelOfquantity,

  add,
  remove,  
  v$
} = usePacking(measureUnit)
</script>

<template>
  <Teleport to="body">
    <Transition mode="in-out">
      <div class="modal transition duration-150 v-enter-active">
        <div class="modal-content rounded-lg shadow-xl bg-base-200">
          <span class="close" @click="closeModal">&times;</span>
          <h1 class="text-xl font-semibold mb-4">Empacar</h1>

          <FormPacking
            :labelOfquantity='labelOfquantity'
            @add='add'
            @remove='remove'
          />
          
          <AppTextarea
            label="Descripcción"
            v-model="form.packing_description"
            :error="v$.packing_description.$error ? v$.packing_description.$errors[0].$message : null"
            readonly
          />
               
          <AppInput
            v-model="form.packing_json"   
            type="hidden"
          />
          
          <div class="flex items-center justify-between mt-4">
            <AppBtn
              type="button"
              @click="accept"       
              data-testid="submit-btn"
              class="btn btn-primary"
              text="Aceptar"
            />
          </div> 
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal {  
  @apply fixed z-50 pt-28; 
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  
}

.modal-content {
  @apply m-auto w-4/5 sm:w-9/12 md:w-4/6 lg:w-3/6;
  padding: 20px;
  border: 1px solid #888;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.25s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translate3d(-10vw);
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
