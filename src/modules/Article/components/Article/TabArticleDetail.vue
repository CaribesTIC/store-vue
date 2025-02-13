<script setup lang="ts">
  import {ref} from 'vue'
  import FormArticleDetail from './FormArticleDetail.vue'
  import TableArticleDetail from './TableArticleDetail.vue'
  import useTabArticleDetail from '../../composables/Article/useTabArticleDetail'
  const componentKey = ref(0);
  
  const props = defineProps<{ id?: string }>()
  
  const {
    panelOpened,
    closeButtonOpened,
    closeClassOpened,  
    article_details,
    article_detail,
  
    //createArticleDetail,
    //editArticleDetail,
    getArticleDetails,
    removeArticleDetail,  
    submitArticleDetail,
    panelToogleArticleDetail
  } = useTabArticleDetail(props.id)
  </script>
  
  <template>
    <div class="demo-tab">
      <div class="form-group row">
        <div class="col-sm-12">
          <div class="grid justify-items-stretch">
            <AppBtn 
              v-if="props.id"
              class="btn p-8 justify-self-center"
              type="text"                 
              data-testid="click-btn"
              :class="closeClassOpened"
              :text="`${closeButtonOpened} panel para agregar detalles del artículo`"
              @click="panelToogleArticleDetail"              
            />      
            <FormArticleDetail
              v-if="panelOpened"
              class="bg-base-200 py-4 mt-2 rounded"
              :article_detail="article_detail"
              @submitArticleDetail="submitArticleDetail"
            />
            <TableArticleDetail
              :key="componentKey"
              v-if="article_details"
              :article_details="article_details"
              @getArticleDetails="getArticleDetails"
              @removeArticleDetail="removeArticleDetail"            
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
