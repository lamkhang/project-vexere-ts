import { api } from "./../api";
import toastr from "toastr/build/toastr.min.js";

const state = {
  loading: false,
  data: null,
  err: null
}

const mutations = {
  storeStationRequest(state) {
    state.loading = true;
    state.data = null;
    state.err = null;
  },
  storeStationSuccess(state, payload) {
    state.loading = false;
    state.data = payload;
    state.err = null;
  },
  storeStationFail(state, payload) {
    state.loading = false;
    state.data = null;
    state.err = payload;
  },
}

const actions = {
  fetchListStations({commit}) {
    commit("storeStationRequest");
    api.get("/stations")
    .then(result => {
      commit("storeStationSuccess", result.data);
    })
    .catch(err => {
      console.log(err);
      commit("storeStationFail", err)
    })
  },
  fetDetailStations({commit}, id) {
    commit("storeStationRequest");
    api.get(`/stations/${id}`)
    .then(result => {
      commit("storeStationSuccess", result.data);
    })
    .catch(err => {
      console.log(err);
      commit("storeStationFail", err)
    })
  },
  createStation({commit, dispatch}, station) {
    commit("storeStationRequest");
    api.post("stations", station)
    .then(result => {
      commit("storeStationSuccess", result.data);
      toastr.success("Create Station success", "", {
        timeOut: 3000,
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      dispatch("fetchListStations");
      
    })
    .catch(err => {
      toastr.error(err, "Oops", {
        timeOut: 3000,
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      commit("storeStationFail", err)
    })
  },
  editStation({commit, dispatch}, station) {
    commit("storeStationRequest");
    api.put(`stations/${station._id}`, station)
    .then(result => {
      commit("storeStationSuccess", result.data);
      toastr.success("Edit Station success", "", {
        timeOut: 3000,
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      dispatch("fetchListStations");
    })
    .catch(err => {
      toastr.error(err, "Oops", {
        timeOut: 3000,
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      commit("storeStationFail", err)
    })
  },
  deleteStation({ commit, dispatch }, stationId) {
    commit("storeUserRequest");
    api.delete(`stations/${stationId}`)
    .then(result => {
      commit("storeStationSuccess", result.data);
      toastr.error("Delete Station successfully", "", {
        timeOut: 3000,
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      dispatch("fetchListStations");
    })
    .catch(err => {
      toastr.error(err, "Oops", {
        timeOut: 3000,
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      commit("storeStationFail", err)
    })
  }
}

export default { state,  mutations, actions }