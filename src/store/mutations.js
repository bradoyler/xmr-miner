
export const mutations = {
  addMessage (state, msg) {
    state.messages.unshift(msg)
    if (state.messages.length > 30) {
      state.messages.pop()
    }
  },
  updateStats (state, stats) {
    if (state.minerProgress > 100) state.minerProgress = 0
    state.minerProgress += stats.hashesPerSecond / 1.6 // slow down a bit
    state.stats = stats
  },
  addNode (state, node) {
    state.nodes.unshift(node)
    if (state.nodes.length > 100) {
      state.nodes.pop()
    }
  }
}
