<template>
  <section class="myStation myContainer">
    <h3>Station</h3>
    <Loader v-if="loading" />
    <template v-else>
      <div style="height: 300px; width: 100%">
        <slick ref="slick" :options="slickOptions">
          <router-link href class="myStation__link" v-for="station in stations" :key="station._id" :to="`/station/${station._id}`">
            <img :src="getImgUrl(station.image)" alt />
            <span>{{station.name}}</span>
          </router-link>
        </slick>
      </div>
    </template>
  </section>
</template>
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script>
import Slick from "vue-slick";
import Loader from "./../Loader";
export default {
  components: {
    Slick,
    Loader
    },

  data() {
    return {
      slickOptions: {
        slidesToShow: 3,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 2000,
        arrows: true
        // Any other options that can be got from plugin documentation
      }
    };
  },
  created() {
    this.$store.default.dispatch("fetchListStations");
  },

  computed: {
    loading() {
      return this.$store.default.state.stations.loading;
    },
    stations() {
      return this.$store.default.state.stations.data;
    }
  },

  // All slick methods can be used too, example here
  methods: {
    getImgUrl(pic) {
      if(pic) {
        const images = require.context('../../assets/', false, /\.jpg$/)
        return images('./' + pic)
      }
      
    },
    next() {
      this.$refs.slick.next();
    },

    prev() {
      this.$refs.slick.prev();
    },

    reInit() {
      // Helpful if you have to deal with v-for to update dynamic lists
      this.$nextTick(() => {
        this.$refs.slick.reSlick();
      });
    }
  }
};
</script>

<style lang="scss">
.myStation {
  margin-top: 50px;
  .myStation__link {
    height: 200px;
    display: block;
    background-size: cover;
    width: 93% !important;
    position: relative;
    margin-right: 16px;
    border-radius: 3px;
    img {
      width: 100%;
      height: 100%;
    }
    cursor: pointer;
    span {
      position: absolute;
      font-weight: 500;
      font-size: 18px;
      bottom: 12px;
      text-align: center;
      width: 100%;
      color: white;
      z-index: 10;
    }
    &::after {
      content: "";
      position: absolute;
      left: 0px;
      right: 0px;
      bottom: 0px;
      height: 80px;
      opacity: 0.6;
      background: linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%) 0% 0%
        no-repeat padding-box padding-box transparent;
      border-radius: 3px;
    }
  }
  .slick-prev,
  .slick-next {
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    z-index: 10;
    &:hover {
      background-color: #fff;
    }
  }
  .slick-prev {
    left: 20px;
    &::before {
      content: "<";
      font-size: 25px;
      color: black;
    }
  }
  .slick-next {
    right: 40px;
    &::before {
      content: ">";
      font-size: 25px;
      color: black;
    }
  }
}
</style>
