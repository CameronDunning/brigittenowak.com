import { useMemo, useState } from 'react'

import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { FaCircle } from 'react-icons/fa'
import { PhotoAlbum, RenderPhoto } from 'react-photo-album'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'

import { DISPLAY_TYPES_MAP } from '~/config/constants'
import { useImages } from '~/stores/ImagesStore'
import { Image, TypeOptions } from '~/types'
import { NotFound } from './404'

import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import 'yet-another-react-lightbox/styles.css'

const BREAKPOINTS = [3840, 2400, 1080, 640, 384, 256, 128, 96, 64, 48]

type ArtTypeProps = {
    type: TypeOptions
}

export const ArtworkTypeByProps = ({ type }: ArtTypeProps) => {
    const images = useImages()
    const typeImages = images.filter(image => image.type === type && image.hidden !== true).sort((a, b) => a.order - b.order)

    const [index, setIndex] = useState(-1)

    const formattedImages = useMemo(() => {
        return typeImages.map(image => {
            const width = BREAKPOINTS[0]
            const height = Math.floor(width * (image.height / image.width))

            return {
                src: cloudinaryLink(image.id, width, height),
                width,
                height,
                image,
                alt: image.title,
                images: BREAKPOINTS.map(breakpoint => {
                    const height = Math.round(breakpoint * (image.height / image.width))
                    return {
                        src: cloudinaryLink(image.id, breakpoint, height),
                        width: breakpoint,
                        height,
                    }
                }),
            }
        })
    }, [typeImages])

    const slides = useMemo(() => {
        return formattedImages.map(({ src, width, height, images, image }) => {
            const title = <Title title={image.title} sold={image.sold} />
            const description = <Description dimensions={image.dimensions} otherText={image.otherText} />

            return {
                src,
                width,
                height,
                srcSet: images.map(image => ({
                    src: image.src,
                    width: image.width,
                    height: image.height,
                })),
                title,
                description,
            }
        })
    }, [typeImages])

    // Check that type is valid
    if (!type || !DISPLAY_TYPES_MAP[type]) {
        return <NotFound />
    }

    return (
        <>
            <VStack w={{ base: '100%', md: '4xl' }}>
                <Box w={['100%', null, null, '4xl']} p={2} pt={5}>
                    <PhotoAlbum
                        photos={formattedImages}
                        spacing={24}
                        layout="rows"
                        targetRowHeight={220}
                        renderPhoto={renderPhoto}
                        onClick={({ index }) => setIndex(index)}
                    />
                    <Lightbox
                        slides={slides}
                        open={index >= 0}
                        index={index}
                        close={() => setIndex(-1)}
                        plugins={[Thumbnails, Captions]}
                        thumbnails={{ position: 'bottom', width: 180, height: 120 }}
                    />
                </Box>
            </VStack>
        </>
    )
}

const cloudinaryLink = (id: string, width: number, height: number) => {
    return `${import.meta.env.VITE_CLOUDINARY_IMAGE_BASE_URL}/w_${width},h_${height}/v1678686114${import.meta.env.VITE_CLOUDINARY_FOLDER}/${id}`
}

type Photo = {
    src: string
    width: number
    height: number
    image: Image
    alt: string
    images: {
        src: string
        width: number
        height: number
    }[]
}

const renderPhoto: RenderPhoto<Photo> = ({ layoutOptions, imageProps: { alt, style, ...restImageProps }, photo }) => {
    console.log('restImageProps', photo)

    return (
        <div
            style={{
                boxSizing: 'content-box',
                alignItems: 'center',
                width: style?.width,
                padding: `${layoutOptions.padding - 2}px`,
                paddingBottom: 0,
            }}>
            {photo?.image.sold ? <FaCircle color="red" style={{ position: 'absolute', marginTop: '5px', marginLeft: '5px' }} /> : null}
            <img alt={alt} style={{ ...style, width: '100%', padding: 0 }} {...restImageProps} />
            <div
                style={{
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    overflow: 'visible',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                }}>
                {alt}
            </div>
        </div>
    )
}

const Title = ({ title, sold }: { title?: string; sold?: boolean }) => {
    return (
        <Flex align="center">
            {sold ? <FaCircle color="red" /> : null}
            <Text ml={4}>{title}</Text>
        </Flex>
    )
}

const Description = ({ dimensions, otherText }: { dimensions?: string; otherText?: string }) => {
    return (
        <Flex align="center">
            {dimensions && <Text>{dimensions}</Text>}
            {dimensions && otherText && <Text mx={2}>|</Text>}
            {otherText && <Text>{otherText}</Text>}
        </Flex>
    )
}
