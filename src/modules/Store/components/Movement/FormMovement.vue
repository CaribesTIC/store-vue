<script setup lang="ts">
import { ref, reactive, inject, toRaw } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import useFormMovement from "../../composables/Movement/useFormMovement";
import FormMovementDetail from '../../components/Movement/FormMovementDetail.vue';
import TableMovementDetail from '../../components/Movement/TableMovementDetail.vue'
import { useDark } from "@vueuse/core"

import useTabMovementDetail from '../../composables/Movement/useTabMovementDetail'

import type { Movement } from "../../types/Movement";
import type { MovementDetail } from '../../types/Movement/MovementDetail';

const myform: {
  movement: any //Movement
  //,movement_details: MovementDetail
} = inject('form')

const isDark = useDark({
  selector: 'body',
  attribute: 'data-theme',
  valueDark: 'night',
  valueLight: 'winter'
})

const props = defineProps<{
  errors?: String | Object
  pending: Boolean  
}>()

const emits = defineEmits<{//Movement
  (e: 'submit', form: any): void
}>()

const form = reactive({
  master: myform.movement.master,
  details: myform.movement.details
})

const {
    panelOpened,
    closeButtonOpened,
    closeClassOpened,  
    //movement_details,
    //movement_detail,  
    createMovementDetail,
    editMovementDetail,
    getMovementDetails,
    removeMovementDetail,  
    submitMovementDetail,
    panelToogleMovementDetail
} = useTabMovementDetail(props.id)

const {
  //form,
  errors,
  pending,

  v$
} = useFormMovement(myform.movement.master)

const submit = async () => {  
  //const result = await v$.value.$validate();
  //if (result) {
    emits("submit", form);
  //}
};

const componentKey = ref(0);


</script>

<template>
<div class="m-5">
  <AppFlashMessage :error="errors"/>
  <form @submit.prevent="submit">
    <div class="grid lg:grid-cols-2 gap-4">
      <div class="block">
        <label>Date & Time</label>
        <VueDatePicker
          v-model="form.master.date_time"
          :dark="isDark"
          :format="format"
          :max-date="new Date()"
          placeholder="Select Fecha del Pago"
          required
          utc
          :enable-time-picker="true"
          input-class-name="dp-custom"
          menu-class-name="dp-custom"
        ></VueDatePicker>
        <AppErrorMessage v-if="v$.date_time.$error" :id="`1-error`">{{ v$.date_time.$errors[0].$message }}</AppErrorMessage>
      </div>

      <div class="block">     
        <AppInput           
          v-model="form.master.number"
          label="Number"
          type="text"
          :error="v$.number.$error ? v$.number.$errors[0].$message : null"
        />
      </div>
        
      
      <div class="block">     
        <AppInput           
          v-model="form.master.subject"
          label="Subject"
          type="text"
          :error="v$.subject.$error ? v$.subject.$errors[0].$message : null"
        />
      </div>
        
      <div class="block">     
        <AppTextarea
          label="Description"
          v-model="form.master.description"
          :error="v$.description.$error ? v$.description.$errors[0].$message : null"
        />
      </div>
        
      <div class="block">
        <AppSelect
          :options="[{id: 1, name: 'Orden de Compra'}, {id: 2, name: 'Orden de Requicision'}]"
          v-model="form.master.support_type_id"
          label="Tipo de Soporte"
          :error="v$.support_type_id.$error ? v$.support_type_id.$errors[0].$message : null"
        />
      </div>   
      
      <div class="block">     
        <AppInput           
          v-model="form.master.support_number"
          label="SupportNumber"
          type="text"
          :error="v$.support_number.$error ? v$.support_number.$errors[0].$message : null"
        />
      </div>

      <div class="block">     
        <AppTextarea
          label="Observation"
          v-model="form.master.observation"
          :error="v$.observation.$error ? v$.observation.$errors[0].$message : null"
        />
      </div>      
      
      <!--div class="block">     
        <AppCheckbox
          v-model="form.editing"
          label="Editing"
          :error="v$.editing.$error ? v$.editing.$errors[0].$message : null"
        />
      </div-->
        
    </div>
    
    <!--div class="mt-4 px-2 border-gray-100 flex justify-right space-x-2">
      <AppBtn
        type="submit"
        :text="pending ? 'Guardando...' : 'Guardar'"
        :isDisabled='pending'
      />
    </div-->









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
          :movement_detail="form.details"
          @submitMovementDetail="submitMovementDetail"
        />
        <TableMovementDetail
          :key="componentKey"
          v-if="form.details"
          :movement_details="form.details"
          @editMovementDetail="editMovementDetail"
          @getMovementDetails="getMovementDetails"
          @removeMovementDetail="removeMovementDetail"            
        />
      </div>
      <AppBtn
        class="btn btn-primary mt-5 justify-self-start"
          type="b"
          :text="pending ? 'Guardando...' : 'Guardar'"
          :isDisabled='pending'
          @click="submit({ movement: toRaw(movement), movement_details: toRaw(movement_details) })"    
      />
    <!-- -->
























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