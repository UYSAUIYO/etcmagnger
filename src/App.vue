<template>
  <v-app>
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

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: null,
    };
  },
  methods: {
    goTo(router) {
      this.$router.push(`/${router}`);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900");
body,
html {
  font-family: "Roboto", sans-serif;
}
</style>
