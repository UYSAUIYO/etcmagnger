<template>
  <div>
    <el-progress
      v-for="(item, index) in systemInfo"
      :key="index"
      :percentage="item.percentage"
      :text-inside="true"
      :stroke-width="18"
      :type="getProgressBarType(item.percentage)"
      :color="getProgressBarColor(item.percentage)"
    >
      {{ item.label }}
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
    getProgressBarType(percentage) {
      if (percentage <= this.statusThresholds.warning) {
        return "circle";
      } else {
        return "dashboard";
      }
    },
    async getSystemInfo() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/systeminfo"
        ); // 根据实际的后端路由进行修改
        const { cpu, diskLayout, memory, networkStats } = response.data;

        if (cpu && cpu.currentload !== undefined) {
          this.systemInfo = [
            {
              label: "CPU",
              percentage: parseFloat(cpu.currentload),
            },
            {
              label: "Memory",
              percentage:
                (parseFloat(memory.used) / parseFloat(memory.total)) * 100,
            },
            {
              label: "Network",
              percentage: parseFloat(networkStats[0].tx_sec) / 1000, // 以 KB/s 为单位显示
            },
            {
              label: "Disk",
              percentage: parseFloat(diskLayout[0].use),
            },
          ];
        }
      } catch (error) {
        console.error("获取系统信息出错：", error);
      }
    },
  },
};
</script>
