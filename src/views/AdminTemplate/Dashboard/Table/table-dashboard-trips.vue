<template>
  <div>
    <Loader v-if="loading" />
    <table class="table table-striped table-bordered" v-else>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">STATION FROM</th>
          <th scope="col">STATION TO</th>
          <th scope="col">START TIME</th>
          <th scope="col">PRICE</th>
          <th scope="col">TOTAL SEATS</th>
          <th scope="col">AVAIABLE SEATS</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(trip, index) in trips"
          :key="index"
        >
          <th scope="row">{{index + 1 + (currentPage-1)*itemPage}}</th>
          <td>{{trip.fromStationId.name}}</td>
          <td>{{trip.toStationId.name}}</td>
          <td>{{trip.startTime}}</td>
          <td>{{trip.price}}</td>
          <td>{{trip.seats.length}}</td>
          <td>{{trip.avaiableSeatNumber}}</td>
          <td>
            <div class="d-flex">
              <md-button
              class="md-raised"
              @click="handleEditTrip(trip)"
            >EDIT</md-button>
            <md-button
              class="md-raised md-accent"
              :disabled="trip.seats.length !== trip.avaiableSeatNumber"
              @click="handleDeleteTrip(trip)"
            >DELETE</md-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" v-for="index in totalPage" :key="index" :class="{'active': currentPage === index}">
          <span class="page-link" style="cursor: pointer" @click="handlePageClick(index)">{{index}}</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Loader from "./../../../../components/Loader/index.vue";
import toastr from "toastr/build/toastr.min.js";
import $ from "jquery";

export default {
  components: {
    Loader
  },
  data() {
    return {
      itemPage: 2,
      totalPage: 1,
      currentPage : 1,
    }
  },
  created() {
    this.currentPage = 1;
    this.$store.default.dispatch("fetchListTrips");
  },
  methods: {
    handleEditTrip(trip) {
      this.$emit("editTrip", trip)
    },  
    handleDeleteTrip(trip) {
      if(trip.seats.length === trip.avaiableSeatNumber) {
        const store = this.$store;
        toastr.warning(
          "<button type='button' class='btn btn-secondary mr-2' id='closeToastr' >Close</button> <button type='button' class='btn btn-danger' id='dispatchHandleTrip'>Delete</button>",
          "Are you want to delete TRIP?",
          {
            closeButton: true,
            timeOut: 0,
            positionClass: "toast-top-center",
            tapToDismiss: false,
            onShown: function($event) {
              $("#dispatchHandleTrip").click(function() {
                store.default.dispatch("deleteTrip", trip._id);
                toastr.remove();
              });
              $("#closeToastr").click(function() {
                toastr.remove();
              });
            }
          }
        );
      }
    },
    handlePageClick(page) {
      this.currentPage = page;
    },
    handleTotalPage(stations) {
      this.totalPage = Math.ceil(stations.length / this.itemPage);
    },
  },
  computed: {
    loading() {
      return this.$store.default.state.trips.loading;
    },
    trips() {
      const trips = [...this.$store.default.state.trips.data];
      this.handleTotalPage(trips);
      return trips.splice((this.currentPage - 1)*this.itemPage,  this.itemPage);
    }
  }
}
</script>

<style>

</style>