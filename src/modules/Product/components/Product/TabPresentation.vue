<script setup lang="ts">
import FormPresentation from './FormPresentation.vue'
import TablePresentation from './TablePresentation.vue'
import useTabPresentation from '../../composables/Product/useTabPresentation'

const props = defineProps<{ id?: string }>()

const {
  panelOpened,
  closeButtonOpened,
  closeClassOpened,  
  presentations,
  presentation,
  saleTypeOptions,
  statusOptions,

  edit,
  submit
} = useTabPresentation(props.id)
</script>

<template>
  <div class="demo-tab">
    <div class="form-group row">
      <div class="col-sm-12">
        <div align="center">     
          <AppBtn
            class="btn p-8"
            type="text"                 
            data-testid="click-btn"
            :class="closeClassOpened"
            :text="`${closeButtonOpened} panel para agregar Presentación`"
            @click="panelOpened=!panelOpened"
          />      
          <FormPresentation
            v-if="panelOpened"
            class="bg-base-200 py-4 mt-2 rounded"
            :presentation="presentation"
            :saleTypeOptions="saleTypeOptions"
            :statusOptions="statusOptions"
            @submit="submit"
          />
          <TablePresentation
            v-if="presentations"
            :presentations="presentations"
            @edit="edit"
          />
        </div>
      </div>
    </div>
  </div>
</template>
