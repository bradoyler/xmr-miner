/* global CoinHive */

const stats = {}
let miner = {}

function getTS () {
  const dd = new Date()
  const hour = (dd.getHours() < 10 ? '0' : '') + dd.getHours()
  const min = (dd.getMinutes() < 10 ? '0' : '') + dd.getMinutes()
  const sec = (dd.getSeconds() < 10 ? '0' : '') + dd.getSeconds()
  return `${hour}:${min}:${sec}`
}

function log (obj) {
  const ts = getTS()
  $('#console').prepend(`${ts} - ${JSON.stringify(obj)} \n`)
}

function updateStats () {
  stats.hashesPerSecond = miner.getHashesPerSecond()
  stats.totalHashes = miner.getTotalHashes()
  stats.acceptedHashes = miner.getAcceptedHashes()
  $('#totals').html('H/s: ' + Math.round(stats.hashesPerSecond) + ', Total hashes: ' + stats.totalHashes)
}

function initMiner () {
  const opts = { threads: 1, throttle: 0.9 }
  $('#options').html(`Threads: ${opts.threads}, Throttle: ${opts.throttle * 100}%`)
  var CH = CoinHive
  miner = new CH.Anonymous('s0N1th4I4ElExw1U3JlqGVTjZR428Nyq', opts)
  miner.start()
  miner.on('found', function (ev) { log({ foundHashes: ev.hashes }) })
  miner.on('accepted', function (ev) { log({ accepted: ev.hashes }) })
}

$(function () {
  initMiner()
  updateStats()
  log(stats)
  setInterval(() => {
    updateStats()
    log(stats)
  }, 5000)
})
