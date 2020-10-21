<template>
  <button class="seat" :style="{'background-color': seat.isBooked ? '#fb4226' : isBooked ? '#8bc541' : '#666' }" @click="handleChooseSeat(seat.code)" :disabled="seat.isBooked"> {{seat.code}}</button>
</template>

<script>
export default {
  props: [ "seat", "seatCodes" ],

  data() {
    return {
      isBooked: false
    }
  },
  updated() {
    if(this.seatCodes.length === 0) {
      this.isBooked = false
    }
  },
  methods: {
    handleChooseSeat(seat) {
      this.isBooked = !this.isBooked;
      this.$emit("bookedSeat", seat)
    }
  }
}
</script>

<style lang="scss">
button{
  border-radius: 2px;
  color: #fff;
  border: 1px solid #fff;
  &:focus{
    outline: none;
  }
}
</style>