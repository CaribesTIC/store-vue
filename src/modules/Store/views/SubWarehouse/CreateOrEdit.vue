<script setup lang="ts">
import AppPageHeader from "@/components/AppPageHeader.vue";
import FormCreateOrEdit from "../../components/SubWarehouse/FormCreateOrEdit.vue";
import useCreateOrEdit from "../../composables/SubWarehouse/useCreateOrEdit";
    
const props = defineProps<{ id?: string }>()

const {
  sub_warehouse,
  errors,
  
  pending,
  router,

  submit    
} = useCreateOrEdit(props.id)
</script>
    
<template>
<div>
  <AppPageHeader>Sub Almacenes / {{ !props.id ? "Crear" : "Editar" }}</AppPageHeader>
  <transition name="fade" mode="out-in">
    <AppPageHeader
      message="pending..."
      v-if="pending && !sub_warehouse"
      key="pending"
    />
    <div v-else class="panel mt-6 p-4">           
      <div  class="flex space-x-2">
        <button
          class="btn btn-primary mb-4"
          @click="router.push({ path: '/sub_warehouses' })"
        >
          Ver todos
        </button>
      </div>
      <div class="panel mt-6">
        <FormCreateOrEdit
          class="p-5 border rounded shadow"
          @submit='submit'
          :id="props.id"
          :sub_warehouse='sub_warehouse'
          :pending='pending'
          :errors='errors'
                  
        />
      </div>
    </div>
  </transition>
</div>
</template>
