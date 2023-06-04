import { useEffect } from 'react'

import { Stack } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { onValue, ref } from 'firebase/database'

import { auth, db } from '~/config/firebase'
import { useSetUser } from '~/stores/UserStore'
import { Footer } from '~/components/Footer'
import { NavBar } from '~/components/NavBar'
import { useSetImages } from '~/stores/ImagesStore'

export const Layout = () => {
    const setUser = useSetUser()
    const setImages = useSetImages()

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
            setImages(Object.values(imageSnapshot))
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
