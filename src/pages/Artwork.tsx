import { Box, Grid, GridItem, Image, Text, Heading, VStack, Link } from '@chakra-ui/react'
import { DISPLAY_TYPES_MAP, TYPES } from '~/config/constants'
import { Link as RouterLink } from 'react-router-dom'

export const Artwork = () => {
    return (
        <VStack>
            <Heading
                size="4xl"
                py={8}
                w={{ base: '100%', md: '3xl' }}
                textAlign="center"
                fontWeight="normal"
                borderBottom="1px solid"
                textTransform="uppercase">
                Brigitte Nowak
            </Heading>
            <Grid
                w={{ base: '100%', md: '4xl' }}
                px={{ base: 4, md: 0 }}
                pt={12}
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    md: 'repeat(3, 1fr)',
                }}
                gap={6}>
                {TYPES.map(type => (
                    <ArtType key={type} type={type} />
                ))}
            </Grid>
        </VStack>
    )
}

type ArtTypeProps = {
    type: string
}

const ArtType = ({ type }: ArtTypeProps) => {
    return (
        <GridItem>
            <Box>
                <Box bg="primary.400" w="100%" h="100%" p={1} borderRadius="lg" boxShadow="lg">
                    <Link as={RouterLink} to={`/artwork/${type}`}>
                        <Image
                            w="100%"
                            src={`${import.meta.env.VITE_CLOUDINARY_IMAGE_BASE_URL}/v1/${import.meta.env.VITE_CLOUDINARY_FOLDER}/${type}.jpg`}
                            alt="Oils"
                        />
                    </Link>
                </Box>
                <Link as={RouterLink} to={`/artwork/${type}`}>
                    <Text mt={4} fontSize="4xl" textAlign="center">
                        {DISPLAY_TYPES_MAP[type]}
                    </Text>
                </Link>
            </Box>
        </GridItem>
    )
}
