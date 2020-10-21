<template>
  <div class="admin-sidebar">
    <div class="admin-sidebar__logo d-flex align-items-center">
      <img
        src="https://colorlib.com/polygon/adminator/assets/static/images/logo.png"
        alt
        class="img-fluid mr-2"
      />
      <h5 v-if="isHideSidebar">Adminator</h5>
    </div>
    <ul class="admin-sidebar__menu">
      <li class="sidebar-menu__item" :class="{'active': typeSidebar === 'users'}" @click="handleChooseTypeSidebar('users')">
        <span class="admin-sidebar__icon">
          <i class="fa fa-user" style="color: #2196f3!important;"></i>
        </span>
        <span class="admin-sidebar__title" v-if="isHideSidebar">USER</span>
      </li>
      <li class="sidebar-menu__item" :class="{'active': typeSidebar === 'stations'}" @click="handleChooseTypeSidebar('stations')" >
        <span class="admin-sidebar__icon">
          <i class="fa fa-archway" style="color: #795548!important;"></i>
        </span>
        <span class="admin-sidebar__title" v-if="isHideSidebar">STATIONS</span>
      </li>
      <li class="sidebar-menu__item" :class="{'active': typeSidebar === 'trips'}" @click="handleChooseTypeSidebar('trips')" >
        <span class="admin-sidebar__icon">
          <i class="fa fa-car-side" style="color: #673ab7!important;"></i>
        </span>
        <span class="admin-sidebar__title" v-if="isHideSidebar">TRIPS</span>
      </li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: [ "typeSidebar", "isHideSidebar" ],
  methods: {
    handleChooseTypeSidebar(type) {
      this.$emit("chooseTypeSidebar", type)
    }
  },
};
</script>

<style lang="scss">
.admin-sidebar {
  .admin-sidebar__logo {
    border-bottom: 1px solid rgba(0, 0, 0, 0.0625);
    padding: 0 20px;
  }
  .admin-sidebar__menu {
    list-style: none;
    padding-left: 0;
    .sidebar-menu__item {
      font-size: 15px;
      font-weight: 500;
      padding: 5px 15px;
      white-space: nowrap;
      transition: all 0.5s linear;
      &:hover {
        background-color: #dddddd;
      }
      cursor: pointer;
      .admin-sidebar__icon {
        display: inline-block;
        text-align: center;
        border-radius: 6px;
        font-size: 22px;
        // height: 35px;
        line-height: 35px;
        margin-right: 14px;
        -webkit-transition: all 0.3s ease;
        -o-transition: all 0.3s ease;
        transition: all 0.3s ease;
        width: 35px;
      }
      .admin-sidebar__title {
        color: #72777a;
      }
    }
    .sidebar-menu__item.active {
      background-color: #dddddd;
    }
  }
}
</style>