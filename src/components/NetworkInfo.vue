<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Chart, registerables } from "chart.js";
import axios from "axios";

Chart.register(...registerables);

export default {
  name: "NetworkChart",
  setup() {
    const chartCanvas = ref(null);
    const networkData = {
      labels: [],
      bytesSent: [],
      bytesReceived: [],
    };
    let chart = null;
    let timer = null;

    const fetchNetworkData = () => {
      axios
        .get("http://localhost:3000/api/networkinfo")
        .then((response) => {
          const data = response.data;
          const time = new Date().toLocaleTimeString();

          networkData.labels.push(time);
          networkData.bytesSent.push(data.bytesSent);
          networkData.bytesReceived.push(data.bytesReceived);

          if (networkData.labels.length > 10) {
            networkData.labels.shift();
            networkData.bytesSent.shift();
            networkData.bytesReceived.shift();
          }

          updateChart();
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const updateChart = () => {
      if (chart) {
        chart.data.labels = networkData.labels;
        chart.data.datasets[0].data = networkData.bytesSent;
        chart.data.datasets[1].data = networkData.bytesReceived;
        chart.update();
      } else {
        chart = new Chart(chartCanvas.value.getContext("2d"), {
          type: "line",
          data: {
            labels: networkData.labels,
            datasets: [
              {
                label: "上行",
                data: networkData.bytesSent,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderWidth: 2,
                lineTension: 0.4,
                fill: true,
              },
              {
                label: "下行",
                data: networkData.bytesReceived,
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
                  callback: function (value) {
                    return formatSpeed(value);
                  },
                },
              },
            },
          },
        });
      }
    };

    const startPolling = () => {
      timer = setInterval(() => {
        fetchNetworkData();
      }, 5000);
    };

    const formatSpeed = (value) => {
      const units = ["B/s", "KB/s", "MB/s", "GB/s"];
      let index = 0;
      while (value >= 1024 && index < units.length - 1) {
        value /= 1024;
        index++;
      }
      return value.toFixed(2) + units[index];
    };

    onMounted(() => {
      fetchNetworkData();
      startPolling();
    });

    onBeforeUnmount(() => {
      clearInterval(timer);
    });

    return {
      chartCanvas,
    };
  },
};
</script>
