export type NotCreationAttributesKeys = 'id' | 'createdAt' | 'updatedAt'
export type CreationAttributes<T, N extends string = ''> = Omit<T, NotCreationAttributesKeys | N>
