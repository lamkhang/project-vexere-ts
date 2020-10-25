import { api } from "../api";
import jwtDecode from "jwt-decode";
import router from "../router";
import setHeader from "../utils/setHeader";
import toastr from "toastr/build/toastr.min.js";

const state = {
  loading: false,
  token: null,
  name: null,
  err: null
}

const mutations = {
  storeAuthRequest(state) {
    state.loading = true;
    state.token = null;
    state.name = null;
    state.err = null;
  },
  storeAuthSuccess(state, payload) {
    state.loading = false;
    state.token = payload.token;
    state.name = payload.name;
    state.err = null;
  },
  storeAuthFail(state, payload) {
    state.loading = false;
    state.token = null;
    state.name = null;
    state.err = payload;
  },
  clearAuthData(state) {
    state.loading = false;
    state.token = null;
    state.name = null;
    state.err = null;
  }
}

const actions = {
  logout({ commit }) {
    commit("clearAuthData");
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    router.replace("/");
    toastr.success("Logout success", "", {
      timeOut: 3000,
      positionClass: 'toast-top-right',
      progressBar: true,
    });
  },
  setLogoutTimer({ dispatch }, exp) {
    setTimeout(() => {
      dispatch("logout")
    }, exp);
  },
  login({ commit, dispatch }, authUser) {
    commit("storeAuthRequest");
    api.post("users/login", authUser)
      .then(result => {
        if (result.data.token) {
          const decode = jwtDecode(result.data.token);
          setHeader(result.data.token);
          const payload = {
            token: result.data.token,
            name: decode.fullName
          }
          commit("storeAuthSuccess", payload);
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("exp", decode.exp);
          dispatch("setLogoutTimer", decode.exp);
          toastr.success("Login success", "", {
            timeOut: 3000,
            positionClass: 'toast-top-center',
            progressBar: true,
          });
        }
        else{
          throw new Error(result.data.message)
        }
      })
      .catch(err => {
        toastr.error(err, "Oops", {
          timeOut: 3000,
          positionClass: 'toast-top-center',
          progressBar: true,
        });
      })
  },
  loginAdmin({commit, dispatch}, authAdmin){
    commit("storeAuthRequest");
    api.post("/users/login", authAdmin)
    .then(result => {
      if(result?.data?.token){
        const decode = jwtDecode(result.data.token);
        if(decode.userType === "admin"){
          setHeader(result.data.token);
          const payload = {
            token: result.data.token,
            name: decode.fullName
          }
          commit("storeAuthSuccess", payload);
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("exp", decode.exp);
          dispatch("setLogoutTimer", decode.exp);
          router.replace("/admin/dashboard");
          toastr.success("Login success", "", {
            timeOut: 3000,
            positionClass: 'toast-top-center',
            progressBar: true,
          });
        } else{
          return Promise.reject({
            response: { data: {message: "you do not permission access"}}
          })
        }
      }
    })
    .catch(err => {
      dispatch("storeAuthFail", err)
    })
  },
  tryAutoLogin({commit, dispatch}) {
    const token = localStorage.getItem("token");
    if(!token)
      return ;
    const decode = jwtDecode(token);
    const payload = {
      token,
      name: decode.fullName
    };
    setHeader(token);
    const exp = localStorage.getItem("exp");
    const date = new Date().getTime()/1000;
    if(date > exp) {
      dispatch("logout");
    }
    commit("storeAuthSuccess", payload);

  }
}

export default { state, mutations, actions }