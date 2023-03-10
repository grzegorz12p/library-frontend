import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Toast, { POSITION } from "vue-toastification";
import type { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

import "./assets/main.css";

const app = createApp(App);
const options: PluginOptions = {
  timeout: 2000,
  position: POSITION.BOTTOM_CENTER,
  pauseOnHover: false,
};

app.use(createPinia());
app.use(router);
app.use(Toast, options);

app.mount("#app");
