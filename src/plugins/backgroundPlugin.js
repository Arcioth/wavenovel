import { registerPlugin, getPluginSettings } from './manager.js';
import BackgroundSettings from '../components/extensions/BackgroundSettings.vue';

registerPlugin({
    id: 'background_manager',
    name: 'Background Manager',
    icon: 'edit',
    core: false,
    settingsComponent: BackgroundSettings
});

export function applyBackgroundSettings() {
    const settings = getPluginSettings('background_manager', {
        type: 'default',
        value: '',
        blur: 0
    });

    let styleEl = document.getElementById('custom-app-bg');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'custom-app-bg';
        document.head.appendChild(styleEl);
    }

    if (settings.type === 'default') {
        styleEl.innerHTML = `
            html, body {
                background-image: none !important;
                background-color: var(--window) !important;
            }
            #app-bg-overlay { display: none; }
        `;
    } else {
        // If not default, make body transparent to show the overlay
        styleEl.innerHTML = `
            html, body {
                background-image: none !important;
                background-color: transparent !important;
            }
        `;
        
        let overlay = document.getElementById('app-bg-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'app-bg-overlay';
            document.body.prepend(overlay);
        }
        overlay.style.display = 'block';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.zIndex = '-9999';
        
        if (settings.type === 'image') {
            overlay.style.backgroundImage = `url(${settings.value})`;
            overlay.style.backgroundSize = 'cover';
            overlay.style.backgroundPosition = 'center';
            overlay.style.backgroundColor = 'transparent';
        } else if (settings.type === 'static') {
            overlay.style.backgroundImage = 'none';
            overlay.style.backgroundColor = settings.value || 'var(--window)';
        } else if (settings.type === 'hue') {
            overlay.style.backgroundImage = 'none';
            overlay.style.backgroundColor = `hsl(${settings.value || 0}, 50%, 50%)`;
        } else if (settings.type === 'transparent') {
            overlay.style.backgroundImage = 'none';
            overlay.style.backgroundColor = 'transparent';
        }
        
        overlay.style.filter = `blur(${settings.blur || 0}px)`;
    }
}

// Initial apply
setTimeout(applyBackgroundSettings, 100);
