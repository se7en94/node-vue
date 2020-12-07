<template>
  <el-container>
    <el-aside width="200px">
      <el-menu mode="vertical" :default-active="route.path" router>
        <el-submenu
          v-for="(item, index) in menu.items"
          :index="index + 1"
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
      <el-header>后台管理</el-header>
      <el-main>
        <router-view></router-view>
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
        { title: '课时管理', path: '/courses/list' }
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
  setup () {
    const route = useRoute()

    return {
      route,
      menu
    }
  }
})
</script>

<style>
</style>
