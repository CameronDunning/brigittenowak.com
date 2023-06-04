import { useImages } from '~/stores/ImagesStore'
import { TypeOptions } from '~/types'
import { AdminImage } from './AdminImage'

type ListProps = {
    type: TypeOptions
}

export const AdminImageList = ({ type }: ListProps) => {
    const images = useImages()
    const typeImages = images.filter(image => image.type === type)

    return (
        <>
            {typeImages.map(image => (
                <AdminImage key={image.id} image={image} />
            ))}
        </>
    )
}
