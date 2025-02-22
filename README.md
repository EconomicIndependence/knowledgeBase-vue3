# 文件管理系统

基于 Vue 3 + TypeScript + Naive UI 的现代文件管理系统。

## 功能特点

- 📁 文件管理
  - 支持图片、文档等多种文件类型
  - 文件预览和下载
  - 文件列表和网格视图切换
  - 文件拖拽上传
  - 文件类型限制
  - 大小限制控制

- ⭐ 收藏功能
  - 快速收藏常用文件
  - 收藏文件夹管理
  - 最近收藏记录
  - 收藏分类管理

- 🔍 搜索功能
  - 全文搜索
  - 高级搜索（支持多条件筛选）
  - 搜索历史记录
  - 搜索结果预览

- 🎨 界面功能
  - 支持明暗主题切换
  - 主题颜色自定义
  - 标签页管理
  - 面包屑导航
  - 响应式布局
  - 平滑的过渡动画
  - 通知中心

- 📊 数据统计
  - 文件使用统计
  - 存储空间分析
  - 上传下载记录
  - 使用趋势图表

- 🔐 系统功能
  - 用户认证和授权
  - 个人资料管理
  - 系统设置
  - 自动备份
  - 存储策略配置
  - 多语言支持

## 技术栈

- Vue 3.3
- TypeScript 5.2
- Vite 5.0
- Vue Router 4.2
- Pinia 2.1
- Naive UI 2.37
- Axios 1.6

## 项目结构

src/
├── assets/          # 静态资源
├── components/      # 公共组件
│   ├── TabsView/    # 标签页组件
│   └── NotificationPopover/ # 通知组件
├── layouts/         # 布局组件
│   └── BasicLayout/ # 基础布局
├── router/          # 路由配置
├── stores/          # 状态管理
│   ├── theme.ts     # 主题状态
│   └── notification.ts # 通知状态
├── styles/          # 全局样式
├── types/           # 类型定义
├── utils/           # 工具函数
└── views/           # 页面组件
    ├── dashboard/   # 仪表盘
    ├── files/       # 文件管理
    ├── favorites/   # 收藏管理
    ├── search/      # 搜索功能
    └── settings/    # 系统设置

## 开发指南

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0
- 支持现代浏览器

### 开发规范

- 使用 TypeScript 编写代码
- 遵循 Vue 3 组合式 API 风格
- 使用 ESLint 和 Prettier 进行代码格式化
- 组件和函数必须包含类型声明
- 提交信息遵循 Conventional Commits 规范

### 快速开始

1. 克隆项目

## 版本历史

### [0.0.2]

#### 新增
- 深色主题支持
- 主题颜色自定义
- 通知中心功能
- 标签页管理优化
- 平滑过渡动画

#### 优化
- 主题切换体验
- 组件类型定义
- 路由配置结构
- 状态管理逻辑
- 代码复用性

### [0.0.1]

#### 新增
- 基础框架搭建
- 用户认证系统
- 文件管理基础功能
- 系统设置
- 个人资料管理

