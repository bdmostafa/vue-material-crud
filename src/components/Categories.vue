<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <md-content>
      <div class="md-layout md-gutter post-heading">
        <div class="md-layout-item"><h3>All Categories</h3></div>
        <div class="md-layout-item">
          <md-button
            class="md-raised md-accent create-btn"
            @click="isModal = true"
          >
            <md-icon class="fa fa-plus"></md-icon>Create Category</md-button
          >
        </div>
      </div>
      <md-table class="md-table-area">
        <md-table-row>
          <md-table-head>Name</md-table-head>
          <md-table-head>Action</md-table-head>
        </md-table-row>

        <md-table-row>
          <md-table-cell>Cat 1</md-table-cell>
          <span class="icons-area">
            <md-table-cell>
              <md-icon class="fa fa-edit"></md-icon>
              <md-icon class="fa fa-trash"></md-icon>
            </md-table-cell>
          </span>
        </md-table-row>
      </md-table>
    </md-content>

    <div v-if="isModal">
      <CategoryModal />
    </div>
  </div>
</template>

<script>
import CategoryModal from "./CategoryModal.vue";

export default {
  name: "Category",
  components: {
    CategoryModal
  },
  data() {
    return {
      isModal: false
    };
  },
  methods: {},
  computed: {}
};
</script>

<style scoped>
.post-heading {
  max-width: 450px;
  display: flex;
  align-items: center;
  margin: 0 auto;
}
.md-table-area {
  max-width: 600px;
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
.md-table-cell-container {
  display: inline-flex;
}
.md-table-head {
  text-align: center;
}
.md-table-row {
  text-align: center;
}
.icons-area {
  display: contents;
}
</style>
