<template>
  <section class="detailStation myContainer">
    <Loader v-if="loading" />
    <div class="row mx-0" v-else>
      <div class="col-sm-4">
        <div class="detailStation-name">
          <h4 class="mb-0 mr-2">{{station.name}}</h4>
          <div class="detailStation-rating" style="color: #6c757d">
            <i class="fa fa-star full-stars"></i>
            <i class="fa fa-star full-stars"></i>
            <i class="fa fa-star full-stars"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div>
        </div>
        <img :src="getImgUrl(station.image)" alt="" class="img-fluid pr-4">
        <p style="margin-top: 20px; color:#5f5f5f">
          <i class="fa fa-map-marker-alt" style="width: 25px;"></i>
          <b>Address: </b> {{station.address}}
        </p>
        <p style="margin-top: 20px; color:#5f5f5f">
          <i class="fa fa-city" style="width: 25px;"></i>
          <b>Province: </b> {{station.province}}
        </p>


      </div>
      <div class="col-sm-8" style="border-left: 1px solid #ddd">
        <div class="detailStation-panel">
          <h4 style="margin-bottom: 40px;"  v-if="trips.length > 0">ALL Trips in {{station.name}}</h4>
          <table class="table table-striped" v-if="trips.length > 0">
            <thead>
              <tr>
                <th scope="col">Route</th>
                <th scope="col">Date</th>
                <th scope="col">Price</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(trip, index) in trips" :key="trip._id">
                <td>Bến xe {{trip.fromStationId.name}} đi {{trip.toStationId.name}}</td>
                <td>{{trip.startTime}}</td>
                <td class="color-black"> {{trip.price}}$</td>
                <td><button class="btn btn-warning rounded-0" data-toggle="modal" data-target="#modal-choose-seats" @click="handleShowModalBookSeats(index)">Booking</button></td>
              </tr>
            </tbody>
          </table>
          <div class="text-center" v-else>
            <h3>No Trips available</h3>
          </div>
          <ModalChooseSeats :seats="this.seats" :trip="trip" ref="modalChooseSeats"/>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import Loader from "./../../../components/Loader";
import ModalChooseSeats from "./modal-choose-seats";
export default {
  components:{
    Loader,
    ModalChooseSeats
  },
  // data() {
  //   return {
  //     // trips: this.$store.state.trips.data
  //   }
  // },
  data() {
    return {
      id: this.$route.params.id,
      seats: [],
      trip: null,
    }
  },
  created() {
    this.$store.default.dispatch("fetDetailStations", this.id);
    this.$store.default.dispatch("fetchListTrips");
  },
  methods: {
    getImgUrl(pic) {
      const images = require.context('../../../assets/', false, /\.jpg$/);
      return images('./' + pic);
    },
    handleShowModalBookSeats(index) {
      this.seats = this.trips[index].seats,
      this.trip = this.trips[index];
      // this.$refs.modalChooseSeats.clearModal();
    }

  },
  computed: {
    loading() {
      return this.$store.default.state.stations.loading;
    },
    station() {
      return this.$store.default.state.stations.data;
    },
    trips() {
      const trips = this.$store.default.state.trips.data;
      if(trips) {
        return trips.filter(trip => {
          return (trip.fromStationId._id === this.id) || (trip.toStationId._id === this.id);
        });
      };
      return null

    }
  },
}
</script>

<style lang="scss">
.detailStation{
  padding-top: 100px;
  .detailStation-name{
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    h4{
      color: #1867aa;
    }
    i{
      font-size: 12px;
      color: #ccc;
    }
    i.full-stars{
      color: #f8af00;
    }
  }
  .detailStation-review{
    .col-sm-4{
      border: 1px solid #ddd;
      font-size: 12px;
      h5{
        font-size: 20px;
      }
    }
  }
  .detailStation-panel{

    .table{
      tbody{
        td{
          padding: 16px;
          font-size: 14px;
          color: #1557a6
        }
        td.color-black{
          color: black
        }
      }
    }
  }
}
</style>