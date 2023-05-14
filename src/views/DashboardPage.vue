<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>App</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item-group>
          <v-list-item @click="goTo('dashboard')">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="goTo('yaml-editor')">
            <v-list-item-icon>
              <v-icon>mdi-code-braces</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>YAML Editor</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
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
