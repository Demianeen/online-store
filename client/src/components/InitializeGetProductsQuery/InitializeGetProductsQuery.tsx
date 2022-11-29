import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useGetProductsQuery } from '../../http/productApi/productApi'
import { endValues } from '../../store/reducers/productParamsSlice/productParamsSliceActions'
import { selectProductParams } from '../../store/reducers/productParamsSlice/productParamsSliceSelectors'
import { addProducts } from '../../store/reducers/productSlice/productSlice'

const InitializeGetProductsQuery = () => {
  const dispatch = useAppDispatch()
  const params = useAppSelector(selectProductParams)
  const { data, isSuccess } = useGetProductsQuery(params)

  useEffect(() => {
    if (isSuccess) {
      if (data?.length !== 0) {
        dispatch(addProducts(data))
      } else {
        dispatch(endValues())
      }
    }
  }, [data])

  return (
    <></>
  )
}

export default InitializeGetProductsQuery
