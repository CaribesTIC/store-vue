<script setup lang="ts">
import { useSubStore } from "@/modules/Store/stores/"

//const subStore = computed(() => useSubStore())
const subStore = useSubStore()

subStore.getSubStoreIni()
</script>

<template>
          <div class="relative">
        <select v-model="subStore.uuid" @change="subStore.handleChange">
          <option key="" value="" disabled selected>Seleccione...</option>
          <option
            v-for="option in [{id: 'sub-store-one', name: 'Sub Almacén Uno'}, {id: 'sub-store-two', name: 'Sub Almacén Dos'}, {id: 'sub-store-three', name: 'Sub Almacén Tres'}]"
            :value="option.id"
            :selected="option.id === subStore.uuid"    
          >{{ option.name }}</option>
        </select>
      </div>
</template>