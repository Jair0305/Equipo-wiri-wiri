import { createContext } from 'react'

export const ProductsContext = createContext({ food: [], drinks: [], desserts: [] })

export const ProductsInCartContext = createContext([])
