<template>
  <div class="filter">
    <div class="form-control">
      <input type="text" placeholder="Почніть писати ім'я" v-model="name">
    </div>
    <div class="form-control">
      <select v-model="status">
        <option disabled selected>Виберіть статус</option>
        <option value="active">Активний</option>
        <option value="pending">Виконується</option>
        <option value="done">Завершений</option>
        <option value="cancelled">Відмінений</option>
      </select>
    </div>
    <button class="btn warning" v-if="isActive" @click="reset">Очистити</button>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup(_, {emit}) {
    const name = ref()
    const status = ref()

    watch([name, status], values => {
      emit('update:modelValue', {
        name: values[0],
        status: values[1]
      })
    })

    const isActive = computed(() => name.value || status.value)
    
    return {
      name, 
      status, 
      isActive, 
      reset: () => {
        name.value = ''
        status.value = null
      }
    }
  }
}
</script>

<style>

</style>