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
  },
  createTrip({commit, dispatch}, trip) {
    commit("storeTripRequest");
    api.post("trips", trip)
      .then(result => {
        commit("storeTripSuccess", result.data);
        toastr.success("Create Trip success", "", {
          timeOut: 3000,
          positionClass: 'toast-top-center',
          progressBar: true,
        });
        dispatch("fetchListTrips");
      })
      .catch(err => {
        toastr.error(err, "Oops", {
          timeOut: 3000,
          positionClass: 'toast-top-center',
          progressBar: true,
        });
        commit("storeTripFail", err)
      })
  },
  editTrip({commit, dispatch}, trip) {
    commit("storeTripRequest");
    api.patch(`trips/${trip._id}`, {
      price: trip.price,
      startTime:trip.startTime
    })
    .then(result => {
      commit("storeTripSuccess", result);
      toastr.success("Edit Trip success", "", {
        timeOut: 3000,
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      dispatch("fetchListTrips");
    })
    .catch(err => {
      toastr.error(err, "Oops", {
        timeOut: 3000,
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      commit("storeTripFail", err)
    })
  },
  deleteTrip({commit, dispatch}, tripId) {
    commit("storeTripRequest");
    api.delete(`trips/${tripId}`)
    .then(result => {
      commit("storeTripSuccess", result);
      toastr.success("Delete Trip success", "", {
        timeOut: 3000,
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      dispatch("fetchListTrips");
    })
    .catch(err => {
      toastr.error(err, "Oops", {
        timeOut: 3000,
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      commit("storeTripFail", err)
    })
  }
}

export default { state, mutations, actions };
