import store from '../store'
import getTS from './getTS'

const stats = {}
let miner = {}

function hashFound (ev) {
  const { job_id: jobId, result, hashes } = ev // hashesPerSecond
  store.commit('addNode', {id: result, name: hashes, _size: hashes, jobId})
  store.commit('addMessage', `${getTS()} - Found ${hashes} hashes!`)
}

function hashAccepted (params) {
  const { hashes } = params // hashesPerSecond, job_id, result
  store.commit('addMessage', `Accepted ${hashes} hashes!`)
}

function onOptin (params) {
  if (params.status === 'accepted') {
    store.commit('addMessage', 'User accepted opt-in')
  } else {
    store.commit('addMessage', 'User canceled opt-in')
  }
}

function newJob (ev) {
  store.commit('addMessage', `New job @ ${Math.round((1 - ev.throttle) * 100)}% power`)
}

function updateThrottle () {
  miner.setThrottle(store.state.throttle)
}

function updateStats () {
  updateThrottle()
  stats.hashesPerSecond = miner.getHashesPerSecond()
  stats.hasWASM = miner.hasWASMSupport()
  stats.threads = miner.getNumThreads()
  stats.totalHashes = miner.getTotalHashes(true)
  stats.acceptedHashes = miner.getAcceptedHashes()
  stats.throttle = miner.getThrottle()
  stats.power = `${((1 - stats.throttle).toFixed(2) * 100)}%`
  stats.hashRate = stats.hashesPerSecond.toFixed(1)
  store.commit('updateStats', stats)
}

export default function (CH, ctx) {
  const opts = { throttle: store.state.throttle }
  miner = new CH.Anonymous(ctx.$config.siteKey, opts)
  miner.on('error', ev => console.log({ error: ev }))
  miner.on('open', ev => console.log({ state: 'started', ev }))
  miner.on('close', ev => console.log({ state: 'closed' }))
  miner.on('found', ev => hashFound(ev))
  miner.on('job', ev => newJob(ev))
  miner.on('accepted', ev => hashAccepted(ev))
  miner.on('optin', ev => onOptin(ev))
  miner.start()
  setInterval(updateStats, 500)
}
