import { computed, type PropType } from 'vue'

export default (props) => {
  const isErrorShowIt = computed(
    () =>
      (field: string): string =>
        props.errors && props.errors[field] ? props.errors[field][0] : ''    
  )

  return { isErrorShowIt }
}
