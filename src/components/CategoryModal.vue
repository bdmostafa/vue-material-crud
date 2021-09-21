<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <form novalidate class="md-layout" @submit.prevent="validateCategory">
        <md-card class="md-layout-item md-size-100 md-small-size-100">
          <md-card-header>
            <div class="md-title">CREATE CATEGORY</div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('name')">
                  <label for="name">Name</label>
                  <md-input
                    name="name"
                    id="name"
                    autocomplete="given-name"
                    v-model="form.name"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.name.required"
                    >The name is required</span
                  >
                  <span class="md-error" v-else-if="!$v.form.name.minlength"
                    >Invalid name -> Minimum length is 3</span
                  >
                  <span class="md-error" v-else-if="!$v.form.name.maxlength"
                    >Invalid name -> Maximum length is 10</span
                  >
                </md-field>
              </div>
            </div>
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

        <md-snackbar :md-active.sync="categorySubmitted">
          The category named "{{ name }}" was saved with success!
        </md-snackbar>
      </form>
    </md-dialog>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "CategoryModal",
  mixins: [validationMixin],
  props: ["category"],
  data() {
    return {
      showDialog: true,
      name: "",
      form: {
        name: null
      },
      categorySubmitted: false,
      sending: false,
      categories: []
    };
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(10)
      }
    }
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
      this.form.name = null;
    },
    submitCategory() {
      this.sending = true;

      // When there is already any category in the list
      if (localStorage.getItem("categories")) {
        const parsedCategories = JSON.parse(localStorage.getItem("categories"));

        // When the current category remains (for updating purposes)
        if (this.category) {
          const categoryIndex = parsedCategories.findIndex(
            cat => cat.id === this.category.id
          );

          // For editing the current post
          if (categoryIndex > -1) {
            let updatedCategory = {
              id: this.category.id,
              name: this.form.name
            };

            parsedCategories.splice(categoryIndex, 1, updatedCategory);

            // Update data property
            this.categories = parsedCategories;
          }
        }
        // For adding new category
        else {
          const newCategory = {
            id: parseInt(parsedCategories.length + 1),
            name: this.form.name
          };

          let updatedCategories = [...parsedCategories, newCategory];

          // Update data property
          this.categories = updatedCategories;
        }

        // localStorage.removeItem('categories');
        // Save into local storage
        localStorage.setItem("categories", JSON.stringify(this.categories));
      }
      // When there is no category in the list, set id as 1
      else {
        const newCategory = {
          id: 1,
          name: this.form.name
        };

        // Update data property
        this.categories.push(newCategory);

        // Save into local storage
        localStorage.setItem("categories", JSON.stringify(this.categories));
      }

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.sending = false;
        this.clearForm();
        this.showDialog = false;
      }, 1500);
    },
    validateCategory() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.submitCategory();
        // console.log(this.form.name);
      }
    }
  },
  mounted() {
    // Load categories data from local storage
    if (localStorage.getItem("categories")) {
      try {
        this.categories = JSON.parse(localStorage.getItem("categories"));
      } catch (e) {
        localStorage.removeItem("categories");
      }
    }

    // Assign value into the inputs fields from props (category)
    let vm = this;

    vm.$nextTick(function() {
      if (vm.category) {
        this.form.name = vm.category.name;
      }
    });
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
