import axios from 'axios'
import {error} from '../../utils/error'
const tokenKey = 'jwt-token'

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(tokenKey)
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem(tokenKey, token)
    },
    logout(state) {
      state.token = null
      localStorage.removeItem(tokenKey)
      localStorage.removeItem('email')
      localStorage.removeItem('localId')
    }
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      try {
        const {data} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`, {...payload, returnSecureToken: true})
        commit('setToken', data.idToken)
        localStorage.setItem('email', data.email)
        localStorage.setItem('localId', data.localId)
        commit('clearMessage', null, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: error(e.response.data.error.message),
          type: 'danger'
        }, {root: true})
        throw new Error()
      }
    },
    async register({ commit, dispatch }, payload) {
      try {
        const {data} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`, {...payload, returnSecureToken: true})
        commit('setToken', data.idToken)
        localStorage.setItem('email', data.email)
        localStorage.setItem('localId', data.localId)
        commit('clearMessage', null, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: error(e.response.data.error.message),
          type: 'danger'
        }, {root: true})
        throw new Error()
      }
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    isAuthenticated(_, getters) {
      return !!getters.token
    }
  }
}