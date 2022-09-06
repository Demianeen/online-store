import { FormEvent, ReactNode } from 'react'
export interface IModal {
  isVisible: boolean
  hide: () => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  children: ReactNode
}
