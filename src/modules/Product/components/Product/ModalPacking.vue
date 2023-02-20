<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import CommonService from "../../services/CommonService"

const emit = defineEmits<{
  (e: 'closeModal'): void
}>()

const closeModal = () => {
  emit('closeModal')
}

const containers = ref([])

const form = reactive({
  quantity: 0,
  packing: "",
  packing_description: "",
  packing_json: [],
})

onMounted(async () => {
  CommonService.getContainers()
        .then((response) => {
          console.log(response)
          containers.value=response.data.map(function(c) {
          return {
            id: c.description,
            name: c.description
          }
        }).sort(function (a, b) {
          if (a.name > b.name) { return  1; }
          if (a.name < b.name) { return -1; }
          // a must be equal to b
          return 0;
        })
        })
        .catch((err) => {        
          errors.value = getError(err)
        })
        .finally(() => {
          //pending.value = false;
        })
})

let n = 0, i = 0;
const aConect = [ ' DE ', ' CON ' ];    
  
const add = ()=> {
  form.packing_description += `${form.packing} ${aConect[n++]} ${form.quantity}`  
  form.packing_json[i++] = `{"packing":"${form.packing}","quantity":${form.quantity}}`;
  if (n == 2) n = 0;
  //`${empa} ${aConect[n++]} ${cant} `;
}

const remove = ()=> alert(form.packing)
</script>

<template>
  <Teleport to="body">
    <Transition mode="in-out">
      <div class="modal transition duration-150 v-enter-active">        
        <div class="modal-content rounded-lg shadow-xl">
          <span class="close" @click="closeModal">&times;</span>
          <h1 class="text-gray-900 text-xl font-semibold mb-4">Empacar</h1>

          <div class="p-5 grid lg:grid-cols-3 gap-4">

            <div class="block">
              <AppInput
                v-model="form.quantity"
                label="Cantidad"
                type="number"
                error=""
              />
            </div>
            
            <div class="block">
              <AppSelect
                label="Empaque"
                v-model="form.packing"
                :options="containers"
              />
            </div>

            <div class="block mt-5">
              <AppBtn class="btn btn-primary mx-1" @click="add">+</AppBtn>
              <AppBtn class="btn btn-danger mx-1" @click="remove">-</AppBtn>
            </div>
          </div>
          
          <AppTextarea
            label="Descripcción"
            v-model="form.packing_description"
            readonly/>
               
          <AppInput
            v-model="form.packing_json"          
            type="text"          
          />
          
          <div class="flex items-center justify-between mt-4">
            <AppBtn
              type="button"       
              data-testid="submit-btn"
              class="btn btn-primary"
              text="Aceptar"
            />
          </div> 
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
