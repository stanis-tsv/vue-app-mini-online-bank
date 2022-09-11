<template>
  <h4 class="text-center" v-if="requests.length === 0">Заявок поки немає</h4>
  <table class="table" v-else>
    <thead>
      <tr>
        <th>#</th>
        <th>ПІБ</th>
        <th>Телефон</th>
        <th>Сума</th>
        <th>Статус</th>
        <th>Дія</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(r, idx) in requests" :key="r.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ r.pib }}</td>
        <td>{{ r.phone }}</td>
        <td>{{ currency(r.amount) }}</td>
        <td><app-status :type="r.status" /></td>
        <td>
          <router-link v-slot="{navigate}" custom :to="{name: 'Request', params: {id: r.id} }">
            <button class="btn" @click="navigate">Відкрити</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {currency} from '../../utils/currency'
import AppStatus from '../ui/AppStatus'
export default {
	components: { AppStatus },
  props: ['requests'],
  setup() {
    return {
      currency
    }
  }
}
</script>

<style>

</style>