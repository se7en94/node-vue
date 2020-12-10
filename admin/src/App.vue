<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
  /* margin: 0;
  padding: 0; */
}

.el-main {
  background: rgb(240, 242, 245)
}
</style>
