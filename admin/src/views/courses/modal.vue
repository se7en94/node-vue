<template>
  <el-dialog
    :title="isNew"
    width="30%"
    :model-value="showModal"
    :before-close="onClose"
  >
    <el-form :model="formData" :rules="rules" ref="ruleForm">
      <el-form-item label="名称" prop="name" label-width="80px" required>
        <el-input
          size="small"
          v-model="formData.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover" label-width="80px" required>
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3000/upload"
          :show-file-list="false"
          :on-success="handleUploadSuccess"
        >
          <img v-if="formData.cover" :src="formData.cover" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onSubmit">
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  toRefs,
  reactive,
  watch,
  computed,
  onMounted
} from 'vue'
import { get, post, put } from '../../api/api'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'modal',
  props: { showModal: { type: Boolean, default: false }, id: { type: String } },
  emits: ['on-close'],
  setup(props, context) {
    const formData = reactive({
      name: '',
      cover: ''
    })

    const onClose = () => {
      context.emit('on-close', false)
      formData.name = ''
      formData.cover = ''
    }
    const isNew = computed(() => {
      return props.id ? '编辑' : '新增'
    })

    const createCourse = async () => {
      const data = await post('/courses', {
        name: formData.name,
        cover: formData.cover
      })
      ElMessage.success('创建成功')
    }
    const editCourse = async () => {
      const data = await put(`/courses/${props.id}`, {
        name: formData.name,
        cover: formData.cover
      })
      ElMessage.success('修改成功')
    }

    const handleUploadSuccess = (res: any, file: any) => {
      formData.cover = res.url
    }
    const getCourseDetail = async (id: any) => {
      const data: any = await get(`/courses/${id}`)
      formData.name = data.name
      formData.cover = data.cover
    }

    const rules = {
      name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
      cover: [{ required: true, message: '请上传图片', trigger: 'blur' }]
    }
    const ruleForm: any = ref<null | HTMLElement>(null)

    const onSubmit = () => {
      ruleForm.value.validate((valid: any) => {
        console.log('valid', valid, ruleForm.value)
        if (valid) {
          props.id ? editCourse() : createCourse()
          onClose()
        } else {
          return false
        }
      })
    }
    // const { id } = toRefs(props)

    // watch(id as object, (newVal, oldVal) => {
    //   // getCourseDetail(id)
    //   console.log(newVal, oldVal)
    // })
    return {
      onClose,
      isNew,
      formData,
      onSubmit,
      handleUploadSuccess,
      getCourseDetail,
      rules,
      ruleForm
    }
  }
})
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #ccc;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
