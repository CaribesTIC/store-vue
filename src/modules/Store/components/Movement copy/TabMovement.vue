<script setup lang="ts">
import { computed } from "vue"
import useTabMovement from "../../composables/Movement/useTabMovement";
import FormMovement from './FormMovement.vue';

const props = defineProps<{ id?: string }>()

const {  
  movement,
  errors,
  pending,      
  submit    
} = useTabMovement(props.id)

const isTrue = computed(
  () => movement && movement.id || !props.id
)
//Object.keys(movement).length > 0
</script>

<template>
<div class="">
  <FormMovement
    v-if="isTrue"
    :movement="movement"
    :errors="errors"
    :pending="pending"
    @submit="submit"    
  />
</div>
</template>
  
