<template>
  <div class="login-cmp">
    <div class="container">
      <div class="secL">
        <h2>图片上传管理系统</h2>
        <p style="width:384px;text-align: left;">
          支持png和jpg格式的图片上传至服务器后，获取其URL
        </p>
      </div>
      <div class="secR">
        <div class="box-bg"></div>
        <form action="#" method="post" name="frmLogin" id="loginForm">
          <div class="form">
            <h1>登录平台</h1>
            <p>
              请用<span class="f9c442"> 域账号 </span>作为用户名登录
            </p>
            <div class="item clearfix">
              <label for="userNameIpt"></label>
              <input type="text" tabindex="1" id="userNameIpt" name="dtoUserName" notnull="true" info="用户名"
                     placeholder="请输入域账号" v-model="userId">
            </div>
            <div class="item itempass clearfix">
              <label for="password"></label>
              <input type="password" tabindex="2" id="password" name="password" notnull="true" info="密码"
                     autocomplete="off" placeholder="请输入密码" v-model="password">
            </div>
            <div class="error-info">{{errinfo}}</div>

            <div class="item">
              <button type="button" tabindex="5" @click="loginSubmit" id="btnSubmit">登&nbsp;&nbsp;录</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="container2"></div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        userId: '',
        password: '',
        errinfo: ''
      }
    },
    methods: {
      loginSubmit() {

        let tempParams = {
          head: {
            token: '',
            channel: '',
            clientId: ''
          },
          userId: this.userId,
          password: this.password
        }
        this.$http.post('/user/login', tempParams).then(res => {
          if (res.data.code === 0) {
            if (res.data.isAdmin !== 1) {
              this.$loginAuth.menuAuth()
            } else {
              this.$loginAuth.menuInit()
            }
            this.$loginAuth.userLogin(this.userId)
            sessionStorage.setItem('logintoken', res.data.head.token)
            this.$router.push({ name: 'infoManage' })
          }
          if (res.data.code === 8 || res.data.code === 6) {
            this.errinfo = '用户名或密码错误，请重试'
          }
        })
      }
    },
    watch: {
      userId() {
        this.errinfo = ''
      },
      password() {
        this.errinfo = ''
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .login-cmp {
    width: 100%;
    height: 100%;
    color: #FFF;
    font-family: "Microsoft Yahei";
    background: url('../../assets/img/bg.jpg') no-repeat;
    background-size: cover;
    text-align: center;
  }

  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .clearfix {
    display: block;
  }

  .container {
    width: 960px;
    display: inline-block;
    vertical-align: middle;
  }

  .container2 {
    display: inline-block;
    width: 0;
    height: 100%;
    content: 'center';
    vertical-align: middle;
    overflow: hidden;
  }

  .container .secL {
    float: left;
    font-weight: bold;
    clear: both;
    margin: 90px 0 0 104px;
  }

  .container .secL h2 {
    font-size: 26px;
  }

  .container .secL p {
    font-size: 16px;
    line-height: 40px;
    margin-top: 30px;
  }

  .container .secR {
    float: right;
    position: relative;
    padding: 40px 35px 40px 45px;
    width: 270px;
    height: 330px;
  }

  .container .secR .box-bg {
    position: absolute;
    top: 0;
    left: 0;
    opacity: .8;
    filter: alpha(opacity=80);
    width: 100%;
    height: 100%;
    background-color: #141924;
  }

  .form {
    position: absolute;
  }

  .form h1 {
    font-size: 18px;
  }

  .form p {
    font-size: 14px;
    color: #e9e9e9;
    margin-top: 15px;
  }

  .form .item {
    margin-top: 20px;
    width: 255px;
  }

  .form .item label {
    width: 44px;
    height: 44px;
    background: #aaabab url('../../assets/img/icologin.png') center 10px no-repeat;
    border: none;
    display: block;
    float: left;
  }

  .form .itempass label {
    background-position: center -28px;
  }

  .form .item input {
    width: 210px;
    height: 30px;
    padding: 7px 0;
    border: none;
    outline: none;
    font-size: 14px;
    line-height: 30px;
    text-indent: .5em;
    float: left;
    color: #333;
    font-weight: bold;
  }

  .form .item button {
    width: 255px;
    height: 46px;
    background: url('../../assets/img/loginbtn.png') left top no-repeat;
    border: none;
    cursor: pointer;
    text-align: center;
    line-height: 46px;
    font-size: 16px;
    font-weight: bold;
    color: #FFF;
  }

  .form .itemRadio a {
    color: #e0e0e0;
    width: 68px;
    margin: 2px 0px;
    height: 25px;
    line-height: 16px;
    font-size: 14px;
    float: none;
  }

  .error-info {
    padding-top: 10px;
    text-align: left;
    color: #FF0000;
  }
</style>
