<script setup lang="ts">
import { toRaw } from "vue"
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
      <TableSearchArticleDetail />      
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
