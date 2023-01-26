<script lang="ts">
// @ts-nocheck
import { defineComponent } from 'vue'
//import * as MenuService from "@/modules/Authorization/services/MenuService"
import ProductService from "../../services"
import AppPaginationB from "@/components/AppPaginationB.vue";
import AppPageHeader from "@/components/AppPageHeader.vue"
import Create from './Create.vue'
import Edit from './Edit.vue'

export default defineComponent({  
  metaInfo: { title: 'Menus' },
  components: {    
    AppPaginationB,
    AppPageHeader,
    Create,
    Edit,    
  },
  data() {
    return {
      // editMode: false,
      isOpenCreate: false,
      isOpen: false,
      menu: {},
      menus: {},
      //links: {},
    }
  },
  async mounted (){
    const response = await  ProductService.getCategories();
    this.menus = response.data
  },
  
  methods: {
    openModalCreate: function () {
      this.isOpenCreate = true;
    },
    openModal: function () {
      this.isOpen = true;
    },
    closeModalCreate: function () {
      this.isOpenCreate = false;
    },
    closeModal: function () {
      this.isOpen = false;
      //this.reset();
      //this.editMode=false;
    },
    edit: function (data) {      
      //this.editMode = true;
      this.menu=data;
      this.openModal();
    },
    async remove(id) {
      if (id === undefined) return;
      if (confirm(`¿Estás seguro de que quieres eliminar el registro ${id}?`)) {
        await MenuService.deleteMenu(id)
        window.location.reload()
      }
    }
  }
})
</script>

<template>
  <div>  
    <AppPageHeader> Categorías </AppPageHeader>
    
    <div class="flex space-x-2">
      <button
        @click="openModalCreate()"
        class="btn btn-primary"
      >
        Crear
      </button>
    </div>
    
    <div class="overflow-hidden panel mt-6">
      <div class="table-data__wrapper">
        <table class="table-data text-xs">
          <thead>
            <tr class=""> 
              <th class="">Arbol de Categorías</th>             
              <th class="">Acción(es)</th>               
            </tr>
          </thead>
        <tbody>              
          <tr v-for="menu in menus" :key="menu.id" class="hover:bg-gray-500 focus-within:bg-gray-400">               
            <td class="">{{ menu.family }}</td>                        
            <td class="">              
              <div class="flex items-center space-x-1">
                <button @click="edit(menu)" class="btn btn-primary btn-xs">
                  Editar
                </button>
                <button @click="remove(menu.id)" class="btn btn-danger btn-xs">
                  Eliminar
                </button>
              </div>
            </td>               
          </tr>                
        </tbody>            
      </table>        
      
      <AppPaginationB :links="menus.links" />
      
      <div class="fixed z-10 inset-0 overflow-y-auto ease-out duration-400" v-if="isOpenCreate">
        <Create @closeModal0="closeModalCreate"/>
      </div>
      <div class="fixed z-10 inset-0 overflow-y-auto ease-out duration-400" v-if="isOpen">
        <Edit :menu="menu" @closeModal1="closeModal"/>
      </div>
      
    </div>
  </div>
  </div>
</template>

