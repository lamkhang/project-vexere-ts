<template>
  <div class="admin-dashboard__content">
          <div class="admin-header__navbar">
            <div class="nav-left">
              <div class="nav-left__icon" @click="handleHideSidebar()">
                <i class="fa fa-bars"></i>
              </div>
            </div>
            <div class="nav-right">
              <img src="https://i.pinimg.com/474x/16/55/cd/1655cd86623d22c6ef4cc45d667544db.jpg" alt class="img-fluid" />
              <span>{{name}}</span>
            </div>
          </div>
          <div class="admin-main-content">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <md-button class="md-raised md-primary" @click="handleAddEdit(null)">ADD NEW {{typeSidebar === "users" ? "users" : typeSidebar === "stations" ?  "stations" : "trips"}}</md-button>
              </div>
              <div class="input-group mb-3" style="width: 300px;">
                <input
                  type="text"
                  class="form-control"
                  id="txtSearch"
                  placeholder="Search..."
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  v-on:keyup.enter="handleSearch"
                  v-model="keySearch"
                />
                <div class="input-group-append" style="cursor: pointer;">
                  <span class="input-group-text" id="basic-addon2">
                    <i class="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="mt-4">
              <TableDashboardUser v-if="typeSidebar === 'users' " @editUser="handleAddEdit" :keySearch="keySearch" />
              <TableDashboardStation v-if="typeSidebar === 'stations' "  @editStation="handleAddEdit" :keySearch="keySearch" />
              <TableDashboardTrips v-if="typeSidebar === 'trips'" @editTrip="handleAddEdit" />

              <DialogUser :showDialogUser="showDialog" :user="user" v-if="typeSidebar === 'users'" />
              <DialogStation :showDialogStation="showDialog" :station="station" v-if="typeSidebar === 'stations'" />
              <DialogTrip :showDialogTrip="showDialog" :trip="trip" v-if="typeSidebar === 'trips'" />
            </div>
          </div>
        </div>
</template>

<script>
import TableDashboardUser from "./Table/table-dashboard-users.vue";
import TableDashboardStation from "./Table/table-dashboard-stations.vue";
import TableDashboardTrips from "./Table/table-dashboard-trips.vue";
import DialogUser from "./Dialog/dialog_user.vue";
import DialogStation from "./Dialog/dialog_station.vue";
import DialogTrip from "./Dialog/dialog_trip.vue";
import jwtDecode from "jwt-decode";

export default {
  props: [ "typeSidebar" ],
  components: {
    TableDashboardUser,
    TableDashboardStation,
    TableDashboardTrips,
    DialogUser,
    DialogStation,
    DialogTrip
  },
  created() {
    const decode = jwtDecode(localStorage.getItem("token"));
    this.name = decode.fullName;
  },
  data() {
    return {
      showDialog: false,
      user: null,
      station: null,
      trip: null,
      keySearch: "",
      name: ""
    }
  },
  methods: {
    handleAddEdit(data) {
      this.showDialog = !this.showDialog;
      if(this.typeSidebar === "users"){
        this.user = data;
      } else if(this.typeSidebar === "stations"){
        this.station = data;
      } else if(this.typeSidebar === "trips") {
        this.trip = data
      }
    },
    handleHideSidebar() {
      this.$emit("handleHideSidebar");
    }
  },
  watch: {
    typeSidebar() {
      this.keySearch = "";
    }
  }
}
</script>

<style lang="scss">
  .admin-dashboard__content {
    .admin-header__navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.0625);
      min-height: 66px;
      .nav-left {
        margin-left: 30px;
        list-style: none;
        display: flex;
        transition: all 0.3s linear;
        border-radius: 4px;
        &__icon {
          padding: 10px;
          color: #72777a;
          cursor: pointer;
          &:hover {
            color: #333;
            transition: all 0.5s linear;
          }
        }
        &:hover{
          background-color: #D7D7D7;
        }
      }
      .nav-right {
        padding: 0 15px;
        img {
          height: 32px;
          margin-right: 10px;
          border-radius: 50%;
        }
      }
    }
    .admin-main-content {
      background-color: #f9fafb !important;
      padding: 20px;
      .input-group {
        .form-control {
          &:focus {
            box-shadow: none !important;
            border-color: #ced4da !important;
          }
        }
      }
    }
  }
</style>