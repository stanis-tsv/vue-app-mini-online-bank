<template>
  <form class="card" @submit.prevent="regSubmit">
    <h1>Реєстрація в системі</h1>

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

    <button class="btn primary" :disabled="isSubmitting">Зареєструватись</button>
    <router-link to="/auth">Увійти</router-link>
  </form>
</template>

<script>
import { useLoginForm } from '../use/login-form'
export default {
  setup() {
    return {...useLoginForm()}
  }
}
</script>

<style>

</style>