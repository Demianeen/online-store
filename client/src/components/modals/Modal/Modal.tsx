import React from 'react'
import { IModal } from './Modal.types'

const Modal = ({ isVisible, hide, children }: IModal) => {
  if (isVisible) {
    return (
      <div>
        <form>
          {children}
          <button onClick={() => hide()}>{'Cancel'}</button>
          <input type={'submit'} value={'Create'} />
        </form>
      </div>
    )
  }
  return (<></>)
}

export default Modal
