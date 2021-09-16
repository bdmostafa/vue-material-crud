<template>
  <div id="app">
    <HeadingTab/>
    <!-- <Category/>
    <Post/> -->
    <router-view />
  </div>
</template>

<script>
import HeadingTab from "./components/HeadingTab.vue";
// import Category from './components/Categories.vue';
// import Posts from './components/Posts.vue'

export default {
  name: "app",
  components: {
    HeadingTab,
    // Category,
    // Posts
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
