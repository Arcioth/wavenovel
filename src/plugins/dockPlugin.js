import { registerPlugin } from './manager.js';
import { registerUI } from './ui-registry.js';
import DockMenu from '../components/DockMenu.vue';
import DockSettings from '../components/dock/DockSettings.vue';

registerPlugin({
    id: 'dock_menu',
    name: 'Dock Menu',
    icon: 'grid',
    core: true,
    showInDock: false,
    component: null,
    settingsComponent: DockSettings
});

// Inject DockMenu into the global overlay slot and tie it to 'dock_menu' plugin ID
registerUI('global-overlay', 'dock_menu', DockMenu);
