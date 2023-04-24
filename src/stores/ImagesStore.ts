import { create } from 'zustand'
import { CATEGORIZED_IMAGES } from '~/config/constants'

import { CategorizedImages, Images, Image } from '~/types'

type ImageStoreState = {
    images: CategorizedImages
    oils: Image[]
    eggTempera: Image[]
    serigraphs: Image[]
    setImages: (images: Images) => void
}

const ImagesStore = create<ImageStoreState>()(set => ({
    images: CATEGORIZED_IMAGES as CategorizedImages,
    oils: [],
    eggTempera: [],
    serigraphs: [],
    setImages: (images: Images) => {
        let newImages = CATEGORIZED_IMAGES as CategorizedImages
        Object.keys(images).forEach(key => {
            const image = images[key]
            const { type } = image
            newImages[type][key] = image
        })
        set({
            images: newImages,
            oils: Object.values(newImages.oils),
            eggTempera: Object.values(newImages.eggTempera),
            serigraphs: Object.values(newImages.serigraphs),
        })
    },
}))

export const useImages = () => ImagesStore(state => state.images)
export const useOils = () => ImagesStore(state => state.oils)
export const useEggTempera = () => ImagesStore(state => state.eggTempera)
export const useSerigraphs = () => ImagesStore(state => state.serigraphs)
export const useSetImages = () => ImagesStore(state => state.setImages)
