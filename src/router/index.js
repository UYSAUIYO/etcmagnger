import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginPage.vue";
import Dashboard from "../views/DashboardPage.vue";
import YamlEditor from "../views/YamlEditor.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }, // require authentication to access dashboard
    children: [
      {
        path: "yaml-editor",
        component: YamlEditor,
        meta: { requiresAuth: true }, // require authentication to access yaml editor
      },
    ],
  },
  {
    path: "/yaml-editor",
    component: YamlEditor,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  /**
   * check if the route requires authentication
   */
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    /**
     * check if user is not authenticated
     */
    if (!localStorage.getItem("token")) {
      // if not, redirect to login page
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      // if yes, proceed
      next();
    }
  } else {
    /**
     * if the route doesn't require authentication, proceed
     */
    next();
  }
});

export default router;
