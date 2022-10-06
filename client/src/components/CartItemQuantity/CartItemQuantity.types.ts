import { EntityId } from '@reduxjs/toolkit'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface ICartItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  cartItemId: EntityId
}
