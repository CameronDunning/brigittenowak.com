import { Alert, Flex, Heading, Image, Link, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import { Event } from '~/types'
import { useEvents } from '~/stores/EventStore'

export const Home = () => {
    const events = useEvents()
    const orderedEvents = Object.values(events)
        .filter(event => new Date(event.expiryDate).getTime() > new Date().getTime())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return (
        <Flex as="main" w={{ base: '100%', md: '4xl' }} flexDirection="column" alignItems="center" justifyContent="center">
            {orderedEvents && orderedEvents.length > 0 && <UpcomingEventAlert event={orderedEvents[0]} />}
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

const UpcomingEventAlert = ({ event }: { event: Event }) => {
    return (
        <Alert bg="blue.600" status="info" textAlign="center" justifyContent="center">
            I'm participating in the&nbsp;
            <Link as={RouterLink} to="/galleries">
                {event.title}
            </Link>
            !
        </Alert>
    )
}
