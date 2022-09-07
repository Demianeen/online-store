import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface ILayoutProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode
}
