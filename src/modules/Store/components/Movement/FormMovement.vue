<script setup lang="ts">
import { ref, reactive, inject, toRaw } from 'vue'

import FormMovementMain from '../../components/Movement/FormMovementMain.vue';
import FormMovementDetail from '../../components/Movement/FormMovementDetail.vue';
import TableMovementDetail from '../../components/Movement/TableMovementDetail.vue'
//import useFormMovement from "../../composables/Movement/useFormMovement";
import useTabMovementDetail from '../../composables/Movement/useTabMovementDetail'
//import type { Movement } from "../../types/Movement";
//import type { MovementDetail } from '../../types/Movement/MovementDetail';


const { movement: { main, details } }: {
  movement: any //Movement
} = inject('movement');

const props = defineProps<{
  errors?: String | Object
  pending: Boolean  
}>()

//const emits = defineEmits<{//Movement
//  (e: 'submit', form: any): void
//}>()

const {
    panelOpened,
    closeButtonOpened,
    closeClassOpened,  
    movement_details,
    movement_detail,
  

    getDetails,
    removeDetail,  
    submitMovementDetail,
    panelToogleMovementDetail
  } = useTabMovementDetail(main.id)



const submit = async () => {  

  console.log({ movement: { main: toRaw(main), details: toRaw(details) } })
  //const result = await v$.value.$validate();
  //if (result) {
    // emits("submit", form);
  //}
};

const componentKey = ref(0);


</script>

<template>
<div class="m-5">
  <AppFlashMessage :error="errors"/>
  <form @submit.prevent="submit">
    <FormMovementMain />
    <!-- div class="grid justify-items-stretch mx-5"-->
    <div class="grid justify-items-stretch mt-2">
      <div>
        <AppBtn
          class="btn p-8 justify-self-start m-1"
          type="text"                 
          data-testid="click-btn"
          :class="closeClassOpened"
          :text="`${closeButtonOpened}`"
          @click="panelToogleMovementDetail"
        />
        <AppBtn v-if="panelOpened"
          class="btn btn-primary p-8 justify-self-end m-1"
          type="text"                 
          data-testid="click-btn"
          :text="'Aceptar'"
          @click="panelOpened=false"
        />
      </div>

        <FormMovementDetail
          v-if="panelOpened"
          class="bg-base-200 py-4 mt-2 rounded"
          @submitMovementDetail="submitMovementDetail"
        />
        <TableMovementDetail
          :key="componentKey"
          v-if="details"
          @getDetails="getDetails"
          @removeDetail="removeDetail"            
        />
      </div>
      <AppBtn
        class="btn btn-primary mt-5 justify-self-start"
          type="submit"
          :text="pending ? 'Guardando...' : 'Guardar'"
          :isDisabled='pending'
          @submit="submit()"    
      />
  </form>
</div>
</template>

<style>


[data-theme="winter"] .dp-custom{
  @apply bg-gray-100 text-gray-900 py-2.5;
}

[data-theme="night"] .dp-custom {
  @apply bg-gray-900 text-gray-100 py-2.5;
}

</style>