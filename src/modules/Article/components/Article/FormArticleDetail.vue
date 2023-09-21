<script setup lang="ts">
import { toRaw } from "vue"
import useFormArticleDetail from "../../composables/Article/useFormArticleDetail";
// import type { RadioOption } from "@/types/RadioOption";
import type { ArticleDetail } from "../../types/Article/ArticleDetail";

const props = defineProps<{
  article_detail: ArticleDetail
  // saleTypeOptions: RadioOption[]
  // statusOptions: RadioOption[]
}>()

const {
  form,

  v$
} = useFormArticleDetail(props.article_detail)

const emits = defineEmits<{
  (e: 'submitArticleDetail', form: ArticleDetail): void
}>()

const submitArticleDetail = async () => {
  const result = await v$.value.$validate();
  if (result) {
    emits("submitArticleDetail", toRaw(form));
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="submitArticleDetail"> 
      <div class="p-5 grid lg:grid-cols-2 gap-4">

          
            
            
            
            
            
            










          <!--label>Tipo de Venta</label><br/>
          <AppRadioGroup
            v-model="form.status"
            name="status"
            :options="props.statusOptions"
            :error="v$.status.$error ? v$.status.$errors[0].$message : null"           
          /-->    
      
      </div>
      <div class="block flex justify-center">
        <AppBtn
          type="submit"                 
          data-testid="submit-btn"
          class="btn btn-primary"
          text="Agregar"
        />        
      </div> 
    </form>    
  </div>
</template>
