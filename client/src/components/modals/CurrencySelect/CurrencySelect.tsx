import React, { useEffect } from 'react'
import { ICurrencySelect } from './CurrencySelect.types'
import { ReactComponent as DownArrow } from './DownArrow.svg'
import styles from './CurrencySelect.module.css'
import cn from 'classnames'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { changeCurrency } from '../../../store/reducers/currencySlice/currencySliceActions'
import { selectCurrency, selectCurrencyOptions, selectCurrencySymbol } from '../../../store/reducers/currencySlice/currencySliceSelectors'
import { getCurrencySymbol } from '../../../store/reducers/currencySlice/currencySlice'
import Overlay from '../../Overlay/Overlay'
import useLockScroll from '../../../hooks/useLockScroll'

const CurrencySelect = ({ isOpen, setIsOpen, className, ...props }: ICurrencySelect) => {
  const dispatch = useAppDispatch()
  const symbol = useAppSelector(selectCurrencySymbol)
  const options = useAppSelector(selectCurrencyOptions)
  const selectedCurrency = useAppSelector(selectCurrency)

  const [disableScroll, allowScroll] = useLockScroll()

  const handleChangeCurrency = (currency: string) => {
    setIsOpen(false)
    dispatch(changeCurrency(currency))
  }

  useEffect(() => {
    if (isOpen) {
      disableScroll()
    } else {
      allowScroll()
    }
  }, [isOpen])

  return (
    <div
      className={cn(styles.select, className)}
      {...props}
    >
      <button
        onClick={() => setIsOpen(isOpen => !isOpen)}
        className={styles.selectButton}
      >
        {symbol}
        <DownArrow className={cn(styles.downArrow, {
          [styles.upArrow]: isOpen
        })} />
      </button>

      {isOpen &&
        <>
          <Overlay onClick={() => setIsOpen(false)} className={styles.overlay} />
          <div className={styles.dropListContainer}>
            <ul className={styles.ul}>
              {options.map(currency =>
                <li key={currency}>
                  <button
                    onClick={() => handleChangeCurrency(currency)}
                    className={cn(styles.li, {
                      [styles.selectedLi]: currency === selectedCurrency
                    })}
                  >
                    {getCurrencySymbol(currency) + ' ' + currency}
                  </button>
                </li>
              )
              }
            </ul>
          </div>
        </>
      }
    </div>
  )
}

export default CurrencySelect
