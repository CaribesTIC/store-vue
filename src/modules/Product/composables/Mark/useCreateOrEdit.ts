import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useHttp from "@/composables/useHttp";
import * as MarkService from "@/modules/Product/services/MarkService";
import type User from "../../types/Mark"

export default (markId?: string) => {
  const router = useRouter();
  
  const mark: Mark = reactive({    
    name: ""
  })
  
  const {  
    errors,
    sending,
    loading,

    getError
  } = useHttp()
  
  onMounted(async () => {
    if (markId) {
      loading.value = true
      MarkService.getMark(markId)
        .then((response) => {              
          mark.name = response.data.data.name          
        })
        .catch((err) => {        
          errors.value = getError(err)
        })
        .finally(() => {
          loading.value = false;
        })
    }
  })

  const insertMark = async (mark: Mark) => {  
    sending.value = true
    return MarkService.insertMark(user)
      .then((response) => {         
        alert( response.data.message )
        router.push( { path: '/marks' } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        sending.value = false
      })
  }

  const updateMark = async (mark: Mark, markId: string) => {
    sending.value= true
    return MarkService.updateMark(markId, mark)
      .then((response) => {
        alert( response.data.message )
        router.push( { path: '/marks' } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        sending.value = false
      })
  }
  
  const submit = (mark: Mark, markId?: string) => {  
    !markId ? insertMark (mark)  : updateMark(user, markId)
  }

  return {
    mark,
    errors,    
    sending,
    loading,
    router,

    submit    
  }

}
