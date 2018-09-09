<!--
视图模板
-->
<template>
  <div class="content">
    <header-cmp></header-cmp>
    <router-view></router-view>
  </div>
</template>
<script>
  import HeaderCmp from '@/components/HeaderCmp.vue'
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
    },
    components: {
      HeaderCmp
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    height: 100%;
    .menupage {
      height: calc(100% - 80px);
      .main-content {
        padding-top: 20px;
      }
    }
  }
</style>
