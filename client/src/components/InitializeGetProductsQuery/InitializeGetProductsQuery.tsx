import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useGetProductsQuery } from '../../http/productApi/productApi'
import { toggleIsNeedToResetState, endValues } from '../../store/reducers/productParamsSlice/productParamsSliceActions'
import { selectProductParams, selectIsNeedToResetProductState } from '../../store/reducers/productParamsSlice/productParamsSliceSelectors'
import { addProducts, setProducts } from '../../store/reducers/productSlice/productSlice'

const InitializeGetProductsQuery = () => {
  const dispatch = useAppDispatch()
  const params = useAppSelector(selectProductParams)
  const isNeedToResetState = useAppSelector(selectIsNeedToResetProductState)
  const { data, isSuccess } = useGetProductsQuery(params)

  useEffect(() => {
    if (isSuccess) {
      if (!isNeedToResetState) {
        dispatch(addProducts(data))
      } else {
        dispatch(setProducts(data))
        dispatch(toggleIsNeedToResetState())
      }
    }
    if (data?.length === 0) {
      dispatch(endValues())
    }
  }, [data])

  return (
    <></>
  )
}

export default InitializeGetProductsQuery
