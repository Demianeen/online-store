import { IModal } from '../Modal/Modal.types'

export interface ICreateType extends Omit<IModal, 'children' | 'onSubmit'> {

}
