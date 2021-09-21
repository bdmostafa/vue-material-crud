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
                <md-field :class="getValidationClass('title')">
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

        <md-snackbar :md-active.sync="categorySubmitted"
          >The category named "{{ name }}" was saved with success!</md-snackbar
        >
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
  data() {
    return {
      showDialog: true,
      name: "",
      form: {
        name: null
      },
      categorySubmitted: false,
      sending: false
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
        console.log(this.form.name);
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
