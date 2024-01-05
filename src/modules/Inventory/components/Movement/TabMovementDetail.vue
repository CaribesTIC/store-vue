<script setup lang="ts">
  import {ref} from 'vue'
  import FormMovementDetail from './FormMovementDetail.vue'
  import TableMovementDetail from './TableMovementDetail.vue'
  import useTabMovementDetail from '../../composables/Movement/useTabMovementDetail'
  const componentKey = ref(0);
  
  const props = defineProps<{ id?: string }>()
  
  const {
    panelOpened,
    closeButtonOpened,
    closeClassOpened,  
    movement_details,
    movement_detail,
  
    createMovementDetail,
    editMovementDetail,
    getMovementDetails,
    removeMovementDetail,  
    submitMovementDetail,
    panelToogleMovementDetail
  } = useTabMovementDetail(props.id)
  </script>
  
  <template>
    <div class="demo-tab">
      <div class="form-group row">
        <div class="col-sm-12">
          <div class="grid justify-items-stretch">
            <AppBtn
              class="btn p-8 justify-self-center"
              type="text"                 
              data-testid="click-btn"
              :class="closeClassOpened"
              :text="`${closeButtonOpened} formulario MovementDetail`"
              @click="panelToogleMovementDetail"
            />      
            <FormMovementDetail
              v-if="panelOpened"
              class="bg-base-200 py-4 mt-2 rounded"
              :movement_detail="movement_detail"
              @submitMovementDetail="submitMovementDetail"
            />
            <TableMovementDetail
              :key="componentKey"
              v-if="movement_details"
              :movement_details="movement_details"
              @editMovementDetail="editMovementDetail"
              @getMovementDetails="getMovementDetails"
              @removeMovementDetail="removeMovementDetail"            
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
