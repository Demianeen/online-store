import React from 'react'
import { IFormInput } from './FormInput.types'

const FormInput = ({ name, ...props }: IFormInput) => {
  const capitalizeFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  return (
    <>
      <label>
        {capitalizeFirstLetter(name)}
        <input placeholder={name} {...props} />
      </label>
    </>
  )
}

export default FormInput
