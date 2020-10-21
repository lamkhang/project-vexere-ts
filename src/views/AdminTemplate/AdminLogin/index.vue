<template>
  <div>
    <form novalidate class="md-layout p-5" @submit.prevent="loginAdmin">
      <md-card class="md-layout-item md-size-50 md-small-size-100 mx-auto ">
        <md-card-header>
          <div class="md-title text-center">Admin Login</div>
        </md-card-header>

        <md-card-content>
          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" />
            <span class="md-error" v-if="!$v.form.email.required">(*) The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">(*) Invalid email</span>
          </md-field>
          <md-field :class="getValidationClass('password')">
            <label for="password">Password</label>
            <md-input type="password" name="password" id="password" autocomplete="password" v-model="form.password" />
            <span class="md-error" v-if="!$v.form.password.required">(*) The password is required</span>
            <span class="md-error" v-if="!$v.form.password.minLength">(*) password much be more {{$v.form.password.$params.minLength.min}}</span>
          </md-field>
        </md-card-content>

        <!-- <md-progress-bar md-mode="indeterminate" v-if="sending" /> -->

        <md-card-actions>
          <md-button type="submit" class="md-raised md-primary ml-auto d-block" :disabled="$v.$invalid">Login</md-button>
        </md-card-actions>
      </md-card>

      <!-- <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar> -->
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
  } from 'vuelidate/lib/validators'

  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
      form: {
        email: null,
        password: null
      },
    }),
    validations: {
      form: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(4)
        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.email = null;
        this.form.password = null
      },
      loginAdmin () {
        if (!this.$v.$invalid) {
          this.$store.default.dispatch("loginAdmin", this.form)
          .then(result => {
            console.log(result)
          });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>