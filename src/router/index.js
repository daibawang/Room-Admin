import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/examine',
    component: Layout,
    redirect: '/examine/waiting',
    name: 'Examine',
    meta: { title: '申请审批', icon: 'component' },
    children: [
      {
        path: 'waiting',
        component: () => import('@/views/examine/waiting/index'), // Parent router-view
        name: 'waiting',
        meta: { title: '待审批记录', icon: 'record' },
        // children: [
        //   {
        //     path: 'StayApprovalFirst',
        //     component: () => import('@/views/examine/E1-StayApproval/StayApprovalFirst'),
        //     name: 'StayApprovalFirst',
        //     meta: { title: '初审' }
        //   },
        //   {
        //     path: 'StayApprovalMore',
        //     component: () => import('@/views/examine/E1-StayApproval/StayApprovalMore'),
        //     name: 'StayApprovalMore',
        //     meta: { title: '再审' }
        //   }
        // ]
      },
      {
        path: 'pass',
        component: () => import('@/views/examine/pass/index'),
        name: 'pass',
        meta: { title: '已通过审批', icon: 'true' }
      },
      {
        path: 'nopass',
        component: () => import('@/views/examine/nopass/index'),
        name: 'nopass',
        meta: { title: '未通过审批', icon: 'false' }
      }
    ]
  },
  {
    path: '/status',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'status',
        component: () => import('@/views/status/index'),
        meta: { title: '教室占用状态', icon: 'example' }
      }
    ]
  },
  // {
  //   path: '/settime',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'settime',
  //       component: () => import('@/views/settime/index'),
  //       meta: { title: '教室借用设置', icon: 'set' }
  //     }
  //   ]
  // },
  {
    path: '/set',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'set',
        component: () => import('@/views/set/index'),
        meta: { title: '课表录入', icon: 'import' }
      }
    ]
  },
  {
    path: '/chart',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'chart',
        component: () => import('@/views/chart/index'),
        meta: { title: '数据分析', icon: 'chart' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
