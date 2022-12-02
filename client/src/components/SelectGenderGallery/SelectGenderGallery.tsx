import React from 'react'
import styles from './SelectGenderGallery.module.css'
import cn from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Gender } from '../../http/categoryApi/categoryApi.types'
import { selectGender } from '../../store/reducers/productParamsSlice/productParamsSliceActions'
import { Routes } from '../../utils/consts'
import { selectProductGender } from '../../store/reducers/productParamsSlice/productParamsSliceSelectors'

const SelectGenderGallery = () => {
  const selectedGender = useAppSelector(selectProductGender)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleGenderSelect = (value: Gender) => {
    if (value !== selectedGender) dispatch(selectGender(value))
    navigate(Routes.SHOP_ROUTE)
  }

  return (
    <section className={styles.gallery}>
      <Link
        to={Routes.SHOP_ROUTE}
        onClick={() => handleGenderSelect('WOMEN')}
        className={styles.link}
      >
        <span
          className={cn(styles.button, styles.women)}
          role={'button'}
        >
          <span className={styles.overlay}>
            {'Women'}
          </span>
        </span>
      </Link>
      <Link
        to={Routes.SHOP_ROUTE}
        onClick={() => handleGenderSelect('MEN')}
        className={styles.link}
      >
        <span
          className={cn(styles.button, styles.men)}
          role={'button'}
        >
          <span className={styles.overlay}>
            {'Men'}
          </span>
        </span>
      </Link>
      <Link
        to={Routes.SHOP_ROUTE}
        onClick={() => handleGenderSelect('KIDS')}
        className={styles.link}
      >
        <span
          className={cn(styles.button, styles.kids)}
          role={'button'}
        >
          <span className={styles.overlay}>
            {'Kids'}
          </span>
        </span>
      </Link>
    </section>
  )
}

export default SelectGenderGallery
