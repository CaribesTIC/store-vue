import { reactive, onMounted } from "vue"
import { onBeforeRouteUpdate } from "vue-router"
import useTableGrid from "@/composables/useTableGrid"
import useHttp from "@/composables/useHttp"
import ProductService from "../../services/ProductService"

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
    pending,
    getError     
  } = useHttp()

  const {
    route,
    router,

    setSearch,
    setSort, 
  } = useTableGrid(data, "/products")

  const getProducts = (routeQuery: string) => {  
    return ProductService.getProducts(routeQuery)
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
    //alert(rowId)
    if (rowId === undefined)
      return
    else if (confirm(`¿Estás seguro que desea eliminar el registro ${rowId}?`)) {    
      return ProductService.deleteProduct(rowId)
        .then((response) => {
          errors.value = {}
          //router.push( { path: '/products' } )
          getProducts(
            new URLSearchParams(route.query as Params).toString()
          )       
        })
        .catch((err) => {                
          console.log( err.response.data )
          alert( err.response.data.message )
          errors.value = getError(err)
        })
    }
  }

  onBeforeRouteUpdate(async (to, from) => {      
    if (to.query !== from.query) {        
      await getProducts(
        new URLSearchParams(to.query as Params).toString()
      )
    }
  })

  onMounted(() => {
    getProducts(
      new URLSearchParams(route.query as Params).toString()
    )
  })

  return {
    errors,
    data,
    router,
    pending,

    deleteRow,
    setSearch,
    setSort
  }
}

