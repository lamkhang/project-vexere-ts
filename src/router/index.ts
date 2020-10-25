import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import  jwtDecode  from "jwt-decode";
import toastr from "toastr/build/toastr.min.js";
import $ from "jquery";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: () => import("./../views/HomeTemplate/index.vue"),     //lazyload,
    children: [
      {
        path: "",
        component: () => import("./../views/HomeTemplate/HomePage/index.vue"),
      },
      {
        path: "station/:id",
        component: () => import("./../views/HomeTemplate/DetailStationPage/index.vue"),
      },
      {
        path: "ticketinfo",
        component: () => import("./../views/HomeTemplate/TicketInfo/index.vue"),
      }

    ]
  }, 
  {
    path: "/admin",
    component: () => import("./../views/AdminTemplate/index.vue"),
    children: [
      {
        path: "/admin/login",
        component: () => import("./../views/AdminTemplate/AdminLogin/index.vue")
      },
      {
        path: "/admin/dashboard",
        component: () => import("./../views/AdminTemplate/Dashboard/index.vue"),
        beforeEnter(to, from, next) {
          if(localStorage.getItem("token")) {
            try {
              const decode = jwtDecode(localStorage.getItem("token"));
              if(decode.userType === "admin") {
                next()
              } else {
                throw new Error();
              }
            } catch (error) {
              localStorage.removeItem("token"); 
              toastr.warning(
                "<button type='button' class='btn btn-secondary mr-2' id='closeToastr' >Close</button> <button type='button' class='btn btn-success' id='dispatchHandleRouter'>Yes</button>",
                "You need to login?",
                {
                  closeButton: true,
                  timeOut: 0,
                  positionClass: "toast-top-center",
                  tapToDismiss: false,
                  onShown: function() {
                    $("#dispatchHandleRouter").click(function() {
                      toastr.remove();
                      next("/admin/login");
                    });
                    $("#closeToastr").click(function() {
                      toastr.remove();
                    });
                  }
                }
              );
            }
          } else {
            toastr.warning(
                "<button type='button' class='btn btn-secondary mr-2' id='closeToastr' >Close</button> <button type='button' class='btn btn-success' id='dispatchHandleRouter'>Yes</button>",
                "You need to login?",
                {
                  closeButton: true,
                  timeOut: 0,
                  positionClass: "toast-top-center",
                  tapToDismiss: false,
                  onShown: function() {
                    $("#dispatchHandleRouter").click(function() {
                      toastr.remove();
                      next("/admin/login");
                    });
                    $("#closeToastr").click(function() {
                      toastr.remove();
                    });
                  }
                }
              );
          }
        }
      }
    ]
  },
  {
    path: "*",
    component: () => import("./../components/PageNotFound/index.vue")
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
