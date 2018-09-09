<!--
tips:
路由文件需要配置meta: {
    breadTitle: ''
}
-->
<template>
  <div class='bread'>
    <el-breadcrumb separator="/" class='el-bread'>
      <el-breadcrumb-item
        v-for='(item,index) in $route.matched'
        :key='index'>{{item.meta.breadTitle}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'bread',
    data () {
      return {
      }
    },
    methods: {
    },
    mounted () {
    },
    created () {
    },
    watch: {
    }
  }
</script>

<style scoped lang='scss'>
  .bread {
    height: 40px;
    line-height: 26px;
    display: flex;
    align-items: center;
    margin: 20px 0;
    .el-bread {
      display: inline-block;
      text-align: right;
      line-height: 26px;
    }
  }
</style>
