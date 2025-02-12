<script setup lang="ts">
//https://dev.to/razi91/vue-arrays-and-v-model-17e0
// import { toRaw} from "vue"
import { reactive, watch} from "vue"
import useTableGrid from "../../composables/Article/useTableGrid"
import AppPaginationC from "@/components/AppPaginationC.vue";
import IconCamera from "@/components/icons/menu/icon-products.vue"
import type { ArticleDetail } from "../../types/Article/ArticleDetail";

type Params =  string | string[][] | Record<string, string> | URLSearchParams | undefined

const props = defineProps<{ selectedPresentations: ArticleDetail[] }>()

const emits = defineEmits<{
  (e: 'selectPresentation', article_detailId: object): void
  (e: 'qtyPresentation', article_detailId: object): void
}>()

const selectedPresentation = reactive([])
const quantityPresentation = reactive([])
  
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

const selectPresentation =  (id: string, quantity: number=1 ) => {
  emits("selectPresentation", { id , quantity })
  quantityPresentation.values[id] = quantity;
  selectedPresentation[id] = !selectedPresentation[id];
}

const convertToNumber = (qtyStr: string): void|number => {
  const qtyNumber = parseInt(qtyStr)
  return (!qtyNumber) ? alert("Error: Ingrese números") : qtyNumber; 
}

const setQuantity = (presentationId): void => {
  const qtyStr: string = prompt('Por favor ingrese la cantidad') 
  const qtyNumber: void|number = convertToNumber(qtyStr)
  if (qtyNumber)
    emits("qtyPresentation", { id: presentationId , qty: qtyNumber })
}

watch(props.selectedPresentations, (selectedPresentations) => {
  // console.log('selectedPresentations', toRaw(selectedPresentations))
  selectedPresentations.forEach((sp)=> {
    quantityPresentation.values[sp.id] = sp.quantity
  })
}, { deep: true })

const imgPath = (presentation) => `${import.meta.env.VITE_APP_API_URL}/${presentation.photo_path}`
</script>

<template>  
  <div class="overflow-x-auto panel">
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
          <th class="px-4 py-1">Acción(es)</th>
          <th class="px-4 py-1">Imagen</th>    
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="(presentation, index) in data.rows" :key="index" :class="classTr(index)">
          <td class="px-4 py-1">
            <div class="flex items-center space-x-1">
              <label>Seleccionar</label>   <!--{{ selectedPresentation[presentation.id] }}-->
              <input
                class="my-3"
                type="checkbox"
                v-model="selectedPresentation[presentation.id]"
                :value="presentation.id"
                @click="selectPresentation(presentation.id, 1)"
              />
                        
              <AppBtn
                v-show="selectedPresentation[presentation.id]"
                @click="setQuantity(presentation.id)"
                type="button"
                class="btn btn-primary btn-xs"
              >ModQty|{{ quantityPresentation.values[presentation.id]}}</AppBtn>
            </div>
          </td>
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
          <td class="px-4 py-1">{{presentation.bar_cod}}</td>
          <td class="px-4 py-1 text-justify">{{presentation.category_name}}</td>
          <td class="px-4 py-1" :id='presentation.packing'>{{presentation.product_name}}</td>          
          <td class="px-4 py-1 text-justify">{{presentation.mark_name}}</td>
          <td class="px-4 py-1 text-justify">{{presentation.packing_deployed}}</td>
          <td class="px-4 py-1 text-right">{{presentation.price}}</td>
          <!--td class="px-6 py-1">{{presentation.status}}</td-->          
        </tr>
      </tbody>
    </table>
  </div>
  <AppPaginationC
    v-if="data.links"
    :links="data.links"
    @getSearch="getSearch"
  />
  <div class="hidden">{{ props.selectedPresentations }}</div>
  </div>
</template>
