import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from 'react'

export interface ICurrencySelect extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
