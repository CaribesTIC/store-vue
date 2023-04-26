import { reactive, computed } from "vue"
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default (measureUnit) => {  
  const form = reactive({
    packing_description: "",
    packing_json: "",
  })
  
  const rules = computed(() => {
    return {      
      packing_description: {
        required: helpers.withMessage("Campo requerido", required),
      },
      packing_json: {
        required: helpers.withMessage("Campo requerido", required),
      }
    };
  });
  
  const v$ = useVuelidate(rules, form);

  let n = 0, i = 0, packingJson = []
  const aConect = [ ' DE ', ' CON ' ] 

  const add = async (payload: { packing: string, quantity: number })=> {
      let concatena1 = `${payload.packing} ${aConect[n++]} ${payload.quantity} `
      let concatena2 = ((form.packing_description.trim() === "")
        ? measureUnit.value
          : form.packing_description)
      form.packing_description = concatena1 + concatena2      
      packingJson[i++] = `{"packing":"${payload.packing}","quantity":${payload.quantity}}`
      form.packing_json = `[${packingJson}]`
      if (n == 2)
        n = 0;  
  }  

  const remove = ()=> { //cleanAfter()   
    form.packing_description = "";
    form.packing_json = "";
  }

  const lastPacking = computed(()=> form.packing_description.split(" ")[0])

  const labelOfquantity = computed(()=> "Cantidad de " + (form.packing_description=="" ? measureUnit.value : lastPacking.value))

  return {
    form,
    labelOfquantity,

    add,
    remove,    
    v$
  }
}
