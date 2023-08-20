import { create } from 'zustand'

import { Image } from '~/types'

type ImageStoreState = {
    images: Image[]
    setImages: (images: Image[]) => void
}

export const ImagesStore = create<ImageStoreState>()(set => ({
    images: [],
    setImages: images => {
        const newImages = images.filter(image => !image.deleted)
        set({ images: newImages })
    },
}))

export const useImages = () => ImagesStore(state => state.images)
export const useSetImages = () => ImagesStore(state => state.setImages)
