<script setup lang="ts">
import { computed } from "vue"
import useTabArticle from "../../composables/Article/useTabArticle";
import FormArticle from './FormArticle.vue';

const props = defineProps<{ id?: string }>()

const {  
  article,
  errors,
  pending,      
  submit    
} = useTabArticle(props.id)

const isTrue = computed(
  () => article|| !props.id
) 
</script>

<template>
<div class="">
  <FormArticle
    v-if="isTrue"
    :article="article"
    :errors="errors"
    :pending="pending"
    @submit="submit"    
  />
</div>
</template>
  
