<script setup lang="ts">
// @ts-nocheck
import ExistenceTable from "@/modules/Store/components/Existence/Table.vue"
//import useIndex from "@/modules/Store/composables/Existence/useIndex";
import useExistence from "@/modules/Store/composables/Existence/useExistence"
import AppPaginationB from "@/components/AppPaginationB.vue";
import AppPageHeader from "@/components/AppPageHeader.vue"
import AppBtn from "@/components/AppBtn.vue"

const {
  errors,
  data,
  router,

  setSearch,
  setSort  
} = useExistence()
</script>

<template>
<div>
  <AppPageHeader> Stock </AppPageHeader>
  
  <div class="overflow-hidden panel mt-6">      
    <div class="mb-6 flex justify-between items-center">
      <div class="flex items-center">
        <div class="flex w-full bg-white shadow rounded">
          <input
            class=""
            type="text"
            v-model="data.search"
            @input="setSearch"
            placeholder="Filtrar…"
          />
        </div>
      </div>
    </div>      
    <div class="table-data__wrapper">
      <table class="table-data">
        <thead>
          <tr class="">            
              <th class=""><AppLink to="#" @click.prevent="setSort('id')">Id</AppLink></th>
              <th class=""><AppLink to="#" @click.prevent="setSort('int_cod')">Código Interno</AppLink></th>
              <th class=""><AppLink to="#" @click.prevent="setSort('name')">Artículo</AppLink></th>
              <th class=""><AppLink to="#" @click.prevent="setSort('stock_current')">Stock Actual</AppLink></th>
              <th class=""><AppLink to="#" @click.prevent="setSort('accumulated')">Acumulados Ùltimo Cierre</AppLink></th>
              <th class=""><AppLink to="#" @click.prevent="setSort('reverse_inputs')">Reverso Entradas</AppLink></th>
              <th class=""><AppLink to="#" @click.prevent="setSort('inputs')">Entradas</AppLink></th>
              <th class=""><AppLink to="#" @click.prevent="setSort('reverse_outputs')">Reverso Salidas</AppLink></th>
              <th class=""><AppLink to="#" @click.prevent="setSort('outputs')">Salidas</AppLink></th>
              <th class=""><AppLink to="#" @click.prevent="setSort('stock_min')">Stock Mín</AppLink></th>
              <th class=""><AppLink to="#" @click.prevent="setSort('stock_max')">Stock Máx</AppLink></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in data.rows" :key="row.id" class="">
            <td class="">{{ row.id }}</td>
            <td class="">{{ row.int_cod }}</td>
            <td class="">{{ row.name }}</td>
            <td class="">{{ row.stock_current }}</td>
            <td class="">{{ row.accumulated }}</td>
            <td class="">{{ row.reverse_inputs }}</td>
            <td class="">{{ row.inputs }}</td>
            <td class="">{{ row.reverse_outputs }}</td>
            <td class="">{{ row.outputs }}</td>
            <td class="">{{ row.stock_min }}</td>
            <td class="">{{ row.stock_max }}</td>
          </tr>
          <tr v-if="data.rows.length === 0">
            <td class="" colspan="4">Stocks no encontrados.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <span v-if="Object.keys(errors).length > 0" class="text-red-500">{{ errors }}</span>
    <AppPaginationB v-if="data.links" :links="data.links" />      
  </div>
</div>
</template>
