<template>
  <v-list>
    <v-list-item>
      <v-list-item prepend-icon="mdi-view-dashboard" @click="goTo('dashboard')">
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-item prepend-icon="mdi-code-braces" @click="goTo('yaml-editor')">
        <v-list-item-title>YAML Editor</v-list-item-title>
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-File-Edit"
        @click="goTo('markdown-editor')"
      >
        <v-list-item-title>编辑文档</v-list-item-title>
      </v-list-item>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      drawer: null,
      totalFiles: 0,
      chartData: null,
    };
  },
  methods: {
    goTo(router) {
      this.$router.push(`/${router}`);
    },
  },

  mounted() {},
};
</script>

<style scoped></style>
