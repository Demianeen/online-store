import axios, { AxiosError } from 'axios'
import React, { FormEvent } from 'react'
import { IModal } from './Modal.types'

export interface IApiError {
  message: string
  status: number
}

const Modal = ({ isVisible, hide, children, onSubmit }: IModal) => {
  const onSubmitWithErrorHandler = async (e: FormEvent<HTMLFormElement>) => {
    try {
      await onSubmit(e)
    } catch (error) {
      if (axios.isAxiosError(error) && (error.response !== undefined)) {
        // TODO: Process axios error without new variable
        const axiosError = error as AxiosError<IApiError>
        alert(axiosError.response?.data.message)
        return
      } if (error instanceof Error) {
        alert(error.message)
        return
      }
      alert('Internal error. Try again later')
    }
  }
  if (isVisible) {
    return (
      <div>
        <form onSubmit={onSubmitWithErrorHandler}>
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
