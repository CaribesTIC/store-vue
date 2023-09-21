import { onMounted, reactive, ref, computed } from 'vue'
import useHttp from "@/composables/useHttp";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import ArticleService from "../../services/Article"

import type { Article } from "../../types/Article"

// import { ascBubble } from "@/utils/helpers";

export default (article: Article) => {
  

  const form = reactive({
    int_cod: article.int_cod, 
    name: article.name, 
    price: article.price, 
    stock_min: article.stock_min, 
    stock_max: article.stock_max, 
    status: article.status, 
    photo: article.photo, 
    id_user_insert: article.id_user_insert, 
    id_user_update: article.id_user_update, 
  })

  const {
    errors,
    pending,

    getError
  } = useHttp()

  onMounted(() => {









    











    /*pending.value = true
    CategoryService.getCategoriesSelect()
      .then((response) => {
        categories.value = response.data.map(function (c) {
          return {
            id: c.id,
            name: c.family
          }
        }).sort(ascBubble)
      })
      .catch((err) => {
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })

    pending.value = true
    MarkService.getMarksSelect()
      .then((response) => {
        marks.value = response.data.sort(ascBubble)
      })
      .catch((err) => {
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })

    pending.value = true
    CommonService.getMeasureUnitTypes()
      .then((response) => {
        measureUnitTypes.value = response.data.map(function (mut) {
          return {
            id: mut.id,
            name: mut.description
          }
        }).sort(ascBubble)
      })
      .catch((err) => {
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false;
      })*/
  })

  const rules = computed(() => {
    return {
      int_cod: {
        required: helpers.withMessage("Campo requerido", required),
      },
      name: {
        required: helpers.withMessage("Campo requerido", required),
      },
      price: {
        required: helpers.withMessage("Campo requerido", required),
      },
      stock_min: {
        required: helpers.withMessage("Campo requerido", required),
      },
      stock_max: {
        required: helpers.withMessage("Campo requerido", required),
      },
      status: {
        required: helpers.withMessage("Campo requerido", required),
      },
      photo: {
        required: helpers.withMessage("Campo requerido", required),
      },
      id_user_insert: {
        required: helpers.withMessage("Campo requerido", required),
      },
      id_user_update: {
        required: helpers.withMessage("Campo requerido", required),
      },
    }
  })

  const v$ = useVuelidate(rules, form);

  return {
      form,
    errors,
    pending,

    v$      
  }
}
