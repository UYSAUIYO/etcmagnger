import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import * as Vant from 'vant';
import 'vant/lib/index.css';
import * as AntDesign from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "echarts";

createApp(App).use(ElementPlus).use(router).use(Vant).use(AntDesign).mount("#app");
