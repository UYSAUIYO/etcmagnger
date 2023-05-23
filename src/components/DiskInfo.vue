<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import Chart from "chart.js/auto";

export default {name: "DiskIOComponent", setup() {
    const chartCanvas = ref(null);
    let chartInstance = null;
    const diskData = {
      time: [],
      readBytes: [],
      writeBytes: [],
    };
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/diskinfo");
        const data = response.data;

        const time = new Date().toLocaleTimeString();
        diskData.time.push(time);
        diskData.readBytes.push(data.read_bytes);
        diskData.writeBytes.push(data.write_bytes);

        updateChart();
      } catch (error) {
        console.error(error);
      }
    };
    const formatBytes = (bytes) => {
      if (bytes === 0) return "0 Bytes";

      const kilobyte = 10240;
      const units = ["Bytes", "KB", "MB", "GB", "TB"];
      const i = Math.floor(Math.log(bytes) / Math.log(kilobyte));
      const value = parseFloat((bytes / Math.pow(kilobyte, i)).toFixed(2));
      return `${value} ${units[i]}`;
    };
    const updateChart = () => {
      if (chartInstance) {
        chartInstance.data.labels = diskData.time;
        chartInstance.data.datasets[0].data = diskData.readBytes;
        chartInstance.data.datasets[1].data = diskData.writeBytes;
        chartInstance.update(); // 更新图表数据
      } else {
        const ctx = chartCanvas.value.getContext("2d");
        chartInstance = new Chart(ctx, {
          type: "line",
          data: {
            labels: diskData.time,
            datasets: [
              {
                label: "读取",
                data: diskData.readBytes,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderWidth: 2,
                lineTension: 0.4,
                fill: true,
              },
              {
                label: "写入",
                data: diskData.writeBytes,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderWidth: 2,
                lineTension: 0.4,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                display: true,
              },
              y: {
                display: true,
                beginAtZero: true,
                ticks: {
                  max: 9,
                  callback: function (value) {
                    return formatBytes(value);
                  },
                },
              },
            },
            // plugins: {
            //   tooltip: {
            //     callbacks: {
            //       label: function (context) {
            //         const bytes = context.raw;
            //         const speed = calculateSpeed(bytes);
            //         return formatBytes(bytes) + " (" + speed + "/s)";
            //       },
            //     },
            //   },
            // },
          },
        });
      }
    };


    // const calculateSpeed = (bytes) => {
    //   const duration = 5; // 数据请求间隔为5秒
    //   const speed = bytes / duration;
    //   return formatBytes(speed);
    // };

    onMounted(() => {
      fetchData();
      setInterval(fetchData, 5000);
    });

    return {
      chartCanvas,
      diskData,
      formatBytes,
    };
  },};
</script>

<style scoped>

</style>
