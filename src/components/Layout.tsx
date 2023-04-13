import { Stack } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
    return (
        <>
            <Stack minH={'100vh'} alignItems="center">
                <Outlet />
            </Stack>
        </>
    )
}
