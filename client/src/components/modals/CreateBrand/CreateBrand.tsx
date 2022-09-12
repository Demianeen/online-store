import React, { FormEvent, useState } from 'react'
import Modal from '../Modal/Modal'
import FormInput from '../../FormInput/FormInput'
import { ICreateDevice } from './CreateBrand.types'
import { createBrand } from '../../../http/productApi'

const CreateBrand = ({ hide, ...props }: ICreateDevice) => {
  const [name, setName] = useState<string>('')

  const addBrand = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await createBrand({ name })
    setName('')

    hide()
  }

  return (
    <Modal onSubmit={addBrand} hide={hide} {...props}>
      <FormInput
        name={'Name'}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Modal>
  )
}

export default CreateBrand
