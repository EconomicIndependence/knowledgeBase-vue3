import { defineStore } from 'pinia'

interface UserState {
  token: string | null
  userInfo: {
    username: string
    email: string
    phone: string
    avatar: string
    [key: string]: any
  } | null
}

interface RegisterParams {
  username: string
  password: string
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: localStorage.getItem('token'),
    userInfo: null
  }),

  actions: {
    // 添加注册方法
    async register(params: RegisterParams) {
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500))
        return { success: true }
      } catch (error) {
        throw new Error('注册失败')
      }
    },

    // 更新用户信息
    async updateUserInfo(userInfo: Partial<NonNullable<UserState['userInfo']>>) {
      try {
        // 用户名验证规则
        if (userInfo.username) {
          if (userInfo.username.length < 2 || userInfo.username.length > 20) {
            throw new Error('用户名长度必须在2-20个字符之间')
          }
          if (!/^[a-zA-Z0-9_]+$/.test(userInfo.username)) {
            throw new Error('用户名只能包含英文字母、数字和下划线')
          }
        }

        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // 只在这里更新 store 中的用户信息
        if (this.userInfo) {
          this.userInfo = {
            ...this.userInfo,
            ...userInfo
          }
        }

        return this.userInfo
      } catch (error: any) {
        throw new Error(error.message || '保存用户信息失败')
      }
    },

    // 上传头像
    async uploadAvatar(formData: FormData) {
      try {
        const file = formData.get('file') as File
        if (file.size > 2 * 1024 * 1024) {
          throw new Error('头像文件大小不能超过2MB')
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
        if (!allowedTypes.includes(file.type)) {
          throw new Error('只支持 JPG、PNG、GIF 格式的图片')
        }

        // 模拟上传，只返回临时URL，不更新store
        await new Promise(resolve => setTimeout(resolve, 1000))
        const tempUrl = URL.createObjectURL(file)

        // 不再直接更新 userInfo
        return { url: tempUrl }
      } catch (error: any) {
        throw new Error(error.message || '上传头像失败')
      }
    },

    // 获取用户信息
    async getUserInfo() {
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500))
        
        if (!this.userInfo) {
          this.userInfo = {
            username: 'admin',
            email: 'admin@example.com',
            phone: '13800138000',
            avatar: 'https://example.com/avatar.jpg'
          }
        }
        
        // 确保返回最新的用户信息
        return { ...this.userInfo }
      } catch (error) {
        throw new Error('获取用户信息失败')
      }
    },

    // 修改密码
    async changePassword(passwordData: { oldPassword: string, newPassword: string }) {
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        return true
      } catch (error) {
        throw new Error('修改密码失败')
      }
    },

    // 退出登录
    logout() {
      this.token = null
      this.userInfo = null
      localStorage.removeItem('token')
    }
  }
}) 