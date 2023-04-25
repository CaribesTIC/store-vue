<script setup lang="ts">
import usePacking from "../../composables/Product/usePacking"
import type { Packing } from "../../types/Packing"

const props = defineProps<{
  measureUnit: string
}>()

const emits = defineEmits<{
  (e: 'closeModal'): void  
  (e: 'acceptModal', payload: Packing): void
}>()

const closeModal = () => {
  emits('closeModal')
}

const accept = async () => {  
  const result = await v2$.value.$validate();
  
  if (result) {  
    emits('acceptModal', {
      packing_description: form.packing_description,
      packing_json: form.packing_json
    })
    closeModal()
  }
}

const {
  containers,
  preForm,
  form,
  labelOfquantity,

  add,
  remove,
  v1$,
  v2$
} = usePacking(props.measureUnit)
</script>

<template>
  <Teleport to="body">
    <Transition mode="in-out">
      <div class="modal transition duration-150 v-enter-active">
        <div class="modal-content rounded-lg shadow-xl bg-base-200">
          <span class="close" @click="closeModal">&times;</span>
          <h1 class="text-xl font-semibold mb-4">Empacar</h1>

          <div class="p-5 grid lg:grid-cols-3 gap-4">

            <div class="block">
              <AppInput
                v-model="preForm.quantity"
                :label=labelOfquantity
                type="number"
                min="1"
                :error="v1$.quantity.$error ? v1$.quantity.$errors[0].$message : null"
              />
            </div>
            
            <div class="block">
              <AppSelect
                ref="xyz"
                label="Empaque"
                v-model="preForm.packing"
                :options="containers"
                :error="v1$.packing.$error ? v1$.packing.$errors[0].$message : null"
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
            :error="v2$.packing_description.$error ? v2$.packing_description.$errors[0].$message : null"
            readonly
          />
               
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

<style scoped>
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
