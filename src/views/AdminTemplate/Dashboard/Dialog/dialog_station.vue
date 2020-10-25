<template>
  <md-dialog :md-active.sync="showDialog">
    <md-dialog-title>{{`${station ? 'EDIT' : 'ADD'} STATION` }}</md-dialog-title>
    <div class="user-form">
      <form
        ref="formStation"
        @submit.prevent="handleAddEditStation(formStation)"
        style="min-width: 550px; padding-left: 22px; padding-right: 22px; padding-top: 0"
      >
        <div class="form-group">
          <md-field>
            <label>Name</label>
            <md-input
              type="text"
              class="form-control"
              name="name"
              required="required"
              v-model="formStation.name"
              @blur="$v.formStation.name.$touch()"
            ></md-input>
          </md-field>
          <span
            class="text-danger ml-1 d-block"
            v-if="$v.formStation.name.$dirty && !$v.formStation.name.required"
          >(*) name is not empty</span>
        </div>
        <div class="form-group">
          <md-field>
            <label>Address</label>
            <md-input
              type="text"
              class="form-control"
              name="address"
              required="required"
              v-model="formStation.address"
              @blur="$v.formStation.address.$touch()"
            ></md-input>
          </md-field>
          <span
            class="text-danger ml-1"
            v-if="$v.formStation.address.$dirty && !$v.formStation.address.required"
          >(*) Address is not empty</span>
          <span
            class="text-danger ml-1"
            v-if="$v.formStation.address.$dirty && !$v.formStation.address.minLength"
          >
            (*) address much be more
            {{ $v.formStation.address.$params.minLength.min }} character
          </span>
        </div>
        <div class="form-group">
          <md-field>
            <label>Province</label>
            <md-input
              type="text"
              class="form-control"
              name="province"
              required="required"
              v-model="formStation.province"
              @blur="$v.formStation.province.$touch()"
            ></md-input>
          </md-field>
          <span
            class="text-danger ml-1"
            v-if="$v.formStation.province.$dirty && !$v.formStation.province.required"
          >(*) province is not empty</span>
        </div>
        <div class="form-group">
          <md-field>
            <label>Image</label>
            <md-input type="text" class="form-control" name="fullName" v-model="formStation.image"></md-input>
          </md-field>
        </div>
        <div class="d-flex justify-content-end" style="margin-top: 20px">
          <md-button class="md-raised" @click="showDialog = false">Close</md-button>
          <md-button
            class="md-raised md-primary"
            type="submit"
            :disabled="$v.$invalid"
          >{{`${station ? 'EDIT' : 'ADD'} STATION` }}</md-button>
        </div>
      </form>
    </div>
  </md-dialog>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";
import toastr from "toastr/build/toastr.min.js";
import $ from "jquery";
export default {
  props: ["showDialogStation", "station"],
  data() {
    return {
      showDialog: false,
      formStation: {
        name: "",
        address: "",
        province: "",
        image: ""
      }
    };
  },

  methods: {
    handleAddEditStation(formStation) {
      if (!this.$v.$invalid) {
        const store = this.$store;
        const station = { ...this.station };
        if (Object.keys(station).length > 0) {
          Object.keys(formStation).forEach(key => {
            station[key] = formStation[key];
          });
          // EDIT
          toastr.warning(
            "<button type='button' class='btn btn-secondary mr-2' id='closeToastr' >Close</button> <button type='button' class='btn btn-success' id='dispatchHandleStation'>Yes</button>",
            "Are you want to edit STATION?",
            {
              closeButton: true,
              timeOut: 0,
              positionClass: "toast-top-center",
              tapToDismiss: false,
              onShown: function($event) {
                $("#dispatchHandleStation").click(function() {
                  store.default.dispatch("editStation", station);
                  toastr.remove();
                });
                $("#closeToastr").click(function() {
                  toastr.remove();
                });
              }
            }
          );
        } else {
          // ADD
          toastr.warning(
            "<button type='button' class='btn btn-secondary mr-2' id='closeToastr' >Close</button> <button type='button' class='btn btn-success' id='dispatchHandleStation'>Yes</button>",
            "Are you want to create STATION?",
            {
              closeButton: true,
              timeOut: 0,
              positionClass: "toast-top-center",
              tapToDismiss: false,
              onShown: function($event) {
                $("#dispatchHandleStation").click(function() {
                  store.default.dispatch("createStation", formStation);
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
    clearFormStation() {
      this.formStation.name = "",
      this.formStation.address = "",
      this.formStation.province = "",
      this.formStation.image = "";
    }
    
  },
  validations: {
    formStation: {
      name: {
        required
      },
      address: {
        required,
        minLength: minLength(6)
      },
      province: {
        required
      }
    }
  },
  watch: {
    showDialogStation() {
      this.showDialog = true;
      this.clearFormStation();
    },
    station() {
      if (this.station) {
        this.formStation.name = this.station.name;
        this.formStation.address = this.station.address;
        this.formStation.province = this.station.province;
        this.formStation.image = this.station.image;
      }
    }
  }
};
</script>

<style lang="scss">
.md-field {
  margin-bottom: 0;
}
.user-form {
  width: 100%;
  margin: 0 auto;
  form {
    color: #999;
    border-radius: 3px;
    margin-bottom: 15px;
    background: #fff;
    padding: 30px;
    .md-field {
        margin-bottom: 0;
      }
    .form-control {
      height: 41px;
      background: #f2f2f2;
      box-shadow: none !important;
      border: none;
      &:focus {
        background: #e2e2e2;
      }
    }
    .form-control:focus {
      background: #e2e2e2;
    }
    .btn {
      border-radius: 3px;
    }
    h2 {
      color: #333;
      font-weight: bold;
      margin-top: 0;
    }
    hr {
      margin: 0 -30px 20px;
    }
    input[type="checkbox"] {
      margin-top: 3px;
    }
    .row {
      div:first-child {
        padding-right: 10px;
      }
      div:last-child {
        padding-left: 10px;
      }
    }
    .btn:hover,
    .btn:focus {
      background: #2389cd !important;
      outline: none;
    }
    a {
      color: #3598dc;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  a {
    color: #3598dc;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  .hint-text {
    padding-bottom: 15px;
    text-align: center;
    color: #999;
  }
}
</style>