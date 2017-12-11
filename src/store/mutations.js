export const mutations = {
  addMessage (state, msg) {
    state.messages.unshift(msg)
  },
  updateStats (state, { rate, totalHashes }) {
    state.stats.rate = rate
    state.stats.totalHashes = totalHashes
  },
  addNode (state, node) {
    state.nodes.push(node)
  }
}
