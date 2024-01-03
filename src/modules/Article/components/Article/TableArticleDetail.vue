<script setup lang="ts">
import { toRaw, ref } from "vue"
import type { ArticleDetail } from "../../types/Article/ArticleDetail";

const props = defineProps<{ article_details: ArticleDetail[] }>()

const emits = defineEmits<{
  (e: 'removeArticleDetail', articleDetailId: string): void
  (e: 'getArticleDetails' ): void
}>()

const removeArticleDetail =  (articleDetailId: string) => {
  emits("removeArticleDetail", articleDetailId)
};

</script>

<template>
  <div class="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
    <table id="id_tab_presentacion" class="w-full text-sm text-left text-gray-500 dark:text-gray-400" width="100%">
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
        <tr>
          <th class="px-6 py-3 bg-gray-50 bg-base-200">Bar_Cod</th>
          <th class="px-6 py-3">Categoría</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200">Producto</th>
          <th class="px-6 py-3">Marca</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200">presentation_id</th>
          <th class="px-6 py-3 ">quantity</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200">status</th>
          <th class="px-6 py-3 ">Acción(es)</th>
        </tr>
      </thead>
      <tbody>      
        <tr v-for="article_detail in props.article_details" :key="article_detail.id">
          <td class="px-6 py-3 bg-gray-50 bg-base-200">{{ article_detail.bar_cod }}</td>
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
          <td class="px-6 py-3">
            <div class="flex items-center space-x-1">             
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
