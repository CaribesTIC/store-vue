import { ref, reactive, onMounted, computed } from "vue"
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, numeric, minValue } from "@vuelidate/validators";
import CommonService from "../../services/CommonService"
import useHttp from "@/composables/useHttp"

export default (measureUnit) => {
  const { errors, pending, getError } = useHttp()
  const containers = ref([])
  const form1 = reactive({
    quantity: 0,
    packing: ""
  })
  
  const form2 = reactive({
    packing_description: "",
    packing_json: "",
  })

  onMounted(async () => {
    CommonService.getContainers()
      .then((response) => {        
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
        pending.value = false;
      })
  })  

  const rules1 = computed(() => {
    return {
      quantity: {
        required: helpers.withMessage("Campo requerido", required),         
        minValue: helpers.withMessage("El valor mínimo permitido es 1", minValue(1)) 
      },
      packing: {
        required: helpers.withMessage("Campo requerido", required),
      }      
    };
  });  
  
  const rules2 = computed(() => {
    return {      
      packing_description: {
        required: helpers.withMessage("Campo requerido", required),
      },
      packing_json: {
        required: helpers.withMessage("Campo requerido", required),
      }
    };
  });
  

  const v1$ = useVuelidate(rules1, form1);
  const v2$ = useVuelidate(rules2, form2);

  let n = 0, i = 0, packingJson = []
  const aConect = [ ' DE ', ' CON ' ] 

  const cleanAfter  = ()=> {        
    form1.quantity = 0
    form1.packing = ""    
    v1$.value.$reset()
  }

  const add = async ()=> {
    const result = await v1$.value.$validate();
    if (result) {
      let concatena1 = `${form1.packing} ${aConect[n++]} ${form1.quantity} `
      let concatena2 = ((form2.packing_description.trim() === "")
        ? measureUnit
          : form2.packing_description)
      form2.packing_description = concatena1 + concatena2
      //form2.packing_json[i++] = `{"packing":"${form1.packing}","quantity":${form1.quantity}}`
      packingJson[i++] = `{"packing":"${form1.packing}","quantity":${form1.quantity}}`
      form2.packing_json = `[${packingJson}]`
      if (n == 2)
        n = 0;
      cleanAfter()
    }  
  }  

  const remove = ()=> {      
    cleanAfter()   
    form2.packing_description = "";
    form2.packing_json = "";
  }

  const lastPacking = computed(()=> form2.packing_description.split(" ")[0])

  const labelOfquantity = computed(()=> "Cantidad de " + (form2.packing_description=="" ? measureUnit : lastPacking.value))

  return {
    containers,
    form1,
    form2,
    labelOfquantity,

    add,
    remove,
    v1$,
    v2$
  }
}
