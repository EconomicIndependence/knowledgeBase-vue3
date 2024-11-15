<template>
  <div class="favorite-folders">
    <n-space vertical>
      <n-card>
        <n-space justify="end">
          <n-button type="primary" @click="showModal = true">
            新建文件夹
          </n-button>
        </n-space>
      </n-card>
      <n-grid :cols="4" :x-gap="16" :y-gap="16">
        <n-grid-item v-for="folder in folders" :key="folder.id">
          <n-card hoverable>
            <template #header>
              <n-space align="center">
                <n-icon size="20">
                  <folder-outline />
                </n-icon>
                {{ folder.name }}
              </n-space>
            </template>
            <n-space vertical>
              <n-text depth="3">{{ folder.count }}个文件</n-text>
              <n-text depth="3">更新于 {{ folder.updateTime }}</n-text>
            </n-space>
            <template #footer>
              <n-space justify="end">
                <n-button text type="error" @click="handleDelete(folder)">
                  删除
                </n-button>
              </n-space>
            </template>
          </n-card>
        </n-grid-item>
      </n-grid>
    </n-space>

    <n-modal v-model:show="showModal" preset="dialog" title="新建收藏夹">
      <n-form>
        <n-form-item label="名称">
          <n-input v-model:value="newFolderName" placeholder="请输入收藏夹名称" />
        </n-form-item>
      </n-form>
      <template #action>
        <n-button type="primary" @click="handleCreate">
          创建
        </n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  NCard, NSpace, NButton, NGrid, NGridItem, 
  NIcon, NText, NModal, NForm, NFormItem, NInput 
} from 'naive-ui'
import { FolderOutline } from '@vicons/ionicons5'

const showModal = ref(false)
const newFolderName = ref('')

const folders = ref([
  {
    id: 1,
    name: '重要文档',
    count: 12,
    updateTime: '2023-11-15'
  },
  {
    id: 2,
    name: '项目资料',
    count: 8,
    updateTime: '2023-11-14'
  }
])

const handleCreate = () => {
  // 处理创建文件夹
  showModal.value = false
}

const handleDelete = (folder: any) => {
  // 处理删除文件夹
}
</script>

<style scoped>
.favorite-folders {
  padding: 16px;
}
</style> 