import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

export interface IFullSizeImage extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  src: string
}
