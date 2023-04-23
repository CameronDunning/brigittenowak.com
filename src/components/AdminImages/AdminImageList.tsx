import { useState } from 'react'

import { HStack, VStack, Heading, Select, Box } from '@chakra-ui/react'

import { TYPES, DISPLAY_TYPES_MAP } from '~/config/constants'
import { useImages } from '~/stores/ImagesStore'
import { AdminImage } from '~/components/AdminImages/AdminImage'
import { MAIN_COLOUR } from '~/styles/customTheme'

export const AdminImageList = () => {
    const images = useImages()

    const [type, setType] = useState('oils')

    return (
        <VStack>
            <HStack w="100%" justify="space-between">
                <Heading as="h2" size="md" flexGrow={1}>
                    {DISPLAY_TYPES_MAP[type]}: Set the order, update images, etc
                </Heading>
                <Select w="180px" value={type} onChange={e => setType(e.target.value)} borderColor="lightgreen" flexGrow={0}>
                    {TYPES.map(type => (
                        <option key={type} value={type}>
                            {DISPLAY_TYPES_MAP[type]}
                        </option>
                    ))}
                </Select>
            </HStack>
            <HStack w="100%" justify="space-between" borderBottom={`1px solid ${MAIN_COLOUR}`}>
                <Box w="14%"></Box>
                <Heading as="h3" size="sm" w="21%" textAlign="center">
                    Title
                </Heading>
                <Heading as="h3" size="sm" w="21%" textAlign="center">
                    Description
                </Heading>
                <Heading as="h3" size="sm" w="21%" textAlign="center">
                    Dimensions
                </Heading>
                <Heading as="h3" size="sm" w="21%" textAlign="center">
                    Actions
                </Heading>
            </HStack>

            {images ? Object.values(images).map(image => <AdminImage key={image.id} image={image} />) : null}
        </VStack>
    )
}
