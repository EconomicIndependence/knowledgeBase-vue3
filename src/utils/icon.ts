import { h } from 'vue'
import type { Component } from 'vue'
import { NIcon } from 'naive-ui'

export function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

export function renderIconButton(icon: Component, onClick?: () => void) {
  return h(NIcon, { onClick }, { default: () => h(icon) })
} 