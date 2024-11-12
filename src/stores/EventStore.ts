import { create } from 'zustand'

import { Event } from '~/types'

type Store = {
    events: Event[]
}

type Action = {
    setEvents: (events: Store['events']) => void
}

export const EventStore = create<Store & Action>()(set => ({
    events: [],
    setEvents: events => {
        set({ events })
    },
}))

export const useEvents = () => EventStore(state => state.events)
export const useSetEvents = () => EventStore(state => state.setEvents)
