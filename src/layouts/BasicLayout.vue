<template>
  <n-layout has-sider class="layout-container">
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      :inverted="inverted"
      class="layout-sider"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <div class="logo" @click="router.push('/')">
        <n-icon size="32" :depth="inverted ? 2 : 3">
          <cloud-outline />
        </n-icon>
        <h1 v-if="!collapsed" class="logo-text">文件管理系统</h1>
      </div>
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :inverted="inverted"
        @update:value="handleMenuClick"
      />
      <div class="sider-footer" v-if="!collapsed">
        <n-space vertical :size="12">
          <n-button 
            quaternary 
            circle 
            @click="toggleTheme"
          >
            <template #icon>
              <n-icon>
                <component :is="inverted ? 'sunny-outline' : 'moon-outline'" />
              </n-icon>
            </template>
          </n-button>
        </n-space>
      </div>
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered class="layout-header">
        <div class="header-content">
          <div class="header-left">
            <n-breadcrumb>
              <n-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
                {{ item.title }}
              </n-breadcrumb-item>
            </n-breadcrumb>
          </div>
          <div class="header-right">
            <n-space :size="16">
              <n-badge dot>
                <n-button quaternary circle>
                  <template #icon>
                    <n-icon><notifications-outline /></n-icon>
                  </template>
                </n-button>
              </n-badge>
              <n-dropdown 
                :options="userOptions" 
                @select="handleUserSelect" 
                trigger="click"
                :show-arrow="true"
              >
                <n-button quaternary style="padding: 8px">
                  <n-space align="center">
                    <n-avatar 
                      round 
                      size="small" 
                      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                    />
                    <span>Admin</span>
                    <n-icon><chevron-down /></n-icon>
                  </n-space>
                </n-button>
              </n-dropdown>
            </n-space>
          </div>
        </div>
      </n-layout-header>
      <tabs-view />
      <n-layout-content class="layout-content">
        <n-scrollbar trigger="none">
          <div class="content-container">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </n-scrollbar>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { 
  NLayout, NLayoutSider, NLayoutHeader, NLayoutContent, 
  NMenu, NDropdown, NAvatar, NIcon, NSpace, NButton,
  NBreadcrumb, NBreadcrumbItem, NBadge, NScrollbar,
  useDialog, useMessage
} from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { renderIcon } from '../utils'
import { 
  HomeOutline, DocumentsOutline, SettingsOutline,
  SearchOutline, StarOutline, ImageOutline,
  DocumentTextOutline, DownloadOutline, TimeOutline,
  CloudOutline, NotificationsOutline, ChevronDown,
  SunnyOutline, MoonOutline, PersonOutline, LogOutOutline
} from '@vicons/ionicons5'
import TabsView from '../components/TabsView.vue'

const router = useRouter()
const route = useRoute()
const collapsed = ref(false)
const inverted = ref(false)
const dialog = useDialog()
const message = useMessage()

// 面包屑导航
const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(Boolean)
  return paths.map((path, index) => {
    const fullPath = '/' + paths.slice(0, index + 1).join('/')
    return {
      path: fullPath,
      title: menuMap[path] || path
    }
  })
})

const menuMap: Record<string, string> = {
  dashboard: '首页',
  files: '文件管理',
  images: '图片文件',
  documents: '文档文件',
  downloads: '下载记录',
  favorites: '我的收藏',
  recent: '最近收藏',
  folders: '收藏文件夹',
  search: '文件搜索',
  fulltext: '全文搜索',
  advanced: '高级搜索',
  history: '搜索历史',
  settings: '系统设置'
}

const menuOptions: MenuOption[] = [
  {
    label: '首页',
    key: 'dashboard',
    icon: renderIcon(HomeOutline)
  },
  {
    label: '文件管理',
    key: 'files',
    icon: renderIcon(DocumentsOutline),
    children: [
      {
        label: '图片文件',
        key: 'files/images',
        icon: renderIcon(ImageOutline)
      },
      {
        label: '文档文件',
        key: 'files/documents',
        icon: renderIcon(DocumentTextOutline)
      },
      {
        label: '下载记录',
        key: 'files/downloads',
        icon: renderIcon(DownloadOutline)
      }
    ]
  },
  {
    label: '我的收藏',
    key: 'favorites',
    icon: renderIcon(StarOutline),
    children: [
      {
        label: '最近收藏',
        key: 'favorites/recent',
        icon: renderIcon(TimeOutline)
      },
      {
        label: '收藏文件夹',
        key: 'favorites/folders',
        icon: renderIcon(DocumentsOutline)
      }
    ]
  },
  {
    label: '文件搜索',
    key: 'search',
    icon: renderIcon(SearchOutline),
    children: [
      {
        label: '全文搜索',
        key: 'search/fulltext',
        icon: renderIcon(SearchOutline)
      },
      {
        label: '高级搜索',
        key: 'search/advanced',
        icon: renderIcon(SearchOutline)
      },
      {
        label: '搜索历史',
        key: 'search/history',
        icon: renderIcon(TimeOutline)
      }
    ]
  },
  {
    label: '系统设置',
    key: 'settings',
    icon: renderIcon(SettingsOutline)
  }
]

const handleMenuClick = (key: string) => {
  router.push(`/${key}`)
}

const userOptions = [
  {
    label: '个人信息',
    key: 'profile',
    icon: renderIcon(PersonOutline)
  },
  {
    label: '系统设置',
    key: 'settings',
    icon: renderIcon(SettingsOutline)
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogOutOutline)
  }
]

const handleUserSelect = (key: string) => {
  switch (key) {
    case 'profile':
      router.push('/profile')
      break
    case 'settings':
      router.push('/settings')
      break
    case 'logout':
      dialog.warning({
        title: '确认退出',
        content: '是否确认退出登录？',
        positiveText: '确认',
        negativeText: '取消',
        onPositiveClick: () => {
          // 清除登录状态
          localStorage.removeItem('isLoggedIn')
          message.success('已退出登录')
          // 跳转到登录页
          router.push('/login')
        }
      })
      break
  }
}

const toggleTheme = () => {
  inverted.value = !inverted.value
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.layout-sider {
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.06);
  position: relative;
}

.logo {
  height: 64px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.logo:hover {
  background: rgba(0, 0, 0, 0.06);
}

.logo-text {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.layout-header {
  height: 64px;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.header-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.layout-content {
  padding: 0 16px 16px;
  background: #f5f7f9;
}

.content-container {
  min-height: calc(100vh - 96px);
  padding: 16px;
}

.sider-footer {
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}

/* 添加过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.n-dropdown-option {
  padding: 8px 16px !important;
}

.n-button:hover {
  background-color: rgba(0, 0, 0, 0.06);
}
</style> 