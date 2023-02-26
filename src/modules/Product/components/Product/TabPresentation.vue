<script setup lang="ts">
import {ref, computed, inject} from "vue"
import ModalPacking from '../../components/Product/ModalPacking.vue'

const isOpenPanel = ref(false)
const isOpenModal = ref(false)

const OpenOrCloseButton = computed(()=> isOpenPanel.value ? "Cerrar" : "Abrir")
const OpenOrCloseClass = computed(()=> isOpenPanel.value ? "btn-default" : "btn-primary")

const { measureUnit } = inject('measureUnit')
</script>

<template>
  <div class="demo-tab"> {{measureUnit}}   
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
              <input type="radio"
                     id="id_sale_type_major"
                     name="sale_type"               
                     value="t" checked> Mayor<br/>
              <input type="radio"
                     id="id_sale_type_detail"
                     name="sale_type"              
                     value="f"> Detal
            </td>
            <td><label>Empaque</label>
              <input type="hidden" 
                     name="packing" 
                     id="packing">
              <textarea id="packing_deployed"
                        name="packing_deployed"
                        type="text"
                        autocomplete="off"
                        style="width: 98%;"
                        @focus="isOpenModal = !isOpenModal"
                        data-format="uppercase"
                        data-constraints=""
                        data-validation="required"
                        readonly
                        placeholder='SELECCIONE...'></textarea>
            </td>
          </tr>
          <tr>
            <td><label>Código Interno</label>
              <input id="int_cod"
                     name="int_cod"
                     type="text"
                     autocomplete="off"
                     style="width: 98%;">
            </td>
            <td><label>Código de Barra</label>
              <input id="bar_cod"
                     name="bar_cod"
                     type="text"
                     autocomplete="off"
                     style="width: 98%;">
            </td>
          </tr>
          <tr>
            <td><label>Stock Mínimo</label>
              <input id="stock_min"
                     name="stock_min"
                     type="text"
                     autocomplete="off"
                     style="width: 98%;">
            </td>
            <td><label>Stock Máximo</label>
              <input id="stock_max"
                     name="stock_max"
                     type="text"
                     autocomplete="off"
                     style="width: 98%;">
            </td>
          </tr>          
          <tr>
            <td><label>Precio</label>
              <input id="price"
                     name="price"
                     type="text"
                     autocomplete="off"
                     style="width: 98%;">
            </td>
            <td><label>Estatus</label><br/>              
              <input type="radio"
                     id="id_status_active"
                     name="status"               
                     value="t" checked>Activo<br/>
              <input type="radio"
                     id="id_status_inactive"
                     name="status"              
                     value="f">Inactivo
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



