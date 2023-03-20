<script setup lang="ts">
import { inject, reactive, ref } from "vue"
import ModalPacking from './ModalPacking.vue'
import useFormPresentation from "../../composables/Product/useFormPresentation";
import type { Ref } from "vue"
import type { RadioOption } from "@/types/RadioOption";
import type { Presentation } from "../../types/Presentation";

const props = defineProps<{
  presentation: Presentation
  saleTypeOptions: RadioOption[]
  statusOptions: RadioOption[]
}>()

const {
  form,
  isOpenModal,

  acceptModal
} = useFormPresentation(props.presentation)

const emits = defineEmits<{
  (e: 'submit', form: Presentation): void
}>()

const { measureUnit } = inject<{
    measureUnit: Ref<string>;
}>('measureUnit')

const submit = async () => {
  emits("submit", form);
};
</script>

<template>
  <div>
    <form @submit.prevent="submit">
      <div class="p-5 grid lg:grid-cols-2 gap-4">    
        <div class="block">  
          <label>Tipo de Venta</label><br/>
          <AppRadioGroup
            v-model="form.sale_type"
            name="sale_type"
            :options="props.saleTypeOptions"
          />
        </div>      
        <div class="block">
          <AppTextarea
            label="Empaque"
            v-model="form.packing_deployed"                
            @focus="isOpenModal = !isOpenModal"                
            readonly
          />
          <AppInput
            v-model="form.packing_json"          
            type="hidden"          
          />                        
        </div>      
        <div class="block">
          <AppInput
            label="Código Interno"
            v-model="form.int_cod"                     
            type="text"
          />
        </div>      
        <div class="block">
          <AppInput
            label="Código de Barra"
            v-model="form.bar_cod"                     
            type="text"
          />
        </div>      
        <div class="block">
          <AppInput
            label="Stock Mínimo"
            v-model="form.stock_min"                     
            type="number"
          />
        </div>      
        <div class="block">        
          <AppInput
            label="Stock Máximo"
            v-model="form.stock_max"                     
            type="number"
          />
        </div>      
        <div class="block"> 
          <AppInput
            label="Precio"
            v-model="form.price"                     
            type="text"
          />
        </div>      
        <div class="block">             
          <AppRadioGroup
            v-model="form.status"
            name="status"
            :options="props.statusOptions"
          />
        </div>
      </div>
      <div class="block">
        <AppBtn
          type="submit"                 
          data-testid="submit-btn"
          class="btn btn-primary"
          text="Agregar"
        />
        <!--button 
          id="addReg"
          type="button"
          class="btn btn-primary"
          onClick="Product.Presentation.valEnvio();"
        >Agregar</button-->
      </div> 
    </form>
    <ModalPacking
      v-if="isOpenModal"
      :measureUnit="measureUnit"
      @closeModal="isOpenModal = false"
      @acceptModal="acceptModal"
    />
  </div>
</template>
