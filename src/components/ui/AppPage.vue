<template>
  <div class="breadcrumbs" v-if="back">
    <router-link to="/" class="text-white">Повернутися до списку заявок</router-link>
  </div>
  <div class="card">
    <h1 class="card-title">
      {{ title }}
      <slot name="header" />  
    </h1>

    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    back: {
      type: Boolean,
      required: false
    }
  },
  setup(props) {
    document.title = `${props.title} | Онлайн Банк`
  }
}
</script>

<style>

</style>