import { registerPlugin, getPluginSettings } from './manager.js';
import { registerUI } from './ui-registry.js';
import ThemePicker from '../components/extensions/ThemePicker.vue';
import ThemeSettings from '../components/extensions/ThemeSettings.vue';

registerPlugin({
    id: 'theme_manager',
    name: 'Theme Manager (Openify Themes)',
    icon: 'edit',
    core: false,
    settingsComponent: ThemeSettings
});

const settings = getPluginSettings('theme_manager', { showInToolbar: false });
if (settings.showInToolbar) {
    registerUI('sidebar-bottom', 'theme_manager', ThemePicker);
}

// Automatically apply the saved theme on load
const savedTheme = localStorage.getItem('theme') || 'openify';
document.documentElement.setAttribute('data-theme', savedTheme);

// Apply color overrides
if (settings.overrides) {
  const root = document.documentElement;
  if (settings.overrides.page && settings.overrides.page.enabled) {
    root.style.setProperty('--pageEditor-bgcolor', `hsla(${settings.overrides.page.h}, ${settings.overrides.page.s}%, ${settings.overrides.page.l}%, ${settings.overrides.page.a})`);
  }
  if (settings.overrides.text && settings.overrides.text.enabled) {
    root.style.setProperty('--pageEditor-color', `hsla(${settings.overrides.text.h}, ${settings.overrides.text.s}%, ${settings.overrides.text.l}%, ${settings.overrides.text.a})`);
    root.style.setProperty('--window-f', `hsla(${settings.overrides.text.h}, ${settings.overrides.text.s}%, ${settings.overrides.text.l}%, ${settings.overrides.text.a})`);
  }
}
