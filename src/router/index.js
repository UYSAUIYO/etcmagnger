import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginPage.vue";
import Dashboard from "../views/DashboardPage.vue";
import YamlEditor from "../views/YamlEditor.vue";
import AboutPage from "@/components/AboutPage.vue";

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
      {
        path: "about",
        component: AboutPage,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/yaml-editor",
    component: YamlEditor,
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    component: AboutPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem("token")) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
