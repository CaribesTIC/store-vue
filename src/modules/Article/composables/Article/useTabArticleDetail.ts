import { computed, onMounted, reactive, ref } from 'vue'
import useHttp from "@/composables/useHttp";
import ArticleDetailService from "@/modules/Article/services/ArticleDetail";
import type { Ref } from "vue";
import type { ArticleDetail } from "../../types/Article/ArticleDetail";

export default (articleId: string) => {
  /*const saleTypeOptions = [
    { label: 'Mayor', value: 0 },
    { label: 'Detal', value: 1 }  
  ]
  const statusOptions = [
    { label: 'Inactivo', value: 0 },
    { label: 'Activo', value: 1 }  
  ]*/
  
  const article_detail: ArticleDetail = reactive({
    id: "", 
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
    if (!panelOpened.value) {
      createArticleDetail()
    }
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

  const insertArticleDetail = async (payload: ArticleDetail) => {
    pending.value = true
    payload.article_id = articleId
    return ArticleDetailService.insertArticleDetail(payload)
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

  const updateArticleDetail = async (payload: ArticleDetail, article_detailId: string) => {
    pending.value = true
    payload.article_id = articleId
    payload._method = 'PUT'        
    return ArticleDetailService.updateArticleDetail(payload, article_detailId)
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
  
  const submitArticleDetail = (payload: ArticleDetail) => {    
    !article_detail.id ? insertArticleDetail (payload)  : updateArticleDetail(payload, article_detail.id)
  }

  const createArticleDetail = () => {
      article_detail.article_id = articleId
      article_detail.id = ""
      article_detail.presentation_id = ""
      article_detail.quantity = ""
      article_detail.status = ""
      article_detail.user_insert_id = ""
      article_detail.user_update_id = ""
  }

  const editArticleDetail = (article_detailEdit: ArticleDetail) => {
    // presentation.status = presentationEdit.sale_type ? 1 : 0
    article_detail.article_id = articleId
    article_detail.id = article_detailEdit.id
    article_detail.presentation_id = article_detailEdit.presentation_id
    article_detail.quantity = article_detailEdit.quantity
    article_detail.status = article_detailEdit.status
    article_detail.user_insert_id = article_detailEdit.user_insert_id
    article_detail.user_update_id = article_detailEdit.user_update_id
    panelOpened.value = true
  }
  
  const removeArticleDetail = async (article_detailId: string) => {
    if (article_detailId === undefined)
      return
    else if (confirm(`¿Estás seguro que desea eliminar el registro ${article_detailId}?`)) {  
      pending.value = true    
      return ArticleDetailService.deleteArticleDetail(article_detailId)
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
    /*saleTypeOptions,
    statusOptions,*/

    createArticleDetail,
    editArticleDetail,
    getArticleDetails,
    removeArticleDetail, 
    submitArticleDetail,
    panelToogleArticleDetail
  }
}
