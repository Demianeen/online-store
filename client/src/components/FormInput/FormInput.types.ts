import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
export interface IFormInput extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  labelText: string
  requiredStar?: boolean
}
