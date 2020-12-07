<template>
  <div>About</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { get } from '../../api/api'
import axios from 'axios'
export default defineComponent({
  name: 'About',
  setup () {
    // get('/courses').then(res => {
    //   console.log(res)
    // })
    axios.get('http://localhost:3000/courses').then(res => {
      console.log(res)
    })
  }
})
</script>

<style>
</style>
