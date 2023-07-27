<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less">
body,
html {
  font-family: "Roboto", sans-serif;
  background-color: #6bd2ea;
  background-image:
      radial-gradient(at 47% 33%, hsl(162.00, 77%, 40%) 0, transparent 59%),
      radial-gradient(at 82% 65%, hsl(198.95, 68%, 44%) 0, transparent 55%);
}
</style>
