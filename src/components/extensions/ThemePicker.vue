<template>
  <button class="sidebar-btn tooltip-right" @click="$root.$data.popup.name = 'ThemePopup'">
    <svg viewBox="0 0 24 24">
      <path d="M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6V18A6,6 0 0,0 18,12A6,6 0 0,0 12,6Z" />
    </svg>
    <span class="tooltiptext">Themes</span>
  </button>
</template>

<script>
export default {
  name: 'ThemePicker'
}
</script>
