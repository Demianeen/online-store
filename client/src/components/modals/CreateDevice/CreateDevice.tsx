import React, { FormEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { IInfoCreate } from '../../../store/reducers/DeviceSlice/types'
import FormSelect from '../../FormSelect/FormSelect'
import Modal from '../Modal/Modal'
import FormInput from '../../FormInput/FormInput'
import { ICreateDevice } from './CreateDevice.types'
import { fetchTypes, fetchBrands, createDevice } from '../../../http/deviceApi'
import deviceSlice from '../../../store/reducers/DeviceSlice/slice'
import axios, { AxiosError } from 'axios'
import { IApiError } from '../../../pages/Auth'

const CreateDevice = ({ hide, ...props }: ICreateDevice) => {
  const dispatch = useAppDispatch()
  const { setTypes, setBrands } = deviceSlice.actions
  const { types, brands } = useAppSelector(store => store.device)

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [img, setImg] = useState<File | ''>('')
  const [TypeId, setTypeId] = useState(0)
  const [BrandId, setBrandId] = useState(0)

  const [info, setInfo] = useState<IInfoCreate[]>([])

  useEffect(() => {
    const getInitialProps = async () => {
      const types = await fetchTypes()
      const brands = await fetchBrands()
      dispatch(setTypes(types))
      dispatch(setBrands(brands))
    }
    if (types[0] === undefined) {
      getInitialProps()
    }
  }, [])

  const addDevice = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      // TODO: Add typing
      await createDevice({ name, price, img: (img as File), info: JSON.stringify(info), BrandId, TypeId })

      setName('')
      setPrice(0)
      setImg('')
      setBrandId(0)
      setTypeId(0)
      setInfo([])

      hide()
    } catch (error) {
      if (axios.isAxiosError(error) && (error.response !== undefined)) {
        // TODO: Process axios error without new variable
        const axiosError = error as AxiosError<IApiError>
        console.log(axiosError)

        return
      } else if (error instanceof Error) {
        alert(error)
      }
      alert('Internal error. Try again later')
    }
  }

  const addInfo = () => {
    setInfo([...info, { title: '', desc: '', id: new Date() }])
  }

  const removeInfo = (id: Date) => {
    setInfo(info => info.filter(item => item.id !== id))
  }

  const changeInfo = (key: 'title' | 'desc', newValue: string, id: Date) => {
    setInfo(
      info =>
        info.map((elem) => elem.id === id ? { ...elem, [key]: newValue } : elem)
    )
  }

  return (
    <Modal onSubmit={addDevice} hide={hide} {...props}>
      <FormInput
        name={'name'}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <FormInput
        name={'price'}
        type={'number'}
        value={price}
        onChange={(e) => setPrice(parseInt(e.target.value))}
        required
      />
      <FormSelect
        name={'type'}
        value={TypeId}
        onChange={(e) => setTypeId(parseInt(e.target.value))}
        required
      >
        {types.map(({ name, id }) =>
          <option value={id} key={id}>{name}</option>
        )}
      </FormSelect>
      <FormSelect
        name={'brand'}
        value={BrandId}
        onChange={(e) => setBrandId(parseInt(e.target.value))}
        required
      >
        {brands.map(({ name, id }) =>
          <option value={id} key={id}>{name}</option>
        )}
      </FormSelect>
      <FormInput
        name={'img'}
        type={'file'}
        onChange={(e) => setImg((e.target.files != null) ? e.target.files[0] : '')}
        accept={'.jpg'}
        required
      />
      <button type={'button'} onClick={() => addInfo()}>{'Add info'}</button>
      <ul>
        {info.map(({ title, desc, id }) =>
          <div key={id.toString()}>
            <FormInput
              type={'text'}
              name={'title'}
              value={title}
              onChange={(e) =>
                changeInfo('title', e.target.value, id)
              }
              required
            />
            <FormInput
              type={'text'}
              name={'desc'}
              value={desc}
              onChange={(e) =>
                changeInfo('desc', e.target.value, id)
              }
              required
            />
            <button onClick={() => removeInfo(id)}>{'Cancel'}</button>
          </div>
        )}
      </ul>
    </Modal>
  )
}

export default CreateDevice
