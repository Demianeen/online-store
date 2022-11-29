import React, { ChangeEvent, FocusEvent } from 'react'
import useInput from '../../hooks/useInput'
import styles from './FormInput.module.css'
import { IFormInput } from './FormInput.types'
import cn from 'classnames'

const FormInput = ({
  labelText,
  requiredStar = false,
  onChange,
  onFocus,
  className,
  ...props
}: IFormInput) => {
  const { isEmpty, onChange: onInputChange, value } = useInput()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onInputChange(e)
    if (onChange !== undefined) {
      onChange(e)
    }
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
    e.target.select()
    if (onFocus !== undefined) {
      onFocus(e)
    }
  }

  return (
    <div className={styles.container}>
      <label className={cn(styles.label, {
        [styles.active]: !isEmpty
      })}>
        {labelText}{requiredStar && <span className={styles.req}>{'*'}</span>}
      </label>
      <input
        className={cn(styles.input, className)}
        onFocus={handleFocus}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </div>
  )
}

export default FormInput
