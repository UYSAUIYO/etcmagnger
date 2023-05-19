<template>
  <div class="disk-info">
    <h2>磁盘信息</h2>
    <div v-for="(disk, index) in diskInfo" :key="index" class="disk-chart">
      <h3>{{ disk.name }} ({{ disk.drive }})</h3>
      <canvas :id="`pieChart-${index}`"></canvas>
      <canvas :id="`lineChart-${index}`"></canvas>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";

export default {
  name: "DsikInfo",
  data() {
    return {
      diskInfo: [],
    };
  },
  mounted() {
    this.fetchDiskInfo();
    setInterval(this.fetchDiskInfo, 3000);
  },
  methods: {
    fetchDiskInfo() {
      axios
        .get("http://localhost:3000/api/diskInfo")
        .then((response) => {
          this.diskInfo = response.data;
          this.renderCharts();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    renderCharts() {
      this.diskInfo.forEach((disk, index) => {
        const pieChartId = `pieChart-${index}`;
        const lineChartId = `lineChart-${index}`;

        const pieChartCanvas = document.getElementById(pieChartId);
        const lineChartCanvas = document.getElementById(lineChartId);

        if (pieChartCanvas && lineChartCanvas) {
          new Chart(pieChartCanvas.getContext("2d"), {
            type: "doughnut",
            data: {
              labels: ["已使用", "空余"],
              datasets: [
                {
                  data: [disk.used, disk.available],
                  backgroundColor: ["#FF6384", "#36A2EB"],
                  hoverBackgroundColor: ["#FF6384", "#36A2EB"],
                },
              ],
            },
          });

          new Chart(lineChartCanvas.getContext("2d"), {
            type: "line",
            data: {
              labels: disk.history.map((point) => point.timestamp),
              datasets: [
                {
                  label: "读速度",
                  data: disk.history.map((point) => point.readSpeed),
                  borderColor: "#FF6384",
                  fill: false,
                },
                {
                  label: "写速度",
                  data: disk.history.map((point) => point.writeSpeed),
                  borderColor: "#36A2EB",
                  fill: false,
                },
              ],
            },
            options: {
              scales: {
                x: {
                  type: "time",
                  time: {
                    unit: "second",
                  },
                },
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }
      });
    },
  },
};
</script>

<style scoped></style>
