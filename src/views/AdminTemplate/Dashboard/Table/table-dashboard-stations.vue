<template>
  <div>
    <Loader v-if="loading" />
    <table class="table table-striped table-bordered" v-else>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ID</th>
          <th scope="col">NAME</th>
          <th scope="col">ADDRESS</th>
          <th scope="col">PROVINCE</th>
          <th scope="col">IMAGE</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(station, index) in stations"
          :key="index"
        >
          <th scope="row">{{index + 1 + (currentPage-1)*itemPage}}</th>
          <td>{{station._id}}</td>
          <td>{{station.name}}</td>
          <td>{{station.address}}</td>
          <td>{{station.province}}</td>
          <td><img :src="getImgUrl(station.image)" alt="" class="img-fluid" style="height: 60px; width: 75px; "></td>
          <td>
            <div class="d-flex">
              <md-button
              class="md-raised"
              @click="handleEditStation(station)"
            >EDIT</md-button>
            <md-button
              class="md-raised md-accent"
              @click="handleDeleteStation(station)"
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
  props: ["keySearch"],
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
    this.$store.default.dispatch('fetchListStations');
  },
  methods: {
    handleEditStation(station) {
      this.$emit("editStation", station);
    },
    handleDeleteStation(station) {
      const store = this.$store;
        toastr.warning(
          "<button type='button' class='btn btn-secondary mr-2' id='closeToastr' >Close</button> <button type='button' class='btn btn-danger' id='dispatchHandleUser'>Delete</button>",
          "Are you want to delete stations?",
          {
            closeButton: true,
            timeOut: 0,
            positionClass: "toast-top-center",
            tapToDismiss: false,
            onShown: function($event) {
              $("#dispatchHandleUser").click(function() {
                store.default.dispatch("deleteStation", station._id);
                toastr.remove();
              });
              $("#closeToastr").click(function() {
                toastr.remove();
              });
            }
          }
        );
    },
    handlePageClick(page) {
      this.currentPage = page;
    },
    handleTotalPage(stations) {
      this.totalPage = Math.ceil(stations.length / this.itemPage);
    },
    getImgUrl(pic) {
      if(pic) {
        const images = require.context('./../../../../assets/', false);
        return images('./' + pic)
      }
    },
  },
  computed: {
    loading() {
      return this.$store.default.state.stations.loading;
    },
    stations() {
      const _stations = [...this.$store.default.state.stations.data];
      if (_stations && this.keySearch !== "") {
        const stations = _stations.filter(station => {
          return !(
            station.name
              .toLowerCase()
              .indexOf(this.keySearch.toLowerCase()) === -1
          );
        });
        this.handleTotalPage(stations);
        return stations.splice((this.currentPage - 1)*this.itemPage,  this.itemPage)
      } else {
        this.handleTotalPage(_stations);
        return _stations.splice((this.currentPage - 1)*this.itemPage,  this.itemPage);
      }
      
    }
  }
}
</script>

<style>

</style>