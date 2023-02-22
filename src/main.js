import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";
import { ArrowForward, ArrowBack, Save, PersonOutline, PeopleOutline, LocationOutline} from "@vicons/ionicons5";

import naive from "naive-ui";
createApp(App)
.component('ArrowForward', ArrowForward)
.component('ArrowBack', ArrowBack)
.component('Save', Save)
.component('PersonOutline', PersonOutline)
.component('PeopleOutline', PeopleOutline)
.component('LocationOutline', LocationOutline)
.use(router)
.use(naive)
.mount("#app");
