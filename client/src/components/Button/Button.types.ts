import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'

export interface IButton extends Omit<
DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
'ref'> {
  children: ReactNode
  buttonStyle?: 'primary' | 'ghost'
}
