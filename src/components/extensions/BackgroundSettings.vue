<template>
  <div style="padding: 10px;">
    <h3 style="margin-top: 0; margin-bottom: 15px;">Background Configuration</h3>
    
    <label style="display: block; margin-bottom: 10px; font-weight: bold; color: var(--text-main);">
      Background Type:
      <select v-model="settings.type" @change="saveSettings" style="width: 100%; margin-top: 5px; padding: 5px; background: var(--bg-card); color: var(--text-main); border: 1px solid rgba(128,128,128,0.3); border-radius: 4px;">
        <option value="default">Default (Matches Theme)</option>
        <option value="hue">Custom Hue</option>
        <option value="static">Static Color</option>
        <option value="image">Image URL</option>
        <option value="transparent">Transparent Passthrough</option>
      </select>
    </label>

    <div v-if="settings.type === 'hue'" style="margin-bottom: 10px;">
      <label style="display: block; color: var(--text-main);">
        Hue Value (0-360): {{ settings.value || 0 }}
        <input type="range" min="0" max="360" v-model="settings.value" @input="saveSettings" style="width: 100%; margin-top: 5px;" />
      </label>
    </div>

    <div v-if="settings.type === 'static'" style="margin-bottom: 10px;">
      <label style="display: block; color: var(--text-main);">
        Color Hex/RGB:
        <input type="text" v-model="settings.value" @input="saveSettings" placeholder="#000000 or rgb(0,0,0)" style="width: 100%; margin-top: 5px; padding: 5px; background: var(--bg-card); color: var(--text-main); border: 1px solid rgba(128,128,128,0.3); border-radius: 4px;" />
      </label>
    </div>

    <div v-if="settings.type === 'image'" style="margin-bottom: 10px;">
      <label style="display: block; color: var(--text-main);">
        Image URL:
        <input type="text" v-model="settings.value" @input="saveSettings" placeholder="https://..." style="width: 100%; margin-top: 5px; padding: 5px; background: var(--bg-card); color: var(--text-main); border: 1px solid rgba(128,128,128,0.3); border-radius: 4px;" />
      </label>
    </div>

    <div v-if="settings.type !== 'default'" style="margin-bottom: 10px;">
      <label style="display: block; color: var(--text-main);">
        Blur Amount (px): {{ settings.blur || 0 }}
        <input type="range" min="0" max="50" v-model="settings.blur" @input="saveSettings" style="width: 100%; margin-top: 5px;" />
      </label>
    </div>

  </div>
</template>

<script>
import { getPluginSettings, savePluginSettings } from '@/plugins/manager.js';
import { applyBackgroundSettings } from '@/plugins/backgroundPlugin.js';

export default {
  name: 'BackgroundSettings',
  data() {
    return {
      settings: {
        type: 'default',
        value: '',
        blur: 0
      }
    }
  },
  mounted() {
    this.settings = getPluginSettings('background_manager', this.settings);
  },
  methods: {
    saveSettings() {
      savePluginSettings('background_manager', this.settings);
      applyBackgroundSettings();
    }
  }
}
</script>
