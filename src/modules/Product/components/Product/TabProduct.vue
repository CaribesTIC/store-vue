<script setup lang="ts">
//https://gitlab.com/fdsoil/php_laravel_mybusiness_product/-/blob/master/resources/views/product/partials/modal_packing.blade.php
//https://gitlab.com/fdsoil/php_laravel_mybusiness_product/-/blob/master/resources/js/Product/Packing.js
//https://gitlab.com/fdsoil/php_fdsoil_my_business_product/-/blob/master/modulos/product_aux/modalWindowEmpaque.html
//https://gitlab.com/fdsoil/php_fdsoil_my_business_product/-/blob/master/modulos/product_aux/js/Empaque.js
//https://logaretm.com/blog/making-the-most-out-of-vuejs-injections/
import { computed } from "vue"
import useTabProduct from "../../composables/Product/useTabProduct";
import FormProduct from './FormProduct.vue';

const props = defineProps<{ id?: string }>()

const {  
  product,
  errors,
  pending,      
  submit    
} = useTabProduct(props.id)

const isTrue = computed(
  () => product && product.category_id || !props.id
) 
</script>

<template>
  <div class="">
    <FormProduct
      v-if="isTrue"
      :product="product"
      :errors="errors"
      :sending="pending"
      @submit="submit"    
    />
  </div>
</template>
