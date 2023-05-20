<template>
  <div>
    <AppBarNav></AppBarNav>
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <el-card>
            <v-card-title class="text-center">ETC后台管理</v-card-title>
            <v-card-subtitle class="text-center"
              >版本号：{{ version }}</v-card-subtitle
            >
            <v-card-text class="text-center"
              >最后次开发时间：{{ lastDeveloped }}</v-card-text
            >
            <p>其他内容</p>
          </el-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AppBarNav from "@/components/AppBarNav.vue";

export default {
  components: { AppBarNav },
  data() {
    return {
      version: "0.1.2-alpha",
      lastDeveloped: "2023年5月20日",
    };
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
