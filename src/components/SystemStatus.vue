<template>
  <div>
    <el-progress
      type="line"
      :percentage="formatPercentage(systemInfo.cpuUsage)"
      :status="progressStatus(systemInfo.cpuUsage)"
    >
    </el-progress>
    <span>{{ formatPercentage(systemInfo.cpuUsage) }}% CPU Usage</span>
    <!-- Repeat for other metrics as necessary -->
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
      systemInfo: {},
    };
  },
  methods: {
    getSystemInfo() {
      axios.get("https://localhost:3000/api/systemInfo").then((response) => {
        this.systemInfo = response.data;
      });
    },
    progressStatus(value) {
      if (value < 50) return "success";
      if (value < 80) return "warning";
      return "exception";
    },
    formatPercentage(value) {
      return value.toFixed(2);
    },
  },
  mounted() {
    this.getSystemInfo();
    setInterval(this.getSystemInfo, 5000); // Refresh every 5 seconds
  },
};
</script>
