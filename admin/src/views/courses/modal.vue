<template>
  <el-dialog title="新增封面" width="30%" :model-value="showModal" :before-close="onClose">
    <el-form :model="form">
      <el-form-item label="名称" label-width="80px">
        <el-input size="small" v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="封面" label-width="80px">
        <el-input size="small" v-model="form.cover" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue'
export default defineComponent({
  name: 'modal',
  props: { showModal: { type: Boolean, default: false } },
  emits: ['on-close'],
  setup(props, context) {
    const dialogFormVisible = ref(true)
    const form = reactive({
      name: '',
      cover: ''
    })
    const onClose = () => {
      console.log('onClose')
      context.emit('on-close', false)
    }

    return {
      dialogFormVisible,
      form,
      onClose
    }
  }
})
</script>

<style>
.el-input {
  width: 300px;
}
</style>
