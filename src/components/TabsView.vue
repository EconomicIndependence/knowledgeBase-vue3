<template>
  <div class="tabs-view">
    <div class="tabs-wrapper">
      <div
        v-for="tab in tabs"
        :key="tab.path"
        class="tab-item"
        :class="{ 'tab-item-active': isActive(tab.path) }"
        @click="handleTabClick(tab)"
      >
        <n-space align="center" :size="4">
          <n-icon size="16">
            <component :is="tab.icon || DocumentTextOutline" />
          </n-icon>
          <span class="tab-text">{{ tab.title }}</span>
          <div
            v-if="tabs.length > 1"
            class="close-button"
            @click.stop="handleClose(tab)"
          >
            <n-icon size="14">
              <close-outline />
            </n-icon>
          </div>
        </n-space>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NSpace, NIcon } from 'naive-ui'
import { DocumentTextOutline, CloseOutline } from '@vicons/ionicons5'
import type { Component } from 'vue'

interface Tab {
  path: string
  title: string
  icon?: Component
}

// 标签页数据
const tabs = ref<Tab[]>([])
const route = useRoute()
const router = useRouter()

// 判断标签页是否激活
const isActive = (path: string) => {
  return route.path === path
}

// 处理标签页点击
const handleTabClick = (tab: Tab) => {
  if (route.path !== tab.path) {
    router.push(tab.path)
  }
}

// 处理关闭标签页
const handleClose = async (tab: Tab) => {
  const index = tabs.value.findIndex(t => t.path === tab.path)
  if (index > -1) {
    if (isActive(tab.path)) {
      // 如果关闭的是当前标签页，先跳转到其他标签页
      const nextTab = tabs.value[index + 1] || tabs.value[index - 1]
      if (nextTab) {
        await router.push(nextTab.path)
      }
    }
    // 然后移除标签页
    tabs.value.splice(index, 1)
  }
}

// 监听路由变化，添加标签页
watch(
  () => route.path,
  (newPath) => {
    const existTab = tabs.value.find(tab => tab.path === newPath)
    if (!existTab) {
      tabs.value.push({
        path: newPath,
        title: route.meta.title as string || '未命名',
        icon: route.meta.icon
      })
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.tabs-view {
  height: 44px;
  background: var(--n-color);
  border-bottom: 1px solid var(--n-border-color);
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  transition: all var(--transition-duration) var(--transition-timing);
}

.tabs-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tabs-wrapper::-webkit-scrollbar {
  display: none;
}

.tab-item {
  height: 36px;
  padding: 0 12px;
  margin-right: 6px;
  border-radius: 8px;
  background: var(--n-color);
  border: 1px solid rgba(0, 0, 0, 0.15);
  color: var(--n-text-color-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all var(--transition-duration) var(--transition-timing);
  position: relative;
}

.tab-item:hover {
  color: var(--n-primary-color);
  border-color: var(--n-primary-color);
  background: var(--n-color);
  transform: translateY(-1px);
}

.tab-item-active {
  color: var(--n-primary-color);
  background: var(--n-color);
  border-color: var(--n-primary-color);
  font-weight: 500;
}

.tab-item-active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--n-primary-color);
}

.tab-text {
  margin: 0 6px;
  font-size: 14px;
  transition: all 0.3s ease;
  white-space: nowrap;
  color: inherit;
}

.tab-item-active .tab-text {
  opacity: 1;
  color: var(--n-primary-color);
}

.close-button {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-left: 4px;
  color: var(--n-text-color-2);
  opacity: 0.8;
  transition: all var(--transition-duration) var(--transition-timing);
  cursor: pointer;
}

.close-button:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.1);
  transform: rotate(90deg);
}

.tab-item-active .close-button {
  color: var(--n-primary-color);
}

/* 深色主题适配 */
:deep(.dark) .tab-item {
  border-color: rgba(255, 255, 255, 0.15);
}

:deep(.dark) .close-button:hover {
  background: rgba(255, 255, 255, 0.15);
}

/* 添加滚动阴影 */
.tabs-wrapper::before,
.tabs-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  width: 30px;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tabs-wrapper::before {
  left: 0;
  background: linear-gradient(to right, var(--n-color), transparent);
}

.tabs-wrapper::after {
  right: 0;
  background: linear-gradient(to left, var(--n-color), transparent);
}

.tabs-wrapper:hover::before,
.tabs-wrapper:hover::after {
  opacity: 1;
}

/* 添加动画效果 */
.tab-enter-active,
.tab-leave-active {
  transition: all 0.3s ease;
}

.tab-enter-from,
.tab-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style> 