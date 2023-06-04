import { Box, Flex, HStack, Heading, Link, Text, VStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export const Representation = () => {
    return (
        <Flex as="main" w={{ base: '100%', md: '4xl' }} flexDirection="column">
            <Box as="section" pb={12}>
                <Heading pb={2}>Galleries</Heading>
                <GalleryInfo name="ArtMatch.ca" url="www.artmatch.ca/" />
                <GalleryInfo name="Ethel Curry Gallery" url="www.theethelcurrygallery.com" location="Haliburton, Ontario" phone="705-457-9687" />
                <GalleryInfo name="Latitude 44 Gallery" url="www.latitude44gallery.ca" location="Toronto, Ontario" />
                <GalleryInfo name="Koyman Galleries" url="www.koymangalleries.com" location="Ottawa, Ontario" />
                <GalleryInfo name="Red Canoe Gallery" url="www.redcanoegallery.com" location="Pt. Carling, Ontario" />
                <GalleryInfo name="St. Germain Gallery" url="www.stgermaingallery.com" location="Toronto, Ontario" />
            </Box>
        </Flex>
    )
}

type GalleryInfoProps = {
    name: string
    url: string
    location?: string
    phone?: string
}

const GalleryInfo = ({ name, url, location, phone }: GalleryInfoProps) => {
    return (
        <HStack w="100%" border="1px solid" borderRadius={5} p={4} my={2}>
            <VStack w="50%" alignItems="flex-start">
                <Heading as="h2" size="md" w="50%">
                    {name}
                </Heading>
                {location && <Text>{location}</Text>}
                {phone && <Text>{phone}</Text>}
            </VStack>
            <a href={'https://' + url}>{url}</a>
        </HStack>
    )
}
