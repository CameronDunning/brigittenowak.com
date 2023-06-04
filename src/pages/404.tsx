import { Flex, Heading, Link, Text, VStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export const NotFound = () => {
    return (
        <Flex as="main" justify={'center'} h="calc(100vh - 104px)" align={'center'} style={styles.main}>
            <VStack as="section">
                <Heading fontSize={'8xl'}>404</Heading>
                <Text fontSize={'4xl'}>Page not found</Text>
                <Link as={RouterLink} to="/" style={styles.link}>
                    Go to home
                </Link>
            </VStack>
        </Flex>
    )
}

const styles = {
    link: {
        textDecoration: 'underline',
        cursor: 'pointer',
    },
    main: {
        marginTop: 0,
    },
}
