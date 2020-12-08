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
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: '/', name: 'home', component: Home },
        { path: '/courses/list', name: 'courses-list', component: CourseList },
        { path: '/courses/edit/:id', name: 'courses-edit', component: CourseEdit, props: true },
        { path: '/courses/create', name: 'courses-create', component: CourseEdit }
      ]
    }
  ]
})

export default router
