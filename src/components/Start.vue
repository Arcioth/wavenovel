<template>
  <div class="toolbox">
    <ProjectInfo v-if="!$root.session.selectedTool" />
    <template v-for="plugin in pluginsList" :key="plugin.id">
      <component :is="plugin.component" v-if="$root.session.selectedTool === plugin.id" />
    </template>
  </div>
  <SlotRenderer name="global-overlay" />


  <DistractionFree v-if="$root.session.selectedTool === 'distractionfree'" />
</template>

<script>
import ProjectInfo from "@/components/project/ProjectInfo.vue";
import DistractionFree from "@/components/distractionfree/Typewriter.vue";
import { getPlugins } from "@/plugins/manager.js";

export default {
  name: "StartApp",
  components: {
    ProjectInfo,
    DistractionFree
  },
  computed: {
    pluginsList() {
      return Object.values(getPlugins()).filter(p => p.enabled);
    }
  },
  methods: {},
  async mounted() {

    let params = new URLSearchParams(document.location.search);
    let sc = params.get("sc");
    let sel = params.get("sel");
    // hide em away
    params.delete("sc");
    params.delete("sel");
    if (sc === "planningboard") {
      this.$root.session.writer = {}
      this.$root.session.writer.selected = this.$root.useObservable(this.$root.liveQuery(() => this.$root.db.Writer.get(sel)))
      this.$root.session.selectedTool = sc;
    }


this.$root.updateSettings()


    // only for dev -- huh?? this is old I think
    if (localStorage.getItem("wmDev")) {
      this.session = JSON.parse(localStorage.getItem("wmDev"));
    }
    // now we loaded pop in the warning here
    // dont think this is needed but will consider so leaving commented
    // window.addEventListener("beforeunload", this.$root.unloadEvent);
  },
};
</script>

<style scoped>
.toolbox {
  position: fixed;
  top: 0px;
  left: 20px;
  right: 0px;
  bottom: 0px;
  background-color: inherit;
  color: inherit;
  overflow-y: auto;
}
</style>