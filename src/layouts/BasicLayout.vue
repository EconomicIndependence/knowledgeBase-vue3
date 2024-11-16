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
        <n-icon size="24" :depth="inverted ? 2 : 3" class="logo-icon">
          <menu-outline />
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
            <n-space :size="16" align="center">
              <notification-popover />
              <n-dropdown 
                :options="userOptions" 
                @select="handleUserSelect" 
                trigger="click"
                placement="bottom-end"
              >
                <div class="user-info">
                  <n-avatar
                    v-if="userInfo?.avatar"
                    :src="userInfo.avatar"
                    round
                  />
                  <span>{{ userInfo?.username || 'Admin' }}</span>
                </div>
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
import { ref, computed, watch } from 'vue'
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
  SunnyOutline, MoonOutline, PersonOutline, LogOutOutline,
  MenuOutline
} from '@vicons/ionicons5'
import TabsView from '../components/TabsView.vue'
import NotificationPopover from '../components/NotificationPopover.vue'
import { useThemeStore } from '../stores/theme'
import { useUserStore } from '@/store/modules/user'

const router = useRouter()
const route = useRoute()
const collapsed = ref(false)
const inverted = ref(false)
const dialog = useDialog()
const message = useMessage()
const themeStore = useThemeStore()
const showUserDropdown = ref(false)
const userAvatar = 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
const userStore = useUserStore()

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

// 使用计算属性获取用户信息
const userInfo = computed(() => userStore.userInfo)

// 使用 ref 而不是 computed 来管理用户选项
const userOptions = ref([
  {
    label: userInfo.value?.username || 'Admin',
    key: 'header',
    disabled: true
  },
  {
    label: '个人资料',
    key: 'profile'
  },
  {
    label: '退出登录',
    key: 'logout'
  }
])

// 监听用户信息变化
watch(
  () => userStore.userInfo,
  (newUserInfo) => {
    if (newUserInfo) {
      // 更新用户选项
      userOptions.value = [
        {
          label: newUserInfo.username || 'Admin',
          key: 'header',
          disabled: true
        },
        {
          label: '个人资料',
          key: 'profile'
        },
        {
          label: '退出登录',
          key: 'logout'
        }
      ]
    }
  },
  { deep: true, immediate: true }
)

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
  themeStore.toggleTheme()
}
</script>

<style scoped>
/* 统一过渡变量 */
:root {
  --menu-transition-duration: 300ms;
  --menu-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
  --menu-transition: var(--menu-transition-duration) var(--menu-transition-timing);
}

/* 基础布局过渡 */
.layout-container {
  height: 100vh;
  background-color: var(--n-color);
  transition: all var(--menu-transition);
  display: flex;
  overflow: hidden;
}

/* 统一所有组件的过渡效果 */
.layout-sider,
.layout-header,
.layout-content,
.content-container,
.logo,
.logo-text,
:deep(.n-menu),
:deep(.n-menu-item),
:deep(.n-menu-item-content),
:deep(.n-icon),
:deep(.n-button),
:deep(.n-divider),
:deep([class*='n-border']),
:deep([class*='n-box-shadow']) {
  transition: 
    color var(--menu-transition),
    background-color var(--menu-transition),
    border-color var(--menu-transition),
    fill var(--menu-transition),
    box-shadow var(--menu-transition),
    opacity var(--menu-transition) !important;
}

/* 其他样式保持不变... */

/* 优化边框过渡 */
:deep(*) {
  transition-property: color, background-color, border-color, box-shadow, opacity;
  transition-duration: var(--menu-transition-duration);
  transition-timing-function: var(--menu-transition-timing);
}

/* 确保滚动条也有过渡效果 */
:deep(.n-scrollbar-rail) {
  transition: background-color var(--menu-transition) !important;
}

/* 优化阴影过渡 */
:deep([class*='shadow']) {
  transition: box-shadow var(--menu-transition) !important;
}

.header-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.layout-header {
  height: 64px;
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 100;
}

.layout-content {
  padding: 0 16px 16px;
  background-color: var(--n-color-modal);
  height: calc(100vh - 64px - 44px);
  overflow: auto;
  transition: background-color var(--transition) !important;
}

.content-container {
  min-height: 100%;
  padding: 16px;
  background-color: var(--n-color);
  position: relative;
  transition: background-color var(--transition) !important;
}

.logo {
  height: 64px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.logo:hover {
  background: rgba(0, 0, 0, 0.06);
}

.logo-icon {
  opacity: 0.8;
  transition: transform 0.3s ease;
}

.logo:hover .logo-icon {
  transform: scale(1.1);
}

.logo-text {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--text-color);
}

/* 确保所有背景过渡同步 */
:deep(.n-layout),
:deep(.n-layout-sider),
:deep(.n-layout-header),
:deep(.n-layout-content) {
  transition: background-color var(--transition) !important;
}
</style> 