<script setup lang="ts">
import { ref, computed, reactive } from "vue"
import FormPresentation from './FormPresentation.vue'
import TablePresentation from './TablePresentation.vue'

const isOpenPanel = ref(false)
const OpenOrCloseButton = computed(()=> isOpenPanel.value ? "Cerrar" : "Abrir")
const OpenOrCloseClass = computed(()=> isOpenPanel.value ? "btn-default" : "btn-primary")

const presentation = reactive({
  sale_type: 0,
  int_cod: "",
  bar_cod: "",
  packing_deployed: "",
  packing_json: "",
  stock_min: 0,
  stock_max: 0,
  price: "0.0",
  status: 0
})

const saleTypeOptions = [
  { label: 'Mayor', value: 0 },
  { label: 'Detal', value: 1 }  
]

const statusOptions = [
  { label: 'Inactivo', value: 0 },
  { label: 'Activo', value: 1 }  
]
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
            :class="OpenOrCloseClass"
            :text="`${OpenOrCloseButton} panel para agregar Presentación`"
            @click="isOpenPanel=!isOpenPanel"
          />      
          <FormPresentation
            v-if="isOpenPanel"
            class="bg-base-200 py-4 mt-2 rounded"
            :presentation="presentation"
            :saleTypeOptions="saleTypeOptions"
            :statusOptions="statusOptions"
          />
          <TablePresentation />
        </div>
      </div>
    </div>
  </div>
</template>
