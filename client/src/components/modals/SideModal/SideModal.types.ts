import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
export interface ISideModal extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode
}
