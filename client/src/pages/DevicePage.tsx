import React from 'react'
import { IDevice } from '../store/reducers/DeviceSlice/types'

const DevicePage = () => {
  const { img, price, rating, name }: IDevice = { id: 1, BrandId: 1, TypeId: 1, img: 'https://media.currys.biz/i/currysprod/10236204?$l-large$&fmt=auto', name: 'iphone 13', price: 799, rating: 4, createdAt: new Date(), updatedAt: new Date() }
  const desc = [
    { id: 1, title: 'RAM', text: '5GB' },
    { id: 2, title: 'Memory', text: '128GB' },
    { id: 3, title: 'Camera', text: '12Mp' },
    { id: 4, title: 'Processor', text: 'A13 Bionic' }
  ]
  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '3fr 6fr'
      }}>
        <img src={img} alt={name} />
        <div>
          <h2>{name}</h2>
          <p>{'Rating: '}{rating}</p>
          <p>{price}{'$'}</p>
          <button>{'Add to Basket'}</button>
        </div>
      </div>
      <div>
        <ul style={{ listStyle: 'none' }}>
          {desc.map(({ id, title, text }) =>
            <li key={id}>{title}{': '}{text}</li>
          )}
        </ul>

      </div>
    </div>
  )
}

export default DevicePage
