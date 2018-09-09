<template>
  <div class="menu-item-cmp">
    <el-menu-item :index="menu.id">
      <i class="iconfont" :class="menu.icon"></i>
      <span slot="title">{{menu.name}}</span>
    </el-menu-item>
  </div>
</template>
<script>
  export default {
    name: 'menu-item',
    props: {
      menuData: {
        type: Object,
        required: true
      }
    },
    data: function () {
      return {
        menu: this.menuData
      };
    }
  };

</script>

<style lang="scss" scoped>
.menu-item-cmp {
  i {
    padding-right: 8px;
  }
}
</style>
