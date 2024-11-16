/// <reference types="vite/client" />
/// <reference types="naive-ui/volar" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 添加命名空间来避免冲突
declare namespace VueTemplate {
  interface IntrinsicElements {
    [elem: string]: any
  }
}

declare module 'vue' {
  import type { Component } from '@vue/runtime-core'
  export type { Component }
  export * from '@vue/runtime-core'
  export { createApp, h, ref, computed, watch } from '@vue/runtime-core'
}

declare module 'vue-router' {
  import type { RouteLocationNormalized } from 'vue-router'
  export { RouteLocationNormalized }
  export { 
    createRouter, 
    createWebHistory, 
    useRouter, 
    useRoute,
    type RouteRecordRaw,
    type Router,
    type RouteLocationRaw
  } from 'vue-router'
  
  interface RouteMeta {
    title?: string
    icon?: any
  }
}

declare module 'naive-ui' {
  import type { Component } from 'vue'
  export * from 'naive-ui/es/index'
  
  export interface FormRules {
    [key: string]: FormItemRule | FormItemRule[]
  }
  
  export interface FormItemRule {
    required?: boolean
    message?: string
    trigger?: string | string[]
    validator?: (rule: FormItemRule, value: any) => boolean | Error | Promise<void>
    type?: string
    pattern?: RegExp
  }

  export interface DataTableColumns {
    title: string
    key: string
    render?: (row: any) => any
  }

  export interface DropdownOption {
    label: string
    key: string
    icon?: Component
    children?: DropdownOption[]
    type?: 'divider'
  }

  export interface UploadFileInfo {
    id: string
    name: string
    status: 'pending' | 'uploading' | 'finished' | 'error'
    percentage?: number
    file?: File
    url?: string
    thumbnailUrl?: string
    type?: string
    size?: number
  }
}

declare module '@vicons/ionicons5' {
  import type { Component } from 'vue'
  export const HomeOutline: Component
  export const DocumentsOutline: Component
  export const SettingsOutline: Component
  export const SearchOutline: Component
  export const StarOutline: Component
  export const ImageOutline: Component
  export const DocumentTextOutline: Component
  export const DownloadOutline: Component
  export const TimeOutline: Component
  export const CloudOutline: Component
  export const NotificationsOutline: Component
  export const ChevronDown: Component
  export const PersonOutline: Component
  export const LockClosedOutline: Component
  export const LogoGithub: Component
  export const LogoGoogle: Component
  export const LogoWechat: Component
  export const SunnyOutline: Component
  export const MoonOutline: Component
  export const LogOutOutline: Component
  export const FileTrayFullOutline: Component
  export const CloudUploadOutline: Component
  export const DocumentOutline: Component
  export const DesktopOutline: Component
  export const PhonePortraitOutline: Component
  export const FolderOutline: Component
  export const TrashOutline: Component
  export const CloseOutline: Component
  export const MenuOutline: Component
}

// 添加全局组件类型声明
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
} 