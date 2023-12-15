<script setup lang="ts">
import { toRaw, ref } from "vue"
//import ArticleDetailService from "@/modules/Article/services/ArticleDetail"
import type { ArticleDetail } from "../../types/Article/ArticleDetail";

const props = defineProps<{ article_details: ArticleDetail[] }>()

const emits = defineEmits<{
  (e: 'editArticleDetail', article_detailId: object): void
  (e: 'removeArticleDetail', article_detailId: string): void
  (e: 'getArticleDetails' ): void
}>()

const editArticleDetail =  (article_detail: object) => {
  emits("editArticleDetail", toRaw(article_detail))
};

const removeArticleDetail =  (article_detailId: string) => {
  emits("removeArticleDetail", article_detailId)
};

const article_detailId = ref("")

</script>

<template>
  <div class="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
    <table id="id_tab_presentacion" class="w-full text-sm text-left text-gray-500 dark:text-gray-400" width="100%">
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
        <tr>
          <th class="px-6 py-3">Categoría</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200">Producto</th>
          <th class="px-6 py-3">Marca</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200">presentation_id</th>
          <th class="px-6 py-3 ">quantity</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200">status</th>
          <th class="px-6 py-3 ">user_insert_id</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200">user_update_id</th>
          <th class="px-6 py-3 ">Acción(es)</th>
        </tr>
      </thead>
      <tbody>      
        <tr v-for="article_detail in props.article_details" :key="article_detail.id">
          <td class="px-6 py-3">{{ article_detail.category }}</td>
          <td class="px-6 py-3 bg-gray-50 bg-base-200">{{ article_detail.product }}</td>
          <td class="px-6 py-3">{{ article_detail.mark  }}</td>


          
            <td class="px-6 py-3 bg-gray-50 bg-base-200" id="article_detail.presentation_id">
              
              {{ article_detail.packing_deployed  }}

              

            </td>
           
            <td class="px-6 py-3 ">
              {{ article_detail.quantity }}


              

            </td>
           
            <td class="px-6 py-3 bg-gray-50 bg-base-200">
              {{ article_detail.status }}


              

            </td>
           
            <td class="px-6 py-3 ">
              {{ article_detail.user_insert_id }}


              

            </td>
           
            <td class="px-6 py-3 bg-gray-50 bg-base-200">
              {{ article_detail.user_update_id }}


              

            </td>
           



          <!--td class="px-6 py-3 bg-gray-50 bg-base-200">{{article_detail.bar_cod}}</td>
          <td class="px-6 py-3">{{article_detail.int_cod}}</td>
          <td class="px-6 py-3 text-right">{{article_detail.price}}</td>
          <td class="px-6 py-3 bg-gray-50 bg-base-200 text-right">{{article_detail.stock_min}}</td>
          <td class="px-6 py-3 text-right">{{article_detail.stock_max}}</td>
          <td class="px-6 py-3 bg-gray-50 bg-base-200">{{article_detail.status}}</td-->  
          <td class="px-6 py-3">
            <div class="flex items-center space-x-1">
             <AppBtn
                class="btn btn-primary btn-xs"                    
                @click="editArticleDetail(article_detail)"
              >
                Editar
              </AppBtn>
              <AppBtn
                @click="removeArticleDetail(article_detail.id)"                    
                class="btn btn-danger btn-xs"                    
              >
                Eliminar
              </AppBtn>
            </div>
          </td>

        </tr>
      </tbody>
    </table>    
  </div>  
</template>
