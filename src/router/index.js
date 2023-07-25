import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginPage.vue";
import Dashboard from "../views/DashboardPage.vue";
import YamlEditor from "../views/YamlEditor.vue";
import AboutPage from "@/components/AboutPage.vue";
import RulesText from "@/components/RulesText.vue";
import Index from "@/views/IndexPage.vue";
import ForgetPassword from "@/views/ForgetPassword.vue";

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/forgetpassword",
    component: ForgetPassword
  },
  {
    path: "/index",
    component: Index
  },
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
        path: "htmltext",
        component: RulesText,
        meta: {requiresAuth: true},
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
  {
    path: "/htmltext",
    component: RulesText,
    meta: {requiresAuth: true},
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
  } else {
    if (!localStorage.getItem("token")) {
      next({
        path: "/login",
        query: {redirect: to.fullPath},
      });
    } else {
      next();
    }
  }
});

export default router;
