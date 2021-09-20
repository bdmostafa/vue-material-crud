<template>
  <div id="app">
    <HeadingTab/>
    <router-view />
  </div>
</template>

<script>
import HeadingTab from "./components/HeadingTab.vue";

export default {
  name: "app",
  components: {
    HeadingTab,
  },
  data() {
    return {
      isPost: true,
      isCategory: false
    };
  }
};
</script>

<style></style>
