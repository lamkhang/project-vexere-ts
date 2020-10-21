<template>
  <div class="modal fade" id="modal-choose-seats">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="row w-100 mx-0">
            <div class="col-sm-7">
              <h3 class>Choose seat</h3>
            </div>
            <div class="col-sm-5">
              <h3 class>Information client</h3>
            </div>
          </div>
        </div>
        <div class="modal-body">
          <div class="row mx-0">
            <div class="col-sm-7">
              <div class="noteseat text-center d-flex justify-content-center">
                <div class="typeseats">
                  <span class="typeseats__color" style="background-color: #666"></span>
                  <span class="typeseats__name">Ghế trống</span>
                </div>
                <div class="typeseats">
                  <span class="typeseats__color" style="background-color: #fb4226"></span>
                  <span class="typeseats__name">Ghế đã chọn</span>
                </div>
                <div class="typeseats">
                  <span class="typeseats__color" style="background-color: #8bc541"></span>
                  <span class="typeseats__name">Ghế đang chọn</span>
                </div>
              </div>
              <div class="seatmap">
                <div class="row mx-0 mb-3" v-if="seats.length > 0">
                  <div class="col-sm-2 px-0 mb-4" v-for="(seat, index) in seats" :key="index">
                    <Seat :seat="seat" @bookedSeat="handleChooseSeat(seat)" :seatCodes="seatCodes" />
                  </div>
                </div>
              </div>
              <div class="totalPrice">
                <h4>Total: {{ total }}$</h4>
              </div>
            </div>
            <div class="col-sm-5">
              <form @submit.prevent="handleBookedSeat(seatCodes)" ref="formInforUserBooked">
                <div class="form-group">
                  <input
                    type="fullName"
                    class="form-control"
                    name="fullName"
                    v-model="fullName"
                    ref="fullName"
                    placeholder="Full Name"
                    required="required"
                    @blur="$v.fullName.$touch()"
                  />
                  <span
                    class="text-danger ml-1"
                    v-if="$v.fullName.$dirty && !$v.fullName.required"
                  >(*) full name is not empty</span>
                  <span
                    class="text-danger ml-1"
                    v-if="$v.fullName.$dirty && !$v.fullName.minLength"
                  >
                    (*) full name much be more
                    {{ $v.fullName.$params.minLength.min }}
                  </span>
                </div>
                <div class="form-group">
                  <input
                    type="phone"
                    class="form-control"
                    name="phone"
                    v-model="phone"
                    placeholder="Phone number"
                    required="required"
                    @blur="$v.phone.$touch()"
                  />
                  <span
                    class="text-danger ml-1"
                    v-if="$v.phone.$dirty && !$v.phone.required"
                  >(*) phone is not empty</span>
                  <span
                    class="text-danger ml-1"
                    v-if="$v.phone.$dirty && !$v.phone.numeric"
                  >(*) phone must be a number</span>
                </div>
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    name="email"
                    v-model="email"
                    placeholder="Email"
                    required="required"
                    @blur="$v.email.$touch()"
                  />
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
                  <textarea
                    class="w-100"
                    name="Note"
                    rows="3"
                    placeholder="  Note"
                    style="border: 1px solid #ced4da"
                    v-model="note"
                  ></textarea>
                </div>

                <div class="form-group text-right">
                  <button type="button" class="btn btn-secondary mr-2" data-dismiss="modal">Close</button>
                  <button
                    type="submit"
                    class="btn btn-warning"
                    :disabled="$v.$invalid || seatCodes.length === 0"
                  >Choose seat</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Seat from "./seat";
import { required, email, minLength, numeric } from "vuelidate/lib/validators";
import jwtDecode from "jwt-decode";
import toastr from "toastr/build/toastr.min.js";
import $ from "jquery";

export default {
  props: ["seats", "trip"],
  components: {
    Seat
  },
  data() {
    return {
      seatCodes: [],
      fullName: "",
      phone: "",
      email: "",
      note:""
    };
  },
  methods: {
    handleChooseSeat(seat) {
      const index = this.seatCodes.findIndex(seatCode => {
        return seat.code === seatCode;
      });
      if (index === -1) {
        this.seatCodes.push(seat.code);
      } else {
        this.seatCodes.splice(index, 1);
      }
    },
    handleBookedSeat(seatCodes) {
      if (!this.$v.$invalid && seatCodes.length > 0) {
        if (
          localStorage.getItem("token") &&
          jwtDecode(localStorage.getItem("token")).userType
        ) {
          const ticket = {
            tripId: this.trip._id,
            seatCodes,
            nameUserGo: this.fullName,
            phoneUserGo: this.phone,
            emailUserGo: this.email,
            noteUserGo: this.note
          };
          const store = this.$store;
          toastr.warning(
            "<button type='button' class='btn btn-secondary mr-2' id='closeToastr' >Close</button> <button type='button' class='btn btn-success' id='dispatchBookedSeats'>Booked</button>",
            "Are you want to choose seat?",
            {
              closeButton: true,
              timeOut: 0,
              positionClass: "toast-top-center",
              tapToDismiss: false,
              onShown: function($event) {
                $("#dispatchBookedSeats").click(function() {
                  store.default.dispatch("bookedSeat", ticket);
                  toastr.remove();
                  this.seatCodes = [];
                   $("#modal-choose-seats").modal("hide");
                });
                $("#closeToastr").click(function() {
                  toastr.remove();
                });
              }
            }
          );
          // this.$store.dispatch("bookedSeat", {
          //   tripId: this.trip._id,
          //   seatCodes,
          //   name: this.fullName,
          //   phone: this.phone,
          //   email: this.email
          // });
          
        } else {
          toastr.warning("you must be login", "", {
            timeOut: 3000,
            positionClass: "toast-top-center",
            progressBar: true
          });
        }
      }
    }
    // clearModal() {
    //   this.fullName = "",
    //   this.phone = "",
    //   this.email = "",
    //   this.$refs.formInforUserBooked.reset();
    // },
  },
  watch: {
    trip() {
      (this.fullName = ""),
        (this.phone = ""),
        (this.email = ""),
        (this.seatCodes = []);
        this.note = "";
      this.$refs.formInforUserBooked.reset();
    }
  },
  computed: {
    total() {
      if (this.trip) {
        return this.seatCodes.reduce((a, b) => {
          return (a += this.trip.price);
        }, 0);
      }
      return 0;
    }
  },
  validations: {
    fullName: {
      required,
      minLength: minLength(4)
    },
    email: {
      required,
      email
    },
    phone: {
      required,
      numeric
    }
  }
};
</script>

<style lang="scss">
.toast.toast-info {
  width: 500px;
}
#modal-choose-seats {
  .noteseat {
    color: #9b9b9b;
    margin-bottom: 20px;
    background-color: #e5e5e5;
    color: #333;
    padding: 20px;
    .typeseats {
      margin-right: 10px;
      .typeseats__color {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 2px;
        margin-right: 5px;

        // span{
        // 	position: absolute;
        // 	top: 0;
        // 	left: 0;
        // }
      }
    }
  }
  .seatmap {
    color: #fff;
    padding-top: 30px;
    .seat {
      background-color: #666;
      padding: 12px 15px;
      border-radius: 2px;
    }
  }
  .totalPrice {
    margin-top: 40px;
  }
  form {
    textarea {
      border-radius: 0.25rem;
      &:focus {
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        border: 1px solid #80bdff !important;
        outline: none;
      }
    }
  }
}
</style>
