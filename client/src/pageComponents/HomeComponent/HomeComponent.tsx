import React from 'react'
import About from '../../components/About/About'
import SelectGenderGallery from '../../components/SelectGenderGallery/SelectGenderGallery'
import styles from './HomeComponent.module.css'

const HomeComponent = () => {
  return (
    <>
      <SelectGenderGallery />
      <hr className={styles.hr} />
      <About />
    </>
  )
}

export default HomeComponent
