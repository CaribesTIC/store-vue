<script setup lang="ts">
import { toRaw, ref, reactive, onMounted } from "vue"
import useTableGrid from "../../composables/Article/useTableGrid"
import AppPaginationC from "@/components/AppPaginationC.vue";
import IconCamera from "@/components/icons/IconCamera.vue"
//import ArticleDetailService from "@/modules/Article/services/ArticleDetail"
import type { ArticleDetail } from "../../types/Article/ArticleDetail";

import { getPresentationSearch } from '@/modules/Product/services/PresentationService'

type Params =  string | string[][] | Record<string, string> | URLSearchParams | undefined


//const props = defineProps<{ article_details: ArticleDetail[] }>()

const emits = defineEmits<{
  //(e: 'editArticleDetail', article_detailId: object): void
  //(e: 'removeArticleDetail', article_detailId: string): void
  //(e: 'getArticleDetails' ): void
}>()

/*const editArticleDetail =  (article_detail: object) => {
  emits("editArticleDetail", toRaw(article_detail))
};*/

//const removeArticleDetail =  (article_detailId: string) => {
//  emits("removeArticleDetail", article_detailId)
//};

const article_detailId = ref("")
  
const data = reactive({
  rows: [],
  page: "1",
  search: "",
  sort: "",
  direction: "",
  links: []  
})

const {
  setSearch,
  setSort, 
} = useTableGrid(data)


const getSearch = async (pageNum?: string = "1") => {    
  data.page = pageNum   
  const {data: { rows }} = await getPresentationSearch(
    new URLSearchParams(data as unknown as Params).toString()
  )  
  data.rows = rows.data ?? []
  data.links = rows.links ?? []
  data.page = rows.page ?? "1"
  data.search = rows.search ?? ""
  data.sort = rows.sort ?? ""
  data.direction = rows.direction ?? "asc"
}

const classTr = (index) => {
  let num = (index%2 == 1) ? '100' : '200'
  return  `bg-base-${num}`
}

onMounted(async () => await getSearch())

const imgPath = (presentation) => `${import.meta.env.VITE_APP_API_URL}/${presentation.photo_path}`
</script>

<template>
<div class="overflow-hidden panel">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <div class="flex w-full bg-white shadow rounded">
            <input
              class=""
              type="text"
              v-model="data.search"
              @input="setSearch"
              placeholder="Filtrar…"
            />
          </div>
        </div>
      </div>
      
  <div class="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">     
    <table id="id_tab_presentacion" class="w-full text-sm text-left text-gray-500 dark:text-gray-400" width="100%">
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
        <tr class="bg-base-100">          
          <th class="px-4 py-1">barcode</th>      
          <th class="px-4 py-1">Categoría</th>        
          <th class="px-4 py-1">Producto</th>
          <th class="px-4 py-1">Marca</th>
          <th class="px-4 py-1">Empaque</th>
          <th class="px-4 py-1">Precio</th>
          <!--th class="px-4">Estatus</th-->
          <th class="px-4 py-1">Imagen</th>               
          <th class="px-4 py-1">Acción(es)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(presentation, index) in data.rows" :key="presentation.id" :class="classTr(index)">
          <td class="px-4 py-1">{{presentation.bar_cod}}</td>
          <td class="px-4 py-1 text-justify">{{presentation.product.category.name}}</td>
          <td class="px-4 py-1" :id='presentation.packing'>{{presentation.product.name}}</td>
          <td class="px-4 py-1 text-justify">{{presentation.product.mark.name}}</td>
          <td class="px-4 py-1 text-justify">{{presentation.packing_deployed}}</td>
          <td class="px-4 py-1 text-right">{{presentation.price}}</td>
          <!--td class="px-6 py-1">{{presentation.status}}</td-->
          <td class="px-4 py-1">
            <img
              v-if="presentation.photo_path"
              class="m-auto hover:cursor-pointer w-7 h-7"
              :src=imgPath(presentation)              
            />
            <IconCamera
              v-else
              class="w-7 h-7 m-auto fill-current hover:cursor-pointer"              
            />
          </td>  
          <td class="px-4 py-1">
            <div class="flex items-center space-x-1">
             <AppBtn
                class="btn btn-primary btn-xs"                    
                @click="edit(presentation)"
              >
                Editar
              </AppBtn>
              <!--AppBtn
                @click="remove(presentation.id)"                    
                class="btn btn-danger btn-xs"                    
              >
                Eliminar
              </AppBtn-->
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <AppPaginationC
    v-if="data.links"
    :links="data.links"
    @getSearch="getSearch"
  />
  </div>
</template>
