import React, { useState } from 'react'
import CreateDevice from '../components/modals/CreateDevice/CreateDevice'
import Modal from '../components/modals/Modal/Modal'
import FormInput from '../components/FormInput/FormInput'

export const Admin = () => {
  const [isTypeVisible, setIsTypeVisible] = useState(false)
  const [isBrandVisible, setIsBrandVisible] = useState(false)
  const [isDeviceVisible, setIsDeviceVisible] = useState(false)
  return (
    <div>
      <button onClick={() => setIsTypeVisible(true)}>{'Add type'}</button>
      <Modal isVisible={isTypeVisible} hide={() => setIsTypeVisible(false)}>
        <FormInput name={'name'} />
      </Modal>

      <button onClick={() => setIsBrandVisible(true)}>{'Add brand'}</button>
      <Modal isVisible={isBrandVisible} hide={() => setIsBrandVisible(false)}>
        <FormInput name={'name'} />
      </Modal>

      <button onClick={() => setIsDeviceVisible(true)}>{'Add device'}</button>
      <CreateDevice isVisible={isDeviceVisible} hide={() => setIsDeviceVisible(false)} />
    </div>
  )
}
