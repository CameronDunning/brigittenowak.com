import { Outlet } from 'react-router-dom'
import { Stack } from '@chakra-ui/react'

import { NavBar } from '~/components/NavBar'
import { Footer } from '~/components/Footer'

export const Layout = () => {
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
