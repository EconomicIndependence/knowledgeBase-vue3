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
                :custom-request="customRequest"
                :headers="uploadHeaders"
                :max="1"
                :default-file-list="fileList"
                accept="image/*"
                list-type="image-card"
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
import { ref, onMounted } from 'vue'
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
import { useUserStore } from '@/store/modules/user'

const message = useMessage()
const userStore = useUserStore()
const formRef = ref<FormInst | null>(null)
const passwordFormRef = ref<FormInst | null>(null)

// 用户基本信息
const formValue = ref({
  username: '',
  email: '',
  phone: '',
  avatar: ''
})

// 密码表单
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 头像上传相关
const fileList = ref<UploadFileInfo[]>([])
const uploadHeaders = {
  Authorization: `Bearer ${localStorage.getItem('token')}`
}

// 自定义上传
const customRequest = async ({ file, onFinish, onError }: any) => {
  const formData = new FormData()
  formData.append('file', file.file)
  
  try {
    const result = await userStore.uploadAvatar(formData)
    // 只更新表单中的头像，不更新 store
    formValue.value.avatar = result.url
    
    // 更新上传列表显示
    fileList.value = [{
      id: 'avatar',
      name: 'avatar.jpg',
      status: 'finished',
      url: result.url
    }]

    onFinish()
    message.success('头像上传成功，请点击保存以确认更改')
  } catch (error: any) {
    onError()
    message.error(error.message || '头像上传失败')
  }
}

// 加载用户信息
const loadUserInfo = async () => {
  try {
    const userInfo = await userStore.getUserInfo()
    if (userInfo) {
      formValue.value = {
        username: userInfo.username,
        email: userInfo.email,
        phone: userInfo.phone,
        avatar: userInfo.avatar
      }
      
      // 设置默认头像
      if (userInfo.avatar) {
        fileList.value = [{
          id: 'avatar',
          name: 'avatar.jpg',
          status: 'finished',
          url: userInfo.avatar
        }]
      }
    }
  } catch (error: any) {
    message.error('获取用户信息失败')
  }
}

// 添加登录设备的响应式数据
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

// 修改表单验证规则
const formRules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: 'blur',
    validator: (_rule: any, value: string) => {
      if (!value) {
        return new Error('请输入用户名')
      }
      if (value.length < 2 || value.length > 20) {
        return new Error('用户名长度应在2-20个字符之间')
      }
      if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        return new Error('用户名只能包含字母、数字和下划线')
      }
      return true
    }
  },
  email: {
    required: true,
    message: '请输入邮箱',
    trigger: ['blur', 'input'],
    validator: (_rule: any, value: string) => {
      if (!value) {
        return new Error('请输入邮箱')
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (!emailRegex.test(value)) {
        return new Error('请输入正确的邮箱格式')
      }
      return true
    }
  },
  phone: {
    required: true,
    message: '请输入手机号',
    trigger: ['blur', 'input'],
    validator: (_rule: any, value: string) => {
      if (!value) {
        return new Error('请输入手机号')
      }
      const phoneRegex = /^1[3-9]\d{9}$/
      if (!phoneRegex.test(value)) {
        return new Error('请输入正确的手机号格式')
      }
      return true
    }
  }
}

// 修改密码验证规则，使用正确的类型
const passwordRules = {
  oldPassword: {
    required: true,
    message: '请输入原密码',
    trigger: 'blur'
  },
  newPassword: {
    required: true,
    message: '请输入新密码',
    trigger: 'blur',
    validator: (_rule: any, value: string) => {
      if (!value) {
        return new Error('请输入新密码')
      }
      if (value.length < 6) {
        return new Error('密码长度不能小于6个字符')
      }
      return true
    }
  },
  confirmPassword: {
    required: true,
    message: '请确认新密码',
    trigger: ['blur', 'input'],
    validator: (_rule: any, value: string) => {
      if (!value) {
        return new Error('请确认新密码')
      }
      if (value !== passwordForm.value.newPassword) {
        return new Error('两次输入的密码不一致')
      }
      return true
    }
  }
}

// 保存基本信息
const handleSave = async (e: MouseEvent) => {
  e.preventDefault()
  try {
    await formRef.value?.validate()
    
    // 更新用户信息，包括头像
    await userStore.updateUserInfo({
      username: formValue.value.username,
      email: formValue.value.email,
      phone: formValue.value.phone,
      avatar: formValue.value.avatar
    })
    
    // 重新获取并更新表单数据
    const userInfo = await userStore.getUserInfo()
    if (userInfo) {
      formValue.value = {
        username: userInfo.username,
        email: userInfo.email,
        phone: userInfo.phone,
        avatar: userInfo.avatar
      }

      // 更新头像列表
      if (userInfo.avatar) {
        fileList.value = [{
          id: 'avatar',
          name: 'avatar.jpg',
          status: 'finished',
          url: userInfo.avatar
        }]
      }

      // 强制更新 store 中的用户信息
      userStore.$patch({
        userInfo: {
          ...userInfo
        }
      })
    }
    
    message.success('保存成功')
  } catch (error: any) {
    message.error(error.message || '保存失败，请稍后重试')
  }
}

// 修改密码
const handleChangePassword = async (e: MouseEvent) => {
  e.preventDefault()
  try {
    await passwordFormRef.value?.validate()
    // await userStore.changePassword(passwordForm.value)
    message.success('密码修改成功')
    passwordForm.value = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  } catch (error) {
    console.error('修改密码失败:', error)
  }
}

// 退出设备
const handleLogoutDevice = async (deviceId: number) => {
  try {
    // await userStore.logoutDevice(deviceId)
    loginDevices.value = loginDevices.value.filter(device => device.id !== deviceId)
    message.success('设备已退出登录')
  } catch (error) {
    message.error('退出设备失败')
  }
}

// 确保组件挂载时加载用户信息
onMounted(() => {
  loadUserInfo()
})
</script>

<style scoped>
.profile {
  padding: 16px;
}

:deep(.n-upload-trigger) {
  width: 100px;
  height: 100px;
}

:deep(.n-upload-file-list) {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  gap: 12px;
}

:deep(.n-upload-file-list img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style> 