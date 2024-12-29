<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSubStore } from "@/modules/Store/stores/"
import useHttp from '@/composables/useHttp';
import { getHelpSubWarehouses } from '@/modules/Store/services/SubWarehouse';

const {
    errors,
    loading,
    pending,
    getError
} = useHttp()

//const subStore = computed(() => useSubStore())
const subStore = useSubStore()

subStore.getSubStoreIni()

const options = ref([])

onMounted(() => {
  pending.value = true
  getHelpSubWarehouses()
    .then((response) => { 
      options.value = response.data.map(r => ({
        id: r.uuid,
        name: r.name  
      }));
      errors.value = {}
    })
    .catch((err) => {        
      errors.value = getError(err)
    })
    .finally(() => {
      pending.value = false;
    })
})
</script>

<template>
  <div class="relative">
    <select
      v-model="subStore.uuid"
      @change="subStore.handleChange"
      v-if="!pending"
    >
      <option key="" value="" disabled selected>Seleccione...</option>
      <option
        v-for="option in options"
        :value="option.id"
        :selected="option.id === subStore.uuid"    
      >{{ option.name }}</option>
    </select>
    <div v-else>Loading...</div>
  </div>
</template>