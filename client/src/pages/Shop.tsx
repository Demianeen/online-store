import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceApi'
import deviceSlice from '../store/reducers/DeviceSlice/slice'
import { Routes } from '../utils/consts'

const Shop = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const { setTypes, setBrands, setDevices, selectType, selectBrand } = deviceSlice.actions
  const { devices, types, selectedType, brands, selectedBrand } =
    useAppSelector(store => store.device)

  useEffect(() => {
    const getInitialProps = async () => {
      // eslint-disable-next-line
      const types = await fetchTypes()
      const brands = await fetchBrands()
      const devicesAndCount = await fetchDevices()
      dispatch(setTypes(types))
      dispatch(setBrands(brands))
      dispatch(setDevices(devicesAndCount.rows))
    }
    getInitialProps()
  }, [])

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      width: '100%'
    }}>
      {/* Types bar */}
      <ul>
        {types.map(({ id, name }) =>
          <li
            onClick={() => dispatch(selectType(name))}
            key={id}
            style={selectedType === name
              ? {
                  background: 'black',
                  color: 'white',
                  cursor: 'pointer'
                }
              : {
                  cursor: 'pointer'
                }
            }
          >{name}</li>
        )}
      </ul>
      <div>
        {/* Brands bar */}
        <div style={{ flexShrink: '2' }}>
          <ul style={{
            display: 'flex',
            flexDirection: 'row',
            listStyle: 'none'
          }}>
            {brands.map(({ id, name }) =>
              <li
                onClick={() => dispatch(selectBrand(name))}
                key={id}
                style={{
                  background: selectedBrand === name ? 'black' : 'white',
                  color: selectedBrand === name ? 'white' : 'black',
                  cursor: 'pointer',
                  padding: 15
                }}
              >{name}</li>
            )}
          </ul>
        </div>

        {/* Devices bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: 25,
          padding: '0 50px 50px 50px',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {devices.map(({ id, name, img, price }) =>
            <div
              onClick={() => navigate(`${Routes.DEVICE_ROUTE}/${id}`)}
              key={id}
              style={{
                cursor: 'pointer',
                margin: 15,
                padding: 15,
                border: '2px solid black',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <img src={process.env.REACT_APP_API_URL + img} alt={name} style={{ width: '100%' }} />
              <p>{name}</p>
              <p>{price}{'$'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Shop
