export type NotCreationAttributes = 'id' | 'updatedAt' | 'createdAt'
export type CreationAttributes<T, N extends string = ''> = Omit<T, NotCreationAttributes | N>
