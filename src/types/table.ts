import type { VNode } from 'vue'

export interface TableColumn<T = any> {
  title: string
  key: string
  render?: (row: T) => VNode | string
}

export interface TableData {
  [key: string]: any
} 