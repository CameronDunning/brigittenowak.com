import { useImages } from '~/stores/ImagesStore'
import { AdminImage } from '~/components/AdminImages/AdminImage'
import { TypeOptions } from '~/types'

export const AdminImageList = ({ type }: { type: TypeOptions }) => {
    const images = useImages()
    const typeImages = images.filter(image => image.type === type).sort((a, b) => a.order - b.order)

    return (
        <>
            {typeImages.map(image => (
                <AdminImage key={image.id} image={image} />
            ))}
        </>
    )
}
