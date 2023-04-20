import { useEffect } from 'react'

import { Stack } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { auth } from '~/config/firebase'
import { useSetUser } from '~/stores/UserStore'

import { Footer } from '~/components/Footer'
import { NavBar } from '~/components/NavBar'

export const Layout = () => {
    const setUser = useSetUser()

    // Listen to auth state changes and set the user globally
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user)
        })

        return () => unsubscribe()
    })

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
