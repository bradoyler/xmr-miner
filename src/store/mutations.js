export const mutations = {
  addMessage (state, msg) {
    state.messages.unshift(msg)
    if (state.messages.length > 30) {
      state.messages.pop()
    }
  },
  updateStats (state, { hashRate, totalHashes, power, acceptedHashes }) {
    state.stats.unshift({hashRate, totalHashes, power, acceptedHashes})
    if (state.stats.length > 1) {
      state.stats.pop()
    }
  },
  addNode (state, node) {
    state.nodes.push(node)
  }
}
