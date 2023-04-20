import React, { useState } from 'react'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Alert, AlertIcon, useToast } from '@chakra-ui/react'

import { auth } from '../config/firebase'

import { NOTIFICATION_DURATION } from '~/config/constants'
import { useSetUser } from '~/stores/UserStore'

export const LoginForm = () => {
    const toast = useToast()

    const setUser = useSetUser()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMissingFields, setErrorMissingFields] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        setErrorMissingFields(false)
        setErrorPassword(false)

        if (!email || !password) {
            setErrorMissingFields(true)
            return
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                // Signed in
                const user = userCredential.user
                setUser(user)

                toast({
                    title: 'You are logged in.',
                    description: 'Welcome back!',
                    status: 'success',
                    duration: NOTIFICATION_DURATION,
                    isClosable: true,
                })
            })
            .catch(error => {
                setErrorPassword(error.message)
            })
    }

    return (
        <Stack direction={'row'} flex={1} minH={'100%'} style={styles.containerStack}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <Stack direction={'row'} flex={1} minH={'100%'}>
                    <Flex p={8} flex={1} align={'center'} justify={'center'}>
                        <Stack spacing={4} w={'full'} maxW={'md'}>
                            <Heading fontSize={'2xl'}>Welcome back Brigitte, sign in to edit your photos</Heading>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" onChange={e => setEmail(e.target.value)} />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" onChange={e => setPassword(e.target.value)} />
                            </FormControl>
                            <Stack spacing={6}>
                                <Button colorScheme="yellow" variant="solid" onClick={handleSubmit} type="submit">
                                    Sign in
                                </Button>
                                {errorMissingFields && (
                                    <Alert status="error">
                                        <AlertIcon />
                                        Please fill all fields
                                    </Alert>
                                )}
                                {errorPassword && (
                                    <Alert status="error">
                                        <AlertIcon />
                                        {errorPassword}
                                    </Alert>
                                )}
                            </Stack>
                        </Stack>
                    </Flex>
                </Stack>
            </form>
        </Stack>
    )
}

const styles = {
    containerStack: {
        marginTop: 0,
    },
    form: {
        flex: 1,
        margin: 0,
    },
}
