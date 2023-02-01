<script setup lang="ts">
import {ref} from "vue"

const isOpen = ref()
</script>

<template>
  <div class="demo-tab">    
    <div class="form-group row">
  <div class="col-sm-12">
    <div  align="center">    
      <div>
        <table style="cursor:pointer;"  @click="isOpen=!isOpen">
          <tr>
            <td>
              <div class="subtitulo_datos">Agregar Presentación</div>
            </td>
            <td>
              <div id="id_img_presentacion" title="Mostrar Panel" class="img_show"></div>
            </td>
          </tr>
        </table>
      </div><br/>
      <div id="id_panel_presentacion" v-if="isOpen">
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
        <div style="margin-bottom:2%">
          <button id="addReg" type="button" class="btn btn-primary" onClick="Product.Presentation.valEnvio();">Agregar</button>
        </div>
      </div>     
      <table id="id_tab_presentacion" class="table table-striped table-bordered compact" width="100%">
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
</div>
</template>
