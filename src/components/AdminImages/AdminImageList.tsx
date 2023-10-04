import { Box, useToast } from '@chakra-ui/react'
import { ref, set } from 'firebase/database'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'

import { AdminImage } from '~/components/AdminImages/AdminImage'
import { StrictModeDroppable as Droppable } from '~/components/StrictModeDroppable'
import { db } from '~/config/firebase'
import { useImages, useRawImages } from '~/stores/ImagesStore'
import { Image, TypeOptions } from '~/types'

export const AdminImageList = ({ type }: { type: TypeOptions }) => {
    const toast = useToast()

    const images = useImages()
    const rawImages = useRawImages()
    const typeImages = images.filter(image => image.type === type).sort((a, b) => a.order - b.order)

    const reorder = (list: Image[], startIndex: number, endIndex: number) => {
        let result = list
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        result.forEach((image: Image, index: number) => {
            image.order = index + 1
        })

        return result
    }

    const handleDragEnd = (result: any) => {
        if (!result.destination) return

        const newImages = reorder(typeImages, result.source.index, result.destination.index)

        // replace the old images with the new images
        let newImageObject = rawImages
        newImages.forEach((image: Image) => {
            newImageObject[image.id] = image
        })

        const testingFolder =
            import.meta.env.MODE === 'test' || window.Cypress || import.meta.env.VITE_CLOUDINARY_FOLDER.includes('testing') ? '-testing' : ''
        const imageListRef = ref(db, `/images${testingFolder}`)
        set(imageListRef, newImageObject)
            .then(() => {
                toast({
                    title: 'Reorder Successful',
                    description: 'Imags have been re-ordered',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            })
            .catch(error => {
                console.error('error', error)
                toast({
                    title: 'Error Reordering Images',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            })
    }

    return (
        <DragDropContext onDragEnd={result => handleDragEnd(result)}>
            <Droppable droppableId="images">
                {(provided, _) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} style={styles.droppableContainer}>
                        {typeImages.map((image, index) => (
                            <Draggable draggableId={image.id} key={image.id} index={index}>
                                {provided => (
                                    <Box {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} bg="#59728e">
                                        <AdminImage key={image.id} image={image} />
                                    </Box>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

const styles = {
    droppableContainer: {
        width: '100%',
    },
    DraggableContainer: {
        opacity: 1,
        backgroundColor: 'white',
    },
}
