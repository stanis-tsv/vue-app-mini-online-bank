<template>
  <component :is="layout + '-layout'" v-if="layout" />
</template>

<script>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import AuthLayout from './layout/AuthLayout'
import MainLayout from './layout/MainLayout'

export default {
	components: { MainLayout, AuthLayout },
  setup() {
    const route = useRoute()
    return {
      layout: computed(() => route.meta.layout)
    }
  },
}
</script>


<style>
</style>
