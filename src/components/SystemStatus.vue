<template>
  <div>
    <h2>System Information</h2>
    <div v-if="systemInfo">
      <h3>CPU Usage</h3>
      <el-progress :percentage="systemInfo.cpuUsage"></el-progress>
      <h3>Memory Usage</h3>
      <el-progress
        :percentage="(systemInfo.usedMemory / systemInfo.totalMemory) * 100"
      ></el-progress>
      <!-- Add more progress bars as necessary for other data -->
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import { ElProgress } from "element-plus";
import axios from "axios";

export default {
  components: {
    ElProgress,
  },
  data() {
    return {
      systemInfo: null,
    };
  },
  async created() {
    try {
      const response = await axios.get("/systemInfo");
      this.systemInfo = response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
