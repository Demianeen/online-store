import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { changeItemQuantity, fetchCart } from '../http/cartApi'
import cartSlice from '../store/reducers/CartSlice/slice'
import { Routes } from '../utils/consts'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { setItemQuantity, setItems } = cartSlice.actions
  const { Items, itemsPrice: totalPrice, overallQuantity, taxPercentage, tax } = useAppSelector(store => store.cart)

  const { user } = useAppSelector(store => store.user)

  useEffect(() => {
    const getInitialProps = async () => {
      if (user !== undefined) {
        const cart = await fetchCart(user.id)
        dispatch(setItems(cart.Items))
      } else {
        navigate(Routes.LOGIN_ROUTE)
      }
    }

    getInitialProps()
  }, [])

  const increaseByOne = async (id: number, quantity: number) => {
    const increasedQuantity = quantity + 1

    const changedQuantity = changeItemQuantity(id, increasedQuantity)
    dispatch(setItemQuantity({ id, quantity: increasedQuantity }))

    if (await changedQuantity === null || await changedQuantity === undefined) {
      dispatch(setItemQuantity({ id, quantity }))
    }
  }

  const decreaseByOne = async (id: number, quantity: number) => {
    const decreasedQuantity = quantity - 1

    if (decreasedQuantity < 1) {
      const isDeleteConfirmed = confirm('Do you want to remove this item from cart?')

      if (isDeleteConfirmed) {
        changeItemQuantity(id, decreasedQuantity)
        if (user !== undefined) {
          const cart = await fetchCart(user.id)
          dispatch(setItems(cart.Items))
        }
      }
      return
    }

    const changedQuantity = changeItemQuantity(id, decreasedQuantity)
    dispatch(setItemQuantity({ id, quantity: decreasedQuantity }))

    if (await changedQuantity === null || await changedQuantity === undefined) {
      dispatch(setItemQuantity({ id, quantity }))
      alert('Error occurred')
    }
  }

  if (Items[0] === undefined) {
    return <p>{'Your cart is empty('}</p>
  }

  return (
    <>
      <div>{'Cart'}</div>
      {Items.map(({ id, Product, quantity }) => {
        const parsedImages: string[] = JSON.parse(Product.images)
        const imageIndex = 0
        return <div key={id}>
          <img
            src={process.env.REACT_APP_API_URL + parsedImages[imageIndex]}
            alt={Product.Brand.name + ' ' + Product.Category.name}
          />
          <p>{Product.Brand.name + ' ' + Product.Category.name}</p>
          <button onClick={async () => await increaseByOne(id, quantity)}>{'+'}</button>
          <p>{quantity}</p>
          <button onClick={async () => await decreaseByOne(id, quantity)}>{'-'}</button>
        </div>
      })}
      <div>
        <p><b>{'Tax ' + taxPercentage.toString() + '%: '}</b>{'$' + tax.toString()}</p>
        <p><b>{'Quantity: '}</b>{overallQuantity}</p>
        <p><b>{'Total: '}</b>{'$' + (totalPrice + tax).toString()}</p>
      </div>
    </>
  )
}

export default Cart
