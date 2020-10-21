import Vue from "vue";
import Vuex from "vuex";
import stations from "./../modules/stations";
import login from "./../modules/login";
import trips from "./../modules/trips";
import tickets from "./../modules/tickets";
import users from "./../modules/users";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    stations,
    login,
    trips,
    tickets,
    users
  }
})