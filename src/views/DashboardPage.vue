<template>
  <div>
    <AppBarNav></AppBarNav>
    <h1>Dashboard</h1>
    <p>Total YAML Files: {{ totalFiles }}</p>
    <system-info></system-info>
  </div>
</template>

<script>
import axios from "axios";
import AppBarNav from "@/components/AppBarNav.vue";
import SystemInfo from "@/components/SystemInfo.vue";

export default {
  components: {
    SystemInfo,
    AppBarNav,
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
        const response = await axios.get("https://api.etherealcraft.cn/api/yml");
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
