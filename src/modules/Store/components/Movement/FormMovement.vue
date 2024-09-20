<script setup lang="ts">
import { inject } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import useFormMovement from "../../composables/Movement/useFormMovement";
import { useDark } from "@vueuse/core"
import type { Movement } from "../../types/Movement";
import type { MovementDetail } from '../../types/Movement/MovementDetail';

const myform: {
  movement: Movement,
  movement_details: MovementDetail
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

const emits = defineEmits<{
  (e: 'submit', form: Movement): void
}>()

const {
  form,
  errors,
  pending,

  v$
} = useFormMovement(myform.movement)

const submit = async () => {  
  const result = await v$.value.$validate();
  if (result) {
    emits("submit", form);
  }
};


/*
export type Movement = {
  id?: any; 
  type_id?: any; 
  number?: string; 
  date_time?: Date; 
  subject?: string; 
  description?: string; 
  observation?: string; 
  close?: any; 
  support_type_id?: any; 
  support_number?: string; 
  support_date?: any; 
  user_insert_id?: any; 
  user_update_id?: any; 
  user_edit_id?: any; 
  editing?: boolean | ""; 
  
  _method?: 'PUT';
}
*/
</script>

<template>
<div class="m-5">
  <AppFlashMessage :error="errors"/>
  <form @submit.prevent="submit">
    <div class="grid lg:grid-cols-2 gap-4">
      <div class="block">
        <label>Date & Time</label>
        <VueDatePicker
          v-model="form.date_time"
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
            v-model="form.number"
            label="Number"
            type="text"
            :error="v$.number.$error ? v$.number.$errors[0].$message : null"
          />
        </div>
        
      
        <div class="block">     
          <AppInput           
            v-model="form.subject"
            label="Subject"
            type="text"
            :error="v$.subject.$error ? v$.subject.$errors[0].$message : null"
          />
        </div>
        
        <div class="block">     
          <AppTextarea
            label="Description"
            v-model="form.description"
            :error="v$.description.$error ? v$.description.$errors[0].$message : null"
          />
        </div>
        
        <div class="block">
          <AppSelect
            :options="[{id: 1, name: 'Orden de Compra'}, {id: 2, name: 'Orden de Requicision'}]"
            v-model="form.support_type_id"
            label="Tipo de Soporte"
            :error="v$.support_type_id.$error ? v$.support_type_id.$errors[0].$message : null"
          />
        </div>   
      
        <div class="block">     
          <AppInput           
            v-model="form.support_number"
            label="SupportNumber"
            type="text"
            :error="v$.support_number.$error ? v$.support_number.$errors[0].$message : null"
          />
        </div>

        <div class="block">     
          <AppTextarea
            label="Observation"
            v-model="form.observation"
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