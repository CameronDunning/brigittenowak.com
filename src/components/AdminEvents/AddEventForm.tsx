import { ChangeEvent, useState } from 'react'

import { AddIcon, SmallCloseIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    Center,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    IconButton,
    Input,
    Select,
    Spinner,
    Text,
    useToast,
} from '@chakra-ui/react'
import { ref, set } from 'firebase/database'
import { v4 } from 'uuid'

import { DISPLAY_TYPES_MAP, TYPES } from '~/config/constants'
import { db } from '~/config/firebase'
import { useImages } from '~/stores/ImagesStore'
import { useUser } from '~/stores/UserStore'
import { DateString, Event, isDateString } from '~/types'

type AdminEventFormProps = {
    setShowForm: (showForm: boolean) => void
    event?: Event
}

declare global {
    interface Window {
        Cypress: unknown
    }
}

export const AddEventForm = ({ setShowForm, event }: AdminEventFormProps) => {
    const toast = useToast()

    const user = useUser()
    const images = useImages()

    // Form state
    const [id, setId] = useState(event?.id || '')
    const [title, setTitle] = useState(event?.title || '')
    const [issueDate, setIssueDate] = useState(event?.issueDate || '')
    const [expiryDate, setExpiryDate] = useState(event?.expiryDate || '')
    const [date, setDate] = useState(event?.date || '')
    const [deleted, setDeleted] = useState(event?.deleted || false)
    const [imageUrl, setImageUrl] = useState(event?.imageUrl || '')
    const [height, setHeight] = useState(event?.height || 0)
    const [width, setWidth] = useState(event?.width || 0)

    // Loading State
    const [isUploading, setIsUploading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        if (!user) {
            return
        }

        if (!title || !date || !expiryDate) {
            toast({
                title: 'Please fill out all fields',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            return
        }

        setIsSaving(true)

        const newEvent = {
            id,
            title,
            deleted: false,
            issueDate,
            expiryDate,
            date,
            imageUrl,
            height,
            width,
        }

        // Add to realtime database
        const testingFolder =
            import.meta.env.MODE === 'test' || window.Cypress || import.meta.env.VITE_CLOUDINARY_FOLDER.includes('testing') ? '-testing' : ''
        const eventRef = ref(db, `/events${testingFolder}/${newEvent.id}`)
        set(eventRef, newEvent)
            .then(() => {
                toast({
                    title: 'Event created',
                    description: 'Event created successfully',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                setIsSaving(false)
                setShowForm(false)
            })
            .catch(error => {
                setIsSaving(false)
                console.error('error', error)
                toast({
                    title: 'Error creating event',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            })
    }

    const handleUploadClick = () => {
        const inputElement = document.getElementById('imageUploadInput')
        inputElement?.click()
    }

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const imageToUpload = (event.target as HTMLInputElement)?.files?.[0]
        const id = v4()
        setId(id)

        if (!imageToUpload || !user) {
            return
        }

        // Upload to cloudinary and get the url
        const formData = new FormData()
        formData.append('file', imageToUpload)
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
        formData.append('public_id', id)

        setIsUploading(true)

        fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_BASE_URL, {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                return response.json()
            })
            .then(response => {
                // Get url from Cloudinary response
                const { url, width, height } = response
                setImageUrl(url)
                setWidth(width)
                setHeight(height)
                setIsUploading(false)
            })
            .catch(err => {
                console.error(err)
                toast({
                    title: 'Error uploading image, please try again',
                    description: err.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            })
    }

    const handleSetDate = (date: string, setter: (date: DateString) => void) => {
        if (isDateString(date)) {
            setter(date as DateString)
            return
        }

        toast({
            title: 'Invalid date',
            description: 'Please enter a valid date in the format YYYY-MM-DD',
            status: 'error',
            duration: 9000,
            isClosable: true,
        })
    }

    return (
        <Box w="100%" p={2} my={4} border={'1px solid white'} borderRadius={5} position="relative" data-testid="image-upload-form">
            {isSaving ? (
                <Center position="absolute" top="0" left="0" w="100%" h="100%" bg="rgba(0,0,0,0.5)" zIndex={10}>
                    <Spinner />
                </Center>
            ) : null}
            <IconButton
                aria-label="close form"
                onClick={() => setShowForm(false)}
                size="sm"
                rounded="full"
                colorScheme="red"
                top="-5px"
                right="-5px"
                position="absolute"
                zIndex={10}
                data-testid="close-image-form-button">
                <SmallCloseIcon />
            </IconButton>
            <form onSubmit={handleSubmit}>
                <Grid
                    templateColumns={{
                        base: 'repeat(1, 1fr)',
                        md: '1fr 2fr',
                    }}
                    gap={4}>
                    <GridItem>
                        <Box
                            w="100%"
                            pb={imageUrl ? 0 : '100%'}
                            position="relative"
                            border="2px dashed lightGray"
                            borderRadius={10}
                            background="gray.600">
                            {imageUrl ? (
                                <img src={imageUrl} alt="uploaded image" style={{ width: '100%', objectFit: 'cover' }} />
                            ) : (
                                <Center position="absolute" top="0" left="0" w="100%" h="100%">
                                    {isUploading ? (
                                        <Spinner size="xl" />
                                    ) : (
                                        <>
                                            <IconButton aria-label="upload" onClick={handleUploadClick} data-testid="image-upload-button">
                                                <AddIcon />
                                            </IconButton>
                                            <input
                                                type="file"
                                                id="imageUploadInput"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                style={{ display: 'none' }}
                                            />
                                        </>
                                    )}
                                </Center>
                            )}
                        </Box>
                    </GridItem>
                    <GridItem>
                        <FormControl id="title" isRequired display="flex" my={2}>
                            <FormLabel w="100px" my="auto">
                                Title
                            </FormLabel>
                            <Input
                                type="text"
                                value={title}
                                placeholder="Title of the piece"
                                onChange={e => setTitle(e.target.value)}
                                borderColor="white"
                            />
                        </FormControl>
                        <FormControl id="title" isRequired display="flex" my={2}>
                            <FormLabel w="100px" my="auto">
                                Date
                            </FormLabel>
                            <Input type="date" value={date} onChange={e => handleSetDate(e.target.value, setDate)} borderColor="white" />
                        </FormControl>
                        <FormControl id="title" display="flex" my={2}>
                            <FormLabel w="100px" my="auto">
                                Issue Date
                            </FormLabel>
                            <Input type="date" value={issueDate} onChange={e => handleSetDate(e.target.value, setIssueDate)} borderColor="white" />
                        </FormControl>
                        <Text>(If left empty, the event will display immediately)</Text>
                        <FormControl id="title" isRequired display="flex" my={2}>
                            <FormLabel w="100px" my="auto">
                                Expiry Date
                            </FormLabel>
                            <Input type="date" value={expiryDate} onChange={e => handleSetDate(e.target.value, setExpiryDate)} borderColor="white" />
                        </FormControl>
                        <Flex w="100%" justifyContent="flex-end">
                            <Button my={2} mr={2} colorScheme="green" variant="solid" onClick={handleSubmit} type="submit" justifySelf={'flex-end'}>
                                Submit
                            </Button>
                        </Flex>
                    </GridItem>
                </Grid>
            </form>
        </Box>
    )
}
