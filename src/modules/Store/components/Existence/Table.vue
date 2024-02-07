<script setup lang="ts">

type Existence = {
  article_id: number;
  inputs: number;  
  outputs: number;
  reverse_inputs: number;
  reverse_outputs: number;
  total: number;

}

const props = defineProps<{
  existences: Existence[]
}>()

const classTr = (index) => {
  let num = (index%2 == 1) ? '100' : '200'
  return  `bg-base-${num}`
}
</script>

<template>
  <div class="overflow-hidden panel mt-6">
    <table class="w-full">
      <thead>
        <tr class="bg-base-100">
          <th class="px-6 py-3">Artículos</th>
          <th class="px-6 py-3">Entradas</th>
          <th class="px-6 py-3">Salidas</th>
          <th class="px-6 py-3">Reverso Entradas</th>
          <th class="px-6 py-3">Reverso Salidas</th>
          <th class="px-6 py-3">Existencia</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(existence, index) in existences" :key="index" :class="classTr(index)">
          <td align="center" class="px-6 py-3">{{ existence.int_cod }} {{ existence.name }} </td>
          <td align="right" lass="px-6 py-3">{{ existence.inputs }}</td>
          <td align="right" class="px-6 py-3">{{existence.outputs }}</td>
          <td align="right" class="px-6 py-3">{{existence.reverse_inputs }}</td>
          <td align="right" class="px-6 py-3">{{existence.reverse_outputs }}</td>
          <td align="right" class="px-6 py-3">{{existence.total }}</td>
        </tr>
      </tbody>
    </table>    
  </div>
</template>
