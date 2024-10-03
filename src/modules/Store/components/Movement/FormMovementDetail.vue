<script setup lang="ts">
import { ref, toRaw, inject } from "vue"

import useFormMovementDetail from "../../composables/Movement/useFormMovementDetail";
import TableSearchDetail from "./TableSearchDetail.vue"
//import type { Movement } from "../../types/Movement";
import type { MovementDetail } from '../../types/Movement/MovementDetail';

type Payload = { id: number; quantity: number }

const { movement: { details } }: {
  movement: any //Movement
} = inject('movement');


const emits = defineEmits<{
  (e: 'submitMovementDetail', payload: MovementDetail[]): void
}>()

const selectPresentation = (presentation) => {
  const indexFound = details.findIndex((i)=> i.id === presentation.id);
  (indexFound===-1) 
    ? details.push(presentation)
    : details.splice(indexFound,1);
}

const qtyPresentation = (presentation) => {
  const indexFound = details.findIndex((i)=> i.id === presentation.id);
  if (indexFound===-1) { return; } 
  details[indexFound].quantity = presentation.qty 
}
</script>

<template>
  <div class="overflow-x-auto demo-tab">
    <TableSearchDetail
       :selectedPresentations="details"
       @selectPresentation="selectPresentation"
       @qtyPresentation="qtyPresentation"
     />      
  </div>
</template>
