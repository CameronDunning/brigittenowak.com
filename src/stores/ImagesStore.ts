import { create } from 'zustand'

import { Image, ImageOrder } from '~/types'

type ImageStoreState = {
    images: Image[]
    oilsOrder: ImageOrder
    eggTemperaOrder: ImageOrder
    serigraphsOrder: ImageOrder
    setImages: (images: Image[]) => void
    setOilsOrder: (order: ImageOrder) => void
    setEggTemperaOrder: (order: ImageOrder) => void
    setSerigraphsOrder: (order: ImageOrder) => void
}

const ImagesStore = create<ImageStoreState>()(set => ({
    images: [],
    oilsOrder: [],
    eggTemperaOrder: [],
    serigraphsOrder: [],
    setImages: images => {
        const newImages = images.filter(image => !image.deleted)
        set({ images: newImages })
    },
    setOilsOrder: oilsOrder => {
        set({ oilsOrder })
    },
    setEggTemperaOrder: eggTemperaOrder => {
        set({ eggTemperaOrder })
    },
    setSerigraphsOrder: serigraphsOrder => {
        set({ serigraphsOrder })
    },
}))

export const useImages = () => ImagesStore(state => state.images)
export const useSetImages = () => ImagesStore(state => state.setImages)
