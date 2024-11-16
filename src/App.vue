<template>
  <n-config-provider :theme="themeStore.theme" :theme-overrides="themeStore.themeOverrides">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import {
  NConfigProvider,
  NLoadingBarProvider,
  NDialogProvider,
  NNotificationProvider,
  NMessageProvider
} from 'naive-ui'
import { useThemeStore } from '@/stores/theme'
import { onMounted } from 'vue'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#app {
  height: 100%;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 统一过渡变量 */
:root {
  --transition-duration: 300ms;
  --transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
  --transition: var(--transition-duration) var(--transition-timing);
}

/* 主题过渡类 */
.theme-transitioning,
.theme-transitioning * {
  transition: 
    color var(--transition-duration) var(--transition-timing),
    background-color var(--transition-duration) var(--transition-timing),
    border-color var(--transition-duration) var(--transition-timing),
    box-shadow var(--transition-duration) var(--transition-timing),
    fill var(--transition-duration) var(--transition-timing) !important;
}

/* 确保背景色过渡优先级 */
.theme-transitioning .n-config-provider,
.theme-transitioning .n-layout,
.theme-transitioning .n-layout-sider,
.theme-transitioning .n-layout-header,
.theme-transitioning .n-layout-content,
.theme-transitioning .n-card,
.theme-transitioning .content-container {
  transition: background-color var(--transition-duration) var(--transition-timing) !important;
}

/* 移除不需要过渡的元素 */
.theme-transitioning .n-base-select-menu,
.theme-transitioning .n-dropdown-menu,
.theme-transitioning .n-popover,
.theme-transitioning .n-menu-item-content-header,
.theme-transitioning [class*='__transition'],
.theme-transitioning [class*='n-base-wave'] {
  transition: none !important;
}

/* 路由过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-duration) var(--transition-timing);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 深色主题变量 */
:root.dark {
  color-scheme: dark;
}

/* 优化滚动条过渡 */
::-webkit-scrollbar,
::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  transition: all var(--transition-duration) var(--transition-timing);
}
</style> 