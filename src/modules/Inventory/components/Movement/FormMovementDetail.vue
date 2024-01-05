<script setup lang="ts">
import { toRaw } from "vue"
import useFormMovementDetail from "../../composables/Movement/useFormMovementDetail";
// import type { RadioOption } from "@/types/RadioOption";
import type { MovementDetail } from "../../types/Inventory/MovementDetail";

const props = defineProps<{
  movement_detail: MovementDetail
  // saleTypeOptions: RadioOption[]
  // statusOptions: RadioOption[]
}>()



const emits = defineEmits<{
  (e: 'submitMovementDetail', form: MovementDetail): void
}>()

const submitMovementDetail = async () => {
  const result = await v$.value.$validate();
  if (result) {
    emits("submitMovementDetail", toRaw(form));
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="submitMovementDetail"> 
      <div class="p-5 grid lg:grid-cols-2 gap-4">

          
            
            
            
            
            
            

          <!--label>Tipo de Venta</label><br/>
          <AppRadioGroup
            v-model="form.status"
            name="status"
            :options="props.statusOptions"
            :error="v$.status.$error ? v$.status.$errors[0].$message : null"           
          /-->    
      
      </div>
      <div class="block flex justify-center">
        <AppBtn
          type="submit"                 
          data-testid="submit-btn"
          class="btn btn-primary"
          text="Guardar"
        />        
      </div> 
    </form>    
  </div>
</template>
