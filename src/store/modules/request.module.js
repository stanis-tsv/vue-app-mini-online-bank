import axios from '../../axios/request'
import store from '../index'

export default {
  namespaced: true,
  state() {
    return {
      requests: []
    }
  },
  mutations: {
    setRequests(state, requests) {
      state.requests = requests
    },
    addRequest(state, request) {
      state.requests.push(request)
    }
  },
  actions: {
    async create({getters, commit, dispatch}, payload) {
      try {
        const token = store.getters['auth/token']
        const {data} = await axios.post(`/requests/${getters.requestId}.json?auth=${token}`, payload)
        commit('addRequest', {...payload, id: data.name})
        dispatch('setMessage', {
          value: 'Заявка успішно створена',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async load({getters, commit, dispatch}) {
      try {
        const token = store.getters['auth/token']
        const {data} = await axios.get(`/requests/${getters.requestId}.json?auth=${token}`)
        if (!data) {
          return 
        }
        const requests = Object.keys(data).map(id => ({...data[id], id}))
        commit('setRequests', requests)
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async loadOne({getters, dispatch}, id) {
      try {
        const token = store.getters['auth/token']
        const {data} = await axios.get(`/requests/${getters.requestId}/${id}.json?auth=${token}`)
        return data
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async remove({getters, dispatch}, id) {
      try {
        const token = store.getters['auth/token']
        await axios.delete(`/requests/${getters.requestId}/${id}.json?auth=${token}`)
        dispatch('setMessage', {
          value: 'Заявка видалена',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async update({getters, dispatch}, request) {
      try {
        const token = store.getters['auth/token']
        await axios.put(`/requests/${getters.requestId}/${request.id}.json?auth=${token}`, request)
        dispatch('setMessage', {
          value: 'Заявка оновлена',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
  },
  getters: {
    requests(state) {
      return state.requests
    },
    requestId() {
      return localStorage.getItem('localId')
    }
  }
}