<script setup lang="ts">
import { toRaw, ref } from "vue"
import useFormArticleDetail from "../../composables/Article/useFormArticleDetail";
// import type { RadioOption } from "@/types/RadioOption";
import type { ArticleDetail } from "../../types/Article/ArticleDetail";
import TableSearchArticleDetail from "./TableSearchArticleDetail.vue";

const props = defineProps<{
  article_detail: ArticleDetail
  // saleTypeOptions: RadioOption[]
  // statusOptions: RadioOption[]
}>()

const {
  form,

  v$
} = useFormArticleDetail(props.article_detail)

const selectedPresentations = ref([])

const emits = defineEmits<{
  (e: 'submitArticleDetail', form: ArticleDetail): void
}>()

const submitArticleDetail = async () => {
  alert(selectedPresentations.value)
  /*const result = await v$.value.$validate();
  if (result) {
    emits("submitArticleDetail", toRaw(form));
  }*/
}

const selectPresentation = (presentation) => {
  const indexFound = selectedPresentations.value.findIndex((i)=> i.id === presentation.id);
  (indexFound===-1)
    ? selectedPresentations.value.push(presentation) 
    : selectedPresentations.value.splice(indexFound,1);
  console.log(selectedPresentations.value);
}
</script>

<template>
  <div>
    <TableSearchArticleDetail
      :selectedPresentations="selectedPresentations"
       @selectPresentation="selectPresentation"
    /> 
    <form @submit.prevent="submitArticleDetail">       
     
      <div class="block flex justify-center mt-4">
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
