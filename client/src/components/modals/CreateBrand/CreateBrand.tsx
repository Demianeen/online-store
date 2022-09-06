import React, { FormEvent, useState } from 'react'
import Modal from '../Modal/Modal'
import FormInput from '../../FormInput/FormInput'
import { ICreateDevice } from './CreateBrand.types'
import { createType } from '../../../http/deviceApi'

const CreateBrand = ({ hide, ...props }: ICreateDevice) => {
  const [name, setName] = useState<string>('')

  const addType = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await createType({ name })
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

export default CreateBrand
