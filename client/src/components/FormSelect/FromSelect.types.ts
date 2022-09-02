import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface IFormSelect extends DetailedHTMLProps<HTMLAttributes<HTMLSelectElement>, HTMLSelectElement > {
  name: string
  children: ReactNode
}
