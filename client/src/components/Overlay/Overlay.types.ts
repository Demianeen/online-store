import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface IOverlay extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isVisible?: boolean
}
