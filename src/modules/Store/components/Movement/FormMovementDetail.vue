<script setup lang="ts">
import { toRaw, inject } from "vue"

import useFormMovementDetail from "../../composables/Movement/useFormMovementDetail";
// import type { RadioOption } from "@/types/RadioOption";
import TableSearchDetail from "./TableSearchDetail.vue"
import type { Movement } from "../../types/Movement";
import type { MovementDetail } from '../../types/Movement/MovementDetail';

const myform: {
  movement: Movement,
  movement_details: MovementDetail
} = inject('form')

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
  <div class="overflow-x-auto">
    <TableSearchDetail />
    <form @submit.prevent="submitMovementDetail"> 
      <!-- div class="p-5 grid lg:grid-cols-2 gap-4"></div -->
      <div class="block flex justify-start ml-4">
        <AppBtn
          type="submit"                 
          data-testid="submit-btn"
          class="btn btn-primary"
          text="Add"
        />        
      </div> 
    </form>    
  </div>
</template>
