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
            @click="isPostModal = true"
          >
            <md-icon class="fa fa-plus"></md-icon>Create Post</md-button
          >
        </div>
      </div>
      <md-table class="md-table-area">
        <md-table-row>
          <md-table-head>Title</md-table-head>
          <md-table-head>Action</md-table-head>
        </md-table-row>

        <md-table-row v-for="(post, index) in posts" :key="index">
          <md-table-cell> {{ post.title }} </md-table-cell>
          <span class="icons-area">
            <md-table-cell>
              <span @click="goPostDetails(index)">
                <md-icon class="fa fa-external-link-square"></md-icon>
              </span>

              <div v-if="isPostDetailsModal && activeIndex === index">
                <PostDetailsModal :post="post" />
              </div>

              <span @click="goPostModalForEdit(index)">
                <md-icon class="fa fa-edit"></md-icon>
                <div v-if="isPostModalEdit && activeIndex === index">
                  <PostModal :post="post" />
                </div>
              </span>

              <span @click="deletePost(post.id)">
                <md-icon class="fa fa-trash"></md-icon>
              </span>
            </md-table-cell>
          </span>
        </md-table-row>
      </md-table>
    </md-content>

    <div v-if="isPostModal">
      <PostModal />
    </div>
  </div>
</template>

<script>
import PostModal from "./PostModal.vue";
import PostDetailsModal from "./PostDetailsModal.vue";

export default {
  name: "Posts",
  components: {
    PostModal,
    PostDetailsModal
  },
  data() {
    return {
      isPostModal: false,
      isPostModalEdit: false,
      isPostDetailsModal: false,
      activeIndex: -1,
      posts: []
    };
  },
  methods: {
    goPostDetails(index) {
      this.activeIndex = index;
      this.isPostDetailsModal = true;
      this.isPostModal = false;
      this.isPostModalEdit = false;
    },
    goPostModalForEdit(index) {
      this.isPostModalEdit = true;
      this.activeIndex = index;
      this.isPostDetailsModal = false;
      this.isPostModal = false;
    },
    deletePost(id) {
      this.posts = this.posts.filter(post => post.id !== id)
      localStorage.setItem('posts', JSON.stringify(this.posts))
    }
  },
  mounted() {
    if (localStorage.getItem("posts")) {
      const persedPosts = JSON.parse(localStorage.getItem("posts"));
      this.posts = persedPosts;
    }
    // console.log(this.posts);
  },
  watch: {
    posts(newPost) {
      // localStorage.posts.push(newPost);
    }
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
.md-table-head {
  text-align: center;
}
.md-table-row {
  text-align: center;
}
.icons-area {
  display: contents;
}
.md-table-cell-container {
  display: inline-flex;
}
</style>
