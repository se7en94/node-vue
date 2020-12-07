<template>
  <div id="id">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
console.log('BASE_API', process.env.BASE_API)
export default defineComponent({
  name: 'App',
  components: {}
})
</script>

<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
}
</style>
