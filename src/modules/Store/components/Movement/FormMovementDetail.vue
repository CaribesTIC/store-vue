<script setup lang="ts">
import { ref, toRaw, inject } from "vue"

import useFormMovementDetail from "../../composables/Movement/useFormMovementDetail";
// import type { RadioOption } from "@/types/RadioOption";
import TableSearchDetail from "./TableSearchDetail.vue"
import type { Movement } from "../../types/Movement";
//import type { MovementDetail } from '../../types/Movement/MovementDetail';

const myform: {
  movement: Movement,
  movement_details: MovementDetail
} = inject('form')

const props = defineProps<{
  movement_detail: MovementDetail
  // saleTypeOptions: RadioOption[]
  // statusOptions: RadioOption[]
}>()

const selectedPresentations = ref([])

type Payload = { id: number; quantity: number }

const emits = defineEmits<{
  (e: 'submitMovementDetail', form: Payload[]): void
}>()

const submitMovementDetail = async () => {
  //const result = await v$.value.$validate();
  //if (result) {
    emits("submitMovementDetail", toRaw(selectedPresentations.value) as Payload[]);
  //}
}

const selectPresentation = (presentation) => {
  const indexFound = selectedPresentations.value.findIndex((i)=> i.id === presentation.id);
  (indexFound===-1) 
    ? selectedPresentations.value.push(presentation)
    : selectedPresentations.value.splice(indexFound,1);
}

const qtyPresentation = (presentation) => {
  const indexFound = selectedPresentations.value.findIndex((i)=> i.id === presentation.id);
  if (indexFound===-1) { return; } 
  selectedPresentations.value[indexFound].quantity = presentation.qty 
}
submitMovementDetail()
</script>

<template>
  <div class="overflow-x-auto demo-tab">
    <TableSearchDetail
       :selectedPresentations="selectedPresentations"
       @selectPresentation="selectPresentation"
       @qtyPresentation="qtyPresentation"
     />
    <form @submit.prevent="submitMovementDetail"> 
      <!-- div class="p-5 grid lg:grid-cols-2 gap-4"></div -->
      <!--div class="block flex justify-start ml-4">
        <AppBtn
          type="submit"                 
          data-testid="submit-btn"
          class="btn btn-primary"
          text="Add"
        />        
      </div--> 
    </form>    
  </div>
</template>
