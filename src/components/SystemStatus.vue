<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-card>
          <div class="card-header">CPU Usage</div>
          <el-progress
            type="circle"
            :percentage="cpuUsage"
            :stroke-width="8"
            :color="getProgressColor(cpuUsage)"
            :format="formatPercentage"
          ></el-progress>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="card-header">Memory Usage</div>
          <el-progress
            type="circle"
            :percentage="memoryUsage"
            :stroke-width="8"
            :color="getProgressColor(memoryUsage)"
            :format="formatPercentage"
          ></el-progress>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="card-header">Network Traffic</div>
          <el-progress
            type="circle"
            :percentage="networkTraffic"
            :stroke-width="8"
            :color="getProgressColor(networkTraffic)"
            :format="formatNumber"
          ></el-progress>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="card-header">Server Info</div>
          <div>
            <div>Hostname: {{ serverInfo.hostname }}</div>
            <div>Type: {{ serverInfo.type }}</div>
            <div>Platform: {{ serverInfo.platform }}</div>
            <div>Arch: {{ serverInfo.arch }}</div>
            <div>Release: {{ serverInfo.release }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import axios from "axios";

export default {
  name: "PerformanceDashboard",
  components: {},
  data() {
    return {
      serverInfo: {},
    };
  },
  setup() {
    const cpuUsage = ref(0);
    const memoryUsage = ref(0);
    const networkTraffic = ref(0);
    const diskUsage = ref([]);
    const serverInfo = ref({});

    const formatPercentage = (percentage) => {
      if (Number.isInteger(percentage)) {
        return `${percentage}%`;
      } else {
        return parseFloat(percentage).toFixed(2) + "%";
      }
    };

    const formatNumber = (value) => {
      if (Number.isInteger(value)) {
        return value.toString();
      } else {
        if (value < 1024) {
          return value.toFixed(2) + " B";
        } else if (value < 1024 * 1024) {
          return (value / 1024).toFixed(2) + " KB";
        } else if (value < 1024 * 1024 * 1024) {
          return (value / (1024 * 1024)).toFixed(2) + " MB";
        } else {
          return (value / (1024 * 1024 * 1024)).toFixed(2) + " GB";
        }
      }
    };

    const getProgressColor = (percentage) => {
      if (percentage < 50) {
        return "#67C23A"; // Green
      } else if (percentage < 80) {
        return "#E6A23C"; // Yellow
      } else {
        return "#F56C6C"; // Red
      }
    };

    watchEffect(async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/systeminfo"
        );
        const systemInfo = response.data;
        cpuUsage.value = systemInfo.cpu.currentLoad;
        memoryUsage.value =
          (systemInfo.memory.used / systemInfo.memory.total) * 100;
        networkTraffic.value = systemInfo.networkStats[0].tx_sec;
        // diskUsage.value = systemInfo.diskLayout.map((disk) => ({
        //   name: disk.name,
        //   use: disk.use,
        // }));
        serverInfo.value = systemInfo.serverInfo;
      } catch (error) {
        console.error("Failed to retrieve system information:", error.message);
      }
    });

    return {
      cpuUsage,
      memoryUsage,
      networkTraffic,
      diskUsage,
      formatPercentage,
      formatNumber,
      getProgressColor,
    };
  },
};
</script>
