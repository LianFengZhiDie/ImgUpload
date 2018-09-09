<template>
  <div class="top">
    <div class="logo">
      <img src="https://www.changyoyo.com/static/images/logo.png">
    </div>
    <div class="topBar-title">图片管理系统</div>
    <div class="logout">
      <el-dropdown :hide-on-click="false" @command="logout">
            <span class="el-dropdown-link">
              当前登陆用户:{{user}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command>退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </div>
</template>

<script>
  import {Dropdown, DropdownMenu, DropdownItem} from 'element-ui'
  import Vue from 'vue'
  Vue.use(Dropdown).use(DropdownMenu).use(DropdownItem)
  export default {
    data() {
      return {
        user: {}
      }
    },
    created() {
      this.user = sessionStorage.getItem('user')
    },
    methods: {
      logout() {
        this.$loginAuth.userLogout()
        this.$router.push('/login')
      }
    }
  }
</script>
<style lang="scss" scoped>
.top {
    display: flex;
    height: 60px;
    background-color: #373d41;
    overflow: hidden;
    position: relative;
  }
  .logo {
    display: flex;
    align-items: center;
    min-width: 180px;
    border-bottom: 1px solid #000;
    img {
      display: block;
      margin: 0 auto;
      width: 80%;
    }
    
  }
  .topBar-title {
    width: 200px;
    text-align: left;
    padding-left: 10px;
    border-left: 1px solid #000;
    color: #fff;
    line-height: 60px;
    font-size: 18px;
  }

  .logout {
    position: absolute;
    right: 20px;
    top: 0;
    height: 100%;
    line-height: 60px;
  }

  .el-dropdown {
    color: #fff;
  }
</style>
