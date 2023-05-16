<template>
  <div>
    <AppBarNav></AppBarNav>
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
import AppBarNav from "@/components/AppBarNav.vue";
// import yamlEditor from "@/views/YamlEditor.vue";

export default {
  components: {
    AppBarNav,
    SystemInfoChart,
    // yamlEditor,
  },
  data() {
    return {
      drawer: null,
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
    goTo(router) {
      this.$router.push(`/${router}`);
    },
  },

  mounted() {
    this.fetchFiles();
  },
};
</script>
