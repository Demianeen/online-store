/** We can't store class instances like Date in redux */
export interface IRawMeta {
  id: number

  createdAt: string
  updatedAt: string
}

/** We can't store class instances like Date in redux */
export interface IParsedMeta {
  id: number

  createdAt: number
  updatedAt: number
}
