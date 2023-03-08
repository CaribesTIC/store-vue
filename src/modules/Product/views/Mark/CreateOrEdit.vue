<script setup lang="ts">
import AppPageHeader from "@/components/AppPageHeader.vue";
import FormCreateOrEdit from "../../components/Mark/FormCreateOrEdit.vue";
import useCreateOrEdit from "../../composables/Mark/useCreateOrEdit";

const props = defineProps<{ id?: string }>()

const {
  mark,
  errors,
  sending,
  loading,
  router,

  submit    
} = useCreateOrEdit(props.id)
</script>

<template>
  <div>
    <AppPageHeader>Marcas / {{ !props.id ? "Crear" : "Editar" }}</AppPageHeader>
    <transition name="fade" mode="out-in">
      <AppPageHeader
        message="loading..."
        v-if="loading && !mark"
        key="loading"
      />
      <div v-else class="panel mt-6 p-4">           
        <div  class="flex space-x-2">
          <button
            class="btn btn-primary mb-4"
            @click="router.push({ path: '/marks' })"
          >
            Ver todos
          </button>
        </div>
        <div class="panel mt-6">
          <FormCreateOrEdit
            class="p-5 border rounded shadow"
            @submit='submit'
            :id="props.id"
            :mark='mark'
            :sending='sending'
            :errors='errors'                        
          />
        </div>
      </div>
    </transition>
  </div>
</template>
