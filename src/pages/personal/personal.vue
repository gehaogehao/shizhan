<template>
  <div class="loginContainer">
    <div class="loginHeader" :class="{active: flag !== 'login'}">
      <i class="iconfont icon-fangzi" @click="goto('/index')"></i>
      <span>网易严选</span>
      <div class="iconRight">
        <i class="iconfont icon-sousuo1"></i>
        <i class="iconfont icon-gouwuche"></i>
      </div>
    </div>
    <div class="loginMain" v-show="flag === 'login'">
      <div class="img">
        <img class="logo" src="./yanxuan.png" />
      </div>
      <div class="loginMethods">
        <div class="loginIphoneLogin" @click="changeFlag('iphone')">
          <i class="iconfont icon-shouji"></i>
          <span>手机号快捷登录</span>
        </div>
        <div class="loginEmailLogin" @click="changeFlag('email')">
          <i class="iconfont icon-youxiang1"></i>
          <span>邮箱账号登录</span>
        </div>
      </div>
      <div class="loginFooter">
        <div class="wx">
          <i class="iconfont icon-weixin"></i>
          <span>微信</span>
        </div>
        <div class="qq">
          <i class="iconfont icon-qq1"></i>
          <span>QQ</span>
        </div>
        <div class="weibo">
          <i class="iconfont icon-xinlang1"></i>
          <span>微博</span>
        </div>
      </div>
    </div>
    <div v-show="flag === 'iphone'" class="iphoneContainer">
      <div class="img">
        <img src="./yanxuan.png" alt />
      </div>
      <div class="loginBox">
        <section class="phone">
          <input type="text" maxlength="11" v-model="name" placeholder="请输入手机号" name="name" v-validate="'required|mobile'">
          <span style="color: red;" v-show="errors.has('name')">{{ errors.first('name') }}</span>
        </section>
        <section class="code">
          <input type="text" maxlength="6" placeholder="请输入验证码" v-model="code" name="code" v-validate="{required: true,regex: /^\d{6}$/}">
          <div class="getCode">获取验证码</div><br>
          <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
        </section>
        <div class="problem">
          <span>遇到问题？</span>
          <span class="text">使用密码验证登录</span>
        </div>
        <div class="login">登录</div>
        <div class="agree">
          <input type="checkbox">
          <div>我同意<span>《服务条款》</span>和<span>《网易隐私政策》</span></div>
        </div>
        <div class="otherLoginWay" @click="changeFlag('login')">其他方式登录></div>
      </div>
    </div>
    <div v-show="flag === 'email'" class="emailContainer">
      <div class="img">
        <img src="./yanxuan.png" alt />
      </div>
      <div class="input-groups">
        <form action="">
            <div class="email">
              <input type="text" placeholder="邮箱帐号" v-model="email" name="email" v-validate="{required: true,regex: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/}">
              <span style="color: red;" v-show="errors.has('email')">{{ errors.first('email') }}</span>
            </div>
            <div class="password">
              <input type="password" placeholder="密码" v-model="password" name="pwd" v-validate="'required'">
              <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>
            </div>
            <div class="submit"><input type="submit" value="登录"></div>
        </form>
      </div>
      <div class="emailFooter" @click="changeFlag('login')">
        <span>其他登录页面</span>
        <i class="iconfont icon-jiantou"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "personal",
  data() {
    return {
      flag: "login",
      email:'',
      password:'',
      name:'',
      code:''
    };
  },
  methods: {
    goto(path) {
      this.$router.replace(path);
    },
    changeFlag(ip) {
      this.flag = ip;
    }
  }
};
</script>

<style scoped lang='stylus'>
.loginContainer
  width 100%
  height 100%
  .loginHeader
    width 100%
    height 88px
    line-height 88px
    font-size 36px
    padding 0 20px
    box-sizing border-box
    text-align center
    &.active
      background-color #F2F5F4
    .iconfont
      font-size 50px
    .icon-fangzi
      float left
    .iconRight
      float right
      .icon-sousuo1
        margin-right 40px
  .loginMain
    height calc(100vh - 44px)
    background-color #F2F5F4
    .img
      width 100%
      height 482px
      position relative
      .logo
        width 268px
        height 90px
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        margin auto
    .loginMethods
      display flex
      flex-direction column
      .loginIphoneLogin
        width 670px
        height 94px
        line-height 94px
        text-align center
        background-color #dd1a21
        color #fff
        border-radius 10px
        margin 0 auto 32px
        font-size 28px
        .icon-shouji
          font-size 40px
          margin-right 5px
          vertical-align middle
        span
          vertical-align middle
      .loginEmailLogin
        width 670px
        height 94px
        line-height 94px
        text-align center
        font-size 28px
        margin 0 auto
        border-radius 10px
        border 2px solid #ddd
        color #dd1a21
        .icon-youxiang1
          font-size 35px
          margin-right 10px
          vertical-align middle
        span
          vertical-align middle
    .loginFooter
      display flex
      font-size 28px
      position absolute
      left 50%
      bottom 50px
      transform translateX(-50%)
      .qq
        width 170px
        height 40px
        text-align center
        color #7f7f7f
        border-left 1px solid #7f7f7f
        border-right 1px solid #7f7f7f
        i
          font-size 30px
          color #7f7f7f
      .wx
        width 170px
        height 40px
        text-align center
        color #7f7f7f
        i
          font-size 30px
          color #7f7f7f
      .weibo
        width 170px
        height 40px
        text-align center
        color #7f7f7f
        i
          font-size 30px
          color #7f7f7f
  .iphoneContainer
    width 100%
    height calc(100vh - 88px)
    border-top 2px solid #eee
    display flex
    flex-direction column
    align-items center
    .img
      width 268px
      height 90px 
      margin 56px auto 0
      img 
        width 100%
        height 100% 
    .loginBox
      margin-top 60px  
      padding 0 40px
      .phone,.code
        width 670px
        height 90px
        line-height 90px
        border-bottom 2px solid #ccc
        input 
          font-size 30px
          outline none
      .code
        position absolute
        margin-top 30px
        .getCode
          position absolute
          right 0
          bottom 10px
          width 164px
          height 54px
          line-height 64px
          text-align center
          font-size 28px
          border 2px solid #ccc
          border-radius 10px
      .problem    
        width 100%
        height 90px
        display flex
        justify-content space-between
        align-items center
        font-size 28px
        color #7f7f7f
        margin-top 150px
        .text
          color #333
      .login 
        width 670px    
        height 91px
        line-height 91px
        text-align center
        border-radius 10px
        color #fff
        font-size 32px
        margin-top 30px
        background-color #dd1a21
      .agree  
        width 100%
        height 90px
        display flex
        align-items center
        >input 
          width 30px
          height 30px
          margin-right 10px
        >div
          >span 
            color #007aff  
      .otherLoginWay
        width 100%      
        height 90px
        line-height 90px
        text-align center
        font-size 26px
        color #333
  .emailContainer
    width 100%
    padding 0 40px
    box-sizing border-box
    .img
      width 268px
      height 90px 
      margin 56px auto 0
      img 
        width 100%
        height 100% 
    .input-groups
        input[type="submit"]
          margin: 0.8rem 0 0.53333rem;
          height: 1.28rem;
          display: block;
          width: 100%;
          cursor: pointer;
          text-align: center;
          background-color: #b4282d;
          color: #fff;
          border-radius: 3px;
        input[type="submit"].disabled
          background-color: #cb7a7a;  
      .email
        background-color: #fff;
        position: relative;
        &::after
          position: absolute;
          left: -50%;
          bottom: 0;
          content: '';
          width: 200%;
          height: 2px;
          background: #d9d9d9;
          transform: scale(0.5);
          display: block
        input 
          width: 670px;
          height: 90px;
          font-size: 30px;
          line-height: 90px;
          margin: 30px 0;
          padding-left: 0;
          -webkit-tap-highlight-color: transparent;
          letter-spacing: normal;
          font-weight: normal;
          background-color: #fff;
          height: 1.28rem;  
          outline none  
      .password
        background-color: #fff;
        position: relative;
        &::after
          position: absolute;
          left: -50%;
          bottom: 0;
          content: '';
          width: 200%;
          height: 2px;
          background: #d9d9d9;
          transform: scale(0.5);
          display: block
        input 
          width: 670px;
          height: 90px;
          font-size: 30px;
          line-height: 90px;
          margin: 30px 0;
          padding-left: 0;
          -webkit-tap-highlight-color: transparent;
          letter-spacing: normal;
          font-weight: normal;
          background-color: #fff;
          height: 1.28rem;  
          outline none 
    .emailFooter
      width 675px
      height 40px
      text-align center
      font-size 28px
      margin-top 100px
      color #333         
</style>
