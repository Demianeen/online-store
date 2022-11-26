import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface ICentered extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode
}
