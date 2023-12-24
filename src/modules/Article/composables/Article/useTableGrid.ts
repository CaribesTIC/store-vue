import { onMounted } from "vue"
import { getPresentationSearch } from '@/modules/Product/services/PresentationService'

interface Data {
  //rows: string[];
  links: string[];
  search: string;
  sort: string;
  direction: string;
}

interface TableGrid {
  setSearch: (e: Event) => void;
  setSort: (s: "asc" | "des") => void;
}

export default (data: Data): TableGrid => { 
  onMounted(async () => await getSearch({
    page: "1",
    search: "",
    sort: "",
    direction: ""    
  }))

  // search
  let searchDebounceTimer: NodeJS.Timeout

  const setSearch = (e: Event): void => {
    // clear previous timer and set new
    clearTimeout(searchDebounceTimer)
    searchDebounceTimer = setTimeout(() => {
       load({ search: (e.target as HTMLInputElement).value })      
    }, 300)
  }

  // sort
  const setSort = (s: "asc" | "des"): void => { // "s" is abbreviation of "sort"
    // reverse direction if clicked twice on column
    let d = "asc";         // "d" is abbreviation of "direction"

    if (data.sort == s) {
      d = data.direction == "asc" ? "desc" : "asc";
    }
 
    load({direction: d, sort: s})
  };
  
  // setLoad
  const load = (newParams: object): void => {
    const params = {
      page: data.links || "1",
      //page: 1,
      search: data.search || "",
      sort: data.sort || "",
      direction: data.direction || "",
      ...newParams,
    }

    /*console.log("load", { query: { ...params } })*/

    getSearch(params)
  }
  
  const getSearch = async (params) => {    
    data.page = params.page ?? "1"
    data.search = params.search ?? ""
    data.sort = params.sort ?? ""
    data.direction = params.direction ?? ""
    
    const {data: { rows }} = await getPresentationSearch(
      new URLSearchParams(data as unknown as Params).toString()
    )
    
    data.rows = rows.data ?? []
    data.links = rows.links ?? []
    data.page = rows.page ?? "1"
    data.search = data.search ?? ""
    data.sort = data.sort ?? ""
    //data.direction = rows.direction ?? ""  
  }

  return {
    getSearch,
    setSearch,
    setSort,
  }
}

