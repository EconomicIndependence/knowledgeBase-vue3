<template>
  <div class="settings">
    <n-card title="系统设置" class="settings-card">
      <div class="settings-content">
        <n-tabs type="line">
          <n-tab-pane name="basic" tab="基本设置">
            <n-form
              ref="formRef"
              :model="formValue"
              label-placement="left"
              label-width="120"
              require-mark-placement="right-hanging"
            >
              <n-form-item label="系统名称">
                <n-input v-model:value="formValue.systemName" placeholder="请输入系统名称" />
              </n-form-item>
              <n-form-item label="主题设置">
                <n-select v-model:value="formValue.theme" :options="themeOptions" />
              </n-form-item>
              <n-form-item label="语言设置">
                <n-select v-model:value="formValue.language" :options="languageOptions" />
              </n-form-item>
              <n-form-item label="开启通知">
                <n-switch v-model:value="formValue.enableNotification" />
              </n-form-item>
              <n-form-item label="主题颜色">
                <n-color-picker
                  v-model:value="tempColor"
                  :swatches="[
                    '#18a058',
                    '#2080f0',
                    '#f0a020',
                    '#d03050',
                    '#8a2be2'
                  ]"
                  :show-alpha="false"
                  size="large"
                  @update:value="handleColorChange"
                />
              </n-form-item>
            </n-form>
          </n-tab-pane>
          <n-tab-pane name="storage" tab="存储设置">
            <n-space vertical size="large">
              <n-card size="small" title="存储空间">
                <n-space vertical>
                  <n-progress type="line" :percentage="storageUsage" :indicator-placement="'inside'">
                    已使用 {{ usedStorage }}GB / {{ totalStorage }}GB
                  </n-progress>
                  <n-space justify="space-between">
                    <n-statistic label="总容量">
                      <n-text>{{ totalStorage }}GB</n-text>
                    </n-statistic>
                    <n-statistic label="已使用">
                      <n-text>{{ usedStorage }}GB</n-text>
                    </n-statistic>
                    <n-statistic label="剩余空间">
                      <n-text>{{ totalStorage - usedStorage }}GB</n-text>
                    </n-statistic>
                  </n-space>
                </n-space>
              </n-card>
              <n-card size="small" title="存储策略">
                <n-form-item label="文件保存位置">
                  <n-select v-model:value="formValue.storageLocation" :options="storageLocationOptions" />
                </n-form-item>
                <n-form-item label="自动清理">
                  <n-space align="center" item-style="display: flex;">
                    <n-switch v-model:value="formValue.enableAutoClean" />
                    <n-text depth="3">
                      超过
                      <n-input-number 
                        v-model:value="formValue.cleanDays" 
                        :min="1" 
                        :max="365"
                        size="small"
                      />
                      天的临时文件将被自动清理
                    </n-text>
                  </n-space>
                </n-form-item>
              </n-card>
              <n-card size="small" title="文件类型限制">
                <n-space vertical>
                  <n-checkbox-group v-model:value="formValue.allowedFileTypes">
                    <n-space>
                      <n-checkbox value="image">图文件</n-checkbox>
                      <n-checkbox value="document">文档文件</n-checkbox>
                      <n-checkbox value="video">视频文件</n-checkbox>
                      <n-checkbox value="audio">音频文件</n-checkbox>
                      <n-checkbox value="archive">压缩文件</n-checkbox>
                    </n-space>
                  </n-checkbox-group>
                  <n-form-item label="单文件大小限制">
                    <n-input-number 
                      v-model:value="formValue.maxFileSize" 
                      :min="1" 
                      :max="1000"
                      :show-button="false"
                    >
                      <template #suffix>
                        MB
                      </template>
                    </n-input-number>
                  </n-form-item>
                </n-space>
              </n-card>
            </n-space>
          </n-tab-pane>
          <n-tab-pane name="backup" tab="备份设置">
            <n-space vertical>
              <n-card size="small" title="自动备份">
                <n-space vertical>
                  <n-form-item label="启用自动备份">
                    <n-switch v-model:value="formValue.enableAutoBackup" />
                  </n-form-item>
                  <n-form-item label="备份周期">
                    <n-select 
                      v-model:value="formValue.backupInterval" 
                      :options="backupIntervalOptions"
                      :disabled="!formValue.enableAutoBackup"
                    />
                  </n-form-item>
                  <n-form-item label="备份保留时间">
                    <n-select 
                      v-model:value="formValue.backupRetention" 
                      :options="backupRetentionOptions"
                      :disabled="!formValue.enableAutoBackup"
                    />
                  </n-form-item>
                </n-space>
              </n-card>
              <n-card size="small" title="手动备份">
                <n-space vertical>
                  <n-space justify="space-between">
                    <n-text>上次备份时间：2023-11-15 12:00:00</n-text>
                    <n-button type="primary" @click="handleBackup">
                      立即备份
                    </n-button>
                  </n-space>
                  <n-data-table :columns="backupColumns" :data="backupHistory" />
                </n-space>
              </n-card>
            </n-space>
          </n-tab-pane>
        </n-tabs>
      </div>
      <div class="settings-footer">
        <n-space justify="end">
          <n-button @click="handleReset">重置</n-button>
          <n-button type="primary" @click="handleSave">保存设置</n-button>
        </n-space>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, h, watch } from 'vue'
import { useMessage } from 'naive-ui'
import type { FormInst, DataTableColumns } from 'naive-ui'
import {
  NCard,
  NTabs,
  NTabPane,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NSelect,
  NSwitch,
  NButton,
  NSpace,
  NProgress,
  NText,
  NStatistic,
  NCheckboxGroup,
  NCheckbox,
  NDataTable,
  NColorPicker
} from 'naive-ui'
import { useThemeStore } from '@/stores/theme'

const message = useMessage()
const formRef = ref<FormInst | null>(null)
const themeStore = useThemeStore()

// 存储相关数据
const totalStorage = 1000
const usedStorage = 700
const storageUsage = Math.round((usedStorage / totalStorage) * 100)

// 添加一个临时存储原始值的变量
const originalValues = {
  systemName: '文件管理系统',
  theme: themeStore.isDark ? 'dark' : 'light',
  language: 'zh-CN',
  enableNotification: true,
  storageLocation: 'local',
  enableAutoClean: true,
  cleanDays: 30,
  allowedFileTypes: ['image', 'document'],
  maxFileSize: 100,
  enableAutoBackup: true,
  backupInterval: 'daily',
  backupRetention: '30days',
  primaryColor: localStorage.getItem('primaryColor') || '#18a058'
}

// 修改表单数据，使用深拷贝
const formValue = ref({ ...originalValues })

// 添加一个临时颜色变量
const tempColor = ref(formValue.value.primaryColor)

watch(() => formValue.value.theme, (newTheme) => {
  if (newTheme === 'dark' && !themeStore.isDark) {
    themeStore.toggleTheme()
  } else if (newTheme === 'light' && themeStore.isDark) {
    themeStore.toggleTheme()
  }
})

watch(() => themeStore.isDark, (isDark) => {
  formValue.value.theme = isDark ? 'dark' : 'light'
})

const themeOptions = [
  { label: '浅色主题', value: 'light' },
  { label: '深色主题', value: 'dark' }
]

const languageOptions = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' }
]

const storageLocationOptions = [
  { label: '本地存储', value: 'local' },
  { label: '云存储', value: 'cloud' }
]

const backupIntervalOptions = [
  { label: '每天', value: 'daily' },
  { label: '每周', value: 'weekly' },
  { label: '每月', value: 'monthly' }
]

const backupRetentionOptions = [
  { label: '保留30天', value: '30days' },
  { label: '保留60天', value: '60days' },
  { label: '保留90天', value: '90days' }
]

const backupColumns: DataTableColumns[] = [
  {
    title: '备份时间',
    key: 'time'
  },
  {
    title: '备份大小',
    key: 'size'
  },
  {
    title: '状态',
    key: 'status'
  },
  {
    title: '操作',
    key: 'actions',
    render(row) {
      return h(NSpace, {}, {
        default: () => [
          h(NButton, {
            size: 'small',
            onClick: () => handleRestore(row)
          }, { default: () => '恢复' }),
          h(NButton, {
            size: 'small',
            type: 'error',
            onClick: () => handleDeleteBackup(row)
          }, { default: () => '删除' })
        ]
      })
    }
  }
]

const backupHistory = [
  {
    time: '2023-11-15 12:00:00',
    size: '500MB',
    status: '成功'
  },
  {
    time: '2023-11-14 12:00:00',
    size: '480MB',
    status: '成功'
  }
]

// 修改保存函数
const handleSave = () => {
  // 更新主题颜色
  if (tempColor.value !== formValue.value.primaryColor) {
    formValue.value.primaryColor = tempColor.value
    themeStore.updatePrimaryColor(tempColor.value)
  }
  
  // 更新其他设置...
  
  // 保存成功后更新原始值
  originalValues.primaryColor = formValue.value.primaryColor
  Object.assign(originalValues, formValue.value)
  
  message.success('设置保存成功')
}

// 修改重置函数
const handleReset = () => {
  // 先重置主题颜色到默认值 '#18a058'
  const defaultColor = '#18a058'
  
  // 重置表单值为原始值
  formValue.value = {
    systemName: '文件管理系统',
    theme: 'light',
    language: 'zh-CN',
    enableNotification: true,
    storageLocation: 'local',
    enableAutoClean: true,
    cleanDays: 30,
    allowedFileTypes: ['image', 'document'],
    maxFileSize: 100,
    enableAutoBackup: true,
    backupInterval: 'daily',
    backupRetention: '30days',
    primaryColor: defaultColor
  }
  
  // 重置临时颜色
  tempColor.value = defaultColor
  
  // 重置主题颜色
  themeStore.updatePrimaryColor(defaultColor)
  
  // 更新原始值
  Object.assign(originalValues, formValue.value)
  
  // 重置主题模式
  if (themeStore.isDark) {
    themeStore.toggleTheme()
  }
  
  message.success('设置已重置')
}

const handleBackup = () => {
  message.success('备份已开始')
}

const handleRestore = (row: any) => {
  message.success('开始恢复备份')
}

const handleDeleteBackup = (row: any) => {
  message.success('备份已删除')
}

const handleColorChange = (color: string) => {
  tempColor.value = color
}

const handleThemeChange = (theme: string) => {
  if (theme === 'dark') {
    themeStore.isDark || themeStore.toggleTheme()
  } else {
    themeStore.isDark && themeStore.toggleTheme()
  }
}
</script>

<style scoped>
.settings {
  padding: 16px;
  height: 100%;
}

.settings-card {
  height: 100%;
}

.settings-content {
  height: calc(100% - 60px); /* 减去底部按钮的高度 */
  overflow-y: auto;
  padding-bottom: 16px;
}

.settings-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--divider-color);
  background: var(--card-color);
}

/* 确保表格内容可以正常滚动 */
:deep(.n-data-table) {
  max-height: 300px;
  overflow: auto;
}

/* 优化颜色选择器样式 */
:deep(.n-color-picker-trigger) {
  width: 100%;
  max-width: 200px;
}

:deep(.n-color-picker-trigger__fill) {
  border-radius: 3px;
}
</style> 