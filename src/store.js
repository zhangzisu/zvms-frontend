import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    profile: undefined,
    token: undefined,
    isLoading: false
  },
  mutations: {
    profile: (state, payload) => {
      state.profile = payload
    },
    token: (state, payload) => {
      state.token = payload
    },
    loading: (state, payload) => {
      state.isLoading = payload
    }
  },
  actions: {

  },
  plugins: [createPersistedState()]
})
