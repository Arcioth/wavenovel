<template>
  <div style="background: rgba(0,0,0,0.03); border-radius: 8px; padding: 15px; margin-top: 10px; border: 1px solid rgba(128,128,128,0.1);">
    <h3 style="font-size: 1.1rem; font-weight: bold; margin-bottom: 10px;">Dock Menu Settings</h3>
    
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <label style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.95rem; opacity: 0.8;">Position</span>
        <select v-model="settings.position" @change="save" style="padding: 5px 10px; border-radius: 5px; border: 1px solid rgba(128,128,128,0.3); background: var(--base-100, #fff); color: inherit;">
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </label>

      <label style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.95rem; opacity: 0.8;">Visibility Behavior</span>
        <select v-model="settings.behavior" @change="save" style="padding: 5px 10px; border-radius: 5px; border: 1px solid rgba(128,128,128,0.3); background: var(--base-100, #fff); color: inherit;">
          <option value="hover">Show on Hover (Collapsed)</option>
          <option value="always">Always Visible</option>
        </select>
      </label>
    </div>
  </div>
</template>

<script>
import { getPluginSettings, savePluginSettings } from '@/plugins/manager.js';

export default {
  name: 'DockSettings',
  data() {
    return {
      settings: getPluginSettings('dock_menu', { position: 'left', behavior: 'hover' })
    }
  },
  methods: {
    save() {
      savePluginSettings('dock_menu', this.settings);
    }
  }
}
</script>
