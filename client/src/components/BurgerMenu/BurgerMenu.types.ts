import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from 'react'

export interface IBurgerMenu
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
