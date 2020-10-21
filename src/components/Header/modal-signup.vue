<template>
  <div
    class="modal fade"
    id="sign-up"
    tabindex="-1"
    role="dialog"
    aria-labelledby="sign-up"
    aria-hidden="true"
    ref="modalSignUp"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="signup-form">
          <form ref="formSignUp" @submit.prevent="handleSignUp($event)">
            <h2>Sign Up</h2>
            <p>Please fill in this form to create an account!</p>
            <hr />
            <div class="form-group">
              <input
                type="email"
                class="form-control"
                name="email"
                placeholder="Email"
                required="required"
                v-model="email"
                @blur="$v.email.$touch()"
              />
              <span
                class="text-danger ml-1"
                v-if="$v.email.$dirty && !$v.email.required"
                >(*) email is not empty</span
              >
              <span
                class="text-danger ml-1"
                v-if="$v.email.$dirty && !$v.email.email"
                >(*) email is not correct format</span
              >
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                name="password"
                placeholder="Password"
                required="required"
                v-model="password"
                @blur="$v.password.$touch()"
              />
              <span
                class="text-danger ml-1"
                v-if="$v.password.$dirty && !$v.password.required"
                >(*) password is not empty</span
              >
              <span
                class="text-danger ml-1"
                v-if="$v.password.$dirty && !$v.password.minLength"
                >(*) password much be more
                {{ $v.password.$params.minLength.min }} character</span
              >
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                name="confirm_password"
                placeholder="Confirm Password"
                required="required"
                v-model="confirmPassword"
                @blur="$v.confirmPassword.$touch()"
              />
              <span
                class="text-danger ml-1"
                v-if="$v.confirmPassword.$dirty && !$v.confirmPassword.required"
                >(*) confirm password is not empty</span
              >
              <span
                class="text-danger ml-1"
                v-if="
                  $v.confirmPassword.$dirty && !$v.confirmPassword.minLength
                "
                >(*) confirm password much be more
                {{ $v.confirmPassword.$params.minLength.min }} character</span
              >
              <span
                class="text-danger ml-1"
                v-if="
                  $v.confirmPassword.$dirty &&
                    $v.confirmPassword.required &&
                    $v.confirmPassword.minLength &&
                    password !== confirmPassword
                "
                >password must match</span
              >
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                name="fullName"
                placeholder="Full Name"
                required="required"
                v-model="fullName"
                @blur="$v.fullName.$touch()"
              />
              <span
                class="text-danger ml-1"
                v-if="$v.fullName.$dirty && !$v.fullName.required"
                >(*) full name is not empty
              </span>
              <span
                class="text-danger ml-1"
                v-if="$v.fullName.$dirty && !$v.fullName.minLength"
                >(*) fullName is between
                {{ $v.fullName.$params.minLength.min }} -
                {{ $v.fullName.$params.maxLength.max }} length</span
              >
              <span
                class="text-danger ml-1"
                v-if="$v.fullName.$dirty && !$v.fullName.maxLength"
                >(*) fullName is between
                {{ $v.fullName.$params.minLength.min }} -
                {{ $v.fullName.$params.maxLength.max }} length</span
              >
            </div>
            <div class="form-group">
              <label class="form-check-label">
                <input type="checkbox" required="required" /> I accept the
                <a href="#">Terms of Use</a> &amp;
                <a href="#">Privacy Policy</a>
              </label>
            </div>
            <div class="form-group">
              <button
                type="submit"
                class="btn btn-primary btn-lg w-100"
                :disabled="$v.$invalid"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div class="hint-text">
            Already have an account?
            <a href="#">Login here</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import $ from "jquery";
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    confirmPassword: {
      required,
      minLength: minLength(6),
    },
    fullName: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(10),
    },
  },
  methods: {
    handleSignUp(e) {
      if (!this.$v.$invalid) {
        const auth = {
          email: e.target.elements.email.value,
          password: e.target.elements.password.value,
          password2: e.target.elements.confirm_password.value,
          fullName: e.target.elements.fullName.value,
        };
        this.$store.default.dispatch("signUp", auth);
        $('#sign-up').modal('hide');
        this.$refs.formSignUp.reset();
      }
    },
    clearModal() {
      this.$refs.formSignUp.reset();
    },
  },
};
</script>

<style></style>
