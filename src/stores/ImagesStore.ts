import { create } from 'zustand'

export type ImageType = {
    id: string
    url: string
    title: string
    type: string
    dimensions: string
    otherText: string
    sold: boolean
    deleted: boolean
    hidden: boolean
    height: number
    width: number
}

type Images = {
    [key: string]: ImageType
}

type ImageStoreState = {
    images: Images
    setImages: (images: any) => void
}

const ImagesStore = create<ImageStoreState>()(set => ({
    images: {},
    setImages: (images: any) => set({ images }),
}))

export const useImages = () => ImagesStore(state => state.images)
export const useSetImages = () => ImagesStore(state => state.setImages)
