import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
export interface ISideModal extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isVisible: boolean
  children: ReactNode
}
