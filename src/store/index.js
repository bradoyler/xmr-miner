import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'

Vue.use(Vuex)

const state = {
  difficulty: 46272805830,
  blockReward: 5.61,
  throttle: 0.95,
  user: 'Admin',
  stats: [{}],
  nodes: [{ id: 0, name: 'start', _color: 'orange' }],
  messages: ['booting up...'],
  minerProgress: 100
}

export default new Vuex.Store({
  state,
  mutations
})
