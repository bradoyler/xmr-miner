/* global CoinHive */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const stats = {}
App.opts = { threads: 1, throttle: 0.75 }

function hashFound (ev) {
  const { job_id, result, hashes } = ev // hashesPerSecond
  store.commit('addNode', {id: result, name: hashes, _size: hashes, job_id})
  store.commit('addMessage', `Found ${hashes} hashes!`)
}

function hashAccepted (ev) {
  // const { job_id, result, hashes } = ev // hashesPerSecond
  // store.commit('addNode', {id: result, name: hashes, _size: hashes, job_id})
  store.commit('addMessage', `Accepted ${ev.hashes} hashes!`)
}

function newJob (ev) {
  store.commit('addMessage', `New job @ ${Math.round((1 - ev.throttle) * 100)}% power`)
}

// function setThrottle (throttle) {
//   App.miner.setThrottle(throttle)
//   store.commit('addMessage', `Throttled to: ${(1 - throttle) * 100}% power`)
// }

const CH = CoinHive
App.miner = new CH.Anonymous('s0N1th4I4ElExw1U3JlqGVTjZR428Nyq', App.opts)
App.miner.on('error', ev => console.log({ error: ev }))
App.miner.on('open', ev => console.log({ state: 'started', ev }))
App.miner.on('close', ev => console.log({ state: 'closed' }))
App.miner.on('found', ev => hashFound(ev))
App.miner.on('job', ev => newJob(ev))
App.miner.on('accepted', ev => hashAccepted(ev))
App.miner.start()

function updateStats () {
  stats.hashesPerSecond = App.miner.getHashesPerSecond()
  stats.totalHashes = App.miner.getTotalHashes(true)
  stats.acceptedHashes = App.miner.getAcceptedHashes()
  stats.throttle = App.miner.getThrottle()
  stats.power = `${((1 - stats.throttle).toFixed(2) * 100)}%`
  stats.hashRate = `${stats.hashesPerSecond.toFixed(1)}/sec`
  // App.miner.setThrottle(App.opts.throttle)
  store.commit('updateStats', stats)
}

setInterval(updateStats, 500)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
