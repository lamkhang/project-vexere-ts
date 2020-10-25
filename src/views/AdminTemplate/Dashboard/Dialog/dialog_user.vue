<template>
  <md-dialog :md-active.sync="showDialog">
    <md-dialog-title>{{`${user ? 'EDIT' : 'ADD'} USER` }}</md-dialog-title>
    <div class="user-form">
      <form
        ref="formUser"
        @submit.prevent="handleAddEditUser($event)"
        style="min-width: 550px; padding-left: 22px; padding-right: 22px; padding-top: 0"
      >
        <div class="form-group">
          <md-field>
            <label>Email</label>
            <md-input
              type="email"
              class="form-control"
              name="email"
              required="required"
              v-model="email"
              @blur="$v.email.$touch()"
              :disabled="!(user === null)"
              :style="{'opacity': user ? 0.6 : 1}"
            />
          </md-field>
          <span
            class="text-danger ml-1"
            v-if="$v.email.$dirty && !$v.email.required"
          >(*) email is not empty</span>
          <span
            class="text-danger ml-1"
            v-if="$v.email.$dirty && !$v.email.email"
          >(*) email is not correct format</span>
        </div>
        <div class="form-group">
          <md-field>
            <label>Password</label>
            <md-input
              type="password"
              class="form-control"
              name="password"
              required="required"
              v-model="password"
              :disabled="!(user === null)"
              :style="{'opacity': user ? 0.6 : 1}"
              @blur="$v.password.$touch()"
            />
          </md-field>
          <span
            class="text-danger ml-1"
            v-if="$v.password.$dirty && !$v.password.required"
          >(*) password is not empty</span>
          <span class="text-danger ml-1" v-if="$v.password.$dirty && !$v.password.minLength">
            (*) password much be more
            {{ $v.password.$params.minLength.min }} character
          </span>
        </div>
        <div class="form-group">
          <md-field>
            <label>Confirm Password</label>
            <md-input
              type="password"
              class="form-control"
              name="confirm_password"
              required="required"
              v-model="confirmPassword"
              :disabled="!(user === null)"
              :style="{'opacity': user ? 0.6 : 1}"
              @blur="$v.confirmPassword.$touch()"
            />
          </md-field>
          <span
            class="text-danger ml-1"
            v-if="$v.confirmPassword.$dirty && !$v.confirmPassword.required"
          >(*) confirm password is not empty</span>
          <span
            class="text-danger ml-1"
            v-if="
                  $v.confirmPassword.$dirty && !$v.confirmPassword.minLength
                "
          >
            (*) confirm password much be more
            {{ $v.confirmPassword.$params.minLength.min }} character
          </span>
          <span
            class="text-danger ml-1"
            v-if="
                  $v.confirmPassword.$dirty &&
                    $v.confirmPassword.required &&
                    $v.confirmPassword.minLength &&
                    password !== confirmPassword
                "
          >password must match</span>
        </div>
        <div class="form-group">
          <md-field>
            <label>Full Name</label>
            <md-input
              type="text"
              class="form-control"
              name="fullName"
              required="required"
              v-model="fullName"
              @blur="$v.fullName.$touch()"
            />
          </md-field>
          <span
            class="text-danger ml-1"
            v-if="$v.fullName.$dirty && !$v.fullName.required"
          >(*) full name is not empty</span>
          <span class="text-danger ml-1" v-if="$v.fullName.$dirty && !$v.fullName.minLength">
            (*) fullName is between
            {{ $v.fullName.$params.minLength.min }} -
            {{ $v.fullName.$params.maxLength.max }} length
          </span>
          <span class="text-danger ml-1" v-if="$v.fullName.$dirty && !$v.fullName.maxLength">
            (*) fullName is between
            {{ $v.fullName.$params.minLength.min }} -
            {{ $v.fullName.$params.maxLength.max }} length
          </span>
        </div>

        <div class="d-flex justify-content-end">
          <md-button class="md-raised" @click="showDialog = false">Close</md-button>
          <md-button
            class="md-raised md-primary"
            type="submit"
            :disabled="$v.$invalid"
          >{{`${user ? 'EDIT' : 'ADD'} USER` }}</md-button>
        </div>
      </form>
    </div>
  </md-dialog>
</template>
<script>
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
import toastr from "toastr/build/toastr.min.js";
import $ from "jquery";
export default {
  props: ["showDialogUser", "user"],
  data() {
    return {
      showDialog: false,
      email: "",
      password: "",
      confirmPassword: "",
      fullName: ""
    };
  },

  methods: {
    handleAddEditUser(e) {
      if (!this.$v.$invalid) {
        const store = this.$store;
        const user = { ...this.user };
        if (Object.keys(user).length > 0) {
          user.fullName = this.fullName;
          toastr.warning(
            "<button type='button' class='btn btn-secondary mr-2' id='closeToastr' >Close</button> <button type='button' class='btn btn-success' id='dispatchHandleUser'>Yes</button>",
            "Are you want to edit USER?",
            {
              closeButton: true,
              timeOut: 0,
              positionClass: "toast-top-center",
              tapToDismiss: false,
              onShown: function($event) {
                $("#dispatchHandleUser").click(function() {
                  store.default.dispatch("editUser", user);
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
          const authUser = {
            email: this.email,
            password: this.password,
            password2: this.confirmPassword,
            fullName: this.fullName
          };
          toastr.warning(
            "<button type='button' class='btn btn-secondary mr-2' id='closeToastr' >Close</button> <button type='button' class='btn btn-success' id='dispatchHandleUser'>Yes</button>",
            "Are you want to create USER?",
            {
              closeButton: true,
              timeOut: 0,
              positionClass: "toast-top-center",
              tapToDismiss: false,
              onShown: function($event) {
                $("#dispatchHandleUser").click(function() {
                  store.default.dispatch("addUser", authUser, true);
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
    clearFormUser() {
      (this.email = ""),
      (this.password = ""),
      (this.confirmPassword = ""),
      (this.fullName = "");
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: {
      required,
      minLength: minLength(6)
    },
    fullName: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(20)
    }
  },
  watch: {
    showDialogUser() {
      this.showDialog = true;
      this.clearFormUser();
    },
    user() {
      if (this.user) {
        this.email = this.user.email;
        this.password = "xxxxxx";
        this.confirmPassword = "xxxxxx";
        this.fullName = this.user.fullName;
      }
    }
  }
};
</script>

<style lang="scss">
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