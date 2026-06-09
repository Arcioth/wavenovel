import { shallowReactive, markRaw } from 'vue';
import { getPlugins } from './manager.js';

const uiSlots = shallowReactive({});

export function registerUI(slotName, pluginId, componentDef) {
    if (!uiSlots[slotName]) {
        uiSlots[slotName] = [];
    }
    const component = markRaw(componentDef);
    uiSlots[slotName] = [
        ...uiSlots[slotName].filter(item => item.pluginId !== pluginId),
        { pluginId, component }
    ];
}

export function unregisterUI(slotName, pluginId) {
    if (uiSlots[slotName]) {
        uiSlots[slotName] = uiSlots[slotName].filter(item => item.pluginId !== pluginId);
    }
}

export function getUI(slotName) {
    const slotComponents = uiSlots[slotName] || [];
    const plugins = getPlugins();
    
    // Only return components whose associated plugin is enabled
    return slotComponents
        .filter(item => !item.pluginId || (plugins[item.pluginId] && plugins[item.pluginId].enabled))
        .map(item => item.component);
}
