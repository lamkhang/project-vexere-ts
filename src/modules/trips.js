import { api } from "./../api";
import toastr from "toastr/build/toastr.min.js";

const state = {
  loading: false,
  data: null,
  err: null
}

const mutations = {
  storeTripRequest(state) {
    state.loading = true;
    state.data = null;
    state.err = null;
  },
  storeTripSuccess(state, payload) {
    state.loading = false;
    state.data = payload;
    state.err = null;
  },
  storeTripFail(state, payload) {
    state.loading = false;
    state.data = null;
    state.err = payload;
  },
}
const actions = {
  fetchListTrips({commit}) {
    commit("storeTripRequest");
    api.get('trips')
    .then(result => {
      commit("storeTripSuccess", result.data);
    })
    .catch(err => {
      console.log(err);
      commit("storeTripFail", err);
      toastr.error(err, "Oops", {
        timeOut: 3000,
        positionClass: 'toast-top-center',
        progressBar: true,
      });
    })
  }
}

export default { state, mutations, actions };
