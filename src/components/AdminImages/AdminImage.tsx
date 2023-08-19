import { Box, HStack, Icon, Text } from '@chakra-ui/react'

import { RxDragHandleDots2 } from 'react-icons/rx'
import { MAIN_COLOUR } from '~/styles/customTheme'
import { Image } from '~/types'
import { Actions } from '~/components/AdminImages/Actions'

export const AdminImage = ({ image }: { image: Image }) => {
    const croppedUrl =
        import.meta.env.VITE_CLOUDINARY_IMAGE_BASE_URL + '/w_200,h_80,c_limit' + import.meta.env.VITE_CLOUDINARY_FOLDER + '/' + image.id

    return (
        <HStack w="100%" justify="space-between" border={`1px solid ${MAIN_COLOUR}`} borderRadius={4}>
            <Box w="2%" h="17px">
                <Icon as={RxDragHandleDots2} />
            </Box>
            <Box w="12%" justifyContent="center" display="flex" py={1}>
                <img src={croppedUrl} alt={image.title} style={styles.image} />
            </Box>
            <Text textAlign="center" w="21%" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                {image.title}
            </Text>
            <Text textAlign="center" w="21%">
                {image.otherText}
            </Text>
            <Text textAlign="center" w="21%">
                {image.dimensions}
            </Text>
            <Box w="21%">
                <Actions image={image} />
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
