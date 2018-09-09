<!--
视图模板
-->
<template>
  <div class="content">
    <header-cmp></header-cmp>
    <div class="menupage-cmp menupage" style="clear:both;">
      <left-menu :menuList="menuInfo" class="leftmenu"></left-menu>
      <div class="right-content">
        <div class="main-content">
          <Bread></Bread> 
          <transition name="fade">
            <!-- <keep-alive> -->
              <router-view></router-view>
            <!-- </keep-alive> -->
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import LeftMenu from '@/components/leftMenu.vue'
  import HeaderCmp from '@/components/HeaderCmp.vue'
  import {MENU_LIST} from '@/assets/js/menu'
  import Bread from '@/components/Bread.vue'
  export default {
    name: 'App',
    data() {
      return {
        menuInfo: []
      };
    },
    computed: {
    },
    methods: {},
    created() {
      let menuIDArray = JSON.parse(sessionStorage.getItem('menuLinkList'))
      MENU_LIST.forEach(item => {
        if (menuIDArray.indexOf(item.link) > -1) {
          this.menuInfo.push(item)
        }
      })
    },
    components: {
      Bread,
      //左侧菜单组件
      LeftMenu,
      HeaderCmp
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    .menupage {
      display: flex;
      position: absolute;
      top: 60px;
      bottom: 0;
      width: 100%;
      overflow: hidden;
      .right-content{
        flex: 1;
        overflow-y: scroll;
      }
      
      .main-content {
        padding: 20px;
      }
    }
  }
</style>
