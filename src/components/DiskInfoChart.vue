<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import axios from "axios";
// import { ref, onMounted } from 'vue';
import Chart from "chart.js/auto";

export default {
  name: "DiskInfoChart",
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get("/api/diskinfo");
        const diskInfo = response.data;
        this.updateChart(diskInfo);
      } catch (error) {
        console.error(error);
      }

      setTimeout(() => {
        this.fetchData();
      }, 5000);
    },
    updateChart(diskInfo) {
      const chartData = {
        labels: ["Total", "Used"],
        datasets: [
          {
            label: "Disk Space",
            data: [diskInfo.total, diskInfo.used],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 99, 132, 0.2)",
            ],
            borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      };

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => {
                return `${value} GB`;
              },
            },
          },
        },
      };

      if (this.chartInstance) {
        this.chartInstance.data = chartData;
        this.chartInstance.update();
      } else {
        const chartCanvas = this.$refs.chartCanvas;
        this.chartInstance = new Chart(chartCanvas, {
          type: "line",
          data: chartData,
          options: chartOptions,
        });
      }
    },
  },
};
</script>
