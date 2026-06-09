import { shallowReactive, reactive, markRaw } from 'vue';

const plugins = shallowReactive({});
const pluginSettings = reactive({});
const configKey = 'wavenovel_plugins';

function loadConfig() {
    try {
        return JSON.parse(localStorage.getItem(configKey)) || {};
    } catch {
        return {};
    }
}

function saveConfig(config) {
    localStorage.setItem(configKey, JSON.stringify(config));
}

export function registerPlugin(plugin) {
    if (!plugin.id || !plugin.name || !plugin.icon || !plugin.component && !plugin.core) {
        console.warn('Plugin registered without standard properties:', plugin.id);
    }
    const config = loadConfig();
    const enabled = plugin.core ? true : (config[plugin.id] !== undefined ? config[plugin.id] : true);
    
    if (plugin.component) {
        plugin.component = markRaw(plugin.component);
    }
    if (plugin.settingsComponent) {
        plugin.settingsComponent = markRaw(plugin.settingsComponent);
    }
    
    plugins[plugin.id] = { ...plugin, enabled };
}

export function getPlugins() {
    return plugins;
}

export function togglePlugin(id, enabled) {
    if (plugins[id] && !plugins[id].core) {
        plugins[id] = { ...plugins[id], enabled };
        const config = loadConfig();
        config[id] = enabled;
        saveConfig(config);
    }
}

export function getPluginSettings(id, defaultSettings = {}) {
    if (!pluginSettings[id]) {
        const config = loadConfig();
        pluginSettings[id] = config[`${id}_settings`] || defaultSettings;
    }
    return pluginSettings[id];
}

export function savePluginSettings(id, settings) {
    pluginSettings[id] = settings;
    const config = loadConfig();
    config[`${id}_settings`] = settings;
    saveConfig(config);
}
