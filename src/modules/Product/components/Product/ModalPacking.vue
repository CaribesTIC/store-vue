<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue"
import CommonService from "../../services/CommonService"

const props = defineProps<{
  measureUnit: string
}>()

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

const cleanAfter  = ()=> {        
  form.quantity = ""
  form.packing = ""
}

const add = ()=> {
  let concatena1 = `${form.packing} ${aConect[n++]} ${form.quantity} `
  let concatena2 = ((form.packing_description.trim() == "")
        ? "Kilos"//element.medidaUnidad.[element.medidaUnidad.selectedIndex].text
          : form.packing_description);
  form.packing_description = concatena1 + concatena2;    
  form.packing_json[i++] = `{"packing":"${form.packing}","quantity":${form.quantity}}`;
  if (n == 2) n = 0;
  cleanAfter()  
}

const remove = ()=> {      
  cleanAfter()   
  form.packing_description = "";
  form.packing_json = "";
}

const lastPacking = computed(()=> form.packing_description.split(" ")[0])

const labelOfquantity = computed(()=> "Cantidad de " + (form.packing_description=="" ? props.measureUnit : lastPacking.value))


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
                :label=labelOfquantity
                type="number"
                error=""
              />
            </div>
            
            <div class="block">
              <AppSelect
                ref="xyz"
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
