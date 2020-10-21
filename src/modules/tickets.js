import { api } from "./../api";
import toastr from "toastr/build/toastr.min.js";
// import * as trips from "./trips";

const state = {
  loading: false,
  data: null,
  err: null
};
const mutations = {
  storeTicketRequest(state) {
    state.loading = true;
    state.data = null;
    state.err = null;
  },
  storeTicketSuccess(state, payload) {
    state.loading = false;
    state.data = payload;
    state.err = null;
  },
  storeTicketFail(state, payload) {
    state.loading = false;
    state.data = null;
    state.err = payload;
  }
};
const actions = {
  bookedSeat({ commit, dispatch }, ticket) {
    commit("storeTicketRequest");
    api.post("/tickets", ticket)
      .then(result => {
        commit("storeTicketSuccess", result.data);
        dispatch("fetchListTrips");
        let seats = "";
        for (const item of result.data.seats) {
          seats = seats + " " + item.code
        }
        toastr.info(`<div><h3 class='text-center'>Book ticket sucessfully</h3>
    <p><span style='width: 100px;' class='d-inline-block'>ticketId: </span><span>${result.data._id}</span></p>
    <p><span  style='width: 100px;' class='d-inline-block'>Trip ID: </span><span>${result.data.tripId}</span></p>
    <p><span  style='width: 100px;' class='d-inline-block'>Seats info: </span><span>${seats}</span></p><p><span  style='width: 100px;' class='d-inline-block'>Client Booked: </span><span>${ticket?.name}</span></p>
    <p><span  style='width: 100px;' class='d-inline-block'>Name Client: </span><span>${result.data.nameUserGo}</span></p>
    <p><span  style='width: 100px;' class='d-inline-block'>Email Client: </span><span>${result.data.emailUserGo}</span></p>
    <p><span  style='width: 100px;' class='d-inline-block'>Phone Client: </span><span>${result.data.phoneUserGo}</span></p>
    <p><span  style='width: 100px;' class='d-inline-block'>Price: </span><span>${result.data.totalPrice}</span></p>
    </div>`, "", {
          positionClass: 'toast-top-full-width',
          closeButton: 'true',
          timeOut: 0,
          tapToDismiss: false,
        });
      })
      .catch(err => {
        commit("storeTicketFail", err.response.data);
        toastr.error(err.response.data.message, "Oops", {
          timeOut: 3000,
          positionClass: 'toast-top-center',
          progressBar: true,
        });
      })
  },
  fetTicketById({commit, dispatch}, ticketId) {
    commit("storeTicketRequest");
    api.get(`/tickets/${ticketId}`)
    .then(result => {
      commit("storeTicketSuccess", result.data);
      dispatch("")
    })
    .catch(err => {
      console.log(err);
      commit("storeTicketFail", err)
    })
  },
  deleteTicket({commit}, ticketId) {
    commit("storeTicketRequest");
    api.delete(`/tickets/${ticketId}`)
      .then(result => {
        toastr.error("Delete Ticket successfully", "", {
        timeOut: 3000,
        positionClass: 'toast-top-center',
        progressBar: true,
      });
        commit("storeTicketSuccess", result);
      })
      .catch(err => {
      console.log(err);
      commit("storeTicketFail", err)
    })
  }
}

export default { state, mutations, actions };