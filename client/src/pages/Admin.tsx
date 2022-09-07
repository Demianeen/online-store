import React, { useState } from 'react'
import CreateBrand from '../components/modals/CreateBrand/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice/CreateDevice'
import CreateType from '../components/modals/CreateType/CreateType'

export const Admin = () => {
  const [isTypeVisible, setIsTypeVisible] = useState(false)
  const [isBrandVisible, setIsBrandVisible] = useState(false)
  const [isDeviceVisible, setIsDeviceVisible] = useState(false)

  return (
    <div>
      <button onClick={() => setIsTypeVisible(true)}>{'Add type'}</button>
      <CreateType hide={() => setIsTypeVisible(false)} isVisible={isTypeVisible} />

      <button onClick={() => setIsBrandVisible(true)}>{'Add brand'}</button>
      <CreateBrand hide={() => setIsTypeVisible(false)} isVisible={isBrandVisible} />

      <button onClick={() => setIsDeviceVisible(true)}>{'Add device'}</button>
      <CreateDevice hide={() => setIsDeviceVisible(false)} isVisible={isDeviceVisible} />
    </div>
  )
}
