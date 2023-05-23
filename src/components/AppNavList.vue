<template>
  <v-list>
    <v-list-item>
      <v-list-item prepend-icon="mdi-view-dashboard" @click="goTo('dashboard')">
        <v-list-item-title>控制板</v-list-item-title>
      </v-list-item>
      <v-list-item prepend-icon="mdi-code-braces" @click="goTo('yaml-editor')">
        <v-list-item-title>YAML 编辑</v-list-item-title>
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-file-edit"
        @click="goTo('markdowneditor')"
      >
        <v-list-item-title>编辑文档</v-list-item-title>
      </v-list-item>
      <v-list-item prepend-icon="mdi-information" @click="goTo('about')">
        <v-list-item-title>关于</v-list-item-title>
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
