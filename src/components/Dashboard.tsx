import { useState } from 'react'

import { Box, Button, Grid, HStack, Heading, useToast } from '@chakra-ui/react'
import { signOut } from 'firebase/auth'

import { ImageUploadForm } from '~/components/AdminImages/ImageUploadForm'
import { auth } from '~/config/firebase'
import { useSetUser } from '~/stores/UserStore'
import { AdminImages } from './AdminImages/AdminImages'

import { NOTIFICATION_DURATION } from '~/config/constants'
import { MAIN_COLOUR } from '~/styles/customTheme'

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
        <Box w={{ base: '100%', md: '4xl' }}>
            <Heading as="h1" size="lg" py="2" px={{ base: 2, md: 0 }} borderBottom={`1px solid ${MAIN_COLOUR}`}>
                Welcome to your dashboard, from here you can manage the photos on your site.
            </Heading>
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    md: '1fr 2fr',
                }}
                gap={4}></Grid>
            <HStack w="100%" p={4} justifyContent="space-between">
                <Button onClick={() => setShowForm(true)} colorScheme="green" isDisabled={showForm}>
                    Upload Photo
                </Button>
                <Button onClick={handleLogout} colorScheme="red">
                    Log out
                </Button>
            </HStack>
            {showForm && <ImageUploadForm setShowForm={setShowForm} />}
            <AdminImages />
        </Box>
    )
}
