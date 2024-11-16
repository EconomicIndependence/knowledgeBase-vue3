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

const getTagType = (type: string) => {
  const typeMap: Record<string, string> = {
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
}

.notification-header {
  padding: 0 16px 12px;
  border-bottom: 1px solid #f0f0f0;
}

.notification-list {
  padding: 8px 0;
}

.notification-item {
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.notification-item:hover {
  background-color: #f5f5f5;
}

.notification-item-unread {
  background-color: #f0f7ff;
}

.notification-item-unread:hover {
  background-color: #e6f4ff;
}

.notification-content {
  flex: 1;
}

.notification-title {
  font-weight: 500;
  margin-bottom: 4px;
}

.notification-text {
  color: #666;
  font-size: 13px;
  margin-bottom: 4px;
}

.notification-time {
  color: #999;
  font-size: 12px;
}
</style> 