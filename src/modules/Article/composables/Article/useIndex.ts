import { reactive, onMounted } from "vue"
import { onBeforeRouteUpdate } from "vue-router"
import useTableGrid from "@/composables/useTableGrid"
import useHttp from "@/composables/useHttp"
import ArticleService from "../../services/Article"

type Params =  string | string[][] | Record<string, string> | URLSearchParams | undefined

export default () => {
  const data = reactive({
    rows: [],
    links: [],
    search: "",
    sort: "",
    direction: ""
  })

  const {  
    errors,

    getError     
  } = useHttp()

  const {
    route,
    router,

    setSearch,
    setSort, 
  } = useTableGrid(data, "/articles")

  const getArticles = (routeQuery: string) => {
    return ArticleService.getArticles(routeQuery)
      .then((response) => {
        errors.value = {}
        data.rows = response.data.rows.data
        data.links = response.data.rows.links
        data.search = response.data.search
        data.sort = response.data.sort
        data.direction = response.data.direction      
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteRow = (rowId?: string) => {
    if (rowId === undefined)
      return
    else if (confirm(`¿Estás seguro que desea eliminar el registro ${rowId}?`)) {    
      return ArticleService.deleteArticle(rowId)
        .then((response) => {
          errors.value = {}
          getArticles(
            new URLSearchParams(route.query as Params).toString()
          )
        })
        .catch((err) => {                
          console.log( err.response.data )
          errors.value = getError(err)
        })
    }
  }

  onBeforeRouteUpdate(async (to, from) => {      
    if (to.query !== from.query) {        
      await getArticles(
        new URLSearchParams(to.query as Params).toString()
      )
    }
  })

  onMounted(() => {
    getArticles(
      new URLSearchParams(route.query as Params).toString()
    )
  })

  return {
    errors,
    data,
    router,

    deleteRow,
    setSearch,
    setSort
  }
}

