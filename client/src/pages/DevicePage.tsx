import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchOneDevice } from '../http/deviceApi'
import { IDevice } from '../store/reducers/DeviceSlice/types'

const DevicePage = () => {
  const [device, setDevice] = useState<IDevice | undefined>(undefined)
  // const desc = []
  const { id } = useParams<'id'>()

  useEffect(() => {
    const getInitialProps = async () => {
      if (id !== undefined) {
        const fetchedDevice = await fetchOneDevice(parseInt(id))
        setDevice(fetchedDevice)
      }
    }
    getInitialProps()
  }, [])

  if (device === undefined) {
    return <p>{'Loading...'}</p>
  }

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '3fr 6fr'
      }}>
        <img src={process.env.REACT_APP_API_URL + device.img} alt={device.name} />
        <div>
          <h2>{device.name}</h2>
          <p>{'Rating: '}{device.rating}</p>
          <p>{device.price}{'$'}</p>
          <button>{'Add to Basket'}</button>
        </div>
      </div>
      <div>
        <ul style={{ listStyle: 'none' }}>
          {device.info?.map(({ id, title, desc: text }) =>
            <li key={id}>{title}{': '}{text}</li>
          )}
        </ul>

      </div>
    </div>
  )
}

export default DevicePage
