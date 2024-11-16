<template>
  <div class="tabs-view">
    <n-scrollbar x-scrollable class="tabs-scrollbar">
      <div class="tabs-wrapper">
        <n-tag
          v-for="tag in visitedTags"
          :key="tag.path"
          :type="isActive(tag) ? 'primary' : 'default'"
          :closable="tag.path !== '/dashboard'"
          class="tab-item"
          :class="{ 'tab-item-active': isActive(tag) }"
          @close.stop="closeTag(tag)"
          @click="goToPage(tag)"
        >
          <template #icon>
            <n-icon :component="tag.icon || HomeOutline" />
          </template>
          {{ tag.title }}
        </n-tag>
      </div>
    </n-scrollbar>
    <div class="tabs-action">
      <n-dropdown 
        trigger="click" 
        :options="dropdownOptions"
        @select="handleSelect"
      >
        <n-button quaternary circle size="small" class="action-button">
          <template #icon>
            <n-icon><settings-outline /></n-icon>
          </template>
        </n-button>
      </n-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Component } from 'vue'
import { NTag, NScrollbar, NButton, NDropdown, NIcon, type DropdownOption } from 'naive-ui'
import { HomeOutline, SettingsOutline } from '@vicons/ionicons5'
import { useThemeStore } from '@/stores/theme'

interface TagView {
  title: string
  path: string
  name?: string
  icon?: Component
  meta?: {
    title?: string
    icon?: Component
  }
}

const router = useRouter()
const route = useRoute()
const themeStore = useThemeStore()

const visitedTags = ref<TagView[]>([
  {
    title: '首页',
    path: '/dashboard',
    icon: HomeOutline
  }
])

const isActive = (tag: TagView): boolean => {
  return tag.path === route.path
}

const addTag = (tag: TagView): void => {
  if (!visitedTags.value.find((v: TagView) => v.path === tag.path)) {
    visitedTags.value.push(tag)
  }
}

const closeTag = (tag: TagView): void => {
  const index = visitedTags.value.findIndex((v: TagView) => v.path === tag.path)
  if (isActive(tag) && index > 0) {
    router.push(visitedTags.value[index - 1].path)
  }
  visitedTags.value = visitedTags.value.filter((v: TagView) => v.path !== tag.path)
}

const goToPage = (tag: TagView): void => {
  router.push(tag.path)
}

const dropdownOptions: DropdownOption[] = [
  {
    label: '关闭其他',
    key: 'closeOthers'
  },
  {
    label: '关闭右侧',
    key: 'closeRight'
  },
  {
    label: '关闭所有',
    key: 'closeAll'
  }
]

const handleSelect = (key: string): void => {
  switch (key) {
    case 'closeOthers':
      visitedTags.value = visitedTags.value.filter(
        (tag: TagView) => tag.path === '/dashboard' || tag.path === route.path
      )
      break
    case 'closeRight':
      const currentIndex = visitedTags.value.findIndex((tag: TagView) => tag.path === route.path)
      visitedTags.value = visitedTags.value.slice(0, currentIndex + 1)
      break
    case 'closeAll':
      visitedTags.value = visitedTags.value.filter((tag: TagView) => tag.path === '/dashboard')
      router.push('/dashboard')
      break
  }
}

// 监听路由变化，添加标签
watch(
  () => route.path,
  (newPath: string) => {
    if (route.meta?.title) {
      addTag({
        title: route.meta.title as string,
        path: newPath,
        name: route.name as string,
        icon: route.meta.icon as Component
      })
    }
  },
  { immediate: true }
)

// 在 script setup 中导出 visitedTags
defineExpose({
  visitedTags
})
</script>

<style scoped>
.tabs-view {
  height: 40px;
  background: var(--n-color);
  border-top: 1px solid var(--n-border-color);
  border-bottom: 1px solid var(--n-border-color);
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.tabs-scrollbar {
  flex: 1;
  height: 100%;
}

.tabs-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 8px;
}

.tab-item {
  margin-right: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 6px 10px;
  transition: all 0.3s;
  border-radius: 4px;
  background: transparent;
  border: 1px solid var(--n-border-color);
  color: var(--n-text-color);
}

.tab-item:hover {
  background-color: var(--n-hover-color);
  transform: translateY(-1px);
}

.tab-item-active {
  background-color: var(--n-primary-color-hover) !important;
  border-color: var(--n-primary-color);
  color: var(--n-primary-color);
}

.tab-item-active:hover {
  background-color: var(--n-primary-color-suppl) !important;
}

.tabs-action {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
}

.action-button {
  transition: all 0.3s;
}

.action-button:hover {
  background-color: #f3f4f6;
  transform: rotate(30deg);
}

:deep(.n-tag) {
  border-radius: 4px;
  height: 28px;
  background-color: var(--n-color);
  border-color: var(--n-border-color);
}

:deep(.n-tag.n-tag--primary) {
  background-color: var(--n-primary-color-hover);
  border-color: var(--n-primary-color);
  color: var(--n-primary-color);
}

:deep(.n-tag__close) {
  border-radius: 50%;
  margin-left: 6px;
  transition: all 0.3s;
  color: var(--n-text-color);
}

:deep(.n-tag__close:hover) {
  background-color: var(--n-primary-color-hover);
  color: var(--n-primary-color);
}

:deep(.n-scrollbar-rail.n-scrollbar-rail--horizontal) {
  height: 4px;
  border-radius: 2px;
}

:deep(.n-scrollbar-rail) {
  background-color: transparent;
}

:deep(.n-scrollbar-rail:hover) {
  background-color: rgba(0, 0, 0, 0.05);
}

:deep(.n-scrollbar-content) {
  padding: 6px 0;
}

/* 添加标签切换动画 */
.tab-item {
  animation: tab-in 0.3s ease-out;
}

@keyframes tab-in {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style> 