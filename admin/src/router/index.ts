import { createWebHistory, createRouter } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../layout/index.vue'
import CourseList from '../views/courses/CourseList.vue'
import EpisodeList from '../views/episodes/EpisodeList.vue'
import CourseEdit from '../views/courses/CourseEdit.vue'

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
      component: Layout,
      meta: { hidden: false },
      children: [
        { name: '首页', path: '/', meta: { icon: 'el-icon-s-home' }, component: Home }
      ]
    },
    {
      path: '/',
      name: '课程管理',
      component: Layout,
      meta: { hidden: false, icon: 'el-icon-notebook-2' },
      children: [
        { name: '课程管理', path: '/courses/list', component: CourseList, meta: { icon: 'el-icon-reading' } },
        { name: '课时管理', path: '/episodes/list', component: EpisodeList, meta: { icon: 'el-icon-document-add' } }
      ]
    }
  ]
})

export default router
