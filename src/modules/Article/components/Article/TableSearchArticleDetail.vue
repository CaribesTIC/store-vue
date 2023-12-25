<script setup lang="ts">
import { toRaw, ref, reactive, onMounted } from "vue"
import useTableGrid from "../../composables/Article/useTableGrid"
import AppPaginationC from "@/components/AppPaginationC.vue";
import IconCamera from "@/components/icons/menu/icon-products.vue"
//import ArticleDetailService from "@/modules/Article/services/ArticleDetail"
import type { ArticleDetail } from "../../types/Article/ArticleDetail";

type Params =  string | string[][] | Record<string, string> | URLSearchParams | undefined


//const props = defineProps<{ article_details: ArticleDetail[] }>()

const emits = defineEmits<{
  //(e: 'editArticleDetail', article_detailId: object): void  
  //(e: 'getArticleDetails' ): void
}>()

/*const editArticleDetail =  (article_detail: object) => {
  emits("editArticleDetail", toRaw(article_detail))
};*/

const form = reactive({})
  
const data = reactive({
  rows: [],
  page: "1",
  search: "",
  sort: "",
  direction: "",
  links: []  
})

const {
  getSearch,
  setSearch,
  setSort, 
} = useTableGrid(data)

const classTr = (index) => {
  let num = (index%2 == 1) ? '100' : '200'
  return  `bg-base-${num}`
}

const selectedPresentations = ref([])

const selectPresentationId = (presentationId) => {
  selectedPresentations.value.includes(presentationId)
    ? selectedPresentations.value.splice(selectedPresentations.value.indexOf(presentationId),1)
      : selectedPresentations.value.push(presentationId)
}

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
              placeholder="Buscar…"
            />
          </div>
        </div>
      </div>
      
  <div class="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">     
    <table id="id_tab_presentacion" class="w-full text-sm text-left text-gray-500 dark:text-gray-400" width="100%">
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
        <tr class="bg-base-100">          
          <th class="px-4 py-1">
            <AppBtn
              class="bg-base-100 hover:text-gray-500"
              @click.prevent="setSort('presentations.bar_cod')">
                Barcode
            </AppBtn>
          </th>      
          <th class="px-4 py-1">
            <AppBtn
              class="bg-base-100 hover:text-gray-500"
              @click.prevent="setSort('categories.name')">
              Categoría
            </AppBtn>
          </th>
          <th class="px-4 py-1">
            <AppBtn
              class="bg-base-100 hover:text-gray-500"
              @click.prevent="setSort('products.name')">
                Producto
            </AppBtn>
          </th>
          <th class="px-4 py-1">
            <AppBtn
              class="bg-base-100 hover:text-gray-500"
              @click.prevent="setSort('marks.name')">
                Marca
            </AppBtn>
          </th>
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
          <td class="px-4 py-1 text-justify">{{presentation.category_name}}</td>
          <td class="px-4 py-1" :id='presentation.packing'>{{presentation.product_name}}</td>          
          <td class="px-4 py-1 text-justify">{{presentation.mark_name}}</td>
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
             <input type="checkbox" v-model="selectedPresentations" :value="presentation.id" @click="selectPresentationId(presentation.id)">
             <!--AppCheckbox label="Seleccione"  :value="presentation.id" @click="selectPresentationId(presentation.id)"/-->
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
