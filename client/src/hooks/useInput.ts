import { ChangeEvent, useRef, useState } from 'react'

type OnChange = (e: ChangeEvent<HTMLInputElement>) => void
interface IReturnValue {
  onChange: OnChange
  value: string
  isEmpty: boolean
}

export const useInput = (): IReturnValue => {
  const [value, setValue] = useState('')
  const isEmpty = useRef(true)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setValue(inputValue)
    if (inputValue === '') {
      isEmpty.current = true
      return
    }
    isEmpty.current = false
  }

  return {
    onChange,
    value,
    isEmpty: isEmpty.current
  }
}

export default useInput
