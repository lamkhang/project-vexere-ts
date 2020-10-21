<template>
  <section class="search-ticket-panel myContainer">
    <div class="row mx-0 mt-5">
      <div class="col-sm-4 px-0">
        <h4>Fill infor ticket</h4>
        <form @submit.prevent="handleGetInforTicket">
          <div class="form-group mb-4">
            <label for="idTicket"></label>
            <input
              type="text"
              class="form-control"
              name="idTicket"
              id="idTicket"
              aria-describedby="helpId"
              placeholder="ID Ticket"
              v-model="ticketId"
              @blur="$v.ticketId.$touch()"
            />
            <span
              class="text-danger ml-1"
              v-if="$v.ticketId.$dirty && !$v.ticketId.required"
            >(*) ID ticket is not empty</span>
          </div>
          <md-button
            class="md-raised md-primary form-control mx-0"
            type="submit"
            :disabled="!ticketId"
          >Check ticket</md-button>
        </form>
      </div>
      <div class="col-sm-8">
        <Loader v-if="loading" />
        <div v-if="!(ticketInfo || loading)">
          <div class="alert alert-success text-center ml-3" style="margin-top: 58px;">
            <span>Please fill out input ID ticket and click button</span>
          </div>
          <div>
            <img src="https://vexere.com/assets/vxr-launch-image.png" alt class="img-fluid" />
          </div>
        </div>
        <div v-if="ticketInfo" class="mx-4">
          <h4>TICKET INFORMATION</h4>
          <p class="mt-3">
            <span class="ticketKey">Ticket ID:</span>
            <span>{{ticketInfo._id}}</span>
          </p>
          <p>
            <span class="ticketKey">USER BOOKED:</span>
            <span>{{ticketInfo.userName}}</span>
          </p>
          <P>
            <span class="ticketKey">TRIP INFORMATION:</span>
            <span>Ben xe {{ticketInfo.fromStation}} - Ben xe {{ticketInfo.toStation}}</span>
          </P>
          <P>
            <span class="ticketKey">SEAT:</span>
            <span v-for="seat of ticketInfo.seats" :key="seat._id">
              {{seat.code}}
            </span>
          </P>
          <p>
            <span class="ticketKey">NAME CLIENT:</span>
            <span>{{ticketInfo.nameUserGo}}</span>
          </p>
          <p>
            <span class="ticketKey">EMAIL CLIENT:</span>
            <span>{{ticketInfo.emailUserGo}}</span>
          </p>
          <p>
            <span class="ticketKey">PHONE CLIENT:</span>
            <span>{{ticketInfo.phoneUserGo}}</span>
          </p>
          <p>
            <span class="ticketKey">NOTE:</span>
            <span>{{ticketInfo.noteUserGo}}</span>
          </p>
          <md-button class="md-raised md-accent mx-0" @click="handleDeleteticket()" :disabled="!ticketInfo">Accent</md-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import Loader from "./../../../components/Loader/index.vue";
import toastr from "toastr/build/toastr.min.js";
import jwtDecode from "jwt-decode";
import $ from "jquery";
export default {
  data() {
    return {
      ticketId: ""
    };
  },
  components: {
    Loader
  },
  methods: {
    handleGetInforTicket() {
      if (!localStorage.getItem("token")) {
        toastr.warning(
          "",
          "You need to login?",
          {
            closeButton: true,
            timeOut: 3000,
            positionClass: "toast-top-center",
          }
        );
      }
      else if (this.ticketId) {
        this.$store.default.dispatch("fetTicketById", this.ticketId);
      }
    },
    handleDeleteticket() {
      if(localStorage.getItem("token")) {
        const decode = jwtDecode(localStorage.getItem("token"));
        const store = this.$store;
        const ticketInfo = this.ticketInfo;
        if(this.ticketInfo.userId === decode._id) {
          toastr.warning(
            "<button type='button' class='btn btn-secondary mr-2' id='closeToastr' >Close</button> <button type='button' class='btn btn-danger' id='dispatchBookedSeats'>Delete</button>",
            "Are you want to delete seat?",
            {
              closeButton: true,
              timeOut: 0,
              positionClass: "toast-top-center",
              tapToDismiss: false,
              onShown: function() {
                $("#dispatchBookedSeats").click(function() {
                  store.default.dispatch("deleteTicket", ticketInfo._id);
                  toastr.remove();
                });
                $("#closeToastr").click(function() {
                  toastr.remove();
                });
              }
            }
          );
        } else {
          toastr.warning(
          "",
          "You need to use account booked to login?",
          {
            closeButton: true,
            timeOut: 3000,
            positionClass: "toast-top-center",
          }
        );
        }
      } else {
        toastr.warning(
          "",
          "You need to login?",
          {
            closeButton: true,
            timeOut: 3000,
            positionClass: "toast-top-center",
          }
        );
      }
    }
  },
  computed: {
    loading() {
      return this.$store.default.state.tickets.loading;
    },
    ticketInfo() {
      return this.$store.default.state.tickets.data;
    }
  },
  validations: {
    ticketId: {
      required
    }
  }
};
</script>

<style>
.ticketKey{
  font-weight: bold;
  width: 150px;
  display: inline-block;
}
</style>