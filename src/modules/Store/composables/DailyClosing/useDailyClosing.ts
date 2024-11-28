import { ref, onMounted } from 'vue'

import useHttp from "@/composables/useHttp";

const details = [
  {
      date_time: "2024-11-28 14:06:35", 
      article_id: 1,
      int_cod: "DJEFP9228146823",
      name: "UT",
      quantity_input: 20, 
      quantity_output: 5, 
      quantity_reverse_input: 0,
      quantity_reverse_output: 0
  },  {
      date_time: "2024-11-28 14:06:35", 
      article_id: 2,
      int_cod: "MUKGA3628397079",
      name: "SUNT",
      quantity_input: 10, 
      quantity_output: 5, 
      quantity_reverse_input: 0,
      quantity_reverse_output: 0
  },  {
      date_time: "2024-11-28 14:06:35", 
      article_id: 3, 
      int_cod: "LLONY6167474232",
      name: "QUAE",
      quantity_input: 10, 
      quantity_output: 0, 
      quantity_reverse_input: 0,
      quantity_reverse_output: 0
  },  {
      date_time: "2024-11-28 14:06:35", 
      article_id: 4, 
      int_cod: "OYWLG1890361368",
      name: "ODIT",
      quantity_input: 10, 
      quantity_output: 0, 
      quantity_reverse_input: 0,
      quantity_reverse_output: 0
  }
];

export default () => {  

  const {  
    errors,
    pending,

    getError
  } = useHttp();

  const preDailyClosings = ref([])

  const getPreDailyClosings = async ()=> {
    pending.value = true

    return await new Promise(resolve => setTimeout(() => resolve("foo"), 300))
    .then(() => {
      preDailyClosings.value = details;
    })
    .finally(() => {
      pending.value = false
    })
  }




  const submit = async () => {    
    pending.value = true

    return await new Promise((resolve) => resolve("foo"))
      .then((response) => {         
        //alert( response.data.message )
        //router.push( { path: `/${routePath.value}/edit/${response.data.id}` } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }

  onMounted(()=> getPreDailyClosings())
 
  
  return {
    preDailyClosings,
    errors,
    pending,

    submit
  }
}
