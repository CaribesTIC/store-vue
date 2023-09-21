<script setup lang="ts">
import useFormArticle from "../../composables/Article/useFormArticle";
import type { Article } from "../../types/Article";

const props = defineProps<{
  article: Article
  errors?: String | Object
  pending: Boolean  
}>()

const emits = defineEmits<{
  (e: 'submit', form: Article): void
}>()

const {
  form,
  errors,
  pending,

  v$
} = useFormArticle(props.article)

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
            v-model="form.int_cod"
            label="int_cod"
            type="text"
            :error="v$.int_cod.$error ? v$.int_cod.$errors[0].$message : null"
          />
        </div>
        
        <div class="block">     
          <AppInput           
            v-model="form.name"
            label="name"
            type="text"
            :error="v$.name.$error ? v$.name.$errors[0].$message : null"
          />
        </div>
        
      
      
      
      
        <div class="block">     
          <AppInput           
            v-model="form.photo"
            label="photo"
            type="text"
            :error="v$.photo.$error ? v$.photo.$errors[0].$message : null"
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
