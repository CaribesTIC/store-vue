<script setup lang="ts">
//https://gitlab.com/fdsoil/php_laravel_mybusiness_product/-/blob/master/resources/views/product/partials/modal_packing.blade.php
//https://gitlab.com/fdsoil/php_laravel_mybusiness_product/-/blob/master/resources/js/Product/Packing.js
//https://gitlab.com/fdsoil/php_fdsoil_my_business_product/-/blob/master/modulos/product_aux/modalWindowEmpaque.html
//https://gitlab.com/fdsoil/php_fdsoil_my_business_product/-/blob/master/modulos/product_aux/js/Empaque.js
//https://logaretm.com/blog/making-the-most-out-of-vuejs-injections/
import useTabProduct from "../../composables/Product/useTabProduct";
import FormProduct from './FormProduct.vue';

const props = defineProps<{ id?: string }>()

const {
  category,
  product,
  //errors,
  //pending,
  //mark,
  //measureUnitTypes,
  //measureUnits,    

  //submit    
} = useTabProduct(props.id)
</script>

<template>
  <div class="">    
      <FormProduct v-if="product && product.category_id" :all="{ product ,category }"/>
  </div>
</template>
