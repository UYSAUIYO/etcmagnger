<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="12">
          <el-chart :options="cpuOptions" style="height: 300px"></el-chart>
        </el-col>
        <el-col :span="12">
          <el-chart :options="memoryOptions" style="height: 300px"></el-chart>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-chart :options="diskOptions" style="height: 300px"></el-chart>
        </el-col>
        <el-col :span="12">
          <el-chart :options="networkOptions" style="height: 300px"></el-chart>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  data() {
    return {
      cpuOptions: {},
      memoryOptions: {},
      diskOptions: {},
      networkOptions: {},
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get("http://localhost:3000/api/system")
        .then((response) => {
          const systemData = response.data;
          this.setCpuData(systemData.cpuOccupancy);
          this.setMemoryData(systemData.memoryOccupancy);
          this.setDiskData(systemData.diskOccupancy);
          this.setNetworkData(systemData.networkOccupancy);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    setCpuData(occupancy) {
      this.cpuOptions = {
        labels: ["Occupied", "Free"],
        datasets: [
          {
            data: [occupancy, 100 - occupancy],
            backgroundColor: ["#FF6384", "#36A2EB"],
          },
        ],
      };
    },
    setMemoryData(occupancy) {
      this.memoryOptions = {
        labels: ["Occupied", "Free"],
        datasets: [
          {
            data: [occupancy, 100 - occupancy],
            backgroundColor: ["#FF6384", "#36A2EB"],
          },
        ],
      };
    },
    setDiskData(occupancy) {
      this.diskOptions = {
        labels: ["Occupied", "Free"],
        datasets: [
          {
            data: [occupancy, 100 - occupancy],
            backgroundColor: ["#FF6384", "#36A2EB"],
          },
        ],
      };
    },
    setNetworkData(occupancy) {
      this.networkOptions = {
        labels: ["Occupied", "Free"],
        datasets: [
          {
            data: [occupancy, 100 - occupancy],
            backgroundColor: ["#FF6384", "#36A2EB"],
          },
        ],
      };
    },
  },
};
</script>
