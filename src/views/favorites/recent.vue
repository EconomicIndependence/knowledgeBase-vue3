<template>
  <div class="recent-favorites">
    <n-card title="最近收藏">
      <n-space vertical>
        <n-input-group>
          <n-input placeholder="搜索收藏" />
          <n-button type="primary">搜索</n-button>
        </n-input-group>
        <n-data-table
          :columns="columns"
          :data="data"
          :pagination="pagination"
          :bordered="false"
        />
      </n-space>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { 
  NCard, NSpace, NDataTable, NTag, NButton, 
  NInput, NInputGroup 
} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { StarOutline, TrashOutline } from '@vicons/ionicons5'

const columns: DataTableColumns[] = [
  {
    title: '文件名',
    key: 'name'
  },
  {
    title: '类型',
    key: 'type'
  },
  {
    title: '大小',
    key: 'size'
  },
  {
    title: '收藏时间',
    key: 'favoriteTime'
  },
  {
    title: '操作',
    key: 'actions',
    render(row) {
      return h(NSpace, {}, {
        default: () => [
          h(NButton, {
            text: true,
            type: 'error',
            onClick: () => handleRemove(row)
          }, { default: () => '取消收藏' })
        ]
      })
    }
  }
]

const data = [
  {
    name: '项目文档.docx',
    type: '文档',
    size: '2.5MB',
    favoriteTime: '2023-11-15 14:30'
  },
  {
    name: '设计图.png',
    type: '图片',
    size: '1.8MB',
    favoriteTime: '2023-11-15 13:45'
  }
]

const pagination = {
  pageSize: 10
}

const handleRemove = (row: any) => {
  // 处理取消收藏
}
</script>

<style scoped>
.recent-favorites {
  padding: 16px;
}
</style> 