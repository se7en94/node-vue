<template>
  <el-container>
    <Menu></Menu>
    <el-container>
      <el-header>后台管理系统</el-header>
      <el-main>
        <router-view :key="route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import Menu from '../layout/Menu.vue'
export default defineComponent({
  name: 'Main',
  components: { Menu },
  setup() {
    const route = useRoute()

    return {
      route
    }
  }
})
</script>

<style scoped>
.container,
.el-container,
.el-menu {
  height: 100%;
}
.el-menu {
  border: none;
}
.el-header {
  /* color: #97a8be; */
  line-height: 60px;
  -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
</style>
