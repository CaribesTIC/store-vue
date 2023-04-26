<script setup lang="ts">
import useFormPacking from "../../composables/Product/useFormPacking";

const emits = defineEmits<{
  (e: 'add', payload: object): void  
  (e: 'remove'): void
}>()

const props = defineProps<{
  labelOfquantity: string
}>()

const {
  containers,
  preForm,

  cleanAfter,
  v$
} = useFormPacking()

const add = async () => {  
  const result = await v$.value.$validate();  
  if (result) {  
    emits('add', {
      quantity: preForm.quantity,
      packing: preForm.packing
    })
    cleanAfter()    
  }
}

const remove = () => {
  emits('remove')
  cleanAfter()
}
</script>
<template>
  <div class="p-5 grid lg:grid-cols-3 gap-4 bg-base-100">
    <div class="block">
      <AppInput
        v-model="preForm.quantity"
        :label="props.labelOfquantity"
        type="number"
        min="1"
        :error="v$.quantity.$error ? v$.quantity.$errors[0].$message : null"
      />
    </div>
    <div class="block">
      <AppSelect
        ref="xyz"
        label="Empaque"
        v-model="preForm.packing"
        :options="containers"
        :error="v$.packing.$error ? v$.packing.$errors[0].$message : null"
      />
    </div>
    <div class="block mt-5">
      <AppBtn class="btn btn-primary mx-1" @click="add">+</AppBtn>
      <AppBtn class="btn btn-danger mx-1" @click="remove">-</AppBtn>
    </div>
  </div>
</template>
