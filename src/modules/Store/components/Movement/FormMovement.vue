<script setup lang="ts">
import useFormMovement from "../../composables/Movement/useFormMovement";
import type { Movement } from "../../types/Movement";

const props = defineProps<{
  movement: Movement
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
} = useFormMovement(props.movement)

const submit = async () => {  
  const result = await v$.value.$validate();
  if (result) {
    emits("submit", form);
  }
};
</script>

<template>
<div class="m-5">
  <AppFlashMessage :error="errors"/>
  <form @submit.prevent="submit">
    <div class="grid lg:grid-cols-2 gap-4">
      
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
          <AppTextarea
            label="Observation"
            v-model="form.observation"
            :error="v$.observation.$error ? v$.observation.$errors[0].$message : null"
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
          <AppCheckbox
            v-model="form.editing"
            label="Editing"
            :error="v$.editing.$error ? v$.editing.$errors[0].$message : null"
          />
        </div>
        
      </div>
    
      <div class="mt-4 px-2 border-gray-100 flex justify-right space-x-2">
        <AppBtn
          type="submit"
          :text="pending ? 'Guardando...' : 'Guardar'"
          :isDisabled='pending'
        />
      </div>
  </form>
</div>
</template>

