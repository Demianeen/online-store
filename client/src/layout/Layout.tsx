import React, { FunctionComponent } from 'react'
import Header from './Header/Header'
import { ILayoutProps } from './Layout.props'

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div>
      <Header />
      <main>{ children }</main>
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
