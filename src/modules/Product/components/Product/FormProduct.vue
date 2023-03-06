<script lang="ts">
import { onMounted, reactive, inject, watch, computed } from "vue"
import useFormProduct from "../../composables/Product/useFormProduct";

export default {

  props: ['all'],

  setup(props) {
    
    const {
      form  
    } = useFormProduct(props.all.product)


    const { updateMeasureUnit } = inject<{
    updateMeasureUnit: (val: any) => void;
    }>('measureUnit')

    const submit = ()=> alert("abc")


    console.log(props.all.product.category_id)

    const xyz = computed (()=> props.all.product)
    console.log("xyz", xyz.value.category_id)


    return {
      form,
      props,
      xyz
    }
  }
}





/*const form = reactive({
  category_id: "",
  mark_id: "",
  measure_unit_type_id: "",
  measure_unit_id: "",
  name: ""
})*/




//console.log("props.product", props.product)
//onMounted(async () => {

//})





</script>

<template>
{{xyz.category_id}}
  <form @submit.prevent="submit">
    <div class="p-5 grid lg:grid-cols-2 gap-4">    
      <div class="block">      
        <AppSelect          
          v-model="form.category_id"          
          label="Categoría"
          :options="props.all.category"
        />
      </div> </div>     
      <!--div class="block">      
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
        type="button"
        @click="submit(form)"        
        :text="pending ? 'Guardando...' : 'Guardar'"
        :isDisabled='pending'
      />
    </div-->
  </form>
</template>
