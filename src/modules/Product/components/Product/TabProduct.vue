<script setup lang="ts">
//https://gitlab.com/fdsoil/php_laravel_mybusiness_product/-/blob/master/resources/views/product/partials/modal_packing.blade.php
//https://gitlab.com/fdsoil/php_laravel_mybusiness_product/-/blob/master/resources/js/Product/Packing.js
//https://gitlab.com/fdsoil/php_fdsoil_my_business_product/-/blob/master/modulos/product_aux/modalWindowEmpaque.html
//https://gitlab.com/fdsoil/php_fdsoil_my_business_product/-/blob/master/modulos/product_aux/js/Empaque.js
//https://logaretm.com/blog/making-the-most-out-of-vuejs-injections/
import { inject } from "vue"
import useTabProduct from "../../composables/Product/useTabProduct";

const props = defineProps<{ id?: string }>()

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
  //measureUnit,
  //router,

  getMeasureUnits,
  measureUnitUpdate,
  submit    
} = useTabProduct(props.id)

const { updateMeasureUnit } = inject('measureUnit')

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
        <label>Unidad de Medida</label> 
        <select
          v-model="form.measure_unit_id"
          @change="updateMeasureUnit($event.target[$event.target.selectedIndex].text)"                  
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
      
      <!--div class="block"> 
        <AppSelect
          v-model="form.measure_unit_id"
          label="Unidad de Medida"
          :options="measureUnits"
        />
      </div-->

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
  </div>
</template>
