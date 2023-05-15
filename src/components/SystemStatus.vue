<template>
  <div>
    <el-progress
      v-for="(item, index) in systemInfo"
      :key="index"
      :percentage="item.percentage"
      :text-inside="true"
      :stroke-width="18"
      type="dashboard"
      :color="getProgressBarColor(item.percentage)"
    >
      <div>{{ item.label }}</div>
    </el-progress>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      systemInfo: [
        { label: "CPU", percentage: 0 },
        { label: "Memory", percentage: 0 },
        { label: "Network", percentage: 0 },
        { label: "Disk", percentage: 0 },
      ],
      statusThresholds: {
        success: 30,
        warning: 60,
        danger: 100,
      },
    };
  },
  created() {
    this.getSystemInfo();
    setInterval(this.getSystemInfo, 5000);
  },
  methods: {
    getProgressBarColor(percentage) {
      if (percentage <= this.statusThresholds.success) {
        return "success";
      } else if (percentage <= this.statusThresholds.warning) {
        return "warning";
      } else {
        return "danger";
      }
    },
    async getSystemInfo() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/systeminfo"
        );
        const { cpu, diskLayout, memory, networkStats } = response.data;

        if (cpu && cpu.currentload !== undefined) {
          this.systemInfo = [
            {
              label: "CPU",
              percentage: parseFloat(cpu.currentload.toFixed(2)),
            },
            {
              label: "Memory",
              percentage:
                (parseFloat(memory.used) / parseFloat(memory.total)) * 100,
            },
            {
              label: "Network",
              percentage: parseFloat(networkStats[0].tx_sec.toFixed(2)) / 1000,
            },
            {
              label: "Disk",
              percentage: parseFloat(diskLayout[0].use.toFixed(2)),
            },
          ];
        }
      } catch (error) {
        console.error("Failed to retrieve system information:", error);
      }
    },
  },
};
</script>
