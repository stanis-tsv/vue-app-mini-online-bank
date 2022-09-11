<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Увійти в систему</h1>

    <div :class="['form-control', {invalid: eError}]">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" @blur="eBlur">
      <small v-if="eError">{{ eError }}</small>
    </div>

    <div :class="['form-control', {invalid: pError}]">
      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="password" @blur="pBlur">
      <small v-if="pError">{{ pError }}</small>
    </div>

    <button class="btn primary" :disabled="isSubmitting || isTooManyAttempts">Увійти</button>
    <router-link to="/register">Зареєструватись</router-link>
    <div class="text-danger" v-if="isTooManyAttempts">
      Забагато спроб входу, спробуйте пізніше
    </div>
  </form>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { error } from '../utils/error'
import { useLoginForm } from '../use/login-form'
export default {
  setup() {
    const route = useRoute()
    const store = useStore()

    if (route.query.message) {
      store.dispatch('setMessage', {
        value: error(route.query.message),
        type: 'warning'
      })
    }
    return {...useLoginForm()}
  }
}
</script>

<style>

</style>