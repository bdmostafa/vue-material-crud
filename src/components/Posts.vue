<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <md-content>
      <div class="md-layout md-gutter post-heading">
        <div class="md-layout-item"><h3>All Posts</h3></div>
        <div class="md-layout-item">
          <md-button
            class="md-raised md-accent create-btn"
            @click="isModal = true"
          >
            <md-icon class="fa fa-plus"></md-icon>Create Post</md-button
          >
        </div>
      </div>
      <md-table>
        <md-table-row>
          <md-table-head>Title</md-table-head>
          <md-table-head>Action</md-table-head>
        </md-table-row>

        <md-table-row>
          <md-table-cell>Assistant Media Planner</md-table-cell>
          <md-table-cell>
            <md-icon class="fa fa-external-link-square"></md-icon>
            <md-icon class="fa fa-edit"></md-icon>
            <md-icon class="fa fa-trash"></md-icon>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </md-content>

    <div v-if="isModal">
      <PostModal />
    </div>
  </div>
</template>

<script>
import PostModal from "./PostModal.vue";

export default {
  name: "Posts",
  components: {
    PostModal
  },
  data() {
    return {
      isModal: false,
    };
  },
  methods: {}
};
</script>

<style scoped>
.post-heading {
  max-width: 450px;
  display: flex;
  align-items: center;
  margin: 0 auto;
}
.create-btn {
  font-weight: bold;
}
.md-icon.md-theme-default.md-icon-font,
.md-table-cell-container i {
  color: red;
  cursor: pointer;
}
.md-table table {
  width: 50%;
  margin: 0 auto;
}
.md-table.md-theme-default .md-table-head {
  font-weight: bold;
  font-size: 18px;
}
</style>
