import React from 'react'
import { IModalItem } from './ModalItem.types'

const ModalItem = ({ name, type = 'text' }: IModalItem) => {
  const capitalizeFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  return (
    <>
      <label htmlFor={name}>{capitalizeFirstLetter(name)}</label>
      <input id={name} type={type} />
    </>
  )
}

export default ModalItem
