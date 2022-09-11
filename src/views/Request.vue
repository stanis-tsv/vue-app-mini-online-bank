<template>
  <app-loader v-if="loading"></app-loader>
  <app-page back title="Заявка" v-else-if="request">
    <p><strong>Ім'я власника</strong>: {{ request.pib }}</p>
    <p><strong>Телефон</strong>: {{ request.phone }}</p>
    <p><strong>Сума</strong>: {{ currency(request.amount) }}</p>
    <p><strong>Статус</strong>: <app-status :type="request.status" /></p>

    <div class="form-control">
      <label for="status">Статус</label>
      <select id="status" v-model="status">
        <option value="active">Активний</option>
        <option value="pending">Виконується</option>
        <option value="done">Завершений</option>
        <option value="cancelled">Відмінений</option>
      </select>
    </div>

    <button class="btn danger" @click="remove">Видалити</button>
    <button class="btn" @click="update" v-if="hasChanges">Оновити</button>
  </app-page>
  <h3 v-else class="text-center text-white">
    Заявки з ID = {{$route.params.id}} не існує
  </h3>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import AppLoader from '@/components/ui/AppLoader'
import AppStatus from '@/components/ui/AppStatus'
import {currency} from '../utils/currency'
export default {
	components: { AppPage, AppLoader, AppStatus },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const status = ref()
    const loading = ref(true)
    const request = ref({})


    onMounted(async () => {
      loading.value = true
      request.value = await store.dispatch('request/loadOne', route.params.id)
      status.value = request.value?.status
      loading.value = false
    })

    const hasChanges = computed(() => request.value.status !== status.value)

    const remove = async () => {
      await store.dispatch('request/remove', route.params.id)
      router.push('/')
    }

    const update = async () => {
      const data = {...request.value, status: status.value, id: route.params.id}
      await store.dispatch('request/update', data)
      request.value.status = status.value
    }

    return {
      loading, request, currency, remove, update, status, hasChanges
    }
  }
}
</script>

<style>

</style>