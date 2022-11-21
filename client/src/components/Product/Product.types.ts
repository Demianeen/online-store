import { EntityId } from '@reduxjs/toolkit'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
export interface IProduct extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  productId: EntityId
}
