<template>
  <main class="min-h-screen p-4 md:p-8" v-if="this.$root.setlang">
    <div class="max-w-7xl mx-auto bento-grid">
      
      <!-- Hero Card: Spans 2 columns, 2 rows -->
      <div class="md:col-span-2 md:row-span-2 glass-panel p-8 flex flex-col justify-between">
        <div class="flex items-center gap-4 mb-4">
          <svg id="wavemaker_logo" version="1.1" viewBox="0 0 24 24" height="64" width="64">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <g transform="matrix(0.046875,0,0,0.04604639,-1.951887,-3.0598516)">
              <g id="_921457168">
                <path class="wavemaker_logo-top" fill="currentColor"
                  d="M 464.632,212.901 337.566,83.292 c -22.014,-22.454 -57.758,-22.454 -79.771,0 l -126.63,129.386 c -7.411,7.559 -7.411,19.563 0,27.122 l 38.359,39.127 25.5,24.232 c 7.628,7.114 19.18,7.114 26.808,0 l 51.219,-48.242 c 14.167,-13.338 35.744,-13.338 49.693,0 l 51.219,48.242 c 7.629,7.114 19.18,7.114 26.809,0 l 25.501,-24.232 38.359,-38.904 c 7.193,-7.337 7.193,-19.563 0,-27.122 z" />
                <path class="wavemaker_logo-bottom" fill="currentColor"
                  d="m 58.804,367.853 198.991,202.973 c 22.013,22.452 57.757,22.452 79.771,0 L 536.557,367.853 c 34.437,-35.125 10.244,-45.574 -15.039,-70.029 L 490.35,267.59 c -7.409,-7.336 -19.18,-7.113 -26.808,0 l -51.218,48.242 c -14.169,13.339 -35.744,13.339 -49.694,0 L 311.411,267.59 c -7.575,-7.113 -19.233,-7.113 -26.809,0 l -51.219,48.242 c -14.167,13.339 -35.744,13.339 -49.693,0 L 132.471,267.59 c -7.576,-7.113 -19.233,-7.113 -26.809,0 l -28.77,27.123 c -26.37,24.899 -54.05,36.236 -18.088,73.14 z" />
              </g>
            </g>
          </svg>
          <div>
            <h1 class="text-fluid-3xl font-extrabold tracking-tight text-base-content">
              Wavemaker Cards
            </h1>
            <p class="text-fluid-sm text-base-content/80 mt-1">
              Version 4 ({{ this.$root.myPackage.version }})
            </p>
          </div>
        </div>
        <div class="mt-4 flex-grow">
          <h3 class="text-fluid-lg text-base-content/90 font-medium">{{ this.$root.setlang.welcome.info }}</h3>
        </div>
        <div class="mt-8">
          <button class="btn btn-primary rounded-full shadow-glass text-fluid-base w-full p-4 h-auto" @click="MakeSettings">
            <svg viewBox="0 0 24 24" class="w-6 h-6 mr-2"><path fill="currentColor" d="M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
            {{ this.$root.setlang.welcome.getstarted }}
          </button>
        </div>
      </div>

      <!-- Action Card: Google Drive -->
      <div class="glass-panel p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-base-200/50 transition-colors" @click="$root.$data.popup.name = 'GoogleDrive'" :title="this.$root.setlang.welcome.loadgoogle">
        <svg viewBox="0 0 24 24" class="w-16 h-16 text-primary mb-4">
          <path fill="currentColor" d="M13.75,9H16.14L19,14H16.05L13.5,9.46M18.3,17H12.75L14.15,14.5H19.27L19.53,14.96M11.5,17L10.4,14.86L13.24,9.9L14.74,12.56L12.25,17M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z" />
        </svg>
        <span class="text-fluid-base font-semibold text-base-content">{{ this.$root.setlang.welcome.loadgoogle }}</span>
      </div>

      <!-- Action Card: Load File -->
      <div class="glass-panel p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-base-200/50 transition-colors" @click="$root.file_loadDB" :title="this.$root.setlang.welcome.loadfile">
        <svg viewBox="0 0 24 24" class="w-16 h-16 text-secondary mb-4">
          <path fill="currentColor" d="M19,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4H10L12,6H19A2,2 0 0,1 21,8H21L4,8V18L6.14,10H23.21L20.93,18.5C20.7,19.37 19.92,20 19,20Z" />
        </svg>
        <span class="text-fluid-base font-semibold text-base-content">{{ this.$root.setlang.welcome.loadfile }}</span>
      </div>
      
      <!-- Language Selection -->
      <div class="glass-panel p-6 flex flex-col justify-center">
        <h3 class="text-fluid-sm font-semibold mb-3">Language</h3>
        <select v-model="this.$root.lang" @change="this.$root.switchLang()" class="select select-bordered w-full shadow-neu-pressed bg-base-200 focus:ring-2 focus:ring-primary/50">
          <option v-for="(k, i) in Object.keys(this.$root.language).sort()" :key="i" :value="k">
            {{ k }} ({{ this.$root.language[k].info.name }})
          </option>
        </select>
      </div>

      <!-- App Updates -->
      <div class="md:col-span-2 glass-panel p-6 flex flex-col justify-center">
        <h3 class="text-fluid-lg font-bold mb-2">App Updates</h3>
        <p class="text-fluid-sm text-base-content/70 mb-4">Clear all cached data and force reload from server. Use this if you're experiencing issues or want to ensure you have the latest version.</p>
        <ForceUpdateButton confirm-message="This will clear all cached app data and reload. Your project data will be preserved. Continue?" />
      </div>

      <!-- Links & Legacy -->
      <div class="glass-panel p-6 flex flex-col gap-4 justify-between">
        <button class="btn btn-outline w-full shadow-glass text-fluid-sm" @click="$root.v3import = true">
          {{ this.$root.setlang.welcome.v3import }}
        </button>
        <a href="https://www.patreon.com/1984092/join" target="_blank" class="btn bg-[#ff424d] hover:bg-[#d8353e] text-white w-full shadow-glass border-none">
          💰 Support Via Patreon
        </a>
        <a href="privacy.html" target="_blank" class="text-center text-fluid-xs text-base-content/60 hover:text-primary mt-2">Privacy Policy</a>
      </div>

    </div>
  </main>
</template>

<script>
import ForceUpdateButton from '@/components/ForceUpdateButton.vue'
export default {
  name: "welcomeSettings",
  components:{
    ForceUpdateButton
  },
  data() {
    return {
    }
  },
  methods: {
    MakeSettings() {
      let obj = JSON.parse(JSON.stringify(this.$root.SettingsTemplate))
      obj.uuid = this.$root.uuid();
      obj.ProjectName = this.$root.setlang.start.projectlabel
      this.$root.AddRecord("Settings", obj);

      this.$root.session.settings = this.$root.useObservable(this.$root.liveQuery(async () => await this.$root.db.Settings.get(obj.uuid)))
    }



  }
}

</script>

<style scoped>
.focuson {
  height: 50px;
  background-color: var(--primary);
  color: var(--primary-f);
  fill: var(--primary-f);
  font-size: 1.5rem;
  padding-left: 55px;
}

.focuson svg {
  height: 40px;
  width: 40px;
  left: 5px;
  top: 5px;
}

.focuson:hover,
.focuson:active,
.focuson:focus {
  background-color: var(--button-hover);
  color: var(--button-hover-f);
  fill: var(--button-hover-f);
}

.softwareName {
  font-size: 2em;
}

.languages {
  padding: 10px;
  text-align: center;
}

select {
  padding: 5px
}
.patreonBtn{
  padding: 10px;
  width: 100%;
  text-align: center;
  display: block;
  background-color: #FFF;
  margin: 10px 0px 10px 0px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border:1px solid #ddd;
  transition: background-color 0.3s, color 0.3s, font-size 0.3s;
  text-decoration: none;

  &:hover{
    background-color: #006d0f;
    color: #fff;
    font-size: 1.2em;

  }
}
</style>