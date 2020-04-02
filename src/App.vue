<template>
  <div class="appContainer">
    <router-view></router-view>
    <v-footer v-show="$route.meta.isFooter"></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
import Footer from 'components/footer/footer.vue'
  export default {
    name:'App',
    components:{
      'v-footer':Footer
    }
  }
</script>

<style scoped lang='stylus'>
.appContainer
  position relative
  width 100%
  height 100%
</style>

