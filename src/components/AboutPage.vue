<template>
  <div>
    <AppBarNav></AppBarNav>
      <div class="container">
          <div class="card">
            <v-card-title class="text-center">ETC后台管理</v-card-title>
            <v-card-subtitle class="text-center"
              >版本号：{{ version }}</v-card-subtitle
            >
            <v-card-subtitle class="text-center"
              >最后次开发时间：{{ lastDeveloped }}</v-card-subtitle
            >
            <v-card-subtitle class="text-center"
              >创建了一个基础框架并没有其他功能。</v-card-subtitle
            >
          </div>

      </div>
  </div>
</template>

<script>
import AppBarNav from "@/components/AppBarNav.vue";

export default {
  components: { AppBarNav },
  data() {
    return {
      version: "0.1.2-alpha",
      lastDeveloped: "2023年5月25日",
    };
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
.container {
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  background: linear-gradient(to bottom, #ffffff, #f0f0f0); /* Adjust the colors as needed */
  border: 1px solid #cccccc; /* Adjust the border color as needed */
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add shadow for depth */
}
</style>
