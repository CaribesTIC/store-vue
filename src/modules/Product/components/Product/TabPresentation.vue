<script setup lang="ts">
import {ref, computed, inject, reactive} from "vue"
import type {Ref} from "vue"

import ModalPacking from '../../components/Product/ModalPacking.vue'

const isOpenPanel = ref(false)
const isOpenModal = ref(false)

const OpenOrCloseButton = computed(()=> isOpenPanel.value ? "Cerrar" : "Abrir")
const OpenOrCloseClass = computed(()=> isOpenPanel.value ? "btn-default" : "btn-primary")

const { measureUnit } = inject<{
    measureUnit: Ref<string>;
}>('measureUnit')

const form = reactive({
  sale_type: 0,
  int_cod: "",
  bar_cod: "",
  packing_deployed: "",
  packing_json: "",
  stock_min: 0,
  stock_max: 0,
  price: "0.0",
  status: 0
})
  
const acceptModal = (payload) => {
  form.packing_deployed = payload.packing_description
  form.packing = payload.packing_json
}

const saleTypeOptions = [
  { label: 'Mayor', value: 0 },
  { label: 'Detal', value: 1 }  
]

const statusOptions = [
  { label: 'Inactivo', value: 0 },
  { label: 'Activo', value: 1 }  
]
</script>

<template>
  <div class="demo-tab">
    <div class="form-group row">
  <div class="col-sm-12">
    <div align="center">    
      <div>
        <table style="cursor:pointer;"  @click="isOpenPanel=!isOpenPanel">
          <tr>
            <td>
              <div class="btn p-8" :class="OpenOrCloseClass">{{ OpenOrCloseButton }} panel para agregar Presentación</div>
            </td>
            <!--td>
              <div id="id_img_presentacion" title="Mostrar Panel" class="img_show"></div>
            </td-->
          </tr>
        </table>
      </div>  
      <br/>
      <div id="id_panel_presentacion" v-if="isOpenPanel" class="bg-base-200 py-4 rounded">
        <input id="id_presentation" name="id_presentation" value="0" type="hidden">
        <table class="table table-striped table-bordered compact" style="width: 75%">
          <tr>
            <th colspan="3" class="table-info text-center">Datos de Presentación</th>
          </tr>            
          <tr>
            <td><label>Tipo de Venta</label><br/>
              <AppRadioGroup
                v-model="form.sale_type"
                name="sale_type"
                :options="saleTypeOptions"
              />
            </td>
            <td>
              <AppTextarea
                label="Empaque"
                v-model="form.packing_deployed"                
                @focus="isOpenModal = !isOpenModal"                
                readonly
              />
              <AppInput
                v-model="form.packing"          
                type="hidden"          
              />                        
            </td>
          </tr>
          <tr>
            <td>
              <AppInput
                label="Código Interno"
                v-model="form.int_cod"                     
                type="text"
              />
            </td>
            <td>
              <AppInput
                label="Código de Barra"
                v-model="form.bar_cod"                     
                type="text"
              />
            </td>
          </tr>
          <tr>
            <td>
              <AppInput
                label="Stock Mínimo"
                v-model="form.stock_min"                     
                type="number"
              />
            </td>
            <td>
              <AppInput
                label="Stock Máximo"
                v-model="form.stock_max"                     
                type="number"
              />
            </td>
          </tr>          
          <tr>
            <td>
              <AppInput
                label="Precio"
                v-model="form.price"                     
                type="text"
              />
            </td>
            <td>            
              <AppRadioGroup
                v-model="form.status"
                name="status"
                :options="statusOptions"
              />
            </td>
          </tr>
        </table>
        <div style="margin:2%">
          <button id="addReg" type="button" class="btn btn-primary" onClick="Product.Presentation.valEnvio();">Agregar</button>
        </div>
      </div>     
      <table id="id_tab_presentacion" class="mt-4" width="100%">
        <thead class="table-success text-center">
          <tr>  
            <th>Venta</th>
            <th>IntCod</th>           
            <th>BarCod</th>            
            <th>Empaque</th>          
            <th>Precio</th>
            <th>StockMin</th>
            <th>StockMax</th>
            <th>Estatus</th>                  
            <th>Acción(es)</th>
          </tr>
        </thead>
        <tbody>
          <!-- BEGIN: tab_presentacion >
          <tr id={ID} class={CLASS_TR}>                
            <td id='{EMPAQUE_JSON}'>{EMPAQUE_DESPLEGADO}</td>
            <td>{PRECIO_COSTO}</td>
            <td>{PRECIO_VENTA}</td>
            <td>{BAR_COD}</td>
            <td>{INT_COD}</td>
            <td>
              <img class="accion"
                   src="../img/edit.png"
                   title="Editar datos..."
                   onclick="Presentation.edit(this);valBtnClose();">
              <img class="accion"
                   src="../img/cross.png"
                   title="Eliminar/Borrar datos..."
                   onclick="Presentation.rqsRemove({ID});valBtnClose();">
            </td>
          </tr>
          <END: tab_presentacion -->
        </tbody>
      </table>
    </div>
  </div>
</div>
<div>

<ModalPacking
  v-if="isOpenModal"
  :measureUnit="measureUnit"
  @closeModal="isOpenModal = false"
  @acceptModal="acceptModal"
/>

</div>
</div>
</template>



<style>

.modal {  
  @apply fixed z-30 pt-28; 
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  
}

.modal-content {
  @apply m-auto w-4/5 sm:w-9/12 md:w-4/6 lg:w-3/6;
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.25s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translate3d(-10vw);
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

</style>



