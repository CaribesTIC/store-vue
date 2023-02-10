<script setup lang="ts">
import { reactive, watch } from "vue" 
import useTabProduct from "../../composables/Product/useTabProduct";

const props = defineProps<{ id: string }>()

//const emit = defineEmits<{
//  (e: 'getMeasureUnits', measure_unit_type_id: string): void    
//  //(e: 'submit', form: DireccionHabitacion): void  
//}>()

const {
  category,
  form,
  errors,
  pending,
  mark,
  measureUnitTypes,
  measureUnits,
  //router,

  getMeasureUnits,
  submit    
} = useTabProduct(props.id)


watch(
  () => form.measure_unit_type_id,
  (newMeasureUnitType, oldMeasureUnitType) => {
    //if (!measureUnit.value.includes(form.measure_unit_id))
      //form.measure_unit_id = ""    
    if (newMeasureUnitType !== "")
      //emit('getMeasureUnits', newMeasureUnitType)
      getMeasureUnits(form.measure_unit_type_id)
  },        
  { immediate: false, deep: true }, 
)
</script>

<template>
  <div class="">
    <div class="p-5 grid lg:grid-cols-2 gap-4">    
      <div class="block">      
        <AppSelect
          v-model="form.category_id"          
          label="Categoría"
          :options="category"
        />
      </div>      
      <div class="block">      
        <AppSelect
          v-model="form.mark_id"
          label="Marca"
          :options="mark"
        />
      </div>

      <div class="block">      
        <AppSelect
          v-model="form.measure_unit_type_id"
          label="Tipo de Unidad de Medida"
          :options="measureUnitTypes"
        />
      </div>
      <div class="block"> 
        <AppSelect
          v-model="form.measure_unit_id"
          label="Unidad de Medida"
          :options="measureUnits"
        />
      </div>

      <div class="block">      
        <AppInput      
          name="name"
          label="Nombre del Producto"
          type="text"
          error=""
        />   
      </div>
    </div>

    <div class="mt-4 px-2 border-gray-100 flex justify-end space-x-2">
      <AppBtn
        type="submit"
        :text="pending ? 'Guardando...' : 'Guardar'"
        :isDisabled='pending'
      />
    </div>
  </div>
</template>
