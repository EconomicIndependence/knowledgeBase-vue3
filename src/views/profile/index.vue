<template>
  <div class="profile">
    <n-card title="个人资料">
      <n-tabs type="line">
        <n-tab-pane name="basic" tab="基本信息">
          <n-form
            ref="formRef"
            :model="formValue"
            :rules="formRules"
            label-placement="left"
            label-width="100"
          >
            <n-form-item label="头像">
              <n-upload
                action="https://api.example.com/upload"
                :max="1"
                :default-file-list="fileList"
              >
                <n-button>更换头像</n-button>
              </n-upload>
            </n-form-item>
            <n-form-item label="用户名" path="username">
              <n-input v-model:value="formValue.username" placeholder="请输入用户名" />
            </n-form-item>
            <n-form-item label="邮箱" path="email">
              <n-input v-model:value="formValue.email" placeholder="请输入邮箱" />
            </n-form-item>
            <n-form-item label="手机号" path="phone">
              <n-input v-model:value="formValue.phone" placeholder="请输入手机号" />
            </n-form-item>
            <n-form-item>
              <n-button type="primary" @click="handleSave">保存修改</n-button>
            </n-form-item>
          </n-form>
        </n-tab-pane>
        <n-tab-pane name="security" tab="安全设置">
          <n-space vertical>
            <n-card title="修改密码" size="small">
              <n-form
                ref="passwordFormRef"
                :model="passwordForm"
                :rules="passwordRules"
                label-placement="left"
                label-width="100"
              >
                <n-form-item label="原密码" path="oldPassword">
                  <n-input
                    v-model:value="passwordForm.oldPassword"
                    type="password"
                    show-password-on="click"
                    placeholder="请输入原密码"
                  />
                </n-form-item>
                <n-form-item label="新密码" path="newPassword">
                  <n-input
                    v-model:value="passwordForm.newPassword"
                    type="password"
                    show-password-on="click"
                    placeholder="请输入新密码"
                  />
                </n-form-item>
                <n-form-item label="确认密码" path="confirmPassword">
                  <n-input
                    v-model:value="passwordForm.confirmPassword"
                    type="password"
                    show-password-on="click"
                    placeholder="请确认新密码"
                  />
                </n-form-item>
                <n-form-item>
                  <n-button type="primary" @click="handleChangePassword">
                    修改密码
                  </n-button>
                </n-form-item>
              </n-form>
            </n-card>
            <n-card title="登录设备" size="small">
              <n-list>
                <n-list-item v-for="device in loginDevices" :key="device.id">
                  <n-space justify="space-between">
                    <n-space>
                      <n-icon size="20">
                        <component :is="device.icon" />
                      </n-icon>
                      <span>{{ device.name }}</span>
                      <n-tag :type="device.current ? 'success' : 'default'">
                        {{ device.current ? '当前设备' : '其他设备' }}
                      </n-tag>
                    </n-space>
                    <n-button 
                      v-if="!device.current" 
                      type="error" 
                      text 
                      @click="handleLogoutDevice(device.id)"
                    >
                      退出登录
                    </n-button>
                  </n-space>
                </n-list-item>
              </n-list>
            </n-card>
          </n-space>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import type { FormInst, UploadFileInfo } from 'naive-ui'
import { 
  NCard, 
  NTabs, 
  NTabPane, 
  NForm, 
  NFormItem, 
  NInput, 
  NButton, 
  NSpace,
  NUpload,
  NList,
  NListItem,
  NTag,
  NIcon
} from 'naive-ui'
import { DesktopOutline, PhonePortraitOutline } from '@vicons/ionicons5'

const message = useMessage()
const formRef = ref<FormInst | null>(null)
const passwordFormRef = ref<FormInst | null>(null)

const formValue = ref({
  username: 'admin',
  email: 'admin@example.com',
  phone: '13800138000'
})

const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const fileList = ref<UploadFileInfo[]>([])

const loginDevices = ref([
  { 
    id: 1,
    name: 'Windows 10 - Chrome', 
    icon: DesktopOutline, 
    current: true 
  },
  { 
    id: 2, 
    name: 'iPhone 13 - Safari', 
    icon: PhonePortraitOutline, 
    current: false 
  }
])

const formRules = {
  username: [{
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  }],
  email: [{
    required: true,
    message: '请输入邮箱',
    trigger: 'blur',
    validator: (rule: any, value: string) => {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
    }
  }],
  phone: [{
    required: true,
    message: '请输入手机号',
    trigger: 'blur',
    validator: (rule: any, value: string) => {
      return /^1[3-9]\d{9}$/.test(value)
    }
  }]
}

const passwordRules = {
  oldPassword: {
    required: true,
    message: '请输入原密码'
  },
  newPassword: {
    required: true,
    message: '请输入新密码'
  },
  confirmPassword: {
    required: true,
    message: '请确认新密码',
    validator: (rule: any, value: string) => {
      return value === passwordForm.value.newPassword
    },
    trigger: ['input', 'blur']
  }
}

const handleSave = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success('保存成功')
    }
  })
}

const handleChangePassword = (e: MouseEvent) => {
  e.preventDefault()
  passwordFormRef.value?.validate((errors) => {
    if (!errors) {
      message.success('密码修改成功')
      passwordForm.value = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  })
}

const handleLogoutDevice = (deviceId: number) => {
  loginDevices.value = loginDevices.value.filter(device => device.id !== deviceId)
  message.success('设备已退出登录')
}
</script>

<style scoped>
.profile {
  padding: 16px;
}
</style> 