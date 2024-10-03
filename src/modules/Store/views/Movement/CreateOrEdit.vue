<script lang="ts" setup>
import { computed, ref, reactive, provide } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppPageHeader from '@/components/AppPageHeader.vue'
//import TabMovementDetail from "../../components/Movement/TabMovementDetail.vue"
import FormMovement from '../../components/Movement/FormMovement.vue';
import useMovement from '../../composables/Movement/useMovement';

const props = defineProps<{ id?: string }>()

const router = useRouter();
const route = useRoute()

const {  
  movement,
  errors,
  pending,      
  submit    
} = useMovement(props.id)

const routePath = computed(()=> route.path.split("/")[1])

const movementType = computed(()=>{
  switch (true) {
	  case routePath.value==='inputs': return 1;
	  case routePath.value==='outputs': return 2;
	  case routePath.value==='input-reverses': return 3;
	  case routePath.value==='output-reverses':	return 4;
  }
})

const isTrue = computed(
  () => movement && movement.main.id || !props.id
)

provide('movement', { movement })
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
    <div class="myPanel demo-tab">
      <div>
      <FormMovement
        v-if="isTrue"        
        :errors="errors"
        :pending="pending"
        @submit="submit"
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

.tab-button.active{ @apply font-semibold; }

[data-theme="winter"] .tab-button.active { @apply bg-gray-300; }

[data-theme="night"] .tab-button.active { @apply bg-gray-700; }

[data-theme="winter"] .tab-button:hover { @apply bg-gray-200; }

[data-theme="night"] .tab-button:hover { @apply bg-gray-800; }

.demo-tab { border: 1px solid; padding: 10px; }
</style>
