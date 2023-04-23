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
    useToast,
} from '@chakra-ui/react'
import { ref, set } from 'firebase/database'
import { v4 } from 'uuid'

import { db } from '~/config/firebase'
import { useUser } from '~/stores/UserStore'
import { DISPLAY_TYPES_MAP, TYPES } from '~/config/constants'

type ImageUploadFormProps = {
    setShowForm: (showForm: boolean) => void
}

declare global {
    interface Window {
        Cypress: unknown
    }
}

export const ImageUploadForm = ({ setShowForm }: ImageUploadFormProps) => {
    const toast = useToast()

    const user = useUser()

    // Form state
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [dimensions, setDimensions] = useState('')
    const [sold, setSold] = useState(false)
    const [hidden, setHidden] = useState(false)
    const [otherText, setOtherText] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    // Image State
    const [isUploading, setIsUploading] = useState(false)
    const [id, setId] = useState('')
    const [url, setUrl] = useState('')
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        if (!user) {
            return
        }

        if (!title || !type || !url || !id) {
            toast({
                title: 'Please fill out all fields',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            return
        }

        setIsSaving(true)

        const newImage = {
            id,
            title,
            type,
            url,
            width,
            height,
            dimensions,
            sold,
            otherText,
            hidden,
        }

        // Add to realtime database
        const testingFolder = import.meta.env.MODE === 'test' || window.Cypress ? 'testing/' : ''
        const imageRef = ref(db, `/images/${testingFolder}${id}`)
        set(imageRef, newImage)
            .then(() => {
                toast({
                    title: 'Image uploaded',
                    description: 'Image Submitted Successfully',
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
                    title: 'Error Submitting form',
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
                setUrl(url)
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
                        <Box w="100%" pb={url ? 0 : '100%'} position="relative" border="2px dashed lightGray" borderRadius={10} background="gray.600">
                            {url ? (
                                <img src={url} alt="uploaded image" style={{ width: '100%', objectFit: 'cover' }} />
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
                        <FormControl id="type" isRequired display="flex" my={2}>
                            <FormLabel w="100px" my="auto">
                                Type
                            </FormLabel>
                            <Select value={type} placeholder="--" onChange={e => setType(e.target.value)} borderColor="white">
                                {TYPES.map(type => (
                                    <option key={type} value={type}>
                                        {DISPLAY_TYPES_MAP[type]}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl id="otherText" display="flex" my={2}>
                            <FormLabel w="100px" my="auto">
                                Other Text
                            </FormLabel>
                            <Input
                                type="text"
                                value={otherText}
                                placeholder="(Edition, etc)"
                                onChange={e => setOtherText(e.target.value)}
                                borderColor="white"
                            />
                        </FormControl>
                        <FormControl id="dimensions" display="flex" my={2}>
                            <FormLabel w="100px" my="auto">
                                Dimensions
                            </FormLabel>
                            <Input
                                type="text"
                                value={dimensions}
                                placeholder={'eg 24" x 26"'}
                                onChange={e => setDimensions(e.target.value)}
                                borderColor="white"
                            />
                        </FormControl>
                        <Flex justifyContent="flex-start">
                            <FormControl id="sold" display="flex" my={2}>
                                <FormLabel w="100px" my="auto">
                                    Sold
                                </FormLabel>
                                <Checkbox isChecked={sold} onChange={e => setSold(e.target.checked)} borderColor="white" />
                            </FormControl>
                            <FormControl id="hidden" display="flex" my={2}>
                                <FormLabel w="100px" my="auto">
                                    Hidden
                                </FormLabel>
                                <Checkbox isChecked={hidden} onChange={e => setHidden(e.target.checked)} borderColor="white" />
                            </FormControl>
                        </Flex>
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
