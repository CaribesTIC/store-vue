<script setup lang="ts">
import { inject } from "vue"
import useFormProduct from "../../composables/Product/useFormProduct";
import type { Product } from "../../types/Product";

const props = defineProps<{
  product: Product
  errors?: String | Object
  sending: Boolean  
}>()

const emits = defineEmits<{
  (e: 'submit', form: Product): void
}>()

const {
  form,
  categories,
  marks,
  measureUnitTypes,
  measureUnits,
  pending
} = useFormProduct(props.product)

const submit = async () => {
    emits('submit', form)
}
 
const { updateMeasureUnit } = inject<{
    updateMeasureUnit: (val: any) => void;
}>('measureUnit')
</script>

<template>
  <form @submit.prevent="submit">
    <div class="p-5 grid lg:grid-cols-2 gap-4">    
      <div class="block">      
        <AppSelect
          v-if="categories"        
          v-model="form.category_id"          
          label="Categoría"
          :options="categories"
        />
      </div>      
      <div class="block">      
        <AppSelect
          v-if="marks"
          v-model="form.mark_id"
          label="Marca"
          :options="marks"
        />
      </div>

      <div class="block">      
        <AppSelect
          v-if="measureUnitTypes"
          v-model="form.measure_unit_type_id"
          label="Tipo de Unidad de Medida"
          :options="measureUnitTypes"
        />
      </div>

      <div class="block">
        <label>Unidad de Medida</label> 
        <select
          v-model="form.measure_unit_id"
          @change="updateMeasureUnit(
            $event.target[($event.target as HTMLSelectElement).selectedIndex].text
          )"          
        >
        <option
          value=""
          class="text-gray-200"
        >
          Seleccione...
        </option>
        <option
          v-for="(option, index) in measureUnits"
          :value="option.id"
          :key="index"
          :selected="option.id === form.measure_unit_id"
         >
          {{ option.name }}
        </option>
        </select>
      </div>

      <div class="block">      
        <AppInput          
          v-model="form.name"          
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
  </form>
</template>
