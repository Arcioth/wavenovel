<template>
  <div>
    <h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Theme Configuration</h2>
    <div style="max-height: 60vh; overflow-y: auto; padding-right: 10px;">
      <ThemeSettings />
    </div>
  </div>
</template>

<script>
import ThemeSettings from '../extensions/ThemeSettings.vue';

export default {
  name: 'ThemePopup',
  components: {
    ThemeSettings
  }
}
</script>
