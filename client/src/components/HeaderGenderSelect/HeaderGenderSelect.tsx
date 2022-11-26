import React from 'react'
import styles from './HeaderGenderSelect.module.css'
import cn from 'classnames'
import { IFullSizeImage } from './HeaderGenderSelect.types'
import { Gender } from '../../http/categoryApi/categoryApi.types'
import { selectGender } from '../../store/reducers/productParamsSlice/productParamsSliceActions'
import { selectProductGender } from '../../store/reducers/productParamsSlice/productParamsSliceSelectors'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

const HeaderGenderSelect = ({ className, ...props }: IFullSizeImage) => {
  const selectedGender = useAppSelector(selectProductGender)
  const dispatch = useAppDispatch()

  const handleGenderSelect = (value: Gender) => {
    dispatch(selectGender(value))
  }

  return (
    <div className={cn(styles.genderContainer, className)}>
      <button
        className={cn(styles.genderButton, {
          [styles.selectedGenderButton]: selectedGender === 'WOMEN'
        })}
        onClick={() => handleGenderSelect('WOMEN')}
      >
        {'WOMEN'}
      </button>
      <button
        className={cn(styles.genderButton, {
          [styles.selectedGenderButton]: selectedGender === 'MEN'
        })}
        onClick={() => handleGenderSelect('MEN')}
      >
        {'MEN'}
      </button>
      <button
        className={cn(styles.genderButton, {
          [styles.selectedGenderButton]: selectedGender === 'KIDS'
        })}
        onClick={() => handleGenderSelect('KIDS')}
      >
        {'KIDS'}
      </button>
    </div>
  )
}

export default HeaderGenderSelect
