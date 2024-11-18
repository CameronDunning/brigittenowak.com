import { useEffect } from 'react'

import { Stack } from '@chakra-ui/react'
import { onValue, ref } from 'firebase/database'
import { Outlet } from 'react-router-dom'

import { Footer } from '~/components/Footer'
import { NavBar } from '~/components/NavBar'
import { auth, db } from '~/config/firebase'
import { useSetEvents } from '~/stores/EventStore'
import { useSetImages } from '~/stores/ImagesStore'
import { useSetUser } from '~/stores/UserStore'

export const Layout = () => {
    const setUser = useSetUser()
    const setImages = useSetImages()
    const setEvents = useSetEvents()

    // Listen to auth state changes and set the user globally
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user)
        })

        return () => unsubscribe()
    })

    // Get all the images from Firebase
    useEffect(() => {
        const folder = import.meta.env.VITE_CLOUDINARY_FOLDER.includes('testing') ? '-testing' : ''
        const imagesRef = ref(db, `/images${folder}/`)

        return onValue(imagesRef, snapshot => {
            const imageSnapshot = snapshot.val()
            setImages(imageSnapshot)
        })
    }, [])

    // Get all the events from Firebase
    useEffect(() => {
        const folder = import.meta.env.VITE_CLOUDINARY_FOLDER.includes('testing') ? '-testing' : ''
        const eventsRef = ref(db, `/events${folder}/`)

        return onValue(eventsRef, snapshot => {
            const eventSnapshot = snapshot.val() || {}
            setEvents(eventSnapshot)
        })
    }, [])

    return (
        <>
            <Stack minH={'calc(100vh - 40px)'} alignItems="center">
                <NavBar />
                <Outlet />
                <Footer />
            </Stack>
        </>
    )
}
