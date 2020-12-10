import { createWebHistory, createRouter } from 'vue-router'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import CourseList from './views/courses/CourseList.vue'
import CourseEdit from './views/courses/CourseEdit.vue'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/login',
      name: '登录',
      meta: { hidden: true },
      component: Home
    },
    {
      path: '/',
      component: Main,
      meta: { hidden: false },
      children: [
        { name: '首页', path: '/', meta: { icon: 'el-icon-s-home' }, component: Home }
      ]
    },
    {
      path: '/',
      name: '课程管理',
      component: Main,
      meta: { hidden: false, icon: 'el-icon-notebook-2' },
      children: [
        { name: '课程列表', path: '/courses/list', component: CourseList, meta: { icon: 'el-icon-reading' } },
        { name: '新增课程', path: '/courses/create', component: CourseEdit, meta: { icon: 'el-icon-document-add' } },
        { name: '修改课程', path: '/courses/edit/:id', component: CourseEdit, props: true, meta: { icon: 'el-icon-edit' } }
      ]
    }
  ]
})

export default router
