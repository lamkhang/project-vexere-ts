<template>
  <div>
    <Loader v-if="loading" />
    <table class="table table-striped table-bordered" v-else>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ID</th>
          <th scope="col">EMAIL</th>
          <th scope="col">USER TYPE</th>
          <th scope="col">FULL NAME</th>
          <th scope="col">TICKETS</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in users"
          :key="index"
          :style="{'opacity': user.userType === 'admin' ? '0.6' : '1'}"
        >
          <th scope="row">{{index + 1 + (currentPage-1)*itemPage}}</th>
          <td>{{user._id}}</td>
          <td>{{user.email}}</td>
          <td>{{user.userType}}</td>
          <td>{{user.fullName}}</td>
          <td></td>
          <td>
            <div class="d-flex">
              <md-button
              class="md-raised"
              :disabled="user.userType === 'admin'"
              @click="handleEditUser(user)"
            >EDIT</md-button>
            <md-button
              class="md-raised md-accent"
              :disabled="user.userType === 'admin'"
              @click="handleDeleteUser(user)"
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
import toastr from "toastr/build/toastr.min.js";
import $ from "jquery";
import Loader from "./../../../../components/Loader/index.vue";
export default {
  props: ["keySearch"],
  components: {
    Loader
  },
  data() {
    return {
      itemPage: 3,
      totalPage: 1,
      currentPage : 1,

    };
  },
  created() {
    this.currentPage = 1;
    this.$store.default.dispatch("fetchListUsers");
  },
  methods: {
    handleDeleteUser(user) {
      const store = this.$store;
        toastr.warning(
          "<button type='button' class='btn btn-secondary mr-2' id='closeToastr' >Close</button> <button type='button' class='btn btn-danger' id='dispatchHandleUser'>Delete</button>",
          "Are you want to delete USER?",
          {
            closeButton: true,
            timeOut: 0,
            positionClass: "toast-top-center",
            tapToDismiss: false,
            onShown: function($event) {
              $("#dispatchHandleUser").click(function() {
                store.default.dispatch("deleteUser", user._id);
                toastr.remove();
              });
              $("#closeToastr").click(function() {
                toastr.remove();
              });
            }
          }
        );
    },
    handleEditUser(user) {
      this.$emit("editUser", user);
    },
    handlePageClick(page) {
      this.currentPage = page;
    },
    handleTotalPage(users) {
      this.totalPage = Math.ceil(users.length / this.itemPage);
    }
  },
  computed: {
    loading() {
      return this.$store.default.state.users.loading;
    },
    users() {
      const _users = [...this.$store.default.state.users.data];      
      if (_users && this.keySearch !== "") {
        const users = _users.filter(user => {
          return !(
            user.fullName
              .toLowerCase()
              .indexOf(this.keySearch.toLowerCase()) === -1
          );
        });
        this.handleTotalPage(users);
        return users.splice((this.currentPage - 1)*this.itemPage,  this.itemPage)
      } else {
        this.handleTotalPage(_users);
        return _users.splice((this.currentPage - 1)*this.itemPage,  this.itemPage);
      }
    }
  },
  watch: {
    keySearch() {
      this.currentPage  = 1;
    }
  }
};
</script>

<style>
</style>