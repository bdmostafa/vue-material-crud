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

        <md-table-row v-for="(category, index) in categories" :key="index">
          <md-table-cell> {{ category.name }} </md-table-cell>
          <span class="icons-area">
            <md-table-cell>
              <span @click="goCategoryModalForEdit(index)">
                <md-icon class="fa fa-edit"></md-icon>
              </span>

              <div v-if="isCategoryModalEdit && activeIndex === index">
                <CategoryModal :category="category" />
              </div>

              <span @click="removeCategory(category.id)">
                <md-icon class="fa fa-trash"></md-icon>
              </span>
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
      isModal: false,
      isCategoryModalEdit: false,
      activeIndex: -1,
      categories: []
    };
  },
  methods: {
    goCategoryModalForEdit(index) {
      this.activeIndex = index;
      this.isCategoryModalEdit = true;
      this.isModal = false;
    },
    removeCategory(id) {
      this.categories = this.categories.filter(category => category.id !== id);
      localStorage.setItem("categories", JSON.stringify(this.categories));
    }
  },
  computed: {},
  mounted() {
    if (localStorage.getItem("categories")) {
      const persedCategories = JSON.parse(localStorage.getItem("categories"));
      this.categories = persedCategories;
    }
    console.log(this.categories);
  }
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
