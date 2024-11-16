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

/* 统一过渡时间和缓动函数 */
:root {
  --transition-duration: 0.3s;
  --transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 优化全局主题切换过渡 */
* {
  transition: 
    color var(--transition-duration) var(--transition-timing),
    background-color var(--transition-duration) var(--transition-timing),
    border-color var(--transition-duration) var(--transition-timing),
    box-shadow var(--transition-duration) var(--transition-timing);
}

/* 优化布局相关元素的过渡 */
.n-layout,
.n-layout-sider,
.n-layout-content,
.n-card,
.tabs-view {
  transition: 
    all var(--transition-duration) var(--transition-timing) !important;
}

/* 确保背景色过渡优先级 */
body,
.layout-container,
.layout-content,
.content-container {
  transition: 
    background-color var(--transition-duration) var(--transition-timing) !important;
}

/* 优化深色主题样式和过渡 */
:root {
  --background-color: #ffffff;
  --text-color: #333333;
  --border-color: #eee;
  --hover-color: #f5f5f5;
  --shadow-color: rgba(0, 0, 0, 0.1);
  transition: all var(--transition-duration) var(--transition-timing);
}

:root.dark {
  --background-color: #18181c;
  --text-color: #ffffff;
  --border-color: #333;
  --hover-color: #242424;
  --shadow-color: rgba(0, 0, 0, 0.2);
  --selection-background: #3366ff40;
  --selection-text: #ffffff;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
}

/* 添加内容过渡动画 */
.content-fade-enter-active,
.content-fade-leave-active {
  transition: opacity 0.3s ease;
}

.content-fade-enter-from,
.content-fade-leave-to {
  opacity: 0;
}

/* 添加全局选中样式 */
::selection {
  background-color: var(--selection-background, #2080f040);
  color: var(--selection-text, #000000);
}

::-moz-selection {
  background-color: var(--selection-background, #2080f040);
  color: var(--selection-text, #000000);
}

/* 优化深色主题下的文本可读性 */
:root.dark * {
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
}

/* 优化深色主题下的交互反馈 */
:root.dark .n-button:not(.n-button--disabled):active,
:root.dark .n-tag:not(.n-tag--disabled):active,
:root.dark .tab-item:active {
  transform: scale(0.98);
}
</style> 