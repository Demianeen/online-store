import { EntityId } from '@reduxjs/toolkit'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface ICartComponentItem extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  cartItemId: EntityId
}
