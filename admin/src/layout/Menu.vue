<template>
  <el-menu
    router
    mode="vertical"
    :collapse="isCollapse"
    :default-active="route.path"
    background-color="#2d4155"
    text-color="#bdcbd9"
    active-text-color="#2b9dfb"
  >
    <template v-for="(item, index) in router.options.routes">
      <template v-if="item.name && item.children">
        <el-submenu :key="`menu-item-${index}`" :index="`menu-item-${index}`">
          <template #title>
            <i :class="item.meta.icon"></i>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(subItem, subIndex) in item.children"
            :index="subItem.path"
            :key="`menu-iten-${index}-${subIndex}`"
          >
            <i v-if="subItem.meta" :class="subItem.meta.icon"></i>
            <span>{{ subItem.name }}</span>
          </el-menu-item>
        </el-submenu>
      </template>

      <template v-else-if="!item.meta.hidden">
        <el-menu-item :key="`menu-item-${index}`" :index="item.path">
          <i :class="item.children[0].meta.icon"></i>
          <span>{{ item.children[0].name }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const menu = {
  items: [
    { title: '首页', icon: 'el-icon-s-home', path: '/' },
    {
      title: '内容管理',
      items: [
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
  name: 'Menu',
  setup() {
    const route = useRoute()
    const router = useRouter()
    console.log(router.options.routes)

    const isCollapse = ref(false)
    return {
      isCollapse,
      route,
      menu,
      router
    }
  }
})
</script>

<style>
.el-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>
