import { ReactNode } from 'react'
export interface IModal {
  isVisible: boolean
  hide: () => void
  children: ReactNode
}
