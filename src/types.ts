import { TYPES } from './config/constants'

export type TypeOptions = (typeof TYPES)[number]

export type Image = {
    id: string
    url: string
    title: string
    type: TypeOptions
    dimensions: string
    otherText: string
    sold: boolean
    deleted: boolean
    hidden: boolean
    height: number
    width: number
    order: number
}
