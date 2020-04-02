<template>
  <div class="shopContainer">
    <div class="shopHeader">
      <i class="iconfont icon-fangzi" @click="goto('/index')"></i>
      <span>值得买</span>
      <div class="iconRight">
        <i class="iconfont icon-sousuo1" @click="goto('/search')"></i>
        <i class="iconfont icon-gouwuche" @click="goto('/car')"></i>
      </div>
    </div>
    <div class="mainContainer" ref="mainContainer">
      <div class="mainItem">
        <div class="img">
          <img src="./logo.png" alt class="logo" />
          <span>严选好物&nbsp;用心生活</span>
          <img src="./beijing.png" alt class="bg" />
        </div>
        <div class="shopNav">
          <swiper ref="mySwiper" :options="swiperOptions" class="swiperList">
            <swiper-slide class="swiperItem" v-for="(item, index) in navList" :key="index">
              <div v-for="(item, index) in item" :key="index" class="item">
                <img :src="item.picUrl" alt />
                <span class="title">{{item.mainTitle}}</span>
                <span class="name">{{item.viceTitle}}</span>
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="container">
          <div v-for="(sitem, sindex) in newArr" :key="sindex">
            <div class="containerItem" v-for="(item, index) in sitem" :key="index">
              <div class="containerImg">
                <img :src="item.picUrl" alt />
              </div>
              <span class="title">{{item.title}}</span>
              <div class="containerFooter">
                <img :src="item.avatar" alt class="avatar" />
                <span class="nickName">{{item.nickname}}</span>
                <div class="footerRight">
                  <i class="iconfont icon-yanjing"></i>
                  <span>{{Math.floor(item.readCount / 1000)}}k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import { mapActions, mapState } from "vuex";
import { GETSHOPNAVLIST, GETRESULTLIST } from "@/store/mutations-type.js";
import BScroll from "better-scroll";
import _ from "lodash";
export default {
  name: "shop",
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        },
        slidesPerView: 4
      },
      navList: [],
      page: 1
    };
  },
  methods: {
    goto(path) {
      this.$router.replace(path);
    },
    ...mapActions([GETSHOPNAVLIST, GETRESULTLIST]),
    navScroll() {
      this.scroll = new BScroll(this.$refs.mainContainer, {
        scrolly: true,
        probeType: 3,
        click: true
      });
      this.scroll.on("scroll", pos => {
        if (pos.y <= this.scroll.maxScrollY + 200) {
          this.timer && clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.$store.dispatch(GETRESULTLIST, ++this.page);
          }, 300);
        }
      });
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
    ...mapState(["shopNavList", "resultList"]),
    computedArr() {
      let arr = [];
      this.resultList && this.resultList.length && this.resultList.forEach(item => {
        item.topics && item.topics.forEach(sItem => { arr.push(sItem)});
      });
      return arr;
    },
    newArr() {
      let arr1 = [];
      let arr2 = [];
      this.computedArr.forEach((item, index) => {
        if (index % 2 === 0) arr1.push(item);
        else arr2.push(item);
      });
      return [arr1, arr2];
    }
  },
  async mounted() {
    await this[GETSHOPNAVLIST]();
    this.navList = _.chunk(this.shopNavList, 2);
    await this[GETRESULTLIST]();
    this.navScroll();
  }
};
</script>

<style scoped lang='stylus'>
.shopContainer
  background-color #eee
  width 100%
  height 100%
  .shopHeader
    width 100%
    height 88px
    line-height 88px
    font-size 36px
    padding 0 20px
    box-sizing border-box
    text-align center
    background-color #fff
    .iconfont
      font-size 50px
    .icon-fangzi
      float left
    .iconRight
      float right
      .icon-sousuo1
        margin-right 40px
  .mainContainer
    width 100%
    height calc(100vh - 186px)
    overflow hidden
    .img
      width 100%
      height 520px
      position relative
      >span
        font-size 30px
        color #fff
        position absolute
        left 144px
        top 98px
      .bg
        width 100%
        height 100%
      .logo
        width 130px
        height 70px
        position absolute
        left 10px
        top 70px
    .shopNav
      position relative
      z-index 2
      width 710px
      height 540px
      background-color #fff
      margin-top -360px
      margin-left 20px
      border-radius 15px
      .swiperList
        width 100%
        height 100%
        box-sizing border-box
        .swiperItem
          .item
            display flex
            flex-direction column
            align-items center
            float left
            padding 36px 3px 3px
            width 168px
            height 200px
            img
              width 120px
              height 120px
            .title
              font-size 28px
              color #333
              font-weight bold
            .name
              font-size 24px
              color #999
              margin-top 2px
    .container
      display flex
      .containerItem
        width 345px
        margin-left 20px
        margin-top 30px
        background-color #fff
        border-radius 20px
        .containerImg
          width 100%
          img
            width 100%
            border-radius 20px 20px 0 0
      .title
        display block
        color #333
        font-size 28px
        margin-top 18px
        margin-left 16px
      .containerFooter
        width 343px
        height 89px
        padding 17px 16px 24px
        display flex
        box-sizing border-box
        margin-top 30px
        position relative
        .avatar
          width 48px
          height 48px
          border-radius 50%
        .nickName
          font-size 24px
          color #7f7f7f
          margin-left 8px
          margin-top 10px
        .footerRight
          box-sizing border-box
          font-size 24px
          color #7f7f7f
          margin-top 8px
          position absolute
          right 10px
          bottom 35px
</style>
