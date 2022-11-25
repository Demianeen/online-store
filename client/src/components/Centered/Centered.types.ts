import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface ICenteredText extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode
}
