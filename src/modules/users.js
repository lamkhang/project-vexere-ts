import { api } from "./../api";
import toastr from "toastr/build/toastr.min.js";

const state = {
  loading: false,
  data: null,
  err: null
};

const mutations = {
  storeUserRequest(state) {
    state.loading = true,
    state.data = null,
    state.err = null
  },
  storeUserSuccess(state, payload) {
    state.loading = false;
    state.data = payload;
    state.err = null;
  },
  storeUserFail(state, payload) {
    state.loading = false;
    state.data = null;
    state.err = payload;
  }
}

const actions = {
  fetchListUsers({commit}) {
    commit("storeUserRequest");
    api.get("users")
    .then(result => {
      commit("storeUserSuccess", result.data);
    })
    .catch(err => {
      console.log(err);
      commit("storeUserFail", err)
    })
  },
  addUser({ commit, dispatch }, authUser, bool) {
    commit("storeUserRequest");
    const message = bool ? "Create User" : "Sign Up"
    api.post("users/create", authUser)
    .then(result => {
      commit("storeUserSuccess" , result);
      toastr.success(`${message}success`, "", {
        timeOut: 3000,
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      dispatch("fetchListUsers");    
    })
    .catch(err => {
      toastr.error(err, "Oops", {
        timeOut: 3000,
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      commit("storeUserFail", err)
    })
  },
  editUser({ commit, dispatch }, user) {
    commit("storeUserRequest");
    api.put(`users/${user._id}`, user)
    .then(result => {
      commit("storeUserSuccess" , result);
      toastr.success("Edit User successfully", "", {
        timeOut: 3000,
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      dispatch("fetchListUsers"); 
    })
    .catch(err => {
      toastr.error(err, "Oops", {
        timeOut: 3000,
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      commit("storeUserFail", err)
    })
  },
  deleteUser({ commit, dispatch }, userId) {
    commit("storeUserRequest");
    api.delete(`users/${userId}`)
    .then(result => {
      commit("storeUserSuccess" , result);
      toastr.error("Delete User successfully", "", {
        timeOut: 3000,
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      dispatch("fetchListUsers");
    })
    .catch(err => {
      toastr.error(err, "Oops", {
        timeOut: 3000,
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      commit("storeUserFail", err)
    })
  }
  

};

export default { state, mutations, actions };