<template lang="html">
  <div class="container">
    <h2>{{title}}</h2>
    <p id="options"></p>
    <p id="totals">{{stats}}</p>
    <div id="console" class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Miner Log</h3>
      </div>
      <div class="panel-body">
        <div class="" v-for="item in messages">
          {{ item }}
        </div>
      </div>
    </div>
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
      title: 'Monero Mine',
      nodes: this.$store.state.nodes,
      messages: this.$store.state.messages,
      stats: this.$store.state.stats,
      links: [],
      options:
      {
        force: 300,
        nodeSize: 10,
        nodeLabels: true,
        linkWidth: 5
      }
    }
  },
  mounted() {
    // console.log('>>>> Home mounted:', this)
  },
}
</script>

<style lang="css">
.panel-body {
  color: #eee;
  background-color: #000;
}
  #log-header {
    color: #000;
  }
  #console {
    position: absolute;
    top: 5;
    max-height: 600px;
    color: #fff;
    max-width: 320px;
  }
</style>
