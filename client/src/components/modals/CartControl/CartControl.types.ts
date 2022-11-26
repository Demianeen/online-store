import { Dispatch, SetStateAction } from 'react'
import { ISideModal } from '../SideModal/SideModal.types'

export interface ICartControl extends Omit<ISideModal, 'children'> {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
}
