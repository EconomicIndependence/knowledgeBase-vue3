import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Notification {
  id: number
  title: string
  content: string
  time: string
  read: boolean
  type: 'info' | 'success' | 'warning' | 'error'
}

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([
    {
      id: 1,
      title: '系统通知',
      content: '您有新的文件上传完成',
      time: '2023-11-15 14:30',
      read: false,
      type: 'success'
    },
    {
      id: 2,
      title: '系统警告',
      content: '存储空间即将用完，请及时清理',
      time: '2023-11-15 13:45',
      read: false,
      type: 'warning'
    }
  ])

  const unreadCount = ref(2)

  const markAsRead = (id: number) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification && !notification.read) {
      notification.read = true
      unreadCount.value--
    }
  }

  const markAllAsRead = () => {
    notifications.value.forEach(n => {
      if (!n.read) {
        n.read = true
      }
    })
    unreadCount.value = 0
  }

  const removeNotification = (id: number) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index !== -1) {
      const notification = notifications.value[index]
      if (!notification.read) {
        unreadCount.value--
      }
      notifications.value.splice(index, 1)
    }
  }

  const clearAll = () => {
    notifications.value = []
    unreadCount.value = 0
  }

  const addNotification = (notification: Omit<Notification, 'id' | 'read'>) => {
    const id = Date.now()
    notifications.value.unshift({
      ...notification,
      id,
      read: false
    })
    unreadCount.value++
  }

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    addNotification
  }
}) 