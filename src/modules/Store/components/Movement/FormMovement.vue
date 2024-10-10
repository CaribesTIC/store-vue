<script setup lang="ts">
import { ref, inject, toRaw } from 'vue'
import FormMovementMain from '../../components/Movement/FormMovementMain.vue';
import FormMovementDetail from '../../components/Movement/FormMovementDetail.vue';
import TableMovementDetail from '../../components/Movement/TableMovementDetail.vue'
import useMovementDetail from '../../composables/Movement/useMovementDetail'
import type { Movement } from "../../types/Movement";

const { movement: { main, details } }: {
  movement: Movement
} = inject('movement');

const props = defineProps<{
  errors?: String | Object
  pending: Boolean  
}>()

const emits = defineEmits<{//Movement
  (e: 'submit'): void
}>()

const {
    panelOpened,
    closeButtonOpened,
    closeClassOpened,

    panelToogleMovementDetail
} = useMovementDetail()

const submit = async () => {
  emits("submit");
};

const componentKey = ref(0);
</script>

<template>
  <div class="m-5">

    <AppFlashMessage :error="errors"/>

    <form @submit.prevent="submit">

      <FormMovementMain />

      <div class="grid justify-items-stretch mt-2">

        <div>
          <AppBtn
            class="btn p-8 justify-self-start m-1"
            type="button"                 
            data-testid="click-btn"
            :class="closeClassOpened"
            :text="`${closeButtonOpened}`"
            @click="panelToogleMovementDetail"
          />

          <AppBtn v-if="panelOpened"
            class="btn btn-primary p-8 justify-self-end m-1"
            type="button"                 
            data-testid="click-btn"
            :text="'Aceptar'"
            @click="panelOpened=false"
          />
        </div>

        <FormMovementDetail
          v-if="panelOpened"
          class="bg-base-200 py-4 mt-2 rounded"
        />

        <TableMovementDetail
          :key="componentKey"
          v-if="details"            
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
