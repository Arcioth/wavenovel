<template>
  <div style="padding: 10px;">
    <h3 style="margin-top: 0; margin-bottom: 15px;">Theme Configuration</h3>
    
    <label style="display: flex; align-items: center; margin-bottom: 15px; cursor: pointer; color: var(--text-main);">
      <input type="checkbox" v-model="showInToolbar" @change="updateSettings" style="margin-right: 10px; width: 18px; height: 18px;" />
      Show Theme Picker in Toolbar Dock
    </label>

    <div class="theme-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; margin-bottom: 20px;">
        <button v-for="theme in themes" :key="theme" 
                @click="setTheme(theme)" 
                style="padding: 10px; border-radius: 8px; border: 1px solid rgba(128,128,128,0.2); background: var(--bg-card); color: var(--text-main); cursor: pointer; text-transform: capitalize;"
                :style="{ background: currentTheme === theme ? 'var(--accent)' : '', color: currentTheme === theme ? '#000' : '' }">
          {{ theme }}
        </button>
    </div>

    <!-- Overrides -->
    <div style="border-top: 1px solid rgba(128,128,128,0.2); padding-top: 15px;">
      <h4 style="margin-top: 0; margin-bottom: 10px;">Color Overrides</h4>
      
      <!-- Page Color Override -->
      <label style="display: flex; align-items: center; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" v-model="overrides.page.enabled" @change="updateOverrides" style="margin-right: 10px;" />
        Override Page Background Color
      </label>
      <div v-if="overrides.page.enabled" style="margin-bottom: 15px; padding-left: 20px; display: grid; gap: 5px;">
        <label>Hue: <input type="range" min="0" max="360" v-model="overrides.page.h" @input="updateOverrides" style="width:100%"/></label>
        <label>Saturation: <input type="range" min="0" max="100" v-model="overrides.page.s" @input="updateOverrides" style="width:100%"/></label>
        <label>Lightness: <input type="range" min="0" max="100" v-model="overrides.page.l" @input="updateOverrides" style="width:100%"/></label>
        <label>Opacity: <input type="range" min="0" max="1" step="0.01" v-model="overrides.page.a" @input="updateOverrides" style="width:100%"/></label>
      </div>

      <!-- Text Color Override -->
      <label style="display: flex; align-items: center; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" v-model="overrides.text.enabled" @change="updateOverrides" style="margin-right: 10px;" />
        Override Text/Font Color
      </label>
      <div v-if="overrides.text.enabled" style="margin-bottom: 15px; padding-left: 20px; display: grid; gap: 5px;">
        <label>Hue: <input type="range" min="0" max="360" v-model="overrides.text.h" @input="updateOverrides" style="width:100%"/></label>
        <label>Saturation: <input type="range" min="0" max="100" v-model="overrides.text.s" @input="updateOverrides" style="width:100%"/></label>
        <label>Lightness: <input type="range" min="0" max="100" v-model="overrides.text.l" @input="updateOverrides" style="width:100%"/></label>
        <label>Opacity: <input type="range" min="0" max="1" step="0.01" v-model="overrides.text.a" @input="updateOverrides" style="width:100%"/></label>
      </div>
    </div>
  </div>
</template>

<script>
import { getPluginSettings, savePluginSettings } from '@/plugins/manager.js';
import { registerUI, unregisterUI } from '@/plugins/ui-registry.js';
import ThemePicker from './ThemePicker.vue';

export default {
  name: 'ThemeSettings',
  data() {
    return {
      showInToolbar: false,
      currentTheme: localStorage.getItem('theme') || 'openify',
      themes: [
        "openify", "dark", "light", "blue", "purple", "red", 
        "gold", "cyberpunk", "glass", "terminal", "rgb", 
        "pharoh", "turk", "clouds"
      ],
      overrides: {
        page: { enabled: false, h: 0, s: 0, l: 100, a: 1 },
        text: { enabled: false, h: 0, s: 0, l: 0, a: 1 }
      }
    }
  },
  mounted() {
    const settings = getPluginSettings('theme_manager', { showInToolbar: false });
    this.showInToolbar = settings.showInToolbar;
    if (settings.overrides) {
      this.overrides = JSON.parse(JSON.stringify(settings.overrides));
    }
  },
  methods: {
    updateSettings() {
      savePluginSettings('theme_manager', { 
        showInToolbar: this.showInToolbar,
        overrides: this.overrides
      });
      if (this.showInToolbar) {
        registerUI('sidebar-bottom', 'theme_manager', ThemePicker);
      } else {
        unregisterUI('sidebar-bottom', 'theme_manager');
      }
    },
    updateOverrides() {
      savePluginSettings('theme_manager', { 
        showInToolbar: this.showInToolbar,
        overrides: this.overrides
      });
      this.applyOverrides();
    },
    applyOverrides() {
      const root = document.documentElement;
      if (this.overrides.page.enabled) {
        root.style.setProperty('--pageEditor-bgcolor', `hsla(${this.overrides.page.h}, ${this.overrides.page.s}%, ${this.overrides.page.l}%, ${this.overrides.page.a})`);
      } else {
        root.style.removeProperty('--pageEditor-bgcolor');
      }
      if (this.overrides.text.enabled) {
        root.style.setProperty('--pageEditor-color', `hsla(${this.overrides.text.h}, ${this.overrides.text.s}%, ${this.overrides.text.l}%, ${this.overrides.text.a})`);
        root.style.setProperty('--window-f', `hsla(${this.overrides.text.h}, ${this.overrides.text.s}%, ${this.overrides.text.l}%, ${this.overrides.text.a})`);
      } else {
        root.style.removeProperty('--pageEditor-color');
        root.style.removeProperty('--window-f');
      }
    },
    setTheme(theme) {
      this.currentTheme = theme;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }
}
</script>
