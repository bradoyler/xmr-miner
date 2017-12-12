<template lang="html">
  <div class="container">
    <h2>{{title}}</h2>
    <p id="totals">Hashing: {{stats[0].hashRate}}, Total: {{stats[0].totalHashes}},
     Accepted: {{stats[0].acceptedHashes}} </p>
    <p id="slider-wrapper">
      <span id="slider-label">Threads: {{concurrency}}, Power: </span>
      <ui-slider @change="updateThrottle" v-model="slider" />
      <span>{{slider}}%</span>
    </p>
    <div id="console" class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">xmr-miner@localhost </h3>
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
import 'keen-ui/dist/keen-ui.css'
import { UiSlider } from 'keen-ui'
import store from '../store'

export default {
  components: {
    D3Network,
    UiSlider
  },
  data () {
    return {
      concurrency: navigator.hardwareConcurrency,
      slider: (1 - store.state.throttle).toFixed(2) * 100,
      title: 'Monero Mine',
      nodes: this.$store.state.nodes,
      messages: this.$store.state.messages,
      stats: this.$store.state.stats,
      links: [],
      options:
      {
        size: { h: 300},
        force: 300,
        nodeSize: 10,
        nodeLabels: true,
        linkWidth: 5
      }
    }
  },
  methods: {
    updateThrottle: function (data) {
      const throttle = (1 - (data / 100).toFixed(2))
      store.state.throttle = throttle
    }
  },
  mounted() {
    // console.log('>>>> Home mounted:', this)
  },
}
</script>

<style lang="css">
  .panel-body {
    font-family: "Lucida Console", "Lucida Sans Typewriter", monaco, "Bitstream Vera Sans Mono", monospace;
    font-size: 12px;
    text-align: left;
    color: #2bf22b;
    background-color: #000;
  }
  #log-header {
    color: #000;
  }
  #slider-label {
    margin-right: 1em;
    float: left;
  }
  #slider-wrapper {
    margin: auto;
    max-width: 320px;
    margin-bottom: 1em;
  }
  #console {
    position: absolute;
    bottom: 1px;
    left: 2px;
    max-height: 300px;
    max-width: 320px;
  }
</style>
