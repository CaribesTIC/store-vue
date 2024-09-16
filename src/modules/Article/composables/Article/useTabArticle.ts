import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import useHttp from "@/composables/useHttp";
import ArticleService from "@/modules/Article/services/Article";
import type { Article } from "../../types/Article";

export default (articleId?: string) => {
  const router = useRouter();    

  const article: Article = reactive({
    int_cod: "", 
    name: "", 
    price: "", 
    stock_min: "", 
    stock_max: "", 
    status: "", 
    photo: "", 
    id_user_insert: "", 
    id_user_update: "", 
  })

  const {  
    errors,
    pending,

    getError
  } = useHttp()
  
  onMounted(() => {
    if (articleId) {
      pending.value = true
      ArticleService.getArticle(articleId)
        .then((response) => { 
          article.int_cod = response.data.data.int_cod 
          article.name = response.data.data.name 
          article.price = response.data.data.price 
          article.stock_min = response.data.data.stock_min 
          article.stock_max = response.data.data.stock_max 
          article.status = response.data.data.status 
          article.photo = response.data.data.photo 
          article.id_user_insert = response.data.data.id_user_insert 
          article.id_user_update = response.data.data.id_user_update 
        })
        .catch((err) => {        
          errors.value = getError(err)
        })
        .finally(() => {
          pending.value = false;
        })
    }    
  })

  const insertArticle = async (article: Article) => {
    pending.value = true
    return ArticleService.insertArticle(article)
      .then((response) => {         
        alert( response.data.message )
        router.push( { path: `/articles/edit/${response.data.id}` } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }

  const updateArticle = async (article: Article, articleId: string) => {
    pending.value= true
    article._method = 'PUT'
    return ArticleService.updateArticle(articleId, article)
      .then((response) => {
        alert( response.data.message )
        //router.push( { path: '/articles' } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }
  
  const submit = (article: Article) => { 
    !articleId ? insertArticle(article) : updateArticle(article, articleId)
  }

  return {    
    article,
    errors,
    pending,

    submit
  }
}
