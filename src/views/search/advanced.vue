<template>
  <div class="advanced-search">
    <n-card title="高级搜索">
      <n-form>
        <n-form-item label="文件名">
          <n-input placeholder="请输入文件名" />
        </n-form-item>
        <n-form-item label="文件类型">
          <n-select :options="fileTypeOptions" placeholder="请选择文件类型" />
        </n-form-item>
        <n-form-item label="创建时间">
          <n-date-picker type="daterange" />
        </n-form-item>
        <n-form-item>
          <n-button type="primary">搜索</n-button>
        </n-form-item>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { NCard, NForm, NFormItem, NInput, NSelect, NDatePicker, NButton } from 'naive-ui'

const fileTypeOptions = [
  { label: '图片', value: 'image' },
  { label: '文档', value: 'document' },
  { label: '视频', value: 'video' },
  { label: '音频', value: 'audio' }
]
</script> 