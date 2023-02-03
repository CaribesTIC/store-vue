<script setup lang="ts">
import useTabProduct from "../../composables/Product/useTabProduct";

const props = defineProps<{ id: string }>()

const {
  category,
  product,
  errors,
  //roles,
  pending,
  //router,

  submit    
} = useTabProduct(props.id)
</script>

<template>
  <div class="">
    <div class="p-5 grid lg:grid-cols-2 gap-4">    
      <div class="block">      
        <AppSelect
          id="category_id"
          name="category_id"
          label="Categoría"
          :options="category"
        />
      </div>      
      <div class="block">      
        <AppSelect
          id="mark_id"
          name="mark_id"
          label="Marca"
        />
      </div>

      <div class="block">      
        <AppSelect
          id="id_measure_unit_type"
          name="id_measure_unit_type"
          label="Tipo de Unidad de Medida"
        />
      </div>
      <div class="block">      
        <AppSelect
          id="id_measure_unit"
          name="id_measure_unit"
          label="Unidad de Medida"
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
        :text="sending ? 'Guardando...' : 'Guardar'"
        :isDisabled='sending'
      />
    </div>
  </div>
</template>
