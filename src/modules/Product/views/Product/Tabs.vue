<script lang="ts" setup>
import { defineAsyncComponent, shallowRef, ref, provide } from 'vue'
import AppPageHeader from "@/components/AppPageHeader.vue"
import { useRouter } from 'vue-router'
//import type { InjectionKey } from 'vue'
// https://vuejs.org/guide/typescript/composition-api.html#typing-provide-inject
//import useShow from '../composables/useShow'

const TabProduct = defineAsyncComponent(() => import('../../components/Product/TabProduct.vue'))
const TabPresentation = defineAsyncComponent(() => import('../../components/Product/TabPresentation.vue'))
//const TabImage = defineAsyncComponent(() => import('../../components/Product/TabImage.vue'))
const props = defineProps<{ id?: string }>()
const tabs = [
  { component: TabProduct, title: "Producto" },
  { component: TabPresentation, title: "Presentaciones" }//,
  //{ component: TabImage, title: "Imagen" }
]
const currentTab = shallowRef(tabs[0])
const router = useRouter();  
const measureUnit = ref("")
const updateMeasureUnit = (val) => {
  measureUnit.value = val
}

provide('measureUnit', {
  measureUnit,
  updateMeasureUnit
})

//const {
//  router,  
//} = useShow(props.id)
</script>

<template>
  <div>
    <AppPageHeader>Productos / {{ !props.id ? "Crear" : "Editar" }}</AppPageHeader>
    <div  class="flex space-x-2">
      <button
        class="btn btn-primary mb-4"
        @click="router.push({ path: '/products' })"
      >
        Ver todos
      </button>
    </div>

    <div class="myPanel">
      <div class="demo">
        <button
          v-for="(tab, index) in tabs"       
          :key="index"
          class="text-xl"
          :class="['tab-button', { active: currentTab === tab }]"
          @click="currentTab = tab"
          :disabled="!props.id"
        >
          {{ tab.title }}
        </button>
        <KeepAlive>
	      <Component
	        :is="currentTab.component"
	        class="demo-tab"
            :id="props.id"
	      />
        </KeepAlive>
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
