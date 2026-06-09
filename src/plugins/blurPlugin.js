import { registerPlugin } from './manager.js';
import { registerUI } from './ui-registry.js';
import BlurOverlay from '../components/extensions/BlurOverlay.vue';

registerPlugin({
    id: 'blur_overlay',
    name: 'Cinematic Blur',
    icon: 'edit',
    core: false,
    showInDock: false,
    component: null
});

// Inject into global overlay
registerUI('global-overlay', 'blur_overlay', BlurOverlay);
