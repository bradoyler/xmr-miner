import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'

Vue.use(Vuex)

const state = {
  throttle: 0.75,
  user: 'Admin',
  stats: [],
  nodes: [{ id: 0, name: 'start', _color: 'orange' }],
  messages: ['starting...']
}

export default new Vuex.Store({
  state,
  mutations
})
