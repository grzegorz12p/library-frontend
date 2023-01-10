import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import type { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

import "./assets/main.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const app = createApp(App);
const options: PluginOptions = {
  timeout: 2000,
};
const vuetify = createVuetify({
  components,
  directives,
});

app.use(createPinia());
app.use(router);
app.use(Toast, options);
app.use(vuetify);

app.mount("#app");
