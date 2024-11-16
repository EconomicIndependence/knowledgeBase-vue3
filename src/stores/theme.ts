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
        color: isDarkMode ? '#242429' : '#ffffff',
        colorModal: modalColor,
        textColor: isDarkMode ? '#ffffff' : '#333333',
        titleTextColor: isDarkMode ? '#ffffff' : '#333333',
        closeIconColor: isDarkMode ? '#666' : '#999',
        closeIconColorHover: isDarkMode ? '#fff' : '#333',
        closeColorHover: isDarkMode ? '#333' : '#f5f5f5'
      },
      Tag: {
        borderRadius: '4px',
        textColor: isDarkMode ? '#ffffff' : '#333333',
        color: isDarkMode ? '#242429' : '#ffffff',
        border: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0'
      },
      Button: {
        colorPrimary: color,
        colorHoverPrimary: hover,
        colorPressedPrimary: pressed,
        colorFocusPrimary: hover
      },
      Input: {
        color: isDarkMode ? '#242429' : '#ffffff',
        colorDisabled: isDarkMode ? '#242429' : '#ffffff',
        colorFocus: isDarkMode ? '#242429' : '#ffffff',
        colorHover: isDarkMode ? '#242429' : '#ffffff',
        borderColor: isDarkMode ? '#444' : '#d9d9d9',
        borderColorHover: color,
        borderColorFocus: color,
        textColor: isDarkMode ? '#ffffff' : '#333333',
        placeholderColor: isDarkMode ? '#666' : '#999',
        boxShadowFocus: `0 0 0 2px ${adjustColor(color, -40)}40`,
        caretColor: color,
        peers: {
          Suffix: {
            textColor: isDarkMode ? '#666' : '#999'
          },
          Prefix: {
            textColor: isDarkMode ? '#666' : '#999'
          }
        }
      },
      Menu: {
        borderColor: borderColor
      },
      Checkbox: {
        colorChecked: color,
        colorTableHeaderChecked: color,
        colorHoverChecked: hover,
        colorPressedChecked: pressed,
        // 深色主题下的复选框样式
        textColor: isDarkMode ? '#ffffff' : '#333333',
        color: isDarkMode ? '#242429' : '#ffffff',
        colorDisabled: isDarkMode ? '#333' : '#f5f5f5',
        colorCheckedDisabled: isDarkMode ? '#444' : '#d9d9d9',
        borderColor: isDarkMode ? '#444' : '#d9d9d9',
        borderColorDisabled: isDarkMode ? '#333' : '#d9d9d9',
        borderColorChecked: color,
        checkMarkColor: isDarkMode ? '#ffffff' : '#ffffff',
        checkboxColor: 'transparent',
        checkboxColorChecked: 'transparent',
        checkboxColorDisabled: 'transparent',
        checkboxColorFocus: 'transparent',
        checkboxColorHover: 'transparent'
      },
      Select: {
        peers: {
          InternalSelection: {
            textColor: isDarkMode ? '#ffffff' : '#333333',
            color: isDarkMode ? '#242429' : '#ffffff',
            colorActive: isDarkMode ? '#1a1a1f' : '#f5f5f5',
            placeholderColor: isDarkMode ? '#666' : '#999',
            border: isDarkMode ? '1px solid #444' : '1px solid #d9d9d9',
            borderHover: `1px solid ${color}`,
            borderActive: `1px solid ${color}`
          },
          InternalSelectMenu: {
            color: isDarkMode ? '#242429' : '#ffffff',
            optionTextColor: isDarkMode ? '#ffffff' : '#333333',
            optionTextColorActive: isDarkMode ? '#ffffff' : '#333333',
            optionColorPending: isDarkMode ? '#1a1a1f' : '#f5f5f5',
            optionColorActive: 'transparent'
          }
        }
      },
      DatePicker: {
        itemTextColor: isDarkMode ? '#ffffff' : '#333333',
        panelColor: isDarkMode ? '#242429' : '#ffffff',
        peers: {
          TimePicker: {
            itemTextColor: isDarkMode ? '#ffffff' : '#333333',
            panelColor: isDarkMode ? '#242429' : '#ffffff',
            peers: {
              Scrollbar: {
                railColor: isDarkMode ? '#333' : '#f5f5f5'
              }
            }
          }
        }
      },
      Dropdown: {
        color: isDarkMode ? '#242429' : '#ffffff',
        optionTextColor: isDarkMode ? '#ffffff' : '#333333',
        optionColorHover: isDarkMode ? '#1a1a1f' : '#f5f5f5'
      },
      Radio: {
        buttonTextColor: isDarkMode ? '#ffffff' : '#333333',
        buttonColor: isDarkMode ? '#242429' : '#ffffff',
        buttonBorderColor: isDarkMode ? '#444' : '#d9d9d9',
        buttonBorderColorActive: color,
        buttonBoxShadowFocus: `0 0 0 2px ${adjustColor(color, -40)}40`
      },
      Switch: {
        railColor: isDarkMode ? '#333' : '#d9d9d9',
        railColorActive: color,
        buttonColor: isDarkMode ? '#ffffff' : '#ffffff',
        boxShadowFocus: `0 0 0 2px ${adjustColor(color, -40)}40`
      },
      Slider: {
        railColor: isDarkMode ? '#333' : '#d9d9d9',
        railColorHover: isDarkMode ? '#444' : '#bfbfbf',
        fillColor: color,
        fillColorHover: hover,
        handleColor: isDarkMode ? '#ffffff' : '#ffffff',
        dotColor: isDarkMode ? '#333' : '#d9d9d9',
        dotColorActive: color
      },
      Tabs: {
        tabTextColorActive: color,
        tabTextColor: isDarkMode ? '#999' : '#666',
        barColor: color,
        tabColorHover: isDarkMode ? '#1a1a1f' : '#f5f5f5'
      },
      Tree: {
        nodeTextColor: isDarkMode ? '#ffffff' : '#333333',
        nodeColorHover: isDarkMode ? '#1a1a1f' : '#f5f5f5',
        nodeColorPressed: isDarkMode ? '#242429' : '#e6e6e6',
        arrowColor: isDarkMode ? '#666' : '#999'
      },
      List: {
        color: 'transparent',
        textColor: isDarkMode ? '#ffffff' : '#333333',
        colorHover: isDarkMode ? '#1a1a1f' : '#f5f5f5',
        dividerColor: isDarkMode ? '#333' : '#f0f0f0'
      },
      Thing: {
        textColor: isDarkMode ? '#ffffff' : '#333333',
        titleTextColor: isDarkMode ? '#ffffff' : '#333333',
        contentTextColor: isDarkMode ? '#999' : '#666',
        descriptionTextColor: isDarkMode ? '#666' : '#999'
      },
      Dialog: {
        color: isDarkMode ? '#242429' : '#ffffff',
        textColor: isDarkMode ? '#ffffff' : '#333333',
        titleTextColor: isDarkMode ? '#ffffff' : '#333333'
      },
      Popover: {
        color: isDarkMode ? '#242429' : '#ffffff',
        textColor: isDarkMode ? '#ffffff' : '#333333',
        padding: '16px',
        border: isDarkMode ? '1px solid #333' : '1px solid #eee',
        peers: {
          Scrollbar: {
            railColor: isDarkMode ? '#333' : '#f5f5f5'
          }
        }
      },
      Empty: {
        textColor: isDarkMode ? '#666' : '#999',
        iconColor: isDarkMode ? '#333' : '#e0e0e0'
      },
      Scrollbar: {
        color: isDarkMode ? '#333' : '#e0e0e0',
        colorHover: isDarkMode ? '#444' : '#bfbfbf'
      },
      Notification: {
        color: isDarkMode ? '#242429' : '#ffffff',
        textColor: isDarkMode ? '#ffffff' : '#333333',
        titleTextColor: isDarkMode ? '#ffffff' : '#333333',
        boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.12)',
        headerBorderBottom: isDarkMode ? '1px solid #333' : '1px solid #eee',
        closeIconColor: isDarkMode ? '#666' : '#999',
        closeIconColorHover: isDarkMode ? '#fff' : '#333',
        closeColorHover: isDarkMode ? '#333' : '#f5f5f5'
      }
    }
    
    // 应用 CSS 变量
    const root = document.documentElement
    root.style.setProperty('--background-color', backgroundColor)
    root.style.setProperty('--text-color', isDarkMode ? '#ffffff' : '#333333')
    root.style.setProperty('--border-color', borderColor)
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