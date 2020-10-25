<template>
  <div class="modal fade" id="loginModal" ref="modalLogin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="login-form">
            <form @submit.prevent="handleLogin" ref="formLogin">
              <div class="avatar"><i class="fa fa-user" style="font-size: 60px;"></i></div>
              <h4 class="modal-title">Login to Your Account</h4>
              <div class="form-group">
                <md-field>
                  <label>Email</label>
                  <md-input type="text" class="form-control" ref="name" name="email" v-model="email" @blur="$v.email.$touch()"></md-input>
                </md-field>     
                <span class="text-danger ml-1" v-if="$v.email.$dirty && !$v.email.required" >(*) email is not empty</span>
                <span class="text-danger ml-1" v-if="$v.email.$dirty && !$v.email.email" >(*) email is not correct format</span>
              </div>
              <div class="form-group">
                <md-field>
                  <label>Password</label>
                  <md-input type="password" class="form-control" name="password" v-model="password" @blur="$v.password.$touch()"></md-input>
                </md-field>           
                <span class="text-danger ml-1" v-if="$v.password.$dirty && !$v.password.required" >(*) password is not empty</span>
                <span class="text-danger ml-1" v-if="$v.password.$dirty && !$v.password.minLength" >(*) password much be more {{$v.password.$params.minLength.min}} character</span>

              </div>
              <div class="form-group small clearfix">
                <label class="form-check-label"><input type="checkbox"> Remember me</label>
                <a href="#" class="forgot-link">Forgot Password?</a>
              </div>
              <button type="submit" class="btn btn-primary btn-block btn-lg" :disabled="$v.$invalid">Login</button>
            </form>
            <div class="text-center small">Don't have an account? <a href="#">Sign up</a></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import $ from "jquery";
export default {
  data() {
    return {
      email: "",
      password: "",
      state: ""
    }
  },
  methods: {
    handleLogin() {
      if(!this.$v.$invalid) {
        this.$store.default.dispatch("login", {
          email: this.email,
          password: this.password
        });
        $('#loginModal').modal('hide');
        this.$refs.formLogin.reset();
      }
    },
    clearModal() {
      this.$refs.formLogin.reset();
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
    }
  }
}
</script>

<style lang="scss">
.md-field {
  margin-bottom: 0;
}
.form-control {
  background: #f2f2f2;
  &:focus {
    box-shadow: none;
  }
}
</style>