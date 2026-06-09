<template>
  <div class="wm-blur-overlay" :class="{ 'is-active': isPopupOpen }"></div>
</template>

<script>
export default {
  name: 'BlurOverlay',
  data() {
    return {
      isPopupOpen: false
    }
  },
  mounted() {
    // Listen to our new event system!
    import('@/plugins/events.js').then(({ on, off }) => {
      this.popupHandler = (popupName) => {
        this.isPopupOpen = !!popupName;
      };
      on('popup:state', this.popupHandler);
      
      // Also fallback check current state in case event missed
      this.isPopupOpen = !!this.$root.$data?.popup?.name;
    });
  },
  beforeUnmount() {
    import('@/plugins/events.js').then(({ off }) => {
      if (this.popupHandler) off('popup:state', this.popupHandler);
    });
  }
}
</script>

<style scoped>
.wm-blur-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background: rgba(0,0,0,0);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  transition: all 0.3s ease;
  z-index: 998; /* Just below popups */
}

.wm-blur-overlay.is-active {
  background: rgba(0,0,0,0.15);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  /* Let the original popup blackout handle clicks, so keep pointer-events none here */
}
</style>
