<template lang="html">
  <div class="container">
    <h2>{{title}}</h2>
    <p id="options"></p>
    <p id="totals">{{stats}}</p>
    <ul id="console" class="list-group">
      <li class="list-group-item active" v-for="item in messages">
        {{ item }}
      </li>
    </ul>
    <div class="">
      <d3-network :net-nodes="nodes" :net-links="links" :options="options"></d3-network>
    </div>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network'
export default {
  components: {
    D3Network
  },
  data () {
    return {
      title: 'XMR Miner',
      nodes: this.$store.state.nodes,
      messages: this.$store.state.messages,
      stats: this.$store.state.stats,
      links: [],
      options:
      {
        force: 3000,
        nodeSize: 20,
        nodeLabels: true,
        linkWidth:5
      }
    }
  },
  mounted() {
    // console.log('>>>> Home mounted:', this)
  },
}
</script>

<style lang="css">
  #console {
    position: absolute;
    top: 5;
    color: #fff;
    max-width: 320px;
  }
</style>
