import Vue from "vue";
import App from "./App.vue";
import VueMaterial from "vue-material";
import "vue-material/dist/theme/default.css";
import "vue-material/dist/vue-material.min.css";
import router from "./router";
import Vuelidate from "vuelidate";

Vue.use(VueMaterial);
Vue.use(Vuelidate);

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
