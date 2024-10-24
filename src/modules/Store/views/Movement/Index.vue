<script setup lang="ts">

// @ts-nocheck
import useIndex from "../../composables/Movement/useIndex";
import AppPaginationD from "@/components/AppPaginationD.vue";
import AppPageHeader from "@/components/AppPageHeader.vue"
import AppBtn from "@/components/AppBtn.vue"

const {
  errors,
  data,
  router,
  route,
  routePath,

  deleteRow,
  setSearch,
  setSort  
} = useIndex()



/*const title = computed(
*  () => route.name.replace('movements-', '').toUpperCase()
)*/


</script>

<template>
<div>
  <AppPageHeader> {{routePath.toLocaleUpperCase()}} </AppPageHeader>

  <div class="flex space-x-2">
    <AppLink class="btn btn-primary" :to="`/${routePath}/create`">
      <span>Crear</span>
    </AppLink>
  </div>
    
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
            
              <th class="">
                <AppLink to="#" @click.prevent="setSort('id')">id</AppLink>
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('number')">type_id</AppLink>
              </th>
              
              <th class="">
                <AppLink to="#" @click.prevent="setSort('type_id')">number</AppLink>
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('date_time')">date_time</AppLink>
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('subject')">subject</AppLink>
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('description')">description</AppLink>
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('observation')">observation</AppLink>
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('close')">close</AppLink>
              </th>
              
              <th class="">
                <AppLink to="#" @click.prevent="setSort('support_number')">support_number</AppLink>
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('support_date')">support_date</AppLink>
              </th>
              
              
              
              <th class="">
                <AppLink to="#" @click.prevent="setSort('editing')">editing</AppLink>
              </th>
                                     
            <th class="">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in data.rows" :key="row.id" class="">
             <td class="">
              <AppLink
                class="text-indigo-600 hover:text-indigo-800 underline"
                :to="{ path: `/${routePath}/edit/${row.id}`, params: { id: row.id }}"
              >
                {{ row.id }}
              </AppLink>
            </td>
            <td class="">
              {{ row.type_id }}
            </td>
            <td class="">
              {{ row.number }}
            </td>
            <td class="">
              {{ row.date_time }}
            </td>
            <td class="">
              {{ row.subject }}
            </td>
            <td class="">
              {{ row.description }}
            </td>
            <td class="">
              {{ row.observation }}
            </td>
            <td class="">
              {{ row.close }}
            </td>
            <td class="">
              {{ row.support_number }}
            </td>
            <td class="">
              {{ row.support_date }}
            </td>
            <td class="">
              {{ row.editing }}
            </td> 
            <td class="">
              <div class="flex items-center space-x-1">                
                <AppBtn
                  class="btn btn-primary btn-xs"                    
                  @click="router.push({ path: `/${routePath}/edit/${row.id}` })"
                >
                  Editar
                </AppBtn>
                <AppBtn
                  @click="deleteRow(row.id)"                    
                  class="btn btn-danger btn-xs"                    
                >
                  Eliminar
                </AppBtn>
              </div>
            </td>
          </tr>
          <tr v-if="data.rows.length === 0">
            <td class="" colspan="4">Movements not found.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <span v-if="Object.keys(errors).length > 0" class="text-red-500">{{ errors }}</span>
    <AppPaginationD v-if="data.links" :links="data.links" />      
  </div>
</div>
</template>
