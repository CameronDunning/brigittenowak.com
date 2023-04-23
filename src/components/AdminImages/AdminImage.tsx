import { HStack, Box, Text } from '@chakra-ui/react'

import { ImageType } from '~/stores/ImagesStore'
import { MAIN_COLOUR } from '~/styles/customTheme'

type AdminImageProps = {
    image: ImageType
}

export const AdminImage = ({ image }: AdminImageProps) => {
    const croppedUrl =
        import.meta.env.VITE_CLOUDINARY_IMAGE_BASE_URL + '/w_200,h_80,c_limit' + import.meta.env.VITE_CLOUDINARY_FOLDER + '/' + image.id

    return (
        <HStack w="100%" justify="space-between" border={`1px solid ${MAIN_COLOUR}`} borderRadius={4}>
            <Box w="14%" justifyContent="center" display="flex" py={1}>
                <img src={croppedUrl} alt={image.title} style={styles.image} height="20px" />
            </Box>
            <Text textAlign="center" w="21%">
                {image.title}
            </Text>
            <Text textAlign="center" w="21%">
                {image.otherText}
            </Text>
            <Text textAlign="center" w="21%">
                {image.dimensions}
            </Text>
            <Text textAlign="center" w="21%">
                Actions
            </Text>
        </HStack>
    )
}

const styles = {
    image: {
        width: 'auto',
        height: '50px',
    },
}
