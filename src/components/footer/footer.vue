<template>
  <div class="footer">
    <ul class="footerUl">
      <li class="footerLi" @click="goto('/index')">
        <i class="iconfont icon-shouye"></i>
        <span>首页</span>
      </li>
      <li class="footerLi" @click="goto('/sort')">
        <i class="iconfont icon-fenlei"></i>
        <span>分类</span>
      </li>
      <li class="footerLi" @click="goto('/shop')">
        <i class="iconfont icon-maishui"></i>
        <span>值得买</span>
      </li>
      <li class="footerLi" @click="goto('/car')">
        <i class="iconfont icon-gouwuche"></i>
        <span>购物车</span>
      </li>
      <li class="footerLi" @click="goto('/personal')">
        <i class="iconfont icon-iconfontgerenzhongxin"></i>
        <span>个人</span>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Footer",
  methods: {
    goto(path) {
      this.$router.push(path);
      this.flag = true;
    }
  }
};
</script>

<style scoped lang='stylus'>
.footer
  width 100%
  height 98px
  background-color #fff
  position absolute
  left 0
  bottom 0
  .footerUl
    display flex
    justify-content space-around
    font-size 26px
    margin-top 15px
    .footerLi
      display flex
      flex-direction column
      align-items center
      color #dd1a22
      .iconfont
        font-size 35px
        margin-bottom 10px
</style>
