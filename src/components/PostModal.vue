<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <form novalidate class="md-layout" @submit.prevent="validatePost">
        <md-card class="md-layout-item md-size-100 md-small-size-100">
          <md-card-header>
            <div class="md-title">CREATE POST</div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('title')">
                  <label for="title">Title</label>
                  <md-input
                    name="title"
                    id="title"
                    autocomplete="given-name"
                    v-model="form.title"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.title.required"
                    >The title is required</span
                  >
                  <span class="md-error" v-else-if="!$v.form.title.minlength"
                    >Invalid title</span
                  >
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('category')">
                  <label for="category">Category</label>
                  <md-select
                    name="category"
                    id="category"
                    v-model="form.category"
                    md-dense
                    :disabled="sending"
                    multiple
                  >
                    <h3>+ Create New Category</h3>
                    <md-option value="Cat 1">Cat 1 </md-option>
                    <md-option value="Cat 2">Cat 2 </md-option>
                  </md-select>
                  <span class="md-error">The category is required</span>
                </md-field>
              </div>
            </div>

            <md-field :class="getValidationClass('body')">
              <label for="body">Body</label>
              <md-input
                type="text"
                name="body"
                id="body"
                autocomplete="body"
                v-model="form.body"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.body.required"
                >The body is required</span
              >
              <span class="md-error" v-else-if="!$v.form.body.minlength"
                >Invalid body</span
              >
            </md-field>
          </md-card-content>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />

          <md-card-actions>
            <md-button class="md-primary" @click="showDialog = false"
              >Cancel</md-button
            >
            <md-button type="submit" class="md-primary" :disabled="sending"
              >Submit</md-button
            >
          </md-card-actions>
        </md-card>

        <md-snackbar :md-active.sync="postSubmitted"
          >The post named "{{ title }}" was saved with success!</md-snackbar
        >
      </form>
    </md-dialog>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "PostModal",
  mixins: [validationMixin],
  props: ["post"],
  data() {
    return {
      postData: [
        {
          id: "",
          title: "",
          category: "",
          body: ""
        }
      ],
      showDialog: true,
      title: "",
      form: {
        title: null,
        category: null,
        body: null
      },
      postSubmitted: false,
      sending: false
    };
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(3)
      },
      category: {
        required
      },
      body: {
        required,
        maxLength: maxLength(100)
      }
    }
  },
  mounted() {
    // Load post data from local storage
    if (localStorage.getItem("postData")) {
      try {
        this.postData = JSON.parse(localStorage.getItem("postData"));
      } catch (e) {
        localStorage.removeItem("postData");
      }
    }

    // Assign value into the inputs fields from props (post)
    let vm = this;

    vm.$nextTick(function() {
      if (vm.post) {
        this.form.title = vm.post.title;
        this.form.category = vm.post.category;
        this.form.body = vm.post.body;
      }
    });
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.title = null;
      this.form.category = null;
      this.form.body = null;
    },
    submitPost() {
      this.sending = true;

      // When there is any post already in the list
      if (localStorage.getItem("postData")) {
        const posts = JSON.parse(localStorage.getItem("postData"));

        // When the current post remains (for updating purposes)
        if (this.post) {
          const postIndex = posts.findIndex(p => p.id === this.post.id);
          console.log(postIndex);

          // For editing the current post
          if (postIndex > -1) {
            let updatedPost = {
              id: this.post.id,
              title: this.form.title,
              category: this.form.category,
              body: this.form.body
            };

            posts.splice(postIndex, 1, updatedPost);

            // Update data property
            this.postData = posts;
          }
        }
        // For adding new post
        else {
          const newPost = {
            id: parseInt(posts.length + 1),
            title: this.form.title,
            category: this.form.category,
            body: this.form.body
          };

          let updatedPosts = [...posts, newPost];

          // Update data property
          this.postData = updatedPosts;
        }

        // localStorage.removeItem('postData');
        // Save into local storage
        localStorage.setItem("postData", JSON.stringify(this.postData));
      }
      // When there is no post in the list, set id as 1
      else {
        const newPost = {
          id: 1,
          title: this.form.title,
          category: this.form.category,
          body: this.form.body
        };

        // Update data property
        this.postData.push(newPost);

        // Save into local storage
        localStorage.setItem("postData", JSON.stringify(this.postData));
      }

      // Instead of this timeout, here you can call your API
      // We are using local storage above
      window.setTimeout(() => {
        this.sending = false;
        this.clearForm();
        this.showDialog = false;
      }, 1500);
    },
    validatePost() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.submitPost();
      }
    }
  }
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
.md-table-cell-container {
  display: inline-flex;
}
</style>
