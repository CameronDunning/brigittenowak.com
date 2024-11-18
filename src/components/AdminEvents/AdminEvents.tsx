import { VStack } from '@chakra-ui/react'

import { useEvents } from '~/stores/EventStore'
import { AdminEvent } from '~/components/AdminEvents/AdminEvent'

export const AdminEvents = () => {
    const events = useEvents()
    const orderedEvents = Object.values(events)
        .filter(event => !event.deleted)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return <VStack>{orderedEvents && orderedEvents.length && orderedEvents.map(event => <AdminEvent event={event} />)}</VStack>
}
