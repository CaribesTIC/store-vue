<script lang="ts" setup>
import { computed, defineAsyncComponent, shallowRef, ref } from 'vue'
import AppPageHeader from "@/components/AppPageHeader.vue"
import { useRouter, useRoute } from 'vue-router'

const TabMovement = defineAsyncComponent(() => import('../../components/Movement/TabMovement.vue'))
const TabMovementDetail = defineAsyncComponent(() => import('../../components/Movement/TabMovementDetail.vue'))

const props = defineProps<{ id?: string }>()

const tabs = [
  { component: TabMovement , title: "Movement" },
  { component: TabMovementDetail , title: "MovementDetails" }
]

const currentTab = shallowRef(tabs[0])
const router = useRouter();
const route = useRoute()

const routePath = computed(()=> route.path.split("/")[1])

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
    <div class="demo">
      <button
        v-for="(tab, index) in tabs"       
        :key="index"
        class="text-xl"
        :class="['tab-button', { active: currentTab === tab }]"
        @click="currentTab = tab"
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
