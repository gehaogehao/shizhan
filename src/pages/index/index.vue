<template>
  <div class="indexContainer">
    <!-- 头部 -->
      <div class="indexHeader">
        <div class="headerSearch" @click="goSearch('/search')">
          <img class="logo" src="./logo.png" alt="">
          <div class="search">
            <i class="iconfont icon-sousuo1"></i>
            <span>搜索商品,共24851件好物</span>
          </div>
          <div class="loginBtn">登录</div>
        </div>
        <div class="headerNav" ref="navListwrap">
          <ul class="scroll" v-if="!mack">
            <li class="item" @click="chengeFlag(index)" v-for="(item, index) in navList" :key="index" :class="{active:index===flag}">{{item.name}}</li>
          </ul>
          <div class="all" v-if="mack">全部频道</div>
        </div>
        <div class="jiantou">
          <i class="iconfont" :class="mack?'icon-jiantouxiangshang':'icon-jiantou-xia'" @click="getMack"></i>
        </div>
        <!-- mack -->
        <div class="mack" v-if="mack">
          <div class="mackItem" @click="changeMackItem(index)" :class="{active:index===mackFlag}" v-for="(item, index) in navList" :key="index">{{item.name}}</div>
        </div>  
      </div>
    <!-- 主体 -->
      <div class="mainContainer" ref="mainWayp">
        <div class="mainItem">
          <!-- 轮播 -->
          <swiper ref="mySwiper" :options="swiperOptions" class="swiperContainer">
            <swiper-slide class="swiperItem" v-for="(item, index) in focusList" :key="index">
              <img :src="item.picUrl" alt="">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <div class="msgList">
            <ul class="msgUl">
              <li class="msgLi" v-for="(item, index) in policyDescList" :key="index">
                <img class="icon" :src='item.icon'></img>
                <span>{{item.desc}}</span>
              </li>
            </ul>
          </div>
          <div class="kingKongList">
            <ul class="kingkongUl">
              <li class="kingkongLi" v-for="(item, index) in kingKongList" :key="index">
                <img :src="item.picUrl" alt="">
                <span>{{item.text}}</span>
              </li>
            </ul>
          </div>
          <div class="zhounianqing">
            <div class="itemContainer">
              <img src="./zhounianqing.gif" alt="">
              <img class="zhongjianImg" :src="itemList[0].picUrl" alt="" v-if="itemList[0]">
            </div>
            <div class="zhongjian">
              <img src="./zhongjian.png" alt="">
            </div>
            <div class="zhongjianBottom">
              <div class="bottomItem" v-for="(item, index) in floorList" :key="index">
                <img :src="item.picUrl" alt="" v-if="itemList[0]">
              </div>
            </div>
          </div>
          <!-- 新人专享 -->
          <div class="newPeople">
            <div class="newHeader">
              <span>— 新人专享 —</span>
            </div>
            <div class="newFooter">
              <div class="left">
                <span>新人专享礼包</span>
                <img src="./hongbao.png" alt="">
              </div>
              <div class="right">
                <div class="top">
                  <div class="title" v-if="indexActivityModuleList[0]">
                    <span>{{indexActivityModuleList[0].title}}</span>
                    <span class="name">{{indexActivityModuleList[0].subTitle}}</span>
                  </div>
                  <img :src="indexActivityModuleList[0].picUrl" alt="" v-if="indexActivityModuleList[0]">
                </div>
                <div class="bottom">
                  <div class="title" v-if="indexActivityModuleList[1]">
                    <span>{{indexActivityModuleList[1].title}}</span>
                    <span class="name">{{indexActivityModuleList[1].tag}}</span>
                  </div>
                  <img src="./bottom.png" alt="">
                </div>
              </div>
            </div>
          </div>
          <!-- 类目热销榜 -->
          <div class="leimu">
            <div class="header">
              <span>类目热销榜</span>
            </div>
            <div class="sellList">
              <div class="sellItem" v-for="(item, index) in categoryList" :key="index">
                <p class="text">{{item.categoryName}}</p>
                <img :src="item.picUrl" alt="">
              </div>
            </div>
          </div>
          <!-- 限时购 -->
          <div class="shop">
            <div class="shopHeader">
              <div class="shopLeft">
                <span>限时购</span>
                <div class="time">
                  <span>00</span>
                  <span class="dian">:</span>
                  <span>40</span>
                  <span class="dian">:</span>
                  <span>52</span>
                </div>
              </div>
              <div class="shopRight">
                <span>更多</span>
                <i class="iconfont icon-jiantou"></i>
              </div>
            </div>
            <div class="shopFooter">
              <div class="shopItem" v-for="(item, index) in flashSaleModule" :key="index">
                <div class="img">
                  <img :src="item.picUrl" alt="">
                </div>
                <div class="price">
                  <div class="newPrice">￥{{item.activityPrice}}</div>
                  <s class="oldPrice">￥{{item.originPrice}}</s>
                </div>
              </div>
            </div>
          </div>
          <!-- 新品首发 -->
          <div class="newShop">
            <div class="newShopHeader">
              <div class="newShopLeft">
                <span>新品首发</span>
              </div>
              <div class="newShopRight">
                <span>更多</span>
                <i class="iconfont icon-jiantou"></i>
              </div>
            </div>
            <div class="newShopFooter">
              <div class="newShopItem" v-for="(item, index) in newItemList" :key="index">
                <div class="img">
                  <img :src="item.listPicUrl" alt="">
                </div>
                <p class="msg">{{item.simpleDesc}}</p>
                <div class="jiage">￥{{item.retailPrice}}</div>
                <div class="shuoming" v-if="item.promTag">{{item.promTag}}</div>
              </div>
            </div>
          </div>
          <!-- 严选超市 -->
          <div class="market">
            <div class="marketItem" v-for="(item, index) in sceneList" :key="index">
              <span class="title">{{item.styleItem.title}}</span>
              <span class="prom">{{item.styleItem.desc}}</span>
              <img :src="item.styleItem.picUrlList[0]" alt="">
              <img :src="item.styleItem.picUrlList[1]" alt="">
            </div>
          </div>
          <!-- 说明 -->
          <div class="footerWrap">
            <div class="db">
              <div class="app">下载app</div>
              <div class="computer">电脑版</div>
            </div>
            <div class="copyRight">
              <span>网易公司版权所有  1997-2020</span>
              <br>
              <span>食品经营许可证：JY13301080111719</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 遮罩 -->
      <div class="mackBottom" v-if="mack"></div>
      <!-- 回到顶部 -->
      <div class="goTop" @click="goTop" v-show="num < -700">
        <i class="iconfont icon-jiantouxiangshang"></i>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import {mapActions,mapState} from 'vuex'
import {GETNAVLIST,GETFOCUSLIST} from '@/store/mutations-type.js'
import BScroll from 'better-scroll'
  export default {
      name:'index',
      data() {
        return {
          flag:0,//导航下边框
          mack:false,//遮罩显示
          mackFlag:0,//遮罩默认选中
          num:0,
          swiperOptions: {
            pagination: {
              el: '.swiper-pagination'
            }
          }
        }
      },
      computed:{
        ...mapState(['navList','focusList','policyDescList','kingKongList',
                     'itemList','floorList','indexActivityModuleList','categoryList','flashSaleModule','newItemList','sceneList']),
        swiper() {
          return this.$refs.mySwiper.$swiper
        }
      },
      methods:{
        ...mapActions([GETNAVLIST,GETFOCUSLIST]),
        chengeFlag(flag){
          this.flag = flag
        },
        changeMackItem(mackFlag){
          this.mackFlag = mackFlag
        },
        /* 遮罩 */
        getMack(){
          this.mack = !this.mack
        },
        // 导航滑动
        navScroll(){
          new BScroll(this.$refs.navListwrap,{
            scrollX: true,
            probeType: 3,
            click:true
          })
        },
        mainScroll(){
          this.scroll = new BScroll(this.$refs.mainWayp,{
            scrolly: true,
            probeType: 3,
            click:true,
            mouseWheel:true
          })
          this.scroll.on('scroll',(props)=>{
            this.num = props.y
          })
        },
        goTop(){
          this.scroll.scrollTo(0,0,1000)
        },
        goSearch(path){
          this.$router.replace(path)
        }
      },
      async mounted(){
        await this[GETNAVLIST](),
        this.navScroll()
        await this[GETFOCUSLIST]()
        this.mainScroll()
      },
      components: {
        Swiper,
        SwiperSlide
      }
  }
</script>

<style scoped lang='stylus'>
.indexContainer
  width 100%
  height 100%
  position relative
  .mackBottom
    position absolute
    left 0
    bottom 0
    z-index 1
    width 100%
    height 100%
    background-color rgba(0,0,0,.5)
  .indexHeader
    position relative
    z-index 2
    background-color #fff
    .headerSearch
      display flex
      align-items center
      height 88px
      .logo
        width 138px
        height 40px
        margin 0 20px 0 30px
      .search
        width 442px  
        height 56px
        line-height 56px
        background-color #ededed
        border-radius 10px
        margin-right 20px
        color #666
        font-size 26px
        font-weight bold
        .iconfont
          width 28px
          height 28px
          margin 0 20px 0 40px
      .loginBtn
        width 74px  
        height 40px
        line-height 40px
        border 2px solid #dd1a21
        border-radius 10px
        color #DD1A21
        text-align center
        font-size 24px
    .headerNav
      width 100% 
      height 60px
      white-space nowrap
      .scroll
        display inline-block
        height 100%
        line-height 60px
        font-size 28px  
        .item
          display inline-block
          height 60px
          margin-left 20px
          padding 0 20px
          &.active
            color #dd1a21
            border-bottom 1px solid #dd1a21
      .all
        height 100%
        line-height 60px
        font-size 28px  
        margin-left 30px  
        color #666   
    .jiantou
      position absolute
      right 0
      bottom 0
      width 70px        
      height 60px
      line-height 60px
      text-align center
      color #666
      background-color #fff
  .mack
    position absolute
    left 0
    bottom -312px
    z-index 2
    width 100%    
    height 312px
    background-color #fff 
    .mackItem
      display inline-block
      width 150px
      height 56px
      line-height 56px
      text-align center
      margin 20px 0 40px 30px
      background-color #fafafa
      color #666
      border 2px solid #ccc
      border-radius 5px
      &.active
        color #dd1a21
        border 2px solid #dd1a21
  .goTop
    position fixed
    right 20px
    bottom 150px
    width 82px      
    height 82px
    line-height 82px
    text-align center
    border-radius 50%
    background-color rgba(255,255,255,0.5)
    .icon-jiantouxiangshang
      font-size 50px
      color #666
  .mainContainer
    height calc(100vh - 246px)
    overflow hidden
    background-color #eee
    .swiperContainer
      width 100%
      height 296px  
      .swiperItem
        img 
          width 10rem
          height 100%
    .msgList
      width 100%      
      height 72px
      line-height 72px
      background-color #fff
      .msgUl
        display flex
        width 100%
        height 100%
        margin-left 30px
        .msgLi
          width 228px 
          height 36px
          .icon
            vertical-align middle
            display inline-block
            width 32px
            height 32px
            margin-right 15px
          span 
            vertical-align middle
            display inline-block
    .kingKongList
      width 100%
      height 340px        
      background-color #fff
      .kingkongUl
        display flex
        flex-wrap wrap
        width 100%
        height 100%
        .kingkongLi
          display flex
          flex-direction column
          align-items center
          margin-left 20px
          margin-right 20px
          img 
            width 110px
            height 110px
            border-radius 30px
          span 
            margin-top 15px
            width 110px 
            height 36px
    .zhounianqing
      width 100%
      height 588px
      margin-top 20px
      background-color #117E85
      .itemContainer
        position relative
        background-color #eee 
        .zhongjianImg
          position absolute
          left 76px
          bottom 36px
          width 168px
          height 168px
        img 
          width 100%
          height 240px 
      .zhongjian
        width 710px       
        height 80px
        padding 0 20px
        background-color #117E85
        img 
          width 100%
          height 100%
      .zhongjianBottom
        margin-top 20px
        width 710px   
        height 220px
        padding 0 20px
        background-color #117E85
        display flex
        .bottomItem
          width 231px
          height 220px
          border-radius 10px
          margin-right 10px
          background-color pink
          img
            width 100%
            height 100%
    .newPeople
      width 100%        
      height 558px
      background-color #fff
      margin-top 20px
      .newHeader
        position relative
        height 90px
        span
          position absolute 
          left 50%
          top 0
          transform translateX(-50%)
          height 90px
          line-height 90px
          font-size 32px
      .newFooter
          padding 0 30px
          .left
            float left
            width 343px
            height 434px
            background-color #F9E9CF 
            font-size 34px 
            span
              display inline-block
              margin 40px 0 0 40px
            img 
              width 258px
              height 257px
              margin 40px 0 0 40px
          .right
            float right
            width 343px
            height 434px
            font-size 32px 
            .top
              width 343px
              height 215px
              position relative
              padding 30px 0 0 20px
              box-sizing border-box
              background-color #FBE2D3
              img 
                width 200px
                height 200px
                position absolute
                right 0 
                bottom 0
              .title 
                span
                  display block
                .name
                  font-size 20px  
            .bottom 
              width 343px
              height 215px
              position relative
              padding 30px 0 0 20px
              box-sizing border-box
              background-color #FFECC2
              margin-top 5px
              .title 
                span
                  display block
                .name
                  font-size 20px
              img 
                width 200px   
                height 200px
                position absolute
                right 0 
                bottom 0
    .leimu 
      width 100%
      height 710px
      margin-top 20px
      background-color #fff  
      padding 0 30px
      .header
        width 100%
        height 100px
        line-height 100px 
        font-size 34px
      .sellList
        .sellItem
          float left      
          width 165px
          height 180px
          margin 0 10px 10px 0
          background-color #f2f2f2
          .text
            height 36px
            line-height 36px
            text-align center
            margin-top 10px
            margin-bottom 10px
          >img 
            width 120px
            height 120px
            margin 5px auto 0
          &:nth-of-type(1)  
            width 340px
            height 220px
            margin 0 10px 10px 0
            background-color #fff5ee
            position relative
            .text
              height 42px
              line-height 42px
              padding-left 24px
              margin-top 66px
              text-align left 
              font-size 28px
              position relative
              &:before
                content ""
                display block
                position absolute
                left 0
                bottom 0
                width 30px
                height 5px
                background-color block
            >img 
              position absolute    
              right 0
              bottom 0 
              width 200px
              height 200px
              margin 5px auto 0
          &:nth-of-type(2)
            width 340px
            height 220px
            margin 0 10px 10px 0
            background-color #fff5ee
            position relative
            .text
              height 42px
              line-height 42px
              padding-left 24px
              margin-top 66px
              text-align left 
              font-size 28px
              position relative
              &:before
                content ""
                display block
                position absolute
                left 0
                bottom 0
                width 30px
                height 5px
                background-color block
            >img 
              position absolute    
              right 0
              bottom 0 
              width 200px
              height 200px
              margin 5px auto 0
    .shop  
      width 100%          
      height 700px
      margin-top 20px
      background-color #fff
      padding 0 30px
      font-size 34px
      .shopHeader
        width 100%
        height 100px
        line-height 100px
        position relative
        .shopLeft
          display flex
          .time
            margin-left 20px
            font-size 28px
            >span
              background-color #000  
              color #fff
              padding 0 5px
              border-radius 10px
            .dian
              margin 0 10px  
              background-color #fff
              color #000
        .shopRight
          position absolute    
          right 60px
          top 0
          font-size 28px
      .shopFooter    
        width 100%
        height 600px
        .shopItem
          float left
          margin-right 20px
          .img
            width 216px
            height 216px
            img
              width 216px
              height 216px
          .price
            display flex
            margin-top 20px
            margin-bottom 40px
            .newPrice
              color #dd1a21
              font-size 28px 
              margin-left 10px
              margin-right 10px
            .oldPrice
              color #7f7f7f        
              font-size 26px
    .newShop
      width 100%          
      height 922px
      background-color #fff
      padding 0 30px
      font-size 34px
      margin-top 20px
      .newShopHeader
        height 100px
        line-height 100px
        position relative
        .newShopRight
          position absolute    
          right 60px
          top 0
          font-size 28px
      .newShopFooter
        width 100%    
        height 796px
        .newShopItem
          float left
          margin-right 20px
          margin-top 20px
          .img
            width 216px
            height 216px
            img
              width 100%
              height 100%
          .msg
            width 216px    
            height 67px
            font-size 24px
            margin-top 20px
          .jiage  
            color #dd1a21
            font-size 28px
            margin-top 20px
          .shuoming
            display inline-block
            padding 5px 10px
            font-size 18px
            margin-top 10px  
            margin-bottom 20px
            border-radius 20px
            border 2px solid #dd1a21 
    .market 
      width 100%       
      height 576px
      padding 20px 30px 0
      margin-top 20px
      background-color #fff
      .marketItem
        width 343px
        height 264px
        background-color #F6F6F6
        padding 20px 0 0 20px
        box-sizing border-box
        float left
        margin-right 10px
        margin-bottom 10px
        .title
          display block
          font-size 32px
          color #333
        .prom  
          display block
          color #7f7f7f
          font-size 24px
          margin-top 10px
        img
          width 150px
          height 150px
    .footerWrap
      padding 54px 20px 28px
      background-color #414141
      .db
        width 100%
        height 62px
        margin-bottom 36px
        display flex
        justify-content center
        >div
          width 172px
          height 62px
          line-height 62px
          text-align center
          font-size 24px
          font-weight 200
          color #fff
          border 1px solid #fff
        .app  
          margin-right 50px
      .copyRight    
        width 710px
        height 64px
        line-height 32px
        color #999
        font-size 24px
        font-weight 200
        text-align center
</style>