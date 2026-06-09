<template>
  <div>
    <h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Extensions Manager</h2>
    <div style="max-height: 60vh; overflow-y: auto; padding-right: 10px;">
      <div v-for="plugin in pluginsList" :key="plugin.id" style="margin-bottom: 15px;">
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 15px; border-radius: 12px; border: 1px solid rgba(128,128,128,0.2); transition: all 0.3s ease;"
          :style="{ background: plugin.enabled ? 'rgba(99, 102, 241, 0.05)' : 'rgba(0,0,0,0.02)' }">
          
          <div style="display: flex; flex-direction: column; text-align: left;">
          <strong style="font-size: 1.2rem;">{{ plugin.name }}</strong>
          <span style="font-size: 0.9rem; opacity: 0.6;">Module ID: {{ plugin.id }}</span>
          <span v-if="plugin.dependencies" style="font-size: 0.8rem; opacity: 0.5; margin-top: 4px;">Requires: {{ plugin.dependencies.join(', ') }}</span>
        </div>
        
          <div style="display: flex; align-items: center;">
            <button v-if="plugin.settingsComponent" @click="toggleSettings(plugin.id)" style="background:none; border:none; cursor:pointer; margin-right:15px; font-size: 1.2rem; opacity:0.7; transition: opacity 0.2s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.7">
              ⚙️
            </button>
            <span v-if="plugin.core" style="font-size: 0.75rem; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #6366f1; margin-right: 15px;">Core Module</span>
            <label style="cursor: pointer; display: flex; align-items: center;">
              <input 
                type="checkbox" 
                :checked="plugin.enabled" 
                :disabled="plugin.core"
                @change="toggle(plugin.id, $event.target.checked)" 
                style="width: 24px; height: 24px; cursor: pointer; accent-color: #6366f1;"
                :style="{ opacity: plugin.core ? '0.5' : '1', cursor: plugin.core ? 'not-allowed' : 'pointer' }"
              />
            </label>
          </div>
        </div>
        
        <div v-if="expandedSettings === plugin.id && plugin.settingsComponent" style="margin-top: 5px;">
          <component :is="plugin.settingsComponent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPlugins, togglePlugin } from '@/plugins/manager.js';

export default {
  name: 'ExtensionsPopup',
  data() {
    return {
      expandedSettings: null
    }
  },
  computed: {
    pluginsList() {
      return Object.values(getPlugins());
    }
  },
  methods: {
    toggleSettings(id) {
      if (this.expandedSettings === id) {
        this.expandedSettings = null;
      } else {
        this.expandedSettings = id;
      }
    },
    toggle(id, checked) {
      togglePlugin(id, checked);
      if (!checked && this.$root.session.selectedTool === id) {
        this.$root.session.selectedTool = null;
      }
    }
  }
}
</script>
