import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
export interface IFormInput extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string
}
