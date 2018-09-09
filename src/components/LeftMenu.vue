<template>
<div class="leftmenu">
  <div class="left-menu-cmp">
    <el-menu class="left-menu-list" 
      background-color="#373d41"
      text-color="#fff"
      :default-active="selectMenuId" :unique-opened="true" @select="handleSelect">
      <menu-item v-for="(item,index) in list" :key="item.id + '+' + index" :menuData="item"></menu-item>
    </el-menu>
  </div>
  </div>
</template>
<script>
  import MenuItem from './MenuItem.vue';

  export default {
    props: {
      menuList: {
        type: Array,
        required: true
      }
    },
    components: {MenuItem},
    data() {
      return {
        isCollapse: true,
        selectMenuId: '',
        list: this.menuList
      };
    },
    methods: {
      handleSelect(index, path) {
        console.log(path,'==path')
        this.selectMenuId = index;
        let pathObjs = path.map((p) => {
          return this.menuMapData[p];
        });
        this.$emit('beforeJump', {id: index, paths: pathObjs});
        this.$router.push(this.menuMapData[index]['link']);
      },
      parseData(list, pathMap) {
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          let id = item.id;
          pathMap[id] = item;
          if (item.children && item.children.length > 0) {
            this.parseData(item.children, pathMap);
          } else {
            let link = item.link;
            pathMap[link] = item;
          }
        }
      }
    },
    computed: {
      menuMapData: function () {
        let pathMap = {};
        //将list菜单转换成{id:menu,path:menu}
        this.parseData(this.list, pathMap);
        return pathMap;

      }
    },
    created() {
      let curpath = this.$route.path;
      this.list.map((v, k) => {
        if (curpath.indexOf(v.link) > -1) {
          this.selectMenuId = v.id
        }  
      })
    },
    watch: {}
  };
</script>

<style lang="scss">
.leftmenu {
  min-width: 180px;
  background: #373d41;
  .el-menu {
    border: 0;
  }
  .left-menu-list {
    height: 100%;

  }
}
  
</style>
