import {
    Button,
    ButtonGroup,
    HStack,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useMediaQuery,
} from '@chakra-ui/react'
import { ref, set } from 'firebase/database'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { FaCircle } from 'react-icons/fa'
import { FiCircle } from 'react-icons/fi'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { TiPencil } from 'react-icons/ti'

import { db } from '~/config/firebase'
import { ImageUploadForm } from '~/components/AdminImages/ImageUploadForm'
import { useImages } from '~/stores/ImagesStore'
import { Image } from '~/types'

export const Actions = ({ image }: { image: Image }) => {
    const [isMobile] = useMediaQuery('(max-width: 768px)')
    const { isOpen, onOpen, onClose } = useDisclosure()

    const images = useImages()

    const folder = import.meta.env.MODE === 'test' || window.Cypress || import.meta.env.VITE_CLOUDINARY_FOLDER.includes('testing') ? '-testing' : ''
    const imageRef = ref(db, `/images${folder}/${image.id}`)

    const toggleHidden = () => {
        set(imageRef, { ...image, hidden: !image.hidden })
    }

    const toggleSold = () => {
        set(imageRef, { ...image, sold: !image.sold })
    }

    const markDeleted = () => {
        set(imageRef, { ...image, deleted: true, order: -1 })

        // Change the order of all the images of the same type
        const imagesOfType = images.filter(i => i.type === image.type && i.order > image.order)
        imagesOfType.forEach(i => {
            set(ref(db, `/images${folder}/${i.id}`), { ...i, order: i.order - 1 })
        })
    }

    return (
        <>
            <HStack w="100%" justify="center">
                <ButtonGroup size="sm" isAttached spacing={0}>
                    {image.hidden ? (
                        <IconButton
                            aria-label="mark visible"
                            icon={<AiFillEyeInvisible transform={`scale(${isMobile ? 1 : 2})`} />}
                            background="transparent"
                            p={0}
                            m={0}
                            sx={{ width: 'auto', height: 'auto' }}
                            onClick={toggleHidden}
                        />
                    ) : (
                        <IconButton
                            aria-label="mark hidden"
                            icon={<AiFillEye transform={`scale(${isMobile ? 1 : 2})`} />}
                            background="transparent"
                            p={0}
                            m={0}
                            onClick={toggleHidden}
                        />
                    )}
                    {image.sold ? (
                        <IconButton
                            aria-label="mark for sale"
                            icon={<FaCircle transform={`scale(${isMobile ? 1 : 2})`} />}
                            background="transparent"
                            p={0}
                            m={0}
                            color="red"
                            onClick={toggleSold}
                        />
                    ) : (
                        <IconButton
                            aria-label="mark sold"
                            icon={<FiCircle transform={`scale(${isMobile ? 1 : 2})`} />}
                            background="transparent"
                            p={0}
                            m={0}
                            color="red"
                            onClick={toggleSold}
                        />
                    )}
                    {isMobile ? null : (
                        <>
                            <IconButton
                                aria-label="edit image"
                                icon={<TiPencil transform={`scale(${isMobile ? 1 : 2})`} />}
                                background="transparent"
                                p={0}
                                m={0}
                                onClick={onOpen}
                                data-test="edit-image-button"
                            />
                            <IconButton
                                aria-label="delete image"
                                icon={<MdOutlineDeleteForever transform={`scale(${isMobile ? 1 : 2})`} />}
                                background="transparent"
                                p={0}
                                m={0}
                                onClick={markDeleted}
                                data-test="delete-image-button"
                            />
                        </>
                    )}
                </ButtonGroup>
            </HStack>
            <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
                <ModalOverlay />
                <ModalContent w="90%">
                    <ModalHeader>Edit</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ImageUploadForm setShowForm={onClose} image={image} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
