<template>
  <div>
    <md-tabs class="md-transparent" md-alignment="fixed">
      <md-tab 
        id="tab-home" 
        md-label="Posts" 
        @click="$router.push('/')"
      >
      </md-tab>
      <md-tab
        id="tab-pages"
        md-label="Category"
        @click="$router.push('/category')"
      >
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
export default {
  name: "HeadingTab",
  methods: {
      
  }
};
</script>

<style scoped>
.md-tabs {
  margin-bottom: 24px;
}
</style>
