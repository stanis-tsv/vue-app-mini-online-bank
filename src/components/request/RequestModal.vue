<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: pibError}">
      <label for="pib">ПІБ</label>
      <input type="text" id="pib" v-model="pib" @blur="pibBlur">
      <small v-if="pibError">{{ pibError }}</small>
    </div>

    <div class="form-control" :class="{invalid: pError}">
      <label for="phone">Телефон</label>
      <input type="text" id="phone" v-model="phone" @blur="pBlur">
      <small v-if="pError">{{ pError }}</small>
    </div>

    <div class="form-control" :class="{invalid: aError}">
      <label for="amount">Сума</label>
      <input type="number" id="amount" v-model.number="amount" @blur="aBlur">
      <small v-if="aError">{{ aError }}</small>
    </div>

    <div class="form-control">
      <label for="status">Статус</label>
      <select id="status" v-model="status">
        <option value="active">Активний</option>
        <option value="pending">Виконується</option>
        <option value="done">Завершений</option>
        <option value="cancelled">Відмінений</option>
      </select>
    </div>

    <button class="btn primary" :disabled="isSubmitting">Створити</button>
  </form>
</template>

<script>
import { useStore } from 'vuex'
import { useRequestForm } from '../../use/request-form'
export default {
  emits: ['created'],

  setup(_, {emit}) {
    const store = useStore()
    const submit = async values => {
      await store.dispatch('request/create', values)
      emit('created')
    }

    return {
      ...useRequestForm(submit)
    }
  }
}
</script>

<style>

</style>