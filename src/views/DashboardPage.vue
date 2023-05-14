<template>
  <div>
    <h1>Dashboard</h1>
    <p>Total YAML Files: {{ totalFiles }}</p>
    <!-- Add more dashboard information here -->
    <v-divider></v-divider>
    <system-info-chart></system-info-chart>
  </div>
</template>

<script>
import axios from "axios";
import SystemInfoChart from "@/components/SystemStatus.vue";
// import yamlEditor from "@/views/YamlEditor.vue";

export default {
  components: {
    SystemInfoChart,
    // yamlEditor,
  },
  data() {
    return {
      totalFiles: 0,
      chartData: null,
    };
  },
  methods: {
    async fetchFiles() {
      try {
        const response = await axios.get("http://localhost:3000/api/yml");
        this.totalFiles = response.data.files.length;
      } catch (error) {
        console.error("Could not fetch files", error);
      }
    },
  },

  mounted() {
    this.fetchFiles();
  },
};
</script>
