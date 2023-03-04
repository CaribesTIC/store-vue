<script setup lang="ts">
import usePacking from "../../composables/Product/usePacking"

const props = defineProps<{
  measureUnit: string
}>()

const emit = defineEmits<{
  (e: 'closeModal'): void  
  (e: 'acceptModal'): void
}>()

const closeModal = () => {
  emit('closeModal')
}

const accept = () => {  
  emit('acceptModal', {
    packing_description: form.packing_description,
    packing_json: form.packing_json
  })
  closeModal()
}

const {
  containers,
  form,
  labelOfquantity,

  add,
  remove
} = usePacking(props.measureUnit)
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
            type="hidden"          
          />
          
          <div class="flex items-center justify-between mt-4">
            <AppBtn
              type="button"
              @click="accept"       
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
