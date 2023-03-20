<script setup lang="ts">
import { inject, reactive, ref } from "vue"
import ModalPacking from './ModalPacking.vue'
import useFormPresentation from "../../composables/Presentation"
import type { Ref } from "vue"
import type { RadioOption } from "@/types/RadioOption";
import type { Presentation } from "../../types/Presentation";
import type { Packing } from "../../types/Packing";

const props = defineProps<{
  presentation: Presentation
  saleTypeOptions: RadioOption[]
  statusOptions: RadioOption[]
}>()

const form = reactive<Presentation>({
  sale_type: props.presentation.sale_type,
  int_cod: props.presentation.int_cod,
  bar_cod: props.presentation.bar_cod,
  packing_deployed: props.presentation.packing_deployed,
  packing_json: props.presentation.packing_json,
  stock_min: props.presentation.stock_min,
  stock_max: props.presentation.stock_max,
  price: props.presentation.price,
  status: props.presentation.status
})

const emits = defineEmits<{
  (e: 'submit', form: Presentation): void
}>()

const isOpenModal = ref(false)

const { measureUnit } = inject<{
    measureUnit: Ref<string>;
}>('measureUnit')

const acceptModal = (payload: Packing) => {
  form.packing_deployed = payload.packing_description
  form.packing_json = payload.packing_json
}

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
