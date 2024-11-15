export interface FormRules {
  [key: string]: FormRule | FormRule[]
}

export interface FormRule {
  required?: boolean
  message?: string
  trigger?: string | string[]
  validator?: (rule: any, value: any) => boolean | Promise<boolean>
  type?: string
  pattern?: RegExp
} 