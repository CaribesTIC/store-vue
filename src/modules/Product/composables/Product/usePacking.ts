import { ref, reactive, onMounted, computed } from "vue"
import CommonService from "../../services/CommonService"

export default (measureUnit) => {
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
        //errors.value = getError(err)
      })
      .finally(() => {
        //pending.value = false;
      })
  })

  let n = 0, i = 0;
  const aConect = [ ' DE ', ' CON ' ];    

  const cleanAfter  = ()=> {        
    form.quantity = 0
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
    form.packing_json = [];
  }

  const lastPacking = computed(()=> form.packing_description.split(" ")[0])

  const labelOfquantity = computed(()=> "Cantidad de " + (form.packing_description=="" ? measureUnit : lastPacking.value))

  return {
    containers,
    form,
    labelOfquantity,

    add,
    remove
  }
}
