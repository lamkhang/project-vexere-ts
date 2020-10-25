import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import * as store from "./store/index.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min.js";
import { MdField, MdButton, MdSnackbar, MdCard, MdDialog, MdList, MdMenu, MdContent, MdDatepicker } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css'
import "toastr/build/toastr.css";
import toastr from "toastr/build/toastr.min.js";
import Vuelidate from "vuelidate";

Vue.use(Vuelidate);
Vue.use(MdField);
Vue.use(MdButton);
Vue.use(MdSnackbar);
Vue.use(MdCard);
Vue.use(MdDialog);
Vue.use(MdMenu);
Vue.use(MdList);
Vue.use(MdContent);
Vue.use(MdDatepicker);
Vue.use(toastr);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
