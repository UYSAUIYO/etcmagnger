<template>
  <div>
    <AppBarNav></AppBarNav>
    <h1>Dashboard</h1>
    <p>Total YAML Files: {{ totalFiles }}</p>
    <!-- Add more dashboard information here -->
    <v-divider></v-divider>
    <el-card><system-info-chart></system-info-chart></el-card>
    <el-card>
      <v-card-title>网络情况</v-card-title>
      <network-chart></network-chart
    ></el-card>
    <!--    <el-card>-->
    <!--      <v-card-title>磁盘情况</v-card-title>-->
    <!--      <dsik-info></dsik-info>-->
    <!--    </el-card>-->
  </div>
</template>

<script>
import axios from "axios";
import SystemInfoChart from "@/components/SystemStatus.vue";
import AppBarNav from "@/components/AppBarNav.vue";
import NetworkChart from "@/components/NetworkInfo.vue";
// import DsikInfo from "@/components/DiskInfoChart.vue";
// import yamlEditor from "@/views/YamlEditor.vue";

export default {
  components: {
    // DsikInfo,
    NetworkChart,
    AppBarNav,
    SystemInfoChart,
    // yamlEditor,
  },
  data() {
    return {
      drawer: null,
      totalFiles: 0,
      chartData: null,
    };
  },
  methods: {
    async fetchFiles() {
      try {
        const response = await axios.get("http://localhost:3000/api/yml");
        this.totalFiles = response.data.files.length;
      } catch (error) {
        console.error("Could not fetch files", error);
      }
    },
    goTo(router) {
      this.$router.push(`/${router}`);
    },
  },

  mounted() {
    this.fetchFiles();
  },
};
</script>
