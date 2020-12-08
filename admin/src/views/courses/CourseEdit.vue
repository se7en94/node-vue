<template>
  <div> {{ isNew ? '新建' : '编辑' }} 课程</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { get } from '../../api/api'
export default defineComponent({
  name: 'About',
  props: {
    id: String
  },
  setup(props, context) {
    console.log('edit')
    get('/courses').then(res => {
      console.log('res', res)
    })

    const isNew = computed(() => {
      return props.id ? false : true
    })
    return {
      isNew
    }
  }
})
</script>

<style>
</style>
