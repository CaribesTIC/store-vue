import { onMounted, computed, reactive, ref, watch } from 'vue'
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minValue } from "@vuelidate/validators";
import useHttp from "@/composables/useHttp";
import type { ArticleDetail } from "../../types/Article/ArticleDetail";

export default (article_detail: ArticleDetail) => {  
  const form = reactive<ArticleDetail>({
    id: article_detail.id, 
    article_id: article_detail.article_id, 
    presentation_id: article_detail.presentation_id, 
    quantity: article_detail.quantity, 
    status: article_detail.status, 
    user_insert_id: article_detail.user_insert_id, 
    user_update_id: article_detail.user_update_id, 
  })

  const {
    errors,
    pending,

    getError
  } = useHttp()

  const isOpenModal = ref(false)
  
  const rules = computed(() => {
    return {
      article_id: { required: helpers.withMessage("Campo requerido", required) },
      presentation_id: { required: helpers.withMessage("Campo requerido", required) },
      quantity: { required: helpers.withMessage("Campo requerido", required) },
      status: { required: helpers.withMessage("Campo requerido", required) },
      user_insert_id: { required: helpers.withMessage("Campo requerido", required) },
      user_update_id: { required: helpers.withMessage("Campo requerido", required) },
    };
  });

  const v$ = useVuelidate(rules, form as any);
    
  watch(article_detail, (newArticleDetail) => {
    form.article_id = newArticleDetail.article_id
    form.presentation_id = newArticleDetail.presentation_id
    form.quantity = newArticleDetail.quantity
    form.status = newArticleDetail.status
    form.user_insert_id = newArticleDetail.user_insert_id
    form.user_update_id = newArticleDetail.user_update_id
  })

  onMounted(() => {
    
    })

  return {
    form,
    
    v$ 
  }
}
