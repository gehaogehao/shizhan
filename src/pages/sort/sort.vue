<template>
  <div class="sortContainer">
      <div class="sortHeader">
        <div class="search">
          <i class="iconfont icon-sousuo1"></i>
          搜索商品,共35937件好物
          </div>
      </div>
      <div class="footer">
        <div class="left" ref="leftWrap">
          <ul class="leftList">
            <li class="listItem" :class="{active:index===flag}" v-for="(item, index) in categoryL1List" 
                @click="changeFlag(index,item.id)" :key="index">{{item.name}}</li>
          </ul>
        </div>
        <div class="sortRight">
          <div class="rightContainer" style="height:calc(100vh - 100px); overflow:hidden;" ref="rightContainer">
            <div class="container">
              <div class="img">
                <img :src="categoryL2List[0].wapBannerUrl" alt="" v-if="categoryL2List[0]">
              </div>
              <div class="imgList">
                <div class="imgItem" v-for="(item, index) in categoryL2List" :key="index">
                  <img :src="item.bannerUrl || item.wapBannerUrl" alt="">
                  <span>{{item.name}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState,mapActions} from 'vuex'
import {GETCATEGORYL1LIST,GETCATEGORYL2LIST} from '@/store/mutations-type.js'
import BScroll from 'better-scroll'
  export default {
      name:'sort',
      data() {
        return {
          flag:0,
          categoryList:[]
        }
      },
      methods:{
        ...mapActions([GETCATEGORYL1LIST]),
        leftScroll(){
         new BScroll(this.$refs.leftWrap,{
            scrolly: true,
            probeType: 3,
            click:true
          })
        },
        rightScroll(){
          new BScroll(this.$refs.rightContainer,{
            scrolly: true,
            probeType: 3,
            click:true
          })
        },
        changeFlag(index,id){
          this.flag = index
          this.$store.dispatch(GETCATEGORYL2LIST,id)
        },
      },
      computed:{
        ...mapState(['categoryL1List','categoryL2List'])
      },
      mounted(){
        this[GETCATEGORYL1LIST](),
        this.leftScroll()
        this.$store.dispatch(GETCATEGORYL2LIST)
        this.rightScroll()
      }
  }
</script>

<style scoped lang='stylus'>
.sortContainer
  .sortHeader
    width 100%
    height 88px
    align-items center
    font-size 28px
    color #666
    padding 16px 30px 0
    box-sizing border-box
    border-bottom 1px solid #d9d9d9
    .search
      display flex 
      justify-content center
      width 690px
      height 56px
      line-height 56px
      background-color #ededed
      border-radius 10px
      .iconfont
        font-size 28px
        font-weight bold
        margin-right 10px
  .footer      
    width 100%
    display flex
    .left
      width 162px
      height calc(100vh - 186px)
      background-color #fff
      border-right 1px solid #d9d9d9
      overflow hidden
      .leftList
          padding 40px 0
          box-sizing border-box
          .listItem
            font-size 28px
            color #333
            width 162px
            height 50px
            line-height 50px
            text-align center
            margin-bottom 40px
            &.active
              color #ab2b2b
              border-left 6px solid #ab2b2b
    .sortRight 
      width 588px          
      padding 30px 30px 0
      .container
        width 100%
        min-height 1299px
        margin-top 30px
        .img
          width 100%
          height 192px
          img 
            width 100%
            height 100%
      .imgList      
        width 528px
        margin-top 30px
        overflow hidden
        .imgItem
          width 144px
          height 216px
          text-align center
          float left
          margin-right 30px 
          img 
            width 144px
            height 144px
          span 
            color #333  
            font-size 24px
</style>
