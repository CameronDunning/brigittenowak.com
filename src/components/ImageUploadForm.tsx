import { useState } from 'react'

import { AddIcon } from '@chakra-ui/icons'
import { Box, Center, Grid, GridItem, IconButton, Spinner } from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'

import { useUser } from '~/stores/UserStore'

type ImageUploadFormProps = {
    setShowForm: (showForm: boolean) => void
}

export const ImageUploadForm = ({ setShowForm }: ImageUploadFormProps) => {
    const user = useUser()

    // Form state
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [image, setImage] = useState(null)
    const [dimensions, setDimensions] = useState('')
    const [sold, setSold] = useState(false)
    const [otherText, setOtherText] = useState('')

    // Image Upload State
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        // Here you can handle the submission of the form, including storing the image in the database and getting the URL.
    }

    const handleUploadClick = () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = handleImageUpload
        input.click()
    }

    const handleImageUpload = (event: Event) => {
        const uploadedImage = (event.target as HTMLInputElement)?.files?.[0]

        // Upload to cloudinary and get the url
    }

    return (
        <Box w="4xl" p={2} border={'1px solid white'} borderRadius={5} position="relative">
            <IconButton
                aria-label="close form"
                onClick={() => setShowForm(false)}
                size="sm"
                rounded="full"
                colorScheme="red"
                top="-5px"
                right="-5px"
                position="absolute">
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
                        <Box w="100%" h="0" pb="100%" position="relative" border="2px dashed lightGray" borderRadius={10} background="gray.600">
                            <Center position="absolute" top="0" left="0" w="100%" h="100%">
                                {isLoading ? (
                                    <Spinner size="xl" />
                                ) : (
                                    <IconButton aria-label="upload" onClick={handleUploadClick}>
                                        <AddIcon />
                                    </IconButton>
                                )}
                            </Center>
                        </Box>
                    </GridItem>
                    <GridItem>test2</GridItem>
                </Grid>
            </form>
        </Box>
    )
}

/* Form fields:
Title
Type
Image
Dimensions
Sold
Other text
*/
