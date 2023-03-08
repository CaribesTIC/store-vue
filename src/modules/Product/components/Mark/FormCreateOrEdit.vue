<script setup lang="ts">
import { reactive } from "vue"
import type { Mark } from "../../types/Mark"

// import type Errors from "../../types/Errors"

const props = defineProps<{
  id?: string
  mark: Mark  
  sending: boolean
  errors: any  
}>()

const emit = defineEmits<{
  (e: 'submit', mark: Mark, markId?: string): void
}>()

const form: Mark = reactive(props.mark)

const submit = async () => {
  emit('submit', {
    name: form.name    
  }, props.id)
}

</script>

<template>
  <form @submit.prevent="submit" class="p-4">
    <div class="grid lg:grid-cols-2 gap-4">    
      <div class="block">      
        <AppInput           
          v-model="form.name"
          label="Name"
          type="text"
          :error="errors && errors.name ? errors.name[0] : ''"
        />
      </div>
    </div>

    <div class="mt-4 px-2 border-gray-100 flex justify-end space-x-2">
      <AppBtn
        type="submit"
        :text="sending ? 'Guardando...' : 'Guardar'"
        :isDisabled='sending'
      />
    </div>
  </form>  
</template>
