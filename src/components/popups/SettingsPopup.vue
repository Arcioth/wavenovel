<template>
  <div style="text-align:left">
    <h1>{{ this.$root.setlang.settings.title }}</h1>
    <div class="container">



      <div class="item item-center">
        <button class="interfaceBtn fullw" @click="lang = !lang" style="text-align:left">
          <svg viewBox="0 0 24 24">
            <path
              d="M11 1H3C1.9 1 1 1.9 1 3V15L4 12H9V11C9 8.8 10.79 7 13 7V3C13 1.9 12.1 1 11 1M11 4L9.5 4C9.16 5.19 8.54 6.3 7.68 7.26L7.66 7.28L8.92 8.53L8.55 9.54L7 8L4.5 10.5L3.81 9.77L6.34 7.28C5.72 6.59 5.22 5.82 4.86 5H5.85C6.16 5.6 6.54 6.17 7 6.68C7.72 5.88 8.24 4.97 8.57 4L3 4V3H6.5V2H7.5V3H11V4M21 9H13C11.9 9 11 9.9 11 11V18C11 19.1 11.9 20 13 20H20L23 23V11C23 9.9 22.1 9 21 9M19.63 19L18.78 16.75H15.22L14.38 19H12.88L16.25 10H17.75L21.13 19H19.63M17 12L18.22 15.25H15.79L17 12Z" />
          </svg>
          {{ this.$root.setlang.settings.lang }}
        </button>

        <div v-if="lang" class="dropdown">
          <button class="myoption" v-for="(k, i) in Object.keys(this.$root.language)" :key="i" @click="language(k)">
            {{ this.$root.language[k].info.name }}
          </button>
        </div>

        <hr />


        <h2>{{ this.$root.setlang.settings.docprefs }}</h2>

        <label>{{ this.$root.setlang.settings.alignment }}</label>
        <select class="wavemaker-form" v-model="this.$root.session.settings.documentprefs.align" @change="$root.updateSettings">
          <option value="left">{{ this.$root.setlang.settings.alignL }}</option>
          <option value="center"> {{ this.$root.setlang.settings.alignC }}</option>
          <option value="right"> {{ this.$root.setlang.settings.alignR }}</option>
          <option value="justify">{{ this.$root.setlang.settings.alignJ }}</option>
        </select>
        <label>{{ this.$root.setlang.settings.fontsize }}</label>
        <select class="wavemaker-form" v-model="this.$root.session.settings.documentprefs.fontsize"
          @change="$root.updateSettings">
          <option value="1rem">{{ this.$root.setlang.settings.fontsize1 }}</option>
          <option value="1.5rem">{{ this.$root.setlang.settings.fontsize2 }}</option>
          <option value="2rem">{{ this.$root.setlang.settings.fontsize3 }}</option>
          <option value="3rem">{{ this.$root.setlang.settings.fontsize4 }}</option>
          <option value="3.5rem">{{ this.$root.setlang.settings.fontsize5 }}</option>
        </select>
        <label>{{ this.$root.setlang.settings.lineheight }}</label>
        <select class="wavemaker-form" v-model="this.$root.session.settings.documentprefs.lspacing"
          @change="$root.updateSettings">
          <option value="3rem">{{ this.$root.setlang.settings.lineheight1 }}</option>
          <option value="4rem"> {{ this.$root.setlang.settings.lineheight2 }}</option>
          <option value="5rem"> {{ this.$root.setlang.settings.lineheight3 }}</option>
          <option value="6rem"> {{ this.$root.setlang.settings.lineheight4 }}</option>
        </select>
        <label>{{ this.$root.setlang.settings.paragraph }}</label>
        <select class="wavemaker-form" v-model="this.$root.session.settings.documentprefs.indentation"
          @change="$root.updateSettings">
          <option value="20px">{{ this.$root.setlang.settings.paragraphyes }}</option>
          <option value="0px">{{ this.$root.setlang.settings.paragraphno }}</option>
        </select>
        <label>{{ this.$root.setlang.settings.paragraphspacing }}</label>
        <select class="wavemaker-form" v-model="this.$root.session.settings.documentprefs.pspacing"
          @change="$root.updateSettings">
          <option value="20px"> {{ this.$root.setlang.settings.paragraphspacing1 }}</option>
          <option value="30px">{{ this.$root.setlang.settings.paragraphspacing2 }}</option>
          <option value="40px">{{ this.$root.setlang.settings.paragraphspacing3 }}</option>
          <option value="50px">{{ this.$root.setlang.settings.paragraphspacing4 }}</option>
          <option value="100px">{{ this.$root.setlang.settings.paragraphspacing5 }}</option>
        </select>
        <label>{{ this.$root.setlang.settings.pagewidth }}</label>
        <select class="wavemaker-form" v-model="this.$root.session.settings.documentprefs.page" @change="$root.updateSettings">
          <option value="800px"> {{ this.$root.setlang.settings.pagestyle }}</option>
          <option value="100%"> {{ this.$root.setlang.settings.fullwidth }}</option>
        </select>



  <label>Choose Font</label>
  <input list="fonts" class="wavemaker-form" v-model="this.$root.session.settings.documentprefs.font"
    @change="handleFontChange" @input="onFontInput" placeholder="Type to search Google Fonts..." />
  <datalist id="fonts">
    <option v-for="font in filteredFonts" :key="font" :value="font">{{ font }}</option>
  </datalist>

        <label>{{ this.$root.setlang.settings.h1align }}</label>
        <select class="wavemaker-form" v-model="this.$root.session.settings.documentprefs.h1align"
          @change="$root.updateSettings">
          <option value="left">{{ this.$root.setlang.settings.alignL }}</option>
          <option value="center"> {{ this.$root.setlang.settings.alignC }}</option>
          <option value="right"> {{ this.$root.setlang.settings.alignR }}</option>
          <option value="justify">{{ this.$root.setlang.settings.alignJ }}</option>
        </select>

        <label>{{ this.$root.setlang.settings.h2align }}</label>
        <select class="wavemaker-form" v-model="this.$root.session.settings.documentprefs.h2align"
          @change="$root.updateSettings">
          <option value="left">{{ this.$root.setlang.settings.alignL }}</option>
          <option value="center"> {{ this.$root.setlang.settings.alignC }}</option>
          <option value="right"> {{ this.$root.setlang.settings.alignR }}</option>
          <option value="justify">{{ this.$root.setlang.settings.alignJ }}</option>
        </select>

        <label>{{ this.$root.setlang.settings.h3align }}</label>
        <select class="wavemaker-form" v-model="this.$root.session.settings.documentprefs.h3align"
          @change="$root.updateSettings">
          <option value="left">{{ this.$root.setlang.settings.alignL }}</option>
          <option value="center"> {{ this.$root.setlang.settings.alignC }}</option>
          <option value="right"> {{ this.$root.setlang.settings.alignR }}</option>
          <option value="justify">{{ this.$root.setlang.settings.alignJ }}</option>
        </select>

        <label>{{ this.$root.setlang.settings.h4align }}</label>
        <select class="wavemaker-form" v-model="this.$root.session.settings.documentprefs.h4align"
          @change="$root.updateSettings">
          <option value="left">{{ this.$root.setlang.settings.alignL }}</option>
          <option value="center"> {{ this.$root.setlang.settings.alignC }}</option>
          <option value="right"> {{ this.$root.setlang.settings.alignR }}</option>
          <option value="justify">{{ this.$root.setlang.settings.alignJ }}</option>
        </select>
        <hr />
        <label>{{ this.$root.setlang.settings.caretfocus }}</label>
        <input type="checkbox" v-model="this.$root.session.settings.documentprefs.caretfocus"
          style="width:20px; height:20px" @change="$root.updateSettings" />
        <label>Enable Browser Spellcheck</label>
        <input type="checkbox" v-model="this.$root.session.settings.documentprefs.spellcheck"
          style="width:20px; height:20px" @change="$root.updateSettings" />
        <hr />
        <h2>{{ this.$root.setlang.settings.typewriter }}</h2>

        <label>Distraction-Free Font</label>
        <input list="distractionfree-fonts" class="wavemaker-form" v-model="this.$root.session.settings.documentprefs.distractionfree_font"
          @change="handleDistractionFreeFontChange" @input="onDistractionFreeFontInput" placeholder="Type to search Google Fonts..." />
        <datalist id="distractionfree-fonts">
          <option v-for="font in filteredDistractionFreeFonts" :key="font" :value="font">{{ font }}</option>
        </datalist>

        <table>
          <tbody>
          <tr>
            <td>
              <label>{{ this.$root.setlang.settings.typesound }}</label>
              <input type="checkbox" v-model="this.$root.session.settings.documentprefs.typesound"
                style="width:20px; height:20px" />
            </td>
          </tr>
          </tbody>
        </table>


        <br />
        <button @click="resetSettings" class="interfaceBtn">
          <svg viewBox="0 0 24 24">
            <path
              d="M13.5 21H6V17H13.5C15.43 17 17 15.43 17 13.5S15.43 10 13.5 10H11V14L4 8L11 2V6H13.5C17.64 6 21 9.36 21 13.5S17.64 21 13.5 21Z" />
          </svg>
          {{ this.$root.setlang.settings.reset }}
        </button>
        

        
    
      </div>


    </div>
    <div style="clear: both;"></div>
  </div>
</template>

<script>
import { useFontLoader } from '@/composables/useFontLoader.js'

export default {
  name: 'SettingsPopup',
  setup() {
    const { getFontSuggestions, loadGoogleFont, popularGoogleFonts } = useFontLoader()
    return { getFontSuggestions, loadGoogleFont, popularGoogleFonts }
  },
  data() {
    return {
      lang: false,
      fontQuery: '',
      filteredFonts: [],
      distractionFreeFontQuery: '',
      filteredDistractionFreeFonts: []
    }
  },
  computed: {
    currentFontSuggestions() {
      return this.getFontSuggestions(this.fontQuery)
    }
  },
  methods: {
    onFontInput(event) {
      this.fontQuery = event.target.value
      this.filteredFonts = this.getFontSuggestions(this.fontQuery)
    },
    async handleFontChange() {
      try {
        await this.loadGoogleFont(this.$root.session.settings.documentprefs.font)
        this.$root.updateSettings()
      } catch (error) {
        console.warn('Font loading failed:', error)
        this.$root.updateSettings()
      }
    },
    onDistractionFreeFontInput(event) {
      this.distractionFreeFontQuery = event.target.value
      this.filteredDistractionFreeFonts = this.getFontSuggestions(this.distractionFreeFontQuery)
    },
    async handleDistractionFreeFontChange() {
      try {
        await this.loadGoogleFont(this.$root.session.settings.documentprefs.distractionfree_font)
        this.$root.updateSettings()
      } catch (error) {
        console.warn('Distraction-free font loading failed:', error)
        this.$root.updateSettings()
      }
    },
    language(l) {
      this.$root.lang = l
      this.$root.switchLang()
      this.lang = false
    },

    resetSettings() {
      this.$root.session.settings.documentprefs = JSON.parse(JSON.stringify(this.$root.SettingsTemplate.documentprefs))
      this.$root.updateSettings()
    },

  },
  mounted() {
    console.log(this.$root.session.settings.documentprefs)
    // Initialize with popular Google Fonts
    this.filteredFonts = this.popularGoogleFonts.slice(0, 15)
    this.filteredDistractionFreeFonts = this.popularGoogleFonts.slice(0, 15)
  }
}
</script>

<style scoped>
label {
  padding: 10px
}

.wavemaker-form {
  width: 100%;
  padding: 10px;
  background-color: var(--c9);
  color: var(--c0);
  border: 0px;
  border-bottom: 1px dashed var(--c0);
}

.container {
  display: flex;
}

.item {
  width: 300px;
  /* A fixed width as the default */
}

.item-center {
  flex-grow: 1;
  /* Set the middle element to grow and stretch */
}

.item+.item {
  margin-left: 2%;
}



.dropdown {
  max-height: 200px;
  overflow-y: auto;
  ;
}
</style>
