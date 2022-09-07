import { DetailedHTMLProps, ReactNode, SelectHTMLAttributes } from 'react'

export interface IFormSelect extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement > {
  name: string
  children: ReactNode
}
