import React from 'react'
import { IFormSelect } from './FromSelect.types'

const FormSelect = ({ name, children }: IFormSelect) => {
  const capitalizeFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  return (
    <>
      <label htmlFor={name}>{capitalizeFirstLetter(name)}</label>
      <select name={name} id={name}>
        {children}
      </select>
    </>
  )
}

export default FormSelect
