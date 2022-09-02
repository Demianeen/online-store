import React, { useState } from 'react'
import { useAppSelector } from '../../../hooks/redux'
import { IInfo } from '../../../store/reducers/DeviceSlice/types'
// import { IInfo } from '../../../store/reducers/DeviceSlice/types'
import FormSelect from '../../FormSelect/FormSelect'
import Modal from '../Modal/Modal'
import ModalItem from '../ModalItem/ModalItem'
import { ICreateDevice } from './CreateDevice.types'

const CreateDevice = ({ ...props }: ICreateDevice) => {
  const { types, brands } = useAppSelector(store => store.device)
  const [info, setInfo] = useState<IInfo[]>([])

  // const addInfo = (title: string, text: string) => {
  //   setInfo([...info, { title, text, id: info.length }])
  // }

  const addInfo = () => {
    setInfo([...info, { title: '', text: '', id: info.length }])
  }

  const removeInfo = (id: number) => {
    setInfo(info => info.filter(item => item.id !== id))
  }

  return (
    <Modal {...props}>
      <ModalItem name={'name'} />
      <ModalItem name={'price'} />
      <ModalItem name={'rating'} />
      <FormSelect name={'type'}>
        {types.map(({ name, id }) =>
          <option value={name} key={id}>{name}</option>
        )}
      </FormSelect>
      <FormSelect name={'brand'}>
        {brands.map(({ name, id }) =>
          <option value={name} key={id}>{name}</option>
        )}
      </FormSelect>
      <ModalItem name={'img'} type={'file'} />
      <button type={'button'} onClick={() => addInfo()}>{'Add info'}</button>
      <ul>
        {info.map(({ title, text, id }) =>
          <div key={id}>
            <label htmlFor={'title'}></label>
            <input type={'text'} name={'title'} id={'title'} />
            <label htmlFor={'text'}></label>
            <input type={'text'} name={'text'} id={'text'} />
            <button type={'button'}>{'Add'}</button>
            <button onClick={() => removeInfo(id)}>{'Cancel'}</button>
          </div>
        )}
      </ul>
    </Modal>
  )
}

export default CreateDevice
