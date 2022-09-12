import React from 'react'
import { IFormTextarea } from './FormTextarea.types'

const FormTextarea = ({ name, ...props }: IFormTextarea) => {
  const capitalizeFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  return (
    <>
      <label>
        {capitalizeFirstLetter(name)}
        <textarea placeholder={name} {...props} />
      </label>
    </>
  )
}

export default FormTextarea
