export type NotCreationAttributesKeys = 'id' | 'createdAt' | 'updatedAt'
export type CreationAttributes<T, N extends string = ''> = Omit<T, NotCreationAttributesKeys | N>

// Cart and Product only
export type parsedSize = 'XS' | 'S' | 'M' | 'L' | 'XL'
