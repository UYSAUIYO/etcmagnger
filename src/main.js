import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vuetify from "./plugins/vuetify";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

createApp(App).use(ElementPlus).use(router).use(Vuetify).mount("#app");
