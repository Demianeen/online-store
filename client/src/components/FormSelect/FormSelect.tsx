import React from 'react'
import { IFormSelect } from './FormSelect.types'

const FormSelect = ({ name, children, ...props }: IFormSelect) => {
  const capitalizeFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  return (
    <>
      <label>
        {capitalizeFirstLetter(name)}
        <select name={name} {...props}>
          <option value={''} selected hidden>{ `Select ${name}`}</option>
          {children}
        </select>
      </label>
    </>
  )
}

export default FormSelect
