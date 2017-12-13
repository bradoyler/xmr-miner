<template lang="html">
  <div class="container">
    <ui-progress-linear color="black"  type="determinate" :progress="progress" />
    <h2>{{title}}</h2>
    <p id="totals">
     <!-- <ui-progress-circular class="miner-progress" :size="18" :stroke="8" type="determinate" :progress="progress" /> -->
        {{stats.hashRate}} hashes per second
       <div class="">
        Total: {{stats.totalHashes}}, Accepted: {{stats.acceptedHashes}}
       </div>
       <h5 class="difficulty">
         1 XMR: ~{{avgBlockTime.years}} yrs (w/ difficulty: 46B) <a target="_blank" href="https://www.reddit.com/r/MoneroMining/wiki/index">(info)</a>
       </h5>
    </p>
    <p id="slider-wrapper">
      <span id="slider-label">
        Threads: {{stats.threads}}, Power:</span>
      <ui-slider @change="updateThrottle" v-model="slider" />
      <span>{{slider}}% <span v-if="stats.hasWASM">(WASM)</span><span v-else>(ASM)</span> </span>
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
import { UiSlider, UiProgressCircular, UiProgressLinear } from 'keen-ui'
import store from '../store'

export default {
  components: {
    D3Network,
    UiProgressLinear,
    UiProgressCircular,
    UiSlider
  },
  computed: {
    progress: {
      get: function(){
        return this.$store.state.minerProgress
      }
    },
    stats: {
      get: function(){
        return this.$store.state.stats
      }
    },
    avgBlockTime: {
      get: function(){
        const { hashRate } = this.$store.state.stats
        const { difficulty, blockReward } = this.$store.state
        const hours = (difficulty / hashRate) / 3600
        const days = hours / 24
        const years = Math.round(days / 365 / blockReward)
        return { years, days: Math.round(days - (years * 365)), hours: 4 }
      }
    }

  },
  data () {
    return {
      difficulty: store.state.difficulty,
      slider: (1 - store.state.throttle).toFixed(2) * 100,
      title: 'Monero Mine',
      nodes: this.$store.state.nodes,
      messages: this.$store.state.messages,
      links: [],
      options:
      {
        size: { h: 350},
        force: 160,
        nodeSize: 7,
        nodeLabels: false,
        linkWidth: 5
      }
    }
  },
  methods: {
    updateThrottle: function (data) {
      const throttle = (1 - (data / 100).toFixed(2))
      store.state.throttle = throttle
    }
  }
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
  #totals {
    max-width: 400px;
    margin:auto;
  }
  .miner-progress {
    display: inline;
    margin-right: 4px;
  }
  #console {
    position: absolute;
    bottom: 1px;
    left: 2px;
    max-height: 300px;
    max-width: 320px;
  }
</style>
