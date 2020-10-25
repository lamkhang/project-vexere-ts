<template>
  <section class="myAdmin-dashboard">
    <div class="row mx-0">
      <div class="px-0" style="border-right: 1px solid rgba(0,0,0,.0625); transition: all .2s linear" :class="{'col-sm-3': isHideSidebar, 'col-sm-1': !isHideSidebar}">
        <AdminDashboardSidebar :typeSidebar="typeSidebar" @chooseTypeSidebar="handleChooseTypeSidebar" :isHideSidebar="isHideSidebar" />
      </div>
      <div class="px-0" style="transition: all .2s linear" :class="{'col-sm-9': isHideSidebar, 'col-sm-11': !isHideSidebar}">
        <AdminDashboardContent :typeSidebar="typeSidebar" @handleHideSidebar="handleHideSidebar" />
      </div>
    </div>
  </section>
</template>
<script>
import AdminDashboardSidebar from "./admin-dashboard-sidebar.vue";
import AdminDashboardContent from "./admin-dashboard-content.vue";

export default {
  components: {
    AdminDashboardSidebar,
    AdminDashboardContent
  },
  data() {
    return {
      typeSidebar: "users",
      isHideSidebar: true
    }
  },
  methods: {
    handleChooseTypeSidebar(type) {
      this.typeSidebar = type;
    },
    handleHideSidebar() {
      this.isHideSidebar = !this.isHideSidebar;
    }
  }
};
</script>

<style lang="scss">
// .myAdmin-dashboard {
  
// }
</style>