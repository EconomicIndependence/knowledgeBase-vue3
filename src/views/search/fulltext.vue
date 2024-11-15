<template>
  <div class="fulltext-search">
    <n-card>
      <n-space vertical size="large">
        <n-input-group>
          <n-input
            v-model:value="keyword"
            placeholder="请输入搜索关键词"
            @keyup.enter="handleSearch"
          />
          <n-button type="primary" :loading="loading" @click="handleSearch">
            搜索
          </n-button>
        </n-input-group>

        <div v-if="keyword" class="search-result">
          <n-space vertical>
            <n-text depth="3">
              找到 {{ total }} 个相关结果 (用时 {{ time }}秒)
            </n-text>
            <n-list>
              <n-list-item v-for="item in results" :key="item.id">
                <n-thing :title="item.name">
                  <template #header-extra>
                    <n-tag :type="item.type === '文档' ? 'success' : 'info'">
                      {{ item.type }}
                    </n-tag>
                  </template>
                  <template #description>
                    <n-text depth="3">
                      {{ item.description }}
                    </n-text>
                  </template>
                </n-thing>
              </n-list-item>
            </n-list>
          </n-space>
        </div>
        <n-empty v-else description="请输入关键词开始搜索" />
      </n-space>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  NCard, NSpace, NInput, NInputGroup, NButton, 
  NEmpty, NList, NListItem, NThing, NTag, NText 
} from 'naive-ui'

const keyword = ref('')
const loading = ref(false)
const total = ref(0)
const time = ref(0)

const results = ref([
  {
    id: 1,
    name: '项目需求文档.docx',
    type: '文档',
    description: '包含关键词的上下文...'
  },
  {
    id: 2,
    name: '设计规范.pdf',
    type: '文档',
    description: '包含关键词的上下文...'
  }
])

const handleSearch = async () => {
  if (!keyword.value) return
  loading.value = true
  try {
    // 模拟搜索延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    total.value = results.value.length
    time.value = 0.5
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fulltext-search {
  padding: 16px;
}

.search-result {
  margin-top: 16px;
}
</style> 