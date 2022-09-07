import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import deviceSlice from '../../store/reducers/DeviceSlice/slice'
import { IPagination } from './Pagination.types'

const Pagination = ({ ...props }: IPagination) => {
  const { amountOfDevices, limit, page } = useAppSelector(store => store.device)
  const dispatch = useAppDispatch()
  const { setPage } = deviceSlice.actions
  const amountOfPages = Math.ceil(amountOfDevices / limit)

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
              background: el === page ? 'black' : 'white',
              color: el === page ? 'white' : 'black',
              padding: '10px 15px',
              border: '2px solid black',
              margin: '15px',
              cursor: 'pointer'
            }
          }
            onClick={() => dispatch(setPage(el))}
            key={el}
          >{el}</li>
        )
        }
      </ol>

    </nav>
  )
}

export default Pagination
