import { useState } from 'react'

import { Box, Button, Grid, HStack, Heading, useToast } from '@chakra-ui/react'
import { signOut } from 'firebase/auth'

import { ImageUploadForm } from '~/components/ImageUploadForm'
import { auth } from '~/config/firebase'
import { useSetUser } from '~/stores/UserStore'

import { NOTIFICATION_DURATION } from '~/config/constants'

export const Dashboard = () => {
    const toast = useToast()

    const setUser = useSetUser()

    const [showForm, setShowForm] = useState(false)

    const handleLogout = () => {
        signOut(auth)
        setUser(null)

        toast({
            title: 'Logged out',
            description: 'You have been logged out',
            status: 'success',
            duration: NOTIFICATION_DURATION,
            isClosable: true,
        })
    }

    return (
        <Box w="4xl">
            <Heading size="lg" py="2" borderBottom={'1px solid #daccb4'}>
                Welcome to your dashboard, from here you can manage the photos on your site.
            </Heading>
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    md: '1fr 2fr',
                }}
                gap={4}></Grid>
            <HStack w="100%" p={4} justifyContent="space-between">
                <Button onClick={handleLogout} colorScheme="green">
                    Upload Photo
                </Button>
                <Button onClick={handleLogout} colorScheme="red">
                    Log out
                </Button>
            </HStack>
            <ImageUploadForm setShowForm={setShowForm} />
        </Box>
    )
}
