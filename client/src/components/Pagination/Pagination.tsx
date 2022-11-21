import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { nextPage } from '../../store/reducers/productParamsSlice/productParamsSliceActions'
import { IPagination } from './Pagination.types'

const Pagination = ({ ...props }: IPagination) => {
  const productParams = useAppSelector(state => state.productParams)
  const amountOfPages = 5

  const dispatch = useAppDispatch()

  const pages: number[] = []
  for (let pageNumber = 0; pageNumber < amountOfPages; pageNumber++) {
    pages.push(pageNumber + 1)
  }

  return (
    <nav {...props}>
      <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'row' }}>
        {pages.map(el =>
          <li
            style={{
              background: el === productParams.page ? 'black' : 'white',
              color: el === productParams.page ? 'white' : 'black',
              padding: '10px 15px',
              border: '2px solid black',
              margin: '15px',
              cursor: 'pointer'
            }
          }
            // there is no set page any more, next commit will be implementing infinite scroll
            onClick={() => dispatch(nextPage())}
            key={el}
          >{el}</li>
        )
        }
      </ol>

    </nav>
  )
}

export default Pagination
