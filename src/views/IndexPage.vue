<script setup>
import Header from "@/components/Index/index_header.vue";
</script>

<template>
    <Header></Header>
    <router-view></router-view>
</template>

<style scoped lang="less">
@import "@/assets/css/IndexPage.less";
.container{
  width: 100%;
  height: 100%;
}

</style>
