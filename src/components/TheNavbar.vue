<template>
  <nav class="navbar">
    <h3>Онлайн Банк</h3>

    <ul class="navbar-menu">
      <li>
        <router-link to="/">Заявки</router-link>
      </li>
      <li>
        <router-link to="/help">Допомога</router-link>
      </li>
      <li>
        <a href="#" @click.prevent="open">Повідомлення</a>
      </li>
      <li class="icon">
        <i class="fa-solid fa-user"></i>
        <strong>{{ user }}</strong>
      </li>
      <li>
        <a href="#" @click.prevent="logout">Вихід</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup() {
    const router = useRouter()
    const store = useStore()

    const user = computed(() => localStorage.getItem('email'))

    return {
      user,
      logout: () => {
        store.commit('auth/logout')
        router.push('/auth')
      },
      open: () => store.commit('openSidebar')
    }
  }
}
</script>

<style>
  .icon i {
    margin-right: 10px;
    color: #2c3e50;
  }
  .icon strong {
    color: #42b983;
  }
</style>