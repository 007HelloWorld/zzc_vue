import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index.vue'
Vue.use(Router)

export const constantRouterMap = []
export const asyncRouterMap = [
  {
    path: '/',
    redirect: '/legalSystem/contract/template',
    meta: {
      public: true,
      hidden: true
    }
  },
  {
    path: '/legalSystem/contract/type',
    name: 'type',
    component: () => import('@/views/legalSystem/contract/type/index.vue'),
    meta: {
      title: '合同类型管理',
      public: true
    }
  },
  {
    path: '/legalSystem/contract/template',
    name: 'template',
    component: () => import('@/views/legalSystem/contract/template/index.vue'),
    meta: {
      title: '合同类型管理',
      public: true
    }
  },
  {
    path: '/legalSystem/contract/useTemplate',
    name: 'useTemplate',
    component: () => import('@/views/legalSystem/contract/useTemplate/index.vue'),
    meta: {
      title: '合同类型管理',
      public: true
    }
  },
  {
    path: '/legalSystem/contract/use',
    name: 'use',
    component: () => import('@/views/legalSystem/contract/use/index.vue'),
    meta: {
      title: '合同类型管理',
      public: true
    }
  },
  {
    path: '/legalSystem/litigation/nonProperty',
    name: 'nonProperty',
    component: () => import('@/views/legalSystem/litigation/nonProperty/index.vue'),
    meta: {
      title: '非物业费诉讼列表',
      public: true
    }
  },
  {
    path: '',
    component: Layout,
    meta: {
      public: true,
      hidden: true
    },
    children: [
      {
        path: '*',
        name: '404',
        component: () => import('@/views/common/404.vue'),
        meta: {
          title: '404',
          public: true,
          hidden: true
        }
      }
    ]
  }
]
const createRouter = () =>
  new Router({
    base: process.env.VUE_APP_BASE_URL || '/',
    mode: 'history',
    routes: [...constantRouterMap, ...asyncRouterMap]
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// 解决ElementUI导航中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export default router
