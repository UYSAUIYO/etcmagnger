import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import * as Vant from 'vant';
import 'vant/lib/index.css';
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "echarts";

createApp(App).use(ElementPlus).use(router).use(Vant).mount("#app");
