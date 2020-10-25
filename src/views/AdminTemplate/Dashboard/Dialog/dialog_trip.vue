<template>
  <md-dialog :md-active.sync="showDialog">
    <md-dialog-title>{{`${trip ? 'EDIT' : 'ADD'} TRIP` }}</md-dialog-title>
    <div class="trip-form">
      <form @submit.prevent="handleAddEditTrip()" style="padding: 0 22px 20px" ref="formTrip">
        <div class="md-layout">
          <div class="w-100">
            <div class="md-layout-item">
              <md-field>
                <label for="fromStationId">fromStationId</label>
                <md-select
                  v-model="fromStationId"
                  name="fromStationId"
                  id="fromStationId"
                  :disabled="!(trip === null)"
                >
                  <md-option
                    :value="station._id"
                    v-for="(station, index) in stations"
                    :key="index"
                  >{{station.name}}</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
          <div class="w-100">
            <div class="md-layout-item">
              <md-field>
                <label for="toStationId">toStationId</label>
                <md-select
                  v-model="toStationId"
                  name="toStationId"
                  id="toStationId"
                  :disabled="!(trip === null)"
                >
                  <md-option
                    :value="station._id"
                    v-for="(station, index) in stations"
                    :key="index"
                    :disabled="station._id === fromStationId"
                  >{{station.name}}</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
          <div class="form-group w-100">
            <md-datepicker v-model="startTime" />
          </div>
          <div class="form-group w-100">
            <md-field>
              <label>Price</label>
              <md-input
                type="text"
                class="form-control"
                name="price"
                required="required"
                v-model="price"
                @blur="$v.price.$touch()"
              ></md-input>
            </md-field>
            <span
              class="text-danger ml-1"
              v-if="$v.price.$dirty && !$v.price.required"
            >(*) province is not empty</span>
          </div>
        </div>

        <div class="d-flex justify-content-end" style="margin-top: 20px">
          <md-button class="md-raised" @click="showDialog = false">Close</md-button>
          <md-button
            class="md-raised md-primary"
            type="submit"
            :disabled="$v.$invalid"
          >{{`${trip ? 'EDIT' : 'ADD'} TRIP` }}</md-button>
        </div>
      </form>
    </div>
  </md-dialog>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import toastr from "toastr/build/toastr.min.js";
import $ from "jquery";
export default {
  props: ["showDialogTrip", "trip"],
  data() {
    return {
      showDialog: false,
      fromStationId: null,
      toStationId: null,
      startTime: null,
      price: null
    };
  },
  created() {
    this.$store.default.dispatch("fetchListStations");
  },
  methods: {
    handleAddEditTrip() {
      if (!this.$v.$invalid) {
        const store = this.$store;
        const trip = { ...this.trip };
        if (Object.keys(trip).length > 0) {
          // EDIT
          trip.startTime = new Date(this.startTime);
          trip.price = this.price;
          trip.fromStationId = trip.fromStationId._id;
          trip.toStationId = trip.toStationId._id;
          toastr.warning(
            "<button type='button' class='btn btn-secondary mr-2' id='closeToastr' >Close</button> <button type='button' class='btn btn-success' id='dispatchHandleTrip'>Yes</button>",
            "Are you want to edit TRIP?",
            {
              closeButton: true,
              timeOut: 0,
              positionClass: "toast-top-center",
              tapToDismiss: false,
              onShown: function($event) {
                $("#dispatchHandleTrip").click(function() {
                  store.default.dispatch("editTrip", trip);
                  toastr.remove();
                });
                $("#closeToastr").click(function() {
                  toastr.remove();
                });
              }
            }
          );
        } else {
          const data = {
            fromStationId: this.fromStationId,
            toStationId: this.toStationId,
            startTime: this.startTime,
            price: this.price
          };
          toastr.warning(
            "<button type='button' class='btn btn-secondary mr-2' id='closeToastr' >Close</button> <button type='button' class='btn btn-success' id='dispatchHandleTrip'>Yes</button>",
            "Are you want to create TRIP?",
            {
              closeButton: true,
              timeOut: 0,
              positionClass: "toast-top-center",
              tapToDismiss: false,
              onShown: function($event) {
                $("#dispatchHandleTrip").click(function() {
                  store.default.dispatch("createTrip", data);
                  toastr.remove();
                });
                $("#closeToastr").click(function() {
                  toastr.remove();
                });
              }
            }
          );
        }
      }
    },
    clearFormTrip() {
      this.fromStationId = null,
      this.toStationId = null,
      this.startTime = null,
      this.price = null
    }
  },
  watch: {
    showDialogTrip() {
      this.showDialog = true;
      this.clearFormTrip();
    },
    trip() {
      if (this.trip) {
        const startTime = new Date(this.trip.startTime);
        this.fromStationId = this.trip.fromStationId.name;
        this.toStationId = this.trip.toStationId.name;
        this.startTime = startTime.getFullYear() + "-" + (startTime.getMonth() + 1 ) + "-" + startTime.getDate();
        this.price = this.trip.price;
      }
    }
  },
  computed: {
    stations() {
      return this.$store.default.state.stations.data;
    }
  },
  validations: {
    fromStationId: {
      required
    },
    toStationId: {
      required
    },
    startTime: {
      required
    },
    price: {
      required
    }
  }
};
</script>

<style lang="scss">
.form-control {
  background: #f2f2f2;
  box-shadow: none !important;
  &:focus {
    background: #e2e2e2;
  }
}
</style>