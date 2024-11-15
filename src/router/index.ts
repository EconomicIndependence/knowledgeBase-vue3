import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { 
  HomeOutline, DocumentsOutline, ImageOutline,
  DocumentTextOutline, DownloadOutline, PersonOutline,
  SettingsOutline, SearchOutline, StarOutline, TimeOutline
} from '@vicons/ionicons5'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/BasicLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/dashboard/index.vue'),
        meta: { 
          title: '首页',
          icon: HomeOutline
        }
      },
      {
        path: 'files',
        name: 'Files',
        component: () => import('../views/files/index.vue'),
        redirect: '/files/images',
        meta: { 
          title: '文件管理',
          icon: DocumentsOutline
        },
        children: [
          {
            path: 'images',
            name: 'Images',
            component: () => import('../views/files/images.vue'),
            meta: { 
              title: '图片文件',
              icon: ImageOutline
            }
          },
          {
            path: 'documents',
            name: 'Documents',
            component: () => import('../views/files/documents.vue'),
            meta: { 
              title: '文档文件',
              icon: DocumentTextOutline
            }
          },
          {
            path: 'downloads',
            name: 'Downloads',
            component: () => import('../views/files/downloads.vue'),
            meta: { 
              title: '下载记录',
              icon: DownloadOutline
            }
          }
        ]
      },
      {
        path: 'favorites',
        name: 'Favorites',
        component: () => import('../views/files/index.vue'),
        redirect: '/favorites/recent',
        meta: { 
          title: '我的收藏',
          icon: StarOutline
        },
        children: [
          {
            path: 'recent',
            name: 'RecentFavorites',
            component: () => import('../views/favorites/recent.vue'),
            meta: { 
              title: '最近收藏',
              icon: TimeOutline
            }
          },
          {
            path: 'folders',
            name: 'FavoriteFolders',
            component: () => import('../views/favorites/folders.vue'),
            meta: { 
              title: '收藏文件夹',
              icon: DocumentsOutline
            }
          }
        ]
      },
      {
        path: 'search',
        name: 'Search',
        component: () => import('../views/files/index.vue'),
        redirect: '/search/fulltext',
        meta: { 
          title: '文件搜索',
          icon: SearchOutline
        },
        children: [
          {
            path: 'fulltext',
            name: 'FulltextSearch',
            component: () => import('../views/search/fulltext.vue'),
            meta: { 
              title: '全文搜索',
              icon: SearchOutline
            }
          },
          {
            path: 'advanced',
            name: 'AdvancedSearch',
            component: () => import('../views/search/advanced.vue'),
            meta: { 
              title: '高级搜索',
              icon: SearchOutline
            }
          },
          {
            path: 'history',
            name: 'SearchHistory',
            component: () => import('../views/search/history.vue'),
            meta: { 
              title: '搜索历史',
              icon: TimeOutline
            }
          }
        ]
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/profile/index.vue'),
        meta: {
          title: '个人信息',
          icon: PersonOutline
        }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/settings/index.vue'),
        meta: {
          title: '系统设置',
          icon: SettingsOutline
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
    meta: { title: '登录' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta?.title ? `${to.meta.title} - 文件管理系统` : '文件管理系统'
  
  // 获取登录状态
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  
  // 如果要去登录页
  if (to.path === '/login') {
    if (isLoggedIn) {
      // 已登录则跳转到首页
      next('/dashboard')
    } else {
      // 未登录则允许访问登录页
      next()
    }
  } else {
    // 如果要去其他页面
    if (!isLoggedIn) {
      // 未登录则跳转到登录页
      next('/login')
    } else {
      // 已登录则允许访问
      next()
    }
  }
})

export default router 