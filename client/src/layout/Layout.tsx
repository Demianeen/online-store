import React, { FunctionComponent } from 'react'
import Header from './Header/Header'
import { ILayoutProps } from './Layout.props'
import styles from './Layout.module.css'
import Footer from './Footer/Footer'

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main} style={{ width: '100%' }}>{ children }</main>
      <Footer />
    </div>
  )
}

const withLayout =
  <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent (props: T) {
      return (
      <Layout>
        <Component {...props}></Component>
      </Layout>
      )
    }
  }

export default withLayout
