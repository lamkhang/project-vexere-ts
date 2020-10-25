<template>
  <header class="myContainer myHeader">
    <nav class="navbar navbar-expand-lg bg-light">
      <router-link class="navbar-brand" to="/">
        <img
          src="https://images.prismic.io/station-website-v4/40820ddd-76f7-4c0b-a000-ea69f70d6a4e_e13919735b69e58fd67cc41d982f42cf333c263f_station-logo-color.png?auto=compress,format"
          alt="logo"
          class="img-fluid"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">
              Home
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/login">Admin</router-link>
          </li>
          <li class="nav-item" style="margin-right: 150px;">
            <router-link class="nav-link" to="/ticketinfo">Manage Ticket</router-link>
          </li>
          <li class="nav-item">
            <button
              class="btn btn-outline-info my-3 my-sm-0"
              data-toggle="modal"
              data-target="#sign-up"
              @click="$refs.modalSignUp.clearModal()"
            >Sign up</button>
          </li>
          <li class="nav-item" v-if="!token">
            <button
              class="btn btn-outline-success my-3 my-sm-0"
              data-toggle="modal"
              data-target="#loginModal"
              @click="$refs.modalLogin.clearModal()"
            >
              Sign
              in
            </button>
          </li>
          <li class="nav-item pt-2" v-else style="color: #6c757d; cursor: pointer">
            <div class="dropdown">
              <span
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ><i class="fa fa-users mr-2"></i>Hello {{name}}
              </span>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <span class="dropdown-item" style="color: #6c757d" @click="$store.default.dispatch('logout')">Logout</span>
              </div>
            </div>

          </li>
        </ul>
      </div>
    </nav>
    <!-- MODAL -->
    <!-- Modal login -->

    <ModalLogin ref="modalLogin" />
    <ModalSignUp ref="modalSignUp" />

    <!-- Modal signup -->
  </header>
</template>

<script>
import ModalLogin from "./modal-login";
import ModalSignUp from "./modal-signup";
export default {
  components: {
    ModalLogin,
    ModalSignUp
  },
  computed: {
    name() {
      return this.$store.default.state.login.name;
    },
    token() {
      return this.$store.default.state.login.token;
    }
  }
};
</script>

<style lang="scss">
.myHeader {
  .nav-item {
    margin-left: 15px;
    .nav-link {
      color: #343a40;
      &:hover {
        color: rgb(0, 96, 196);
      }
    }
  }
  .modal {
    .modal-content {
      .login-form {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        padding-bottom: 30px;
        form {
          color: #434343;
          border-radius: 1px;
          margin-bottom: 15px;
          background: #fff;
          border: 1px solid #f3f3f3;
          box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
          padding: 30px;
          h4 {
            text-align: center;
            font-size: 22px;
            margin-bottom: 20px;
          }
          .avatar {
            color: #fff;
            margin: 0 auto 30px;
            text-align: center;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            z-index: 9;
            background: #4aba70;
            padding: 15px;
            box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
            i {
              font-size: 62px;
            }
          }
          .form-group {
            margin-bottom: 20px;
          }
          .form-control {
            background: #f2f2f2;
            &:hover{
              background: #e2e2e2;
            }
          }
          .form-control,
          .btn {
            min-height: 40px;
            border-radius: 2px;
            transition: all 0.5s;
          }
          .close {
            position: absolute;
            top: 15px;
            right: 15px;
          }
          .btn,
          .btn:active {
            background: #32b75f !important;
            border: none;
            line-height: normal;
          }
          .btn:hover,
          .btn:focus {
            background: #42ae68 !important;
          }
          .checkbox-inline {
            float: left;
          }
          input[type="checkbox"] {
            position: relative;
            top: 2px;
          }
          .forgot-link {
            float: right;
          }
          .small {
            font-size: 13px;
          }
          a {
            color: #4aba70;
          }
        }
      }
      .signup-form {
        width: 100%;
        margin: 30px auto;
        form {
          color: #999;
          border-radius: 3px;
          margin-bottom: 15px;
          background: #fff;
          box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
          padding: 30px;
          .form-control {
            height: 41px;
            background: #f2f2f2;
            box-shadow: none !important;
            border: none;
            &:focus {
              background: #e2e2e2;
            }
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
    }
  }
}
</style>