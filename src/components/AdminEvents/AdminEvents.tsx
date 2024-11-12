import { useState } from 'react'

import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    HStack,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    VStack,
    useDisclosure,
    useMediaQuery,
} from '@chakra-ui/react'

import { MAIN_COLOUR } from '~/styles/customTheme'
import { useEvents } from '~/stores/EventStore'
import { AdminEvent } from '~/components/AdminEvents/AdminEvent'

export const AdminEvents = () => {
    const events = useEvents()
    console.log('events', events)

    return (
        <>
            <VStack>{events && events.length && events.map(event => <AdminEvent event={event} />)}</VStack>
        </>
    )
}
