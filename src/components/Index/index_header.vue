<template>
  <el-menu  :default-active="activeIndex"
            router
            mode="horizontal"
            :ellipsis="false"
            class="index_header">
    <el-menu-item index="0" class="logo">Your Logo</el-menu-item>
    <div class="flex-grow"/>
    <el-menu-item class="menu-list" index="1" @click="indexPage"><a class="menu-text">照片墙</a></el-menu-item>
    <el-menu-item class="menu-list" index="1" @click="blogPage"><a class="menu-text">博客</a></el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "IndexComList",
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    indexPage() {
      this.$router.push(`/index/photowall`);
    },
    blogPage() {
      this.$router.push(`/index/blog`);
    },
  },
};
</script>

<style scoped lang="less">
@import "@/assets/css/IndexPage.less";
.flex-grow {
  flex-grow: 1;
}

.index_header {
  width: 100%;
  height: 5%;
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.55);
  -webkit-backdrop-filter: blur(3px);
  border: 0.8px solid rgba(255, 255, 255, 0.18);
  box-shadow: rgba(142, 142, 142, 0.19) 0 6px 15px 0;
  -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0 6px 15px 0;
  border-radius: 0 0 15px 15px;
  -webkit-border-radius: 0 0 15px 15px;
  color: rgba(255, 255, 255, 0.3);
}

.menu-list {
  font-size: 16px;
  padding: 0 20px 0 20px;
  margin-left: 20px !important;
  margin-right: 20px !important;
  .menu-text {
    color: @dark-bull-color-a !important;
  }
}

.logo {
   /* Push the logo to the left */
  font-size: 24px;
  font-weight: bold;
}
</style>