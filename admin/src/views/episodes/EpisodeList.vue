<template>
  <el-card class="container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input
          size="small"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          clearable
          v-model="inputVal"
        />
      </el-col>
      <el-col :span="2">
        <el-button
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="onSearch"
        >
          搜索
        </el-button>
      </el-col>
      <el-col :span="2" :offset="14">
        <el-button
          size="small"
          type="success"
          icon="el-icon-document-add"
          @click="handleModalClick(true)"
        >
          新建
        </el-button>
      </el-col>
    </el-row>
    <el-table :data="episodesList" border style="width: 100%; margin:20px 0;">
      <el-table-column prop="courseName" name="id" label="所属课程">
      </el-table-column>
      <el-table-column prop="name" name="name" label="课时名称" width="180">
      </el-table-column>
      <el-table-column prop="file" name="file" label="文件">
        <template #default="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.file"
            fit="scale-down"
            :preview-src-list="[scope.row.file]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            @click="handleModalClick(true, scope.row._id)"
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

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.page"
      :page-sizes="query.sizes"
      :page-size="query.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="query.total"
    >
    </el-pagination>

    <!-- @on-close 自组件调用父组件方法 -->
    <Modal
      ref="modalRef"
      :show-modal="showModal"
      :id="currentId"
      @on-close="handleModalClick"
    ></Modal>
  </el-card>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { get, deleteReq } from '../../api/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import Modal from './modal.vue'
export default defineComponent({
  name: 'Episodes',
  components: { Modal },
  setup(props, context) {
    const inputVal = ref('')
    const currentId = ref('')
    const modalRef: any = ref<null | HTMLElement>(null)
    const router = useRouter()
    const episodesList = ref([])

    const query = reactive({
      page: 1,
      limit: 10,
      total: 0,
      sizes: [2, 5, 10, 20],
      layout: 'total, sizes, prev, pager, next, jumper',
      where: {}
    })
    const courseOpt = ref([])

    const getCourseOption = async () => {
      const data: any = await get('/episodes/option')
      console.log(data)
      courseOpt.value = data.dicData
    }
    // 获取列表
    const fetchList = async () => {
      await getCourseOption()
      const res: any = await get('/episodes', { query })
      const newArr = res.data.map((it: any) => {
        const c: any = courseOpt.value.find((v: any) => it.course === v.value)
        it.courseName = c && c.label
      })
      episodesList.value = res.data
      query.total = res.total
    }

    const handleSizeChange = (val: any) => {
      query.limit = val
      fetchList()
    }
    const handleCurrentChange = (val: any) => {
      query.page = val
      fetchList()
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
          await deleteReq(`/episodes/${id}`)
          ElMessage.success('删除成功')
          fetchList()
        })
        .catch(err => {
          console.log(err)
        })
    }
    const onSearch = () => {
      // $regex 模糊查询
      query.where = { name: { $regex: inputVal.value } }
      fetchList()
    }
    const showModal = ref(false)

    const handleModalClick = (visible: boolean, id?: any) => {
      // modalRef.value.getCourseOption()
      console.log('visible', visible)
      showModal.value = visible

      if (id && typeof id === 'string') {
        currentId.value = id
        modalRef.value.getDetail(id)
      }

      !visible && fetchList()
      console.log('fetchList---', visible)
    }

    return {
      episodesList,
      router,
      onDelete,
      handleSizeChange,
      handleCurrentChange,
      query,
      inputVal,
      onSearch,
      showModal,
      handleModalClick,
      currentId,
      modalRef
    }
  }
})
</script>

<style scoped>
.container {
  height: 100%;
}

.el-row {
  width: 100%;
}
</style>
