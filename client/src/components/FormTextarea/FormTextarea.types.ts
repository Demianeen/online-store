import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'
export interface IFormTextarea extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  name: string
}
