import { Box, Flex, HStack, Heading, Text, VStack } from '@chakra-ui/react'

export const Representation = () => {
    return (
        <Flex as="main" w={{ base: '100%', md: '4xl' }} flexDirection="column">
            <Box as="section" px={{ base: 2, md: 0 }}>
                <Heading pb={2}>Galleries</Heading>
                <GalleryInfo name="Red Canoe Gallery" url="www.redcanoegallery.com" location="Bala, Ontario" />
                <GalleryInfo name="Koyman Galleries" url="www.koymangalleries.com" location="Ottawa, Ontario" />
                <GalleryInfo name="St. Germain Gallery" url="www.stgermaingallery.com" location="Toronto, Ontario" />
                <GalleryInfo name="Latitude 44 Gallery" url="www.latitude44gallery.ca" location="Toronto, Ontario" />
                <GalleryInfo name="ArtMatch.ca" url="www.artmatch.ca/" />
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
                <Heading as="h2" size="md">
                    {name}
                </Heading>
                {location && <Text>{location}</Text>}
                {phone && <Text>{phone}</Text>}
            </VStack>
            <a href={'https://' + url}>{url}</a>
        </HStack>
    )
}
