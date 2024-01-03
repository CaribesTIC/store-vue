import { computed, onMounted, reactive, ref } from 'vue'
import useHttp from "@/composables/useHttp";
import ArticleDetailService from "@/modules/Article/services/ArticleDetail";
import type { Ref } from "vue";
import type { ArticleDetail } from "../../types/Article/ArticleDetail";

export default (articleId: string) => {

  const article_detail: ArticleDetail = reactive({
    id: "", 
    bar_cod: "",
    article_id: "", 
    presentation_id: "", 
    quantity: "", 
    status: "", 
    user_insert_id: "", 
    user_update_id: "", 
  })
  
  const article_details: Ref<ArticleDetail[]>  = ref([])
  const panelOpened = ref(false)
  const closeButtonOpened = computed(()=> panelOpened.value ? "Cerrar" : "Abrir")
  const closeClassOpened = computed(()=> panelOpened.value ? "btn-default" : "btn-primary")

  const {  
    errors,
    pending,

    getError
  } = useHttp()

  onMounted(    
    () => {
      article_detail.article_id = articleId
      getArticleDetails()
    }
  )

  const panelToogleArticleDetail = ()=> {
    panelOpened.value =! panelOpened.value    
  }
  
  const getArticleDetails = async () => {
    if (!articleId)
      return null 
    pending.value = true
    ArticleDetailService.getArticleDetails(articleId)
      .then(res => article_details.value = res.data)
      .catch(err => errors.value = getError(err))
      .finally(() => pending.value = false) 
  }

  const registerArticleDetail = async (payload: ArticleDetail[]) => {
    pending.value = true
    payload.forEach(pl => pl.article_id = articleId)
    return ArticleDetailService.registerArticleDetail(payload)
      .then((response) => {
        panelOpened.value = false
        getArticleDetails()    
        alert( response.data.message )              
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }
  
  const submitArticleDetail = (payload: ArticleDetail[]) => {    
    registerArticleDetail (payload)
    panelOpened.value = false
  }
  
  const removeArticleDetail = async (articleDetailId: string) => {
    if (articleDetailId === undefined)
      return
    else if (confirm(`¿Estás seguro que desea eliminar el registro ${articleDetailId}?`)) {  
      pending.value = true    
      return ArticleDetailService.deleteArticleDetail(articleDetailId)
        .then((response) => {        
          getArticleDetails()
        })
        .catch((err) => {                
          console.log( err.response.data )
          errors.value = getError(err)
        })
        .finally(() => {
          pending.value = false
        })
    }
  }

  return {
    panelOpened,
    closeButtonOpened,
    closeClassOpened,
    article_details,
    article_detail,

    getArticleDetails,
    removeArticleDetail, 
    submitArticleDetail,
    panelToogleArticleDetail
  }
}
