<script lang="ts">
import { defineComponent } from 'vue'
import { getCategoriesChildren, insertCategory } from "../../services/CategoryService"
//import AppLoadingButton from '@/components/AppLoadingButton.vue'
export default defineComponent({
  components: {    
    //AppLoadingButton,
  }, 
  data() {
    return {
      menus: [],
      selVal : 0,
      selTexs : [],
      nivel: 0,
      isDisabled: false,
      form: {
        name: '',
        parent_id: 0        
      }   
    }
  },
  created: function() {
    this.stepFrontward(0);
  },    
  methods: {
    validateForm() {
      let element = document.querySelector("input:invalid");
      return element === null ? true : false;
    },         
    closeModal: function () {
      this.$emit('closeModal');
    },
    showSelected: function () {
      let menu = (this.menus.find(element => element.id === this.selVal));
      this.selTexs.push({ 
        nivel: this.nivel,
        name: menu.name,
        id   : menu.parent_id 
      });
    },   
    stepFrontward: function (menuId = 0, step = true ) {
      menuId= !menuId ? 0 : menuId;      
      getCategoriesChildren(menuId).then((res) => {
        if (step) {
            if (this.selVal) {                    
              this.showSelected();
              this.nivel++;
              this.form.parent_id = this.selVal;
            }
          } else {
            this.nivel--;
            this.form.parent_id = res.data[0].parent_id;
          }
          this.menus = [ {id:0 , name:'Seleccione...'} ].concat(res.data);
          this.selVal = 0;          
      })
    },
    stepBackward: function (id) {
      this.selTexs.pop();
      this.stepFrontward(id, false);
    },
    fastBackward: function (id) {
      this.nivel = 0;
      this.selTexs = [];
      this.stepFrontward(0);
    },
    async submit(){
      console.log(this.form)
      //sending.value= true
      return await insertCategory(this.form)
        .then((response) => {          
          this.$router.push( { path: '/categories' } );
            //this.closeModal111()
            //window.location.reload()
            this.$emit('loadTable');
            this.$emit('closeModal');
            alert( response.data.message );
          
        })
        .catch((err) => {                
          console.log( err.response.data );
          //errors.value = getError(err)
        })
        //.finally(() => {
        //  //sending.value = false
        //});
    }
  }
})
</script>

<template>
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 transition-opacity">
      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>
    <!-- This element is to trick the browser into centering the modal contents. -->
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>​
    <div
      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline">      
      <form @submit.prevent="submit">
        <div class="bg-base-200 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

          <table style="width: 100%" id="main">
            <thead>
              <tr>
                <th colspan="2" class="text-center font-bold py-2">Crear Categoría</th>
              </tr>
            </thead>
            <tbody>

            <tr>
              <td colspan="2">
                <table id="id_table_padre" style="width: 100%">
                  <tbody>
                  <tr v-for="(selTex, index) in selTexs" class="font-bold">
                    <td width="50%" class="bg-base-200 py-2">{{ selTex.name }}</td>
                    <td class="bg-base-200 py-2">( nivel {{ selTex.nivel }} )</td>
                    <td class="bg-base-200 py-2">
                      <span 
                        v-if="index==selTexs.length-1"
                        title="Retroceder un paso"
                        style="cursor:pointer"
                        class="glyphicon glyphicon-step-backward"
                        @click="stepBackward(selTex.id)">&lt;</span>
                      <span v-else >&nbsp;</span>
                    </td>
                    <td class="bg-base-200 py-2">                                   
                      <span
                        v-if="index==selTexs.length-1 && index!=0"
                        title="Retroceder todos los pasos"
                        class="glyphicon glyphicon-fast-backward"
                        style="cursor:pointer"
                        @click="fastBackward">&lt;&lt;</span>
                      <span v-else >&nbsp;</span>
                    </td>
                  </tr>
                </tbody>
                </table>
              </td>                   
            </tr>
            <tr>
              <td id="id_td_seleccion" width="50%" class="bg-base-200 py-2">Selección (nivel {{ nivel }})</td>
              <td class="py-2">
                <select
                  style="width: 100%;cursor:pointer;"
                  title="Seleccione una opción"
                  v-model="selVal" 
                  @change="stepFrontward(selVal)">
                  <option
                    v-for="(menu,index) in menus" 
                    :value="menu.id" 
                    :xlabel="menu.parent_id"
                    v-bind:selected="index === 0">{{ menu.name }}</option>
                </select>
              </td>
            </tr>
            <tr class="lospare"><td colspan="2"><hr/></td></tr>
            <tr class="lospare">
              <td colspan="2" >
                <!--form method="POST" v-on:submit.prevent="createMenu"-->
                <table width="100%">

                  <tbody>

                  <tr>
                    <td align="left" id="id_td_descripcion" width="50%">
                      Categoría (nivel {{ nivel }})
                    </td>
                    <td>
                      <input
                        type="text"
                        name="menu"
                        class="form-control"
                        v-model="form.name"
                        placeholder="Categoría..." />
                    </td>
                  </tr>                  
                  <!--tr>
                    <td align="center" colspan="2">
                      <input type="submit" class="btn btn-primary" value="Guardar">
                      <span v-for="error in errors" class="text-danger">@{{ error }}</span>
                    </td>
                  </tr-->

                  </tbody>


                </table>
                <!--/form-->
              </td>
            </tr>
          </tbody>           

          </table>
        
        </div>
        <div class="bg-base-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <!--loading-button :loading="sending" class="btn-indigo ml-auto" type="submit">
	    Update Organization
	  </loading-button-->
          <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button
              type="submit"              
              class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              Crear
            </button>
          </span>
          <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button	          
	          @click="closeModal"
	          type="button"
	          class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">Cancelar</button>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>
