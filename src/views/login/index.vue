<template>
  <div class="login-container">
    <div class="cyberpunk-background">
      <div class="bg-gradient"></div>
      <div class="cyber-grid"></div>
      <div class="pulse-overlay"></div>
      <div class="scan-line"></div>
    </div>
    <div class="login-content" data-aos="fade-up" data-aos-duration="800">
      <n-card class="login-card">
        <div class="login-header">
          <div class="cyber-avatar-wrapper">
            <n-icon size="48" color="#00BCD4" class="cyber-avatar">
              <cloud-outline />
            </n-icon>
            <div class="cyber-ring"></div>
            <div class="cyber-glitch"></div>
          </div>
          <h1 class="cyber-title">知识库管理系统</h1>
          <p class="cyber-subtitle">KNOWLEDGE BASE MANAGEMENT</p>
        </div>
        <n-form
          ref="formRef"
          :model="formValue"
          :rules="rules"
          size="large"
          class="login-form"
        >
          <div class="cyber-input-wrapper">
            <n-form-item path="username">
              <n-input
                v-model:value="formValue.username"
                placeholder="输入用户名"
                :input-props="{ autocomplete: 'off' }"
              >
                <template #prefix>
                  <n-icon><person-outline /></n-icon>
                </template>
              </n-input>
            </n-form-item>
          </div>
          <div class="cyber-input-wrapper">
            <n-form-item path="password">
              <n-input
                v-model:value="formValue.password"
                type="password"
                show-password-on="click"
                placeholder="输入密码"
                :input-props="{ autocomplete: 'off' }"
              >
                <template #prefix>
                  <n-icon><lock-closed-outline /></n-icon>
                </template>
              </n-input>
            </n-form-item>
          </div>
          <div class="login-options">
            <n-checkbox v-model:checked="rememberMe">
              <span class="cyber-text">记住我</span>
            </n-checkbox>
            <n-button text type="primary" class="cyber-link">忘记密码？</n-button>
          </div>
          <div class="cyber-button-container">
            <n-button
              type="primary"
              block
              size="large"
              :loading="loading"
              @click="handleLogin"
              class="cyber-button"
            >
              <span class="button-glitch"></span>
              <span class="button-text">{{ loading ? '正在验证...' : '登 录' }}</span>
            </n-button>
          </div>
        </n-form>
        <div class="login-footer">
          <div class="cyber-divider">
            <span class="cyber-text">其他登录方式</span>
          </div>
          <n-space justify="center" class="social-login">
            <div v-for="item in socialIcons" :key="item.icon.name" class="cyber-social-button">
              <n-button quaternary circle>
                <template #icon>
                  <n-icon :component="item.icon" />
                </template>
              </n-button>
              <div class="button-glow"></div>
            </div>
          </n-space>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
import AOS from 'aos'
import 'aos/dist/aos.css'
import VanillaTilt from 'vanilla-tilt'

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
        await new Promise(resolve => setTimeout(resolve, 1000))
        localStorage.setItem('isLoggedIn', 'true')
        message.success('登录成功')
        router.push('/dashboard')
      } finally {
        loading.value = false
      }
    }
  })
}

onMounted(() => {
  AOS.init()

  const tiltElements = Array.from(document.querySelectorAll("[data-tilt]")) as HTMLElement[]
  VanillaTilt.init(tiltElements, {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2
  })
})

const socialIcons = [
  { icon: LogoGithub, color: '#333' },
  { icon: LogoGoogle, color: '#DB4437' },
  { icon: LogoWechat, color: '#07C160' }
]

const generateRandomBinary = () => {
  return Array.from({ length: 20 }, () => Math.round(Math.random())).join('')
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0A192F;
  position: relative;
  overflow: hidden;
}

.cyberpunk-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.bg-gradient {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    #1a1a2e 0%,
    #16213e 50%,
    #0f3460 100%
  );
}

.cyber-grid {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(16, 42, 66, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(16, 42, 66, 0.3) 1px, transparent 1px);
  background-size: 50px 50px;
  transform: perspective(1000px) rotateX(60deg) translateY(-100px) scale(2.5);
  opacity: 0.2;
  animation: gridMove 20s linear infinite;
}

.pulse-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(0, 188, 212, 0.1) 0%,
    transparent 50%
  );
  animation: pulse 4s ease-in-out infinite;
  opacity: 0.5;
}

.scan-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 188, 212, 0.2) 50%,
    transparent 100%
  );
  animation: scanMove 3s linear infinite;
  opacity: 0.5;
}

.login-content {
  position: relative;
  width: 100%;
  max-width: 400px;
  padding: 0 20px;
  z-index: 1;
}

.login-card {
  background: rgba(16, 32, 56, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 188, 212, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(0, 188, 212, 0.1);
  border-radius: 12px;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo-container {
  margin-bottom: 16px;
}

.title {
  margin: 16px 0 8px;
  font-size: 24px;
  font-weight: 600;
  background: linear-gradient(45deg, #00BCD4, #3F51B5);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitle {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  letter-spacing: 4px;
}

.login-form {
  margin-bottom: 24px;
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;
}

.remember-text {
  color: rgba(255, 255, 255, 0.7);
}

.login-button {
  height: 44px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 4px;
  background: linear-gradient(45deg, #00BCD4, #3F51B5);
  border: none;
  transition: all 0.3s ease;
}

.login-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 188, 212, 0.3);
}

.login-footer {
  margin-top: 32px;
}

.footer-text {
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  letter-spacing: 1px;
}

.social-login {
  margin-top: 16px;
}

@keyframes gridMove {
  from {
    transform: perspective(1000px) rotateX(60deg) translateY(-100px) scale(2.5);
  }
  to {
    transform: perspective(1000px) rotateX(60deg) translateY(-50px) scale(2.5);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}

@keyframes scanMove {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(100vh);
  }
}

@media (max-width: 768px) {
  .login-content {
    padding: 0 16px;
  }
}

.cyber-avatar-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

.cyber-avatar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  position: relative;
  z-index: 2;
  background: rgba(0, 188, 212, 0.1);
  box-shadow: 
    0 0 20px rgba(0, 188, 212, 0.3),
    0 0 60px rgba(0, 188, 212, 0.1);
  animation: avatar-pulse 4s ease-in-out infinite;
}

.cyber-ring {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border: 2px solid rgba(0, 188, 212, 0.5);
  border-radius: 12px;
  animation: ring-rotate 10s linear infinite;
}

.cyber-ring::before,
.cyber-ring::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px solid transparent;
  border-radius: 50%;
}

.cyber-ring::before {
  border-top: 2px solid rgba(0, 188, 212, 0.7);
  border-right: 2px solid rgba(0, 188, 212, 0.7);
  animation: ring-rotate 6s linear infinite;
}

.cyber-ring::after {
  border-bottom: 2px solid rgba(0, 188, 212, 0.7);
  border-left: 2px solid rgba(0, 188, 212, 0.7);
  animation: ring-rotate 4s linear infinite reverse;
}

.cyber-glitch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, 
    transparent 0%, 
    rgba(0, 188, 212, 0.2) 50%, 
    transparent 100%
  );
  background-size: 200% 200%;
  animation: glitch-animation 3s ease-in-out infinite;
  z-index: 3;
  pointer-events: none;
  border-radius: 12px;
  mix-blend-mode: overlay;
}

@keyframes avatar-pulse {
  0%, 100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.05);
    filter: brightness(1.2);
  }
}

@keyframes ring-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes glitch-animation {
  0% {
    background-position: -100% -100%;
    opacity: 0;
  }
  50% {
    background-position: 100% 100%;
    opacity: 1;
  }
  100% {
    background-position: -100% -100%;
    opacity: 0;
  }
}

@keyframes neonPulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

@keyframes glitchMove {
  0% { background-position: -100% -100%; }
  50% { background-position: 100% 100%; }
  100% { background-position: -100% -100%; }
}
</style> 