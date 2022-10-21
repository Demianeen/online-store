import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from 'react'

export interface IBurgerMenu
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isMenuOpen: boolean
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>

}
