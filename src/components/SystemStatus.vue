<template>
  <div>
    <h1>System Information</h1>
    <div>
      <h2>CPU Usage</h2>
      <el-progress type="circle" :percentage="cpuUsage"></el-progress>
    </div>
    <div>
      <h2>Memory Usage</h2>
      <el-progress type="circle" :percentage="memoryUsage"></el-progress>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { ElProgress } from "element-plus";

export default {
  components: {
    ElProgress,
  },
  setup() {
    const cpuUsage = ref<number>(0);
    const memoryUsage = ref<number>(0);

    let intervalId: number;

    const fetchSystemInfo = async () => {
      const response = await axios.get("/api/systeminfo");
      const data = response.data;
      cpuUsage.value = data.cpu.currentload;
      memoryUsage.value = (data.memory.used / data.memory.total) * 100;
    };

    onMounted(() => {
      fetchSystemInfo();
      intervalId = setInterval(fetchSystemInfo, 5000);
    });

    onUnmounted(() => {
      clearInterval(intervalId);
    });

    return {
      cpuUsage,
      memoryUsage,
    };
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 50px;
}

div {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80vh;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
