<template>
  <div class="container">
    <el-table :data="coursesList.list" style="width: 100%">
      <el-table-column prop="_id" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="cover" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, onMounted } from 'vue'
import { get } from '../../api/api'

export default defineComponent({
  name: 'About',
  setup() {
    const coursesList = reactive({
      list: []
    })

    onMounted(async () => {
      const res: any = await get('/courses')
      coursesList.list = res.data
    })

    return {
      coursesList
    }
  }
})
</script>

<style scoped>
.container {
  height: 100%;
}
</style>
