import { Flex, Heading, Image, Text } from '@chakra-ui/react'

export const Home = () => {
    return (
        <Flex as="main" w={{ base: '100%', md: '4xl' }} flexDirection="column" alignItems="center" justifyContent="center">
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
            <Text textAlign="center" py={4} letterSpacing={{ base: 0, sm: 12 }}>
                www.brigittenowak.com
            </Text>
            <Image
                w={{ base: '100%', md: '4xl' }}
                pt={12}
                src="https://res.cloudinary.com/di2dfqt1l/image/upload/f_auto,q_auto/v1/brigittenowak_com-dev/home_page"
                alt="Red Canoe"
            />
        </Flex>
    )
}
