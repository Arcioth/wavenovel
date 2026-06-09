import { createApp, markRaw } from "vue";
import './css/openify-themes.css';
import VueDraggableResizable from 'vue-draggable-resizable'
import App from "./App.vue";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './css/tailwind.css';

// Import built-in plugins
import './plugins/writerPlugin.js';
import './plugins/cardsPlugin.js';
import './plugins/planningBoardPlugin.js';
import './plugins/snowflakePlugin.js';
import './plugins/timelinePlugin.js';
import './plugins/mindmapPlugin.js';
import './plugins/gridplannerPlugin.js';
import './plugins/dockPlugin.js';
import './plugins/blurPlugin.js';
import './plugins/themePlugin.js';
import './plugins/backgroundPlugin.js';
import './plugins/webnovelPlugin.js';
import SlotRenderer from './components/universal/SlotRenderer.vue';

createApp(App)
  .component("vue-draggable-resizable", VueDraggableResizable)
  .component("SlotRenderer", SlotRenderer)
  .use(VueSweetalert2)
  .mount('#app');
