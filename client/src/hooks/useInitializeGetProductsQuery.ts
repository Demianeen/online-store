import { endValues, toggleIsNeedToResetState } from './../store/reducers/productParamsSlice/productParamsSliceActions'
import { useEffect } from 'react'
import { useGetProductsQuery } from '../http/productApi/productApi'
import { selectIsNeedToResetProductState, selectProductParams } from '../store/reducers/productParamsSlice/productParamsSliceSelectors'
import { addProducts, setProducts } from '../store/reducers/productSlice/productSlice'
import { useAppDispatch, useAppSelector } from './redux'

export const useInitializeGetProductsQuery = () => {
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
}
