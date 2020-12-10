<template>
  <div>
    <h3>{{ isNew ? '新建' : '编辑' }}课程</h3>

    <el-form
      ref="form"
      :model="formData"
      style="width:500px"
      label-width="120px"
    >
      <el-form-item label="课程名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="课程封面图">
        <el-input v-model="formData.cover"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit"
          >{{ isNew ? '创建' : '修改' }}课程</el-button
        >
        <el-button @click="router.go(-1)">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { get, post, put } from '../../api/api'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'About',
  props: {
    id: String
  },
  setup(props, context) {
    console.log('edit')

    const router = useRouter()
    const formData = reactive({
      name: '',
      cover: ''
    })
    // 计算属性-判断新增还是修改
    const isNew = computed(() => {
      return props.id ? false : true
    })
    const onInput = (val: any) => {
      console.log(val, formData.name)
    }

    const getCourseDetail = async (id: any) => {
      const data: any = await get(`/courses/${id}`)
      formData.name = data.name
      formData.cover = data.cover
    }
    // const editCourse = () => {}
    const createCourse = async () => {
      const data = await post('/courses', {
        name: formData.name,
        cover: formData.cover
      })
      ElMessage.success('创建成功')
      router.go(-1)
    }
    const editCourse = async () => {
      const data = await put(`/courses/${props.id}`, {
        name: formData.name,
        cover: formData.cover
      })
      ElMessage.success('修改成功')
      router.go(-1)
    }

    const onSubmit = () => {
      console.log('aaa')
      isNew.value ? createCourse() : editCourse()
    }

    onMounted(async () => {
      props.id && getCourseDetail(props.id)
    })

    return {
      isNew,
      formData,
      onInput,
      router,
      createCourse,
      editCourse,
      onSubmit
    }
  }
})
</script>

<style>
h3 {
  margin: 15px 0;
}
</style>
