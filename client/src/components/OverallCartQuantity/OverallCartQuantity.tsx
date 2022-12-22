import React from 'react'
import { selectCartOverallQuantity } from '../../http/cartApi/cartApiSelectors'
import { RootState } from '../../store/store'
import { connect, ConnectedProps } from 'react-redux'

const mapStateToProps = (state: RootState) => ({
  quantity: selectCartOverallQuantity(state)
})

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

class OverallCartQuantity extends React.Component<PropsFromRedux> {
  render (): React.ReactNode {
    return <>{this.props.quantity}</>
  }
}

export default connector(OverallCartQuantity)
