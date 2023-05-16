<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Etherealcraft 后台管理</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <AppNavList></AppNavList>
    </v-navigation-drawer>
  </div>
</template>

<script>
// import yamlEditor from "@/views/YamlEditor.vue";

import AppNavList from "@/components/AppNavList.vue";

export default {
  components: { AppNavList },
  data() {
    return {
      drawer: null,
      totalFiles: 0,
      chartData: null,
    };
  },
  methods: {},

  mounted() {},
};
</script>
