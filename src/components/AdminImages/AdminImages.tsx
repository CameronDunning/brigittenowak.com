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

import { DISPLAY_TYPES_MAP, OILS, TYPES } from '~/config/constants'
import { MAIN_COLOUR } from '~/styles/customTheme'
import { TypeOptions } from '~/types'
import { Legend } from './Legend'
import { AdminImageList } from './AdminImageList'

export const AdminImages = () => {
    const isMobile = useMediaQuery('(max-width: 768px)')
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [type, setType] = useState<TypeOptions>(OILS)

    return (
        <>
            <VStack>
                <HStack w="100%" justify="space-between" px={{ base: 2, md: 0 }}>
                    <Heading as="h2" size="md" flexGrow={1}>
                        {DISPLAY_TYPES_MAP[type]}: Set the order, update images, etc
                    </Heading>
                    <Select
                        w="180px"
                        value={type}
                        onChange={e => setType(e.target.value as TypeOptions)}
                        borderColor="lightgreen"
                        flexGrow={0}
                        data-test="type-selector">
                        {TYPES.map(type => (
                            <option key={type} value={type}>
                                {DISPLAY_TYPES_MAP[type]}
                            </option>
                        ))}
                    </Select>
                </HStack>
                <HStack w="100%" justify="space-between" borderBottom={`1px solid ${MAIN_COLOUR}`} px={{ base: 2, md: 0 }}>
                    <Box w="14%"></Box>
                    <Heading as="h3" size="sm" w="21%" textAlign="center">
                        Title
                    </Heading>
                    <Heading as="h3" size="sm" w="21%" textAlign="center">
                        {isMobile ? 'Desc' : 'Description'}
                    </Heading>
                    <Heading as="h3" size="sm" w="21%" textAlign="center">
                        {isMobile ? 'Dim' : 'Dimensions'}
                    </Heading>
                    <Heading as="h3" size="sm" w="21%" textAlign="center">
                        Actions <InfoOutlineIcon onClick={onOpen} mb={1} _hover={{ cursor: 'pointer' }} />
                    </Heading>
                </HStack>

                <AdminImageList type={type} />
            </VStack>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Actions Legend</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Legend />
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
