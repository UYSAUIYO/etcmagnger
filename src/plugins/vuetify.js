import { createVuetify } from "vuetify";
import * as components from "vuetify/lib/components";
import * as directives from "vuetify/lib/directives";

export default createVuetify({
  components,
  directives,
  icons: {
    iconfont: "mdi", // 默认值 - 仅用于展示目的
  },
});
