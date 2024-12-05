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

  const dailyClosing = ref([])
  const getDailyClosing = async ()=> {
    pending.value = true

    DaylyClosingServices.getDailyClosing('2024-11-29')
    .then((response) => {
      //console.log(response)
      dailyClosing.value = response.data //as unknown as [];
    })
    .finally(() => {
      pending.value = false
    })
  }

  const preDailyClosings = ref([])

  const getPreDailyClosings = async ()=> {
    pending.value = true

    return DaylyClosingServices.getPreDailyClosings()
    .then((response) => {
      // console.log(response)
      return response.data;
      //preDailyClosings.value = response.data //as unknown as [];
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
    dailyClosing,

    getDailyClosing,
    preDailyClosings,
    errors,
    pending,

    submit
  }
}
