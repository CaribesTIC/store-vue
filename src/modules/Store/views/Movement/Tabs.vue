<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppPageHeader from "@/components/AppPageHeader.vue"
//import TabMovementDetail from "../../components/Movement/TabMovementDetail.vue"
import useTabMovement from "../../composables/Movement/useTabMovement";
import FormMovement from '../../components/Movement/FormMovement.vue';
import FormMovementDetail from '../../components/Movement/FormMovementDetail.vue';


import useTabMovementDetail from '../../composables/Movement/useTabMovementDetail'
import TableMovementDetail from '../../components/Movement/TableMovementDetail.vue'


const props = defineProps<{ id?: string }>()

const router = useRouter();
const route = useRoute()

const routePath = computed(()=> route.path.split("/")[1])


const {  
  movement,
  errors,
  pending,      
  submit    
} = useTabMovement(props.id)




const isTrue = computed(
  () => movement && movement.id || !props.id
)
//Object.keys(movement).length > 0



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
  const componentKey = ref(0);


</script>

<template>
<div>
  <AppPageHeader>{{routePath.toLocaleUpperCase()}} / {{ !props.id ? "Crear" : "Editar" }}</AppPageHeader>
  <div  class="flex space-x-2">
    <button
      class="btn btn-primary mb-4"
      @click="router.push({ path: `/${routePath}` })"
    >
      Ver todos
    </button>
  </div>

  <div class="myPanel">
    <div class="demo-tab">
      <FormMovement
        v-if="isTrue"
        :movement="movement"
        :errors="errors"
        :pending="pending"
        @submit="submit"    
      />


    <div class="demo-tab mx-5">
      <div class="form-group row">
        <div class="col-sm-12">
          <div class="grid justify-items-stretch">
            <AppBtn
              class="btn p-8 justify-self-start"
              type="text"                 
              data-testid="click-btn"
              :class="closeClassOpened"
              :text="`${closeButtonOpened}`"
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
    <AppBtn
              class="btn btn-primary m-5 justify-self-start"
              type="text"                 
              data-testid="click-btn"
            />
    </div>
  </div>
</div>
</template>

<style scoped>
.demo {
  font-family: sans-serif;
  border: 0px solid;
  border-radius: 2px;
  padding: 0px 0px;
  margin-top: 1em;
  margin-bottom: -1px;
  user-select: none;
  overflow-x: auto;
}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid;
  cursor: pointer;
  margin-bottom: 0px;
  margin-right: 0px;
}

.tab-button.active{
  @apply font-semibold;
}

[data-theme="winter"] .tab-button.active {
    @apply bg-gray-300;
}

[data-theme="night"] .tab-button.active {
    @apply bg-gray-700;
}

[data-theme="winter"] .tab-button:hover {
    @apply bg-gray-200;
}

[data-theme="night"] .tab-button:hover {
    @apply bg-gray-800;
}
.demo-tab {
  border: 1px solid;
  padding: 10px;
}
</style>
