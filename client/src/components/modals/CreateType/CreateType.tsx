import React, { FormEvent, useState } from 'react'
import Modal from '../Modal/Modal'
import FormInput from '../../FormInput/FormInput'
import { ICreateType } from './CreateType.types'
import { createBrand } from '../../../http/deviceApi'

const CreateType = ({ hide, ...props }: ICreateType) => {
  const [name, setName] = useState<string>('')

  const addType = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await createBrand({ name })
    setName('')

    hide()
  }

  return (
    <Modal onSubmit={addType} hide={hide} {...props}>
      <FormInput
        name={'Name'}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Modal>
  )
}

export default CreateType
