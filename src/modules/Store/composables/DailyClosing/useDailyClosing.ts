import { ref, onMounted } from 'vue'
import useHttp from "@/composables/useHttp";
import DaylyClosingServices from '../../services/DaylyClosing';

type xyz = {
  date_time: string;
  article_id: number;
  int_cod: string;
  name: string;
  quantity_input: number;
  quantity_output: number;
  quantity_reverse_input: number;
  quantity_reverse_output: number;
}

export default () => {  

  const {  
    errors,
    pending,

    getError
  } = useHttp();

  const preDailyClosings = ref([])

  const getPreDailyClosings = async ()=> {
    pending.value = true

    DaylyClosingServices.getPreDailyClosings()
    .then((response) => {
      // console.log(response)
      preDailyClosings.value = response.data //as unknown as [];
    })
    .finally(() => {
      pending.value = false
    })
  }

  const submit = async (payload) => {    
    pending.value = true

    DaylyClosingServices.setDailyClosings(payload)
      .then((response) => {
        console.log(response)      
        alert( 'Cierre diario exitoso !!' )
        getPreDailyClosings()
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
