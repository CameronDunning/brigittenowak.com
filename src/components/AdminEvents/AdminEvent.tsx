import { Box, HStack, Icon, Text } from '@chakra-ui/react'

import { RxDragHandleDots2 } from 'react-icons/rx'
import { MAIN_COLOUR } from '~/styles/customTheme'
import { Event } from '~/types'
import { Actions } from '~/components/AdminEvents/Actions'

export const AdminEvent = ({ event }: { event: Event }) => {
    const croppedUrl =
        import.meta.env.VITE_CLOUDINARY_IMAGE_BASE_URL + '/w_200,h_80,c_limit' + import.meta.env.VITE_CLOUDINARY_FOLDER + '/' + event.id

    return (
        <HStack w="100%" mb={2} justify="space-between" border={`1px solid ${MAIN_COLOUR}`} borderRadius={4}>
            <Box w="12%" justifyContent="center" display="flex" py={1}>
                <img src={croppedUrl} alt={event.title} style={styles.image} />
            </Box>
            <Text textAlign="center" w="21%" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                {event.title}
            </Text>
            <Text textAlign="center" w="21%">
                {event.date}
            </Text>
            <Text textAlign="center" w="21%">
                {event.issueDate}
            </Text>
            <Text textAlign="center" w="21%">
                {event.expiryDate}
            </Text>
            <Box w="21%">
                <Actions event={event} />
            </Box>
        </HStack>
    )
}

const styles = {
    image: {
        width: 'auto',
        height: '50px',
    },
}
