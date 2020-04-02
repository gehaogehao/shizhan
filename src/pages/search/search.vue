<template>
  <div class="searchContainer">
    <div class="searchHeader">
      <i class="iconfont icon-sousuo1"></i>
      <input type="text" :placeholder="keyword" @keyup="search" v-model="kwd" />
      <span @click="goto('/index')">取消</span>
    </div>
    <div class="searchFooter" v-show="kwd ===''">
      <h3>热门搜索</h3>
      <ul>
        <li v-for="(item, index) in hotKeywordVOList" :key="index">{{item.keyword}}</li>
      </ul>
    </div>
		<div class="searchData" v-for="(item, index) in searchDataList" :key="index" v-show="kwd !==''">
			<span>{{item}}</span>
			<div class="xian"></div>
		</div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState,mapActions} from 'vuex'
import {GETKEYWORD,GETSEARCHDATALIST} from '@/store/mutations-type.js'
  export default {
		name:'search',
		data() {
			return {
				kwd:''
			}
		},
		methods:{
			...mapActions([GETKEYWORD]),
			goto(path){
					this.$router.replace(path)
			},
			search(){
				if(this.timeoutId) clearTimeout(this.timeoutId)
				this.timeoutId = setTimeout(() => {
					this.$store.dispatch(GETSEARCHDATALIST,this.kwd)
				},300)
			}
		},
		computed:{
			...mapState(['keyword','hotKeywordVOList','searchDataList'])
		},
		mounted(){
			this[GETKEYWORD]()
			this.timeoutId = null
		}
  }
</script>

<style scoped lang="stylus">
.searchContainer
  background-color #eee
  width 100%
  height 100%
  .searchHeader
    width 100%
    height 88px
    padding 0 30px
    box-sizing border-box
    display flex
    align-items center
    position relative
    background-color #fff
    >input
      width 604px
      height 56px
      background-color #f4f4f4
      padding 0 60px
      box-sizing border-box
    >span
      font-size 28px
      color #333
      margin-left 30px
    >i
      font-size 28px
      position absolute
      left 50px
      top 50%
      transform translateY(-50%)
  .searchFooter
    width 750px
    height 375px
    background-color #fff
    padding 0 30px
    box-sizing border-box
    overflow hidden
    h3
      font-size 28px
      color #999
      margin-top 30px
    ul
      margin-top 30px
      width 100%
      height 237px
      li
        height 47px
        line-height 47px
        float left
        border-radius 10px
        border 2px solid #999
        padding 0 15px
        margin-right 20px
        margin-bottom 20px
	.searchData
		width 720px			
		height 104px
		line-height 104px
		background-color #fff
		padding-left 30px
		color #333
		font-size 28px
		position relative
		.xian
			width 720px
			height 2px
			background-color #d9d9d9
			position absolute
			right 0
			bottom 0
</style>
