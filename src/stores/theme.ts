import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { GlobalTheme, GlobalThemeOverrides } from 'naive-ui'
import { darkTheme } from 'naive-ui'

export const useThemeStore = defineStore('theme', () => {
  // 主题状态
  const theme = ref<GlobalTheme | null>(null)
  const isDark = ref(false)

  // 主题覆盖
  const themeOverrides = ref<GlobalThemeOverrides>({
    common: {
      primaryColor: localStorage.getItem('primaryColor') || '#18a058',
      primaryColorHover: '#36ad6a',
      primaryColorPressed: '#0c7a43',
      primaryColorSuppl: '#36ad6a',
      // 添加深色主题背景色
      bodyColor: '#ffffff',
      cardColor: '#ffffff',
      modalColor: '#f5f7f9'
    }
  })

  // 切换主题
  const toggleTheme = () => {
    // 使用 requestAnimationFrame 确保在下一帧更新主题
    requestAnimationFrame(() => {
      isDark.value = !isDark.value
      theme.value = isDark.value ? darkTheme : null
      // 保存主题设置到本地存储
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
      // 更新主题色以应用新的背景色
      const currentColor = themeOverrides.value.common?.primaryColor || '#18a058'
      updatePrimaryColor(currentColor)
    })
  }

  // 初始化主题
  const initTheme = () => {
    // 从本地存储读取主题设置
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      isDark.value = true
      theme.value = darkTheme
    }
    // 从本地存储读取主题色
    const savedColor = localStorage.getItem('primaryColor')
    if (savedColor) {
      updatePrimaryColor(savedColor)
    }
  }

  // 更新主题色
  const updatePrimaryColor = (color: string) => {
    const hover = adjustColor(color, 20)
    const pressed = adjustColor(color, -20)
    
    // 预先计算主题相关的颜色
    const isDarkMode = isDark.value
    const backgroundColor = isDarkMode ? '#18181c' : '#ffffff'
    const cardColor = isDarkMode ? '#1f1f23' : '#ffffff'
    const modalColor = isDarkMode ? '#242429' : '#f5f7f9'
    const borderColor = isDarkMode ? '#333' : '#eee'
    
    // 使用 requestAnimationFrame 确保样式更新在同一帧
    requestAnimationFrame(() => {
      themeOverrides.value = {
        common: {
          primaryColor: color,
          primaryColorHover: hover,
          primaryColorPressed: pressed,
          primaryColorSuppl: hover,
          // 主题相关颜色
          bodyColor: backgroundColor,
          cardColor: cardColor,
          modalColor: modalColor,
          borderColor: borderColor,
          textColor1: isDarkMode ? '#ffffff' : '#333333',
          textColor2: isDarkMode ? '#ccc' : '#666',
          textColor3: isDarkMode ? '#999' : '#999',
          // 背景色
          baseColor: backgroundColor,
          // 悬浮状态
          hoverColor: isDarkMode ? '#242424' : '#f5f5f5'
        },
        Card: {
          borderRadius: '8px',
          color: cardColor,
          colorModal: modalColor
        },
        Tag: {
          borderRadius: '4px'
        },
        Button: {
          colorPrimary: color,
          colorHoverPrimary: hover,
          colorPressedPrimary: pressed,
          colorFocusPrimary: hover
        },
        Input: {
          color: cardColor,
          borderColor: borderColor,
          colorFocus: color
        },
        Menu: {
          borderColor: borderColor
        }
      }
      
      // 应用 CSS 变量
      const root = document.documentElement
      root.style.setProperty('--background-color', backgroundColor)
      root.style.setProperty('--text-color', isDarkMode ? '#ffffff' : '#333333')
      root.style.setProperty('--border-color', borderColor)
    })
  }

  // 辅助函数：调整颜色亮度
  const adjustColor = (color: string, amount: number): string => {
    const clamp = (num: number) => Math.min(255, Math.max(0, num))
    const hex = color.replace('#', '')
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    
    const adjustedR = clamp(r + amount)
    const adjustedG = clamp(g + amount)
    const adjustedB = clamp(b + amount)
    
    return `#${adjustedR.toString(16).padStart(2, '0')}${adjustedG.toString(16).padStart(2, '0')}${adjustedB.toString(16).padStart(2, '0')}`
  }

  // 监听主题变化，更新样式
  watch(isDark, (newValue) => {
    document.documentElement.classList.toggle('dark', newValue)
    // 使用 requestAnimationFrame 确保在下一帧更新主题
    requestAnimationFrame(() => {
      const currentColor = themeOverrides.value.common?.primaryColor || '#18a058'
      updatePrimaryColor(currentColor)
    })
  })

  return {
    theme,
    isDark,
    themeOverrides,
    toggleTheme,
    initTheme,
    updatePrimaryColor
  }
}) 