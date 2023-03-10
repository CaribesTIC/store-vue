<script setup lang="ts">

</script>

<template>  
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
</template>



