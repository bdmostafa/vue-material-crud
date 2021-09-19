<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">POST Details</div>
        </md-card-header>

        <md-dialog-title>Title: Post name</md-dialog-title>

        <div>
          <md-content> <strong> Category: Cat 1 | Cat 2 </strong> </md-content>
          <md-content> <strong> Body: </strong> Post body ... </md-content>
        </div>

        <md-card-actions>
          <md-button class="md-primary" @click="showDialog = false"
            >Close</md-button
          >
        </md-card-actions>
      </md-card>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "PostDetailsModal",
  data() {
    return {
      showDialog: true
    };
  },
  methods: {}
};
</script>

<style scoped>
.md-dialog /deep/.md-dialog-container {
  max-width: 768px;
}
.md-card-header {
  padding: 16px;
  background-color: darkorange;
  color: white;
}
</style>
