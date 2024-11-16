<template>
  <n-popover trigger="click" :width="300" placement="bottom-end">
    <template #trigger>
      <n-badge :value="unreadCount" :max="99" :dot="unreadCount > 0">
        <n-button quaternary circle>
          <template #icon>
            <n-icon><notifications-outline /></n-icon>
          </template>
        </n-button>
      </n-badge>
    </template>

    <div class="notification-popover">
      <div class="notification-header">
        <n-space justify="space-between">
          <n-text>通知</n-text>
          <n-space>
            <n-button text size="small" @click="handleMarkAllAsRead">
              全部已读
            </n-button>
            <n-button text size="small" @click="handleClearAll">
              清空
            </n-button>
          </n-space>
        </n-space>
      </div>
      <n-scrollbar style="max-height: 400px">
        <div v-if="notifications.length" class="notification-list">
          <div
            v-for="item in notifications"
            :key="item.id"
            class="notification-item"
            :class="{ 'notification-item-unread': !item.read }"
            @click="handleClick(item)"
          >
            <n-space align="start" :size="12">
              <n-tag :type="getTagType(item.type)" size="small" round>
                {{ getTypeText(item.type) }}
              </n-tag>
              <div class="notification-content">
                <div class="notification-title">{{ item.title }}</div>
                <div class="notification-text">{{ item.content }}</div>
                <div class="notification-time">{{ item.time }}</div>
              </div>
            </n-space>
          </div>
        </div>
        <n-empty v-else description="暂无通知" />
      </n-scrollbar>
    </div>
  </n-popover>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { 
  NPopover, NBadge, NButton, NIcon, NSpace, 
  NText, NScrollbar, NTag, NEmpty 
} from 'naive-ui'
import { NotificationsOutline } from '@vicons/ionicons5'
import { useNotificationStore } from '../stores/notification'

const notificationStore = useNotificationStore()

const notifications = computed(() => notificationStore.notifications)
const unreadCount = computed(() => notificationStore.unreadCount)

const handleClick = (notification: any) => {
  notificationStore.markAsRead(notification.id)
}

const handleMarkAllAsRead = () => {
  notificationStore.markAllAsRead()
}

const handleClearAll = () => {
  notificationStore.clearAll()
}

type TagType = 'default' | 'error' | 'success' | 'info' | 'warning' | 'primary'

const getTagType = (type: string): TagType => {
  const typeMap: Record<string, TagType> = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error'
  }
  return typeMap[type] || 'default'
}

const getTypeText = (type: string) => {
  const typeMap: Record<string, string> = {
    info: '消息',
    success: '成功',
    warning: '警告',
    error: '错误'
  }
  return typeMap[type] || '通知'
}
</script>

<style scoped>
.notification-popover {
  padding: 12px 0;
  transition: all var(--transition-duration) var(--transition-timing);
}

.notification-header {
  padding: 0 16px 12px;
  border-bottom: 1px solid var(--border-color);
  transition: border-color var(--transition-duration) var(--transition-timing);
}

.notification-list {
  padding: 8px 0;
}

.notification-item {
  padding: 12px 16px;
  cursor: pointer;
  transition: all var(--transition-duration) var(--transition-timing);
}

.notification-item:hover {
  background-color: var(--hover-color);
}

.notification-item-unread {
  background-color: var(--n-color-hover);
}

.notification-item-unread:hover {
  background-color: var(--n-color-active);
}

.notification-content {
  flex: 1;
}

.notification-title {
  font-weight: 500;
  margin-bottom: 4px;
  color: var(--text-color);
  transition: color var(--transition-duration) var(--transition-timing);
}

.notification-text {
  color: var(--text-color-2);
  font-size: 13px;
  margin-bottom: 4px;
  transition: color var(--transition-duration) var(--transition-timing);
}

.notification-time {
  color: var(--text-color-3);
  font-size: 12px;
  transition: color var(--transition-duration) var(--transition-timing);
}

:deep(.n-popover) {
  transition: all var(--transition-duration) var(--transition-timing);
}

:deep(.n-tag) {
  transition: all var(--transition-duration) var(--transition-timing);
}
</style> 