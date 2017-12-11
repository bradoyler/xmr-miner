export const mutations = {
  addMessage (state, text) {
    state.messages.unshift(text)
  },
  updateStats (state, stats) {
    state.stats = stats
  },
  addNode (state, node) {
    state.nodes.push(node)
  }
}
