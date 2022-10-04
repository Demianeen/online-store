import { Dispatch, SetStateAction } from 'react'
import { ISideModal } from '../SideModal/SideModal.types'

export interface IUserModal extends Omit<ISideModal, 'children'> {
  setIsVisible: Dispatch<SetStateAction<boolean>>
  isVisible: boolean
}
