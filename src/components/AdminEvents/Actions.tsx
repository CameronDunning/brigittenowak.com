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
import { Event } from '~/types'

export const Actions = ({ event }: { event: Event }) => {
    const [isMobile] = useMediaQuery('(max-width: 768px)')

    const images = useImages()

    const folder = import.meta.env.MODE === 'test' || window.Cypress || import.meta.env.VITE_CLOUDINARY_FOLDER.includes('testing') ? '-testing' : ''
    const eventRef = ref(db, `/events${folder}/${event.id}`)

    const markDeleted = () => {
        set(eventRef, { ...event, deleted: true })
    }

    return (
        <IconButton
            aria-label="delete event"
            icon={<MdOutlineDeleteForever transform={`scale(${isMobile ? 1 : 2})`} />}
            background="transparent"
            p={0}
            m={0}
            onClick={markDeleted}
            data-test="delete-event-button"
        />
    )
}
