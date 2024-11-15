<template>
  <div class="login-container">
    <div class="login-background"></div>
    <div class="login-content">
      <n-card class="login-card">
        <div class="login-header">
          <n-icon size="48" color="#18a058">
            <cloud-outline />
          </n-icon>
          <h1>文件管理系统</h1>
          <p class="subtitle">安全存储，便捷管理</p>
        </div>
        <n-form
          ref="formRef"
          :model="formValue"
          :rules="rules"
          size="large"
        >
          <n-form-item path="username">
            <n-input
              v-model:value="formValue.username"
              placeholder="请输入用户名"
              clearable
            >
              <template #prefix>
                <n-icon><person-outline /></n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="formValue.password"
              type="password"
              show-password-on="click"
              placeholder="请输入密码"
              :maxlength="20"
            >
              <template #prefix>
                <n-icon><lock-closed-outline /></n-icon>
              </template>
            </n-input>
          </n-form-item>
          <div class="login-options">
            <n-checkbox v-model:checked="rememberMe">
              <span class="remember-text">记住我</span>
            </n-checkbox>
            <n-button text type="primary" class="forget-btn">忘记密码？</n-button>
          </div>
          <n-button
            type="primary"
            block
            size="large"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </n-button>
        </n-form>
        <div class="login-footer">
          <n-space justify="center" align="center">
            <n-divider />
            <span class="footer-text">其他登录方式</span>
            <n-divider />
          </n-space>
          <n-space justify="center" class="social-login">
            <n-button quaternary circle>
              <template #icon>
                <n-icon><logo-github /></n-icon>
              </template>
            </n-button>
            <n-button quaternary circle>
              <template #icon>
                <n-icon><logo-google /></n-icon>
              </template>
            </n-button>
            <n-button quaternary circle>
              <template #icon>
                <n-icon><logo-wechat /></n-icon>
              </template>
            </n-button>
          </n-space>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import type { FormInst } from 'naive-ui'
import { 
  NCard, NForm, NFormItem, NInput, NButton, NSpace, 
  NCheckbox, NDivider, NIcon 
} from 'naive-ui'
import { 
  PersonOutline, LockClosedOutline, CloudOutline,
  LogoGithub, LogoGoogle, LogoWechat
} from '@vicons/ionicons5'

const router = useRouter()
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const rememberMe = ref(false)
const loading = ref(false)

const formValue = ref({
  username: '',
  password: ''
})

const rules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: ['blur', 'input']
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['blur', 'input']
  }
}

const handleLogin = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true
      try {
        // 模拟登录延迟
        await new Promise(resolve => setTimeout(resolve, 1000))
        // 设置登录状态
        localStorage.setItem('isLoggedIn', 'true')
        message.success('登录成功')
        // 跳转到首页
        router.push('/dashboard')
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
  z-index: 0;
}

.login-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  padding: 0 20px;
}

.login-card {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-header h1 {
  margin: 16px 0 8px;
  font-size: 24px;
  color: #333;
}

.subtitle {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;
}

.remember-text {
  color: #666;
}

.forget-btn {
  font-size: 14px;
}

.login-footer {
  margin-top: 32px;
}

.footer-text {
  color: #999;
  font-size: 14px;
  padding: 0 12px;
}

.social-login {
  margin-top: 16px;
}

/* 添加动画效果 */
.login-card {
  animation: slide-up 0.4s ease-out;
}

@keyframes slide-up {
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