<template>
  <el-card class="container">
    <el-button
      size="small"
      type="primary"
      icon="el-icon-document-add"
      @click="router.push('/courses/create')"
    >
      新建
    </el-button>
    <el-table :data="coursesList.list" style="width: 100%">
      <el-table-column prop="_id" label="日期"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="cover" label="地址"> </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            @click="router.push(`/courses/edit/${scope.row._id}`)"
          >
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="onDelete(scope.row._id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import { reactive, defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { get, deleteReq } from '../../api/api'
import { ElMessage, ElMessageBox } from 'element-plus'

export default defineComponent({
  name: 'About',
  setup() {
    const coursesList = reactive({
      list: []
    })
    const router = useRouter()
    const fetchList = async () => {
      const res: any = await get('/courses')
      coursesList.list = res.data
    }
    onMounted(() => {
      fetchList()
    })

    const onDelete = (id: any) => {
      ElMessageBox.confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await deleteReq(`/courses/${id}`)
          ElMessage.success('删除成功')
          fetchList()
        })
        .catch(err => {
          console.log(err)
        })
    }

    return {
      coursesList,
      router,
      onDelete
    }
  }
})
</script>

<style scoped>
.container {
  height: 100%;
}
</style>
