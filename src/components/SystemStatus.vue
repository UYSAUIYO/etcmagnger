<template>
  <div>
    <el-row>
      <v-col :span="5">
        <v-card>
          <div class="card-header">CPU 使用情况</div>
          <el-progress
            type="circle"
            :percentage="cpuUsage"
            :stroke-width="8"
            :color="getProgressColor(cpuUsage)"
            :format="formatPercentage"
          ></el-progress>
        </v-card>
      </v-col>
      <v-col :span="6">
        <v-card>
          <div class="card-header">内存使用情况</div>
          <el-progress
            type="circle"
            :percentage="memoryUsage"
            :stroke-width="8"
            :color="getProgressColor(memoryUsage)"
            :format="formatPercentage"
          ></el-progress>
        </v-card>
      </v-col>
      <el-col :span="6">
        <v-card>
          <div class="card-header">服务器信息</div>
          <div>
            <div>主机名: {{ serverInfo.hostname }}</div>
            <div>
              内核属性: {{ serverInfo.type }}
              <div>架构:{{ serverInfo.arch }}</div>
              <div>版本：{{ serverInfo.release }}</div>
            </div>
            <div>CPU 型号：{{ cpuModel }}</div>
            <div>内存:{{ formattedUsedMem }}\{{ formattedTotalMem }}</div>
          </div>
        </v-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { onBeforeUnmount, ref, watchEffect } from "vue";
import axios from "axios";

export default {
  setup() {
    const cpuUsage = ref(0);
    const memoryUsage = ref(0);
    const networkTraffic = ref(0);
    const serverInfo = ref({});
    const formattedUsedMem = ref("");
    const formattedTotalMem = ref("");
    const cpuModel = ref("");
    let previousData = null; // Store previous data for disposal

    const formatBytes = (bytes) => {
      const units = ["B", "KB", "MB", "GB", "TB"];
      let index = 0;
      while (bytes >= 1024 && index < units.length - 1) {
        bytes /= 1024;
        index++;
      }
      return `${bytes.toFixed(2)} ${units[index]}`;
    };

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

    const fetchSystemInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/systeminfo"
        );
        const systemInfo = response.data;
        const serverMemInfo = response.data;
        cpuUsage.value = systemInfo.cpu.currentLoad;
        memoryUsage.value =
          (systemInfo.memory.used / systemInfo.memory.total) * 100;
        networkTraffic.value = systemInfo.networkStats[0].tx_sec;
        serverMemInfo.value = systemInfo.memory;
        formattedUsedMem.value = formatBytes(serverMemInfo.memory.used);
        formattedTotalMem.value = formatBytes(serverMemInfo.memory.total);

        // Dispose previous data
        if (previousData) {
          // Dispose previous serverMemInfo value
          previousData.serverMemInfo = null;
          // Dispose previous formattedUsedMem value
          previousData.formattedUsedMem = null;
          // Dispose previous formattedTotalMem value
          previousData.formattedTotalMem = null;
        }

        // Store current data for disposal in the next request
        previousData = {
          serverMemInfo,
          formattedUsedMem,
          formattedTotalMem,
        };
      } catch (error) {
        console.error("Failed to retrieve system information:", error.message);
      }
    };

    const fetchServerInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/systeminfo"
        );
        const serverInfoData = response.data.serverInfo;
        serverInfo.value = serverInfoData;
        // cpuModel.value = response.data.serverInfo.cpu.modelValue;
        // formattedFreeMem.value = formatBytes(serverInfoData.freemem);
        // formattedTotalMem.value = formatBytes(serverInfoData.totalmem);
      } catch (error) {
        console.error("Failed to retrieve system information:", error.message);
      }
    };
    const fetchCPUInfo = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/cpui");
        cpuModel.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    watchEffect(async () => {
      await fetchSystemInfo();
      await fetchServerInfo();
      await fetchCPUInfo();
      const intervalId = setInterval(fetchSystemInfo, 5000);
      onBeforeUnmount(() => {
        clearInterval(intervalId);
        // Dispose previous data on component unmount
        if (previousData) {
          previousData.serverMemInfo = null;
          previousData.formattedUsedMem = null;
          previousData.formattedTotalMem = null;
        }
      });
    });

    return {
      cpuModel,
      cpuUsage,
      formatNumber,
      formatPercentage,
      formattedTotalMem,
      formattedUsedMem,
      getProgressColor,
      memoryUsage,
      networkTraffic,
      serverInfo,
    };
  },
};
</script>
