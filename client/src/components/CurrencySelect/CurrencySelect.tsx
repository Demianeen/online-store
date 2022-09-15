import React, { useRef, useState } from 'react'
import { ICurrencySelect } from './CurrencySelect.types'
import { ReactComponent as DownArrow } from './DownArrow.svg'
import styles from './CurrencySelect.module.css'
import cn from 'classnames'

const CurrencySelect = ({ className, ...props }: ICurrencySelect) => {
  const [selectedOption, setSelectedOption] = useState<string>('$')
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false)

  const currencyNames = useRef(['USD', 'EUR', 'JPY'])

  const selectCurrency = (currencySymbol: string) => {
    setIsSelectOpen(false)
    setSelectedOption(currencySymbol)
  }

  const getCurrencySymbol = (locale: string, currency: string) =>
    (0).toLocaleString(locale, { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).replace(/\d/g, '').trim()

  return (
    <div
      className={cn(styles.select, className)}
      {...props}
    >
      <button
        onClick={() => setIsSelectOpen(isSelectOpen => !isSelectOpen)}
        className={styles.selectButton}
      >
        {selectedOption}
        <DownArrow className={cn(styles.downArrow, {
          [styles.upArrow]: isSelectOpen
        })} />
      </button>

      {isSelectOpen &&
        <>
        <div
          className={styles.overlay}
          onClick={() => setIsSelectOpen(false)}
        ></div>
        <div className={styles.dropListContainer}>
          <ul className={styles.ul}>
            {currencyNames.current.map(currencyName => {
              const symbol = getCurrencySymbol('EN-bg', currencyName)

              return (
                <li key={currencyName}>
                  <button
                    onClick={() => selectCurrency(symbol)}
                    className={cn(styles.li, {
                      [styles.selectedLi]: selectedOption === symbol
                    })}
                  >
                    {symbol + ' ' + currencyName}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </>
        }
    </div>
  )
}

export default CurrencySelect
