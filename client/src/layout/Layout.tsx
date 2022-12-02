import React, { FunctionComponent } from 'react'
import Header from './Header/Header'
import { ILayoutProps } from './Layout.props'
import styles from './Layout.module.css'
import { Routes } from '../utils/consts'
import { useLocation } from 'react-router-dom'
import cn from 'classnames'
import Footer from './Footer/Footer'

const Layout = ({ children }: ILayoutProps) => {
  const { pathname } = useLocation()
  const isHomePage = pathname === Routes.HOME_ROUTE

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={cn(styles.main, {
        [styles.disablePadding]: isHomePage
      })}>{children}</main>
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
