declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false

interface Window {
  bika_storage: { [k: string]: string }
}
