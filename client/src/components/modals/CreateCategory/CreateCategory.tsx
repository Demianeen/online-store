import React, { ChangeEvent, FormEvent, useState } from 'react'
import Modal from '../Modal/Modal'
import FormInput from '../../FormInput/FormInput'
import { ICreateType } from './CreateCategory.types'
import { createCategory } from '../../../http/productApi'
import FormSelect from '../../FormSelect/FormSelect'

const CreateType = ({ hide, ...props }: ICreateType) => {
  const [name, setName] = useState<string>('')
  const [gender, setGender] = useState<string[]>([])

  const addCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await createCategory({ name, gender })
    setName('')
    setGender([])

    hide()
  }

  const chooseGender = (e: ChangeEvent<HTMLSelectElement>) => {
    setGender(Array.from(
      e.target.selectedOptions,
      ({ value }) => value
    ))
  }

  return (
    <Modal onSubmit={addCategory} hide={hide} {...props}>
      <FormInput
        name={'Name'}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FormSelect
        name={'gender'}
        multiple
        onChange={chooseGender}
      >
        <option>{'MEN'}</option>
        <option>{'WOMEN'}</option>
        <option>{'KIDS'}</option>
      </FormSelect>
    </Modal>
  )
}

export default CreateType
