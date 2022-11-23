import { selectProductParams } from './../store/reducers/productParamsSlice/productParamsSliceSelectors'
import { EntityId, EntitySelectors, EntityState } from '@reduxjs/toolkit'
import { useEffect, useRef, useState } from 'react'
import { useGetProductsQuery } from '../http/productApi/productApi'
import { IProduct } from '../http/productApi/productApi.types'
import { useAppDispatch, useAppSelector } from './redux'
import { endValues } from '../store/reducers/productParamsSlice/productParamsSliceActions'

type ValueOf<T> = T[keyof T]
type Select = ValueOf<EntitySelectors<IProduct, EntityState<IProduct>>>

const isSelectWithParameters = (select: Select):
  select is (state: EntityState<IProduct>, id: EntityId) => IProduct | undefined => {
  return select !== undefined
}

export const useInfiniteGetProducts = <T extends Select>(
  select: T,
  id: Parameters<T>[1]
) => {
  const dispatch = useAppDispatch()
  const productParams = useAppSelector(selectProductParams)
  const isNeedToReset = useRef(true)

  const [results, setResults] = useState(undefined as ReturnType<T> | undefined)
  const { result } = useGetProductsQuery(productParams, {
    selectFromResult: ({ data }) => {
      if (isSelectWithParameters(select)) {
        return {
          result: ((data !== undefined) ? select(data, id as EntityId) : undefined) as ReturnType<T>
        }
      }

      return {
        result: ((data !== undefined) ? select(data) : undefined) as ReturnType<T>
      }
    }
  })

  useEffect(() => {
    if (result !== undefined) {
      if (isNeedToReset.current) {
        setResults(result)
        isNeedToReset.current = false
      } else {
        if (Array.isArray(result)) {
          if (result.length !== 0) {
            // TODO: Fix problems with types
            // @ts-expect-error
            setResults((results = []) => [...results, ...result])
          } else {
            dispatch(endValues())
          }
        } else if (typeof result === 'object') {
          if (Object.keys(result).length === 0) {
            dispatch(endValues())
          } else if ('id' in result) {
            // eslint-disable-next-line
            // @ts-ignore
            setResults(result as IProduct)
          } else {
            // @ts-expect-error
            setResults((results = []) => ({ ...results, ...result }))
          }
        } else {
          if (result !== 0) {
            setResults(result)
          } else {
            dispatch(endValues())
          }
        }
      }
    }
  }, [result])

  useEffect(() => {
    isNeedToReset.current = true
  }, [productParams.selectedGender])

  return results
}
