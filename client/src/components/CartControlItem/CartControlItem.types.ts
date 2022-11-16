import { EntityId } from '@reduxjs/toolkit'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface ICartControlItem extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  cartItemId: EntityId
}
