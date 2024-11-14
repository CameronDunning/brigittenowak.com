import { TYPES } from './config/constants'

// YYYY-MM-DD type check
type oneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type zeroToNine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type YYYY = `19${zeroToNine}${zeroToNine}` | `20${zeroToNine}${zeroToNine}`
type MM = `0${oneToNine}` | `1${0 | 1 | 2}`
type DD = `0${oneToNine}` | `${1 | 2}${zeroToNine}` | `30` | `31`
export type DateString = `${YYYY}-${MM}-${DD}`

export const isDateString = (date: string) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    return dateRegex.test(date)
}

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

export type ImagesObject = { [key: string]: Image }

export type Event = {
    id: string
    title: string
    issueDate: DateString | null
    expiryDate: DateString
    date: DateString
    deleted: boolean
    imageUrl: string
    height: number
    width: number
}
