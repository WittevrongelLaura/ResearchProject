<template>
    <select v-model="selectedValue" ref="sort" name="sort" id="sort" @change="onSelectChange" class="w-fit mb-4 bg-neutral-600 p-4 pr-4 shadow-md rounded-md hover:bg-neutral-500">
      <option selected value="all">All</option>
      <option value="sedan">Sedan</option>
      <option value="coupe">Coupe</option>
    </select>
    <p>Selected value: {{selectedValue}}</p>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {

  setup(){
    const selectedValue = ref('')
    
    console.log("out")
    const onSelectChange = (e: Event) => {
      console.log("in");
      
      const target = e.target as HTMLSelectElement
      selectedValue.value = target.value
      console.log(target.value)
    }

    return{
      onSelectChange,
      selectedValue
    }
  }  
}
</script>
