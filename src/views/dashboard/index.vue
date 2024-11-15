<template>
  <div class="dashboard">
    <n-grid :x-gap="16" :y-gap="16" :cols="4">
      <n-grid-item v-for="stat in statistics" :key="stat.label">
        <n-card hoverable>
          <n-space align="center" justify="space-between">
            <div>
              <p class="stat-label">{{ stat.label }}</p>
              <n-number-animation
                :from="0"
                :to="stat.value"
                :duration="1500"
                class="stat-value"
              />
            </div>
            <n-icon size="48" :depth="3" class="stat-icon">
              <component :is="stat.icon" />
            </n-icon>
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>

    <n-grid :x-gap="16" :y-gap="16" :cols="2" class="mt-4">
      <n-grid-item>
        <n-card title="最近上传" hoverable>
          <n-list hoverable clickable>
            <n-list-item v-for="file in recentFiles" :key="file.id">
              <n-thing :title="file.name" :description="file.date">
                <template #avatar>
                  <n-icon size="24">
                    <component :is="file.icon" />
                  </n-icon>
                </template>
                <template #header-extra>
                  <n-tag :type="file.status === 'success' ? 'success' : 'warning'">
                    {{ file.status === 'success' ? '已完成' : '上传中' }}
                  </n-tag>
                </template>
                <template #description>
                  <n-space size="small" align="center">
                    <n-text depth="3">{{ file.size }}</n-text>
                    <n-divider vertical />
                    <n-text depth="3">{{ file.type }}</n-text>
                  </n-space>
                </template>
              </n-thing>
            </n-list-item>
          </n-list>
        </n-card>
      </n-grid-item>

      <n-grid-item>
        <n-card title="存储空间使用情况" hoverable>
          <n-space vertical size="large">
            <div class="storage-chart">
              <n-progress
                type="circle"
                :percentage="70"
                :color="storageColor"
                :rail-color="storageRailColor"
                :height="150"
              >
                <span class="storage-text">
                  已使用<br>
                  <span class="storage-value">70%</span>
                </span>
              </n-progress>
            </div>
            <n-space justify="space-around">
              <n-statistic label="总容量">
                <n-text>1000GB</n-text>
              </n-statistic>
              <n-statistic label="已使用">
                <n-text>700GB</n-text>
              </n-statistic>
              <n-statistic label="剩余空间">
                <n-text>300GB</n-text>
              </n-statistic>
            </n-space>
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { 
  NCard, NSpace, NStatistic, NNumberAnimation, NGrid, NGridItem,
  NIcon, NList, NListItem, NThing, NTag, NText, NDivider, NProgress
} from 'naive-ui'
import { 
  DocumentOutline, ImageOutline, FileTrayFullOutline,
  CloudUploadOutline, TimeOutline, DocumentTextOutline
} from '@vicons/ionicons5'

const statistics = [
  { label: '总文件数', value: 1234, icon: FileTrayFullOutline },
  { label: '今日上传', value: 56, icon: CloudUploadOutline },
  { label: '图片文件', value: 789, icon: ImageOutline },
  { label: '文档文件', value: 445, icon: DocumentOutline }
]

const recentFiles = [
  {
    id: 1,
    name: '项目文档.docx',
    date: '2023-11-15 14:30',
    size: '2.5MB',
    type: '文档',
    status: 'success',
    icon: DocumentTextOutline
  },
  {
    id: 2,
    name: '会议记录.pdf',
    date: '2023-11-15 13:45',
    size: '1.8MB',
    type: '文档',
    status: 'success',
    icon: DocumentTextOutline
  },
  {
    id: 3,
    name: '产品设计图.png',
    date: '2023-11-15 11:20',
    size: '4.2MB',
    type: '图片',
    status: 'uploading',
    icon: ImageOutline
  }
]

const storageColor = '#18a058'
const storageRailColor = '#eee'
</script>

<style scoped>
.dashboard {
  animation: fade-in 0.3s ease-out;
}

.stat-label {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.stat-value {
  margin: 8px 0 0;
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.stat-icon {
  opacity: 0.2;
}

.mt-4 {
  margin-top: 16px;
}

.storage-chart {
  display: flex;
  justify-content: center;
  padding: 16px;
}

.storage-text {
  text-align: center;
  font-size: 14px;
  color: #666;
}

.storage-value {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 