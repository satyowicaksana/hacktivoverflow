import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/users/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/users/signup',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/questions/ask',
    name: 'ask',
    component: () => import('../views/Ask.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/users/signup')
      }
    }
  },
  {
    path: '/users',
    name: 'profile',
    component: () => import('../views/Profile.vue'),
    children: [
      {
        path: '/users/update/question/:id',
        name: 'updateQuestion',
        component: () => import('../components/UpdateQuestion.vue')
      },
      {
        path: '/users/update/answer/:id',
        name: 'updateAnswer',
        component: () => import('../components/UpdateAnswer.vue')
      }
    ],
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/users/signup')
      }
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/questions',
        name: 'questions',
        component: () => import('../views/Questions.vue')
      },
      {
        path: '/questions/random',
        name: 'questions-random',
        component: () => import('../views/RandomQuestions.vue')
      },
      {
        path: '/questions/:id',
        name: 'questionDetail',
        component: () => import('../views/QuestionDetail.vue')
      },
      {
        path: '/questions/tagged/:tag',
        name: 'questions-tagged',
        component: () => import('../views/Questions.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'main',
    component: Main
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
