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
            >EDIT</md-button>
            <md-button
              class="md-raised md-accent"
              
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
    this.$store.default.dispatch("fetchListTrips");
  },
  methods: {
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