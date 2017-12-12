export default function (Vue, config) {
  Vue.mixin({
    created: function () {
      this.$config = config
    }
  })
}
