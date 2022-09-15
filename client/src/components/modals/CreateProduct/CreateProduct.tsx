import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { IColorCreate } from '../../../store/reducers/ProductSlice/types'
import FormSelect from '../../FormSelect/FormSelect'
import Modal from '../Modal/Modal'
import FormInput from '../../FormInput/FormInput'
import { ICreateDevice } from './CreateProduct.types'
import { fetchCategories, fetchBrands, createProduct } from '../../../http/productApi'
import productSlice from '../../../store/reducers/ProductSlice/slice'
import FormTextarea from '../../FormTextarea/FormTextarea'

const CreateProduct = ({ hide, ...props }: ICreateDevice) => {
  const dispatch = useAppDispatch()
  const { setTypes, setBrands } = productSlice.actions
  const { categories, brands } = useAppSelector(store => store.product)

  const [description, setDescription] = useState('')
  const [gender, setGender] = useState<string>('')
  const [price, setPrice] = useState(0)
  const [images, setImages] = useState<File[]>([])
  const [CategoryId, setTypeId] = useState(0)
  const [BrandId, setBrandId] = useState(0)

  const [colors, setColor] = useState<IColorCreate[]>([])

  useEffect(() => {
    const getInitialProps = async () => {
      const types = await fetchCategories()
      const brands = await fetchBrands()
      dispatch(setTypes(types))
      dispatch(setBrands(brands))
    }
    if (categories[0] === undefined) {
      getInitialProps()
    }
  }, [])

  const addProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()

    images.forEach(image => formData.append('images', image))
    formData.append('description', description)
    formData.append('price', JSON.stringify(price))
    formData.append('gender', JSON.stringify(gender))
    formData.append('Colors', JSON.stringify(colors))
    formData.append('BrandId', JSON.stringify(BrandId))
    formData.append('CategoryId', JSON.stringify(CategoryId))

    await createProduct(formData)

    setDescription('')
    setGender('')
    setPrice(0)
    setBrandId(0)
    setTypeId(0)
    setColor([])
    setImages([])

    hide()
  }

  const chooseGender = (e: ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value)
  }

  const addColor = () => {
    setColor(colors => [...colors, { hex: '', id: new Date() }])
  }

  const removeColor = (id: Date) => {
    setColor(colors => colors.filter(color => color.id !== id))
  }

  const changeColor = (newValue: string, id: Date) => {
    setColor(
      colors =>
        colors.map((color) => color.id === id ? { ...color, hex: newValue } : color)
    )
  }

  const changeImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return
    const images: File[] = Array.from(e.target.files, file => file)
    setImages(images)
  }

  return (
    <Modal onSubmit={addProduct} hide={hide} {...props}>
      <FormTextarea
        name={'description'}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
        name={'gender'}
        multiple
        onChange={chooseGender}
      >
        <option>{'MEN'}</option>
        <option>{'WOMEN'}</option>
        <option>{'KIDS'}</option>
      </FormSelect>
      <FormSelect
        name={'category'}
        value={CategoryId}
        onChange={(e) => setTypeId(parseInt(e.target.value))}
        required
      >
        {categories.map(({ name, id }) =>
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
        name={'images'}
        type={'file'}
        onChange={changeImages}
        accept={'.png'}
        required
        multiple
      />
      <button type={'button'} onClick={() => addColor()}>{'Add color'}</button>
      <ul>
        {colors.map(({ hex, id }) =>
          <div key={id.toString()}>
            <FormInput
              type={'text'}
              name={'hex'}
              value={hex}
              onChange={(e) =>
                changeColor(e.target.value, id)
              }
              required
            />
            <button onClick={() => removeColor(id)}>{'Cancel'}</button>
          </div>
        )}
      </ul>
    </Modal>
  )
}

export default CreateProduct
