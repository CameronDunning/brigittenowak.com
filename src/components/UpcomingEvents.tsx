import { Box, Heading, Image } from '@chakra-ui/react'

import { useEvents } from '~/stores/EventStore'
import { Event } from '~/types'

export const UpcomingEvents = () => {
    const events = useEvents()
    const orderedEvents = Object.values(events)
        .filter(event => new Date(event.expiryDate).getTime() > new Date().getTime())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return (
        <Box as="section" px={{ base: 2, md: 0 }} pb={12}>
            <Heading pb={2}>Upcoming Shows</Heading>
            {orderedEvents.map(event => (
                <EventComponent key={event.id} event={event} />
            ))}
        </Box>
    )
}

const EventComponent = ({ event }: { event: Event }) => {
    return <Image src={event.imageUrl} alt={event.title} />
}
