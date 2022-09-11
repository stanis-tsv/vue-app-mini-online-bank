<template>
  <div class="sidebar" v-if="sidebar">
    <span class="sidebar-close" @click="close">&times;</span>

    <div class="sidebar-content">
      <p>Вітаємо в системі обліку заявок нашого банку. Тут ви знайдете необхідну інформацію про систему і заявки.</p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()

    const sidebar = computed(() => store.state.sidebar)
    
    return {
      sidebar,
      close: () => store.commit('closeSidebar')
    }
  }
}
</script>

<style>

</style>