<template>
  <div>
    <v-card>
      <v-card-title>CPU Usage</v-card-title>
      <v-card-text>
        <canvas id="cpuChart"></canvas>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { Pie } from "vue-chartjs";
import axios from "axios";

export default {
  extends: Pie,
  data() {
    return {
      cpuData: null,
    };
  },
  async mounted() {
    this.cpuData = await this.fetchCpuData();
    this.renderChart(
      {
        labels: ["Used", "Free"],
        datasets: [
          {
            data: [this.cpuData.used, this.cpuData.free],
            backgroundColor: ["#FF6384", "#36A2EB"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB"],
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },
  methods: {
    async fetchCpuData() {
      const response = await axios.get("http://localhost:3000/api/cpu"); // replace with your endpoint URL
      return {
        used: response.data.used,
        free: response.data.free,
      };
    },
  },
};
</script>
