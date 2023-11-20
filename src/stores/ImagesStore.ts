import { create } from 'zustand'

import { Image, ImagesObject } from '~/types'

type ImageStoreState = {
    images: Image[]
    rawImages: { [key: string]: Image }
    setImages: (imagesObject: ImagesObject) => void
}

export const ImagesStore = create<ImageStoreState>()(set => ({
    images: [],
    rawImages: {},
    setImages: rawImages => {
        const images = Object.values(rawImages).filter(image => !image.deleted)
        set({ rawImages, images })
    },
}))

export const useImages = () => ImagesStore(state => state.images)
export const useRawImages = () => ImagesStore(state => state.rawImages)
export const useSetImages = () => ImagesStore(state => state.setImages)
