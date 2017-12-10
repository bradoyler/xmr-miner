/* global CoinHive */
import getTS from './modules/getTS'

const App = { stats: {}, miner: {} }
const logInterval = 5000

function log (obj) {
  const ts = getTS()
  App.$console.prepend(`${ts} - ${JSON.stringify(obj)} \n`)
}

function updateStats () {
  App.stats.hashesPerSecond = App.miner.getHashesPerSecond()
  App.stats.totalHashes = App.miner.getTotalHashes()
  App.stats.acceptedHashes = App.miner.getAcceptedHashes()
  App.stats.rate = `${App.stats.hashesPerSecond.toFixed(1)}/sec`
  App.$totals.html(`H/s: ${Math.round(App.stats.hashesPerSecond)}, Total: ${App.stats.totalHashes}`)
}

function initApp () {
  const opts = { threads: 1, throttle: 0.9 }
  App.$options = $('#options')
  App.$totals = $('#totals')
  App.$console = $('#console')
  App.$options.html(`Threads: ${opts.threads}, Throttle: ${opts.throttle * 100}%`)
  const CH = CoinHive
  App.miner = new CH.Anonymous('s0N1th4I4ElExw1U3JlqGVTjZR428Nyq', opts)
  App.miner.start()
  App.miner.on('error', function (ev) { log({ error: ev }) })
  App.miner.on('found', function (ev) { log({ found: ev.hashes }) })
  App.miner.on('accepted', function (ev) { log({ accepted: ev.hashes }) })

  updateStats()
  log({started: true})
}

$(function () {
  initApp()

  setInterval(() => {
    updateStats()
    const { rate } = App.stats
    log({ rate })
  }, logInterval)
})
