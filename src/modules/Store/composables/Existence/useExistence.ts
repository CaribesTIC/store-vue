import {ref} from "vue"

type Existence = {
  article_id: number;
  inputs: number;  
  outputs: number;
  reverse_inputs: number;
  reverse_outputs: number;
  total: number;

}
export default () => {
  const existences = ref<Existence[]>([
    {
      article_id: 3,
      inputs: 10,  
      outputs: 0,
      reverse_inputs: 0,
      reverse_outputs: 0,
      total: 10
    }, {
      article_id: 4,
      inputs: 10,  
      outputs: 0,
      reverse_inputs: 0,
      reverse_outputs: 0,
      total: 10
    }, {
      article_id: 2,
      inputs: 10,  
      outputs: 5,
      reverse_inputs: 0,
      reverse_outputs: 0,
      total: 5
    }, {
      article_id: 1,
      inputs: 20,  
      outputs: 5,
      reverse_inputs: 0,
      reverse_outputs: 0,
      total: 15
    }
  ]);

  return {
    existences
  }
}



