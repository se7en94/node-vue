<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        mode="vertical"
        :default-active="route.path"
        router
        background-color="#2d4155"
        text-color="#bdcbd9"
        active-text-color="#2b9dfb"
      >
        <el-submenu
          v-for="(item, index) in menu.items"
          :index="`menu-item-${index}`"
          :key="`menu-item-${index}`"
        >
          <template #title>{{ item.title }}</template>
          <el-menu-item
            v-for="(subItem, subIndex) in item.items"
            :index="subItem.path"
            :key="`menu-iten-${index}-${subIndex}`"
          >
            {{ subItem.title }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>博客后台管理系统</el-header>
      <el-main>
        <router-view :key="route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
const menu = {
  items: [
    {
      title: '内容管理',
      items: [
        { title: '首页', path: '/' },
        { title: '课程管理', path: '/courses/list' },
        { title: '课时管理', path: '/courses/edit/123' }
      ]
    },
    {
      title: '运营管理',
      items: [{ title: '用户管理', path: '/users/list' }]
    }
  ]
}
export default defineComponent({
  name: 'Main',
  setup() {
    const route = useRoute()

    return {
      route,
      menu
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

.el-header {
  color: #97a8be;
  line-height: 60px;
  -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
</style>
