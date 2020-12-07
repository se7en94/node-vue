import { createWebHistory, createRouter } from 'vue-router'
import Home from './views/Main.vue'
import CourseList from './views/courses/CourseList.vue'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/courses/list',
      name: 'courseList',
      component: CourseList
    }
  ]
})

export default router
