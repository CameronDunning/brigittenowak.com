import { Box, Flex, Grid, GridItem, Heading, Image, Link, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import { EGG_TEMPERA, SERIGRAPHS } from '~/config/constants'
import { ArtworkTypeByProps } from '~/pages/ArtworkTypeByProps'

export const About = () => {
    return (
        <Flex as="main" w={{ base: '100%', md: '4xl' }} flexDirection="column">
            <Box as="section" pb={12} px={{ base: 2, md: 0 }}>
                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                    <GridItem>
                        <Image
                            w={{ base: '100%', md: '4xl' }}
                            src="https://res.cloudinary.com/di2dfqt1l/image/upload/v1712805762/brigittenowak_com/profile_picture.jpg"
                            alt="Red Canoe"
                        />
                    </GridItem>
                    <GridItem>
                        <Heading pb={2}>About Brigitte Nowak</Heading>
                        <Text fontWeight="bold" pb={2}>
                            Brigitte Nowak lives in Toronto, and spends summers on an island in Georgian Bay. Image making, to understand and reveal
                            the world around her, has always been part of her life.
                        </Text>
                        <Text fontWeight="bold" pb={2}>
                            Her paintings, mostly in in oils, explore the nature of reality and illusion, the interface between the human and natural
                            worlds, and the line between observation and comment. Her work, included in private and corporate collections, has won
                            awards in both Canada and the U.S. She has been featured in museum exhibitions, and is represented by several Ontario
                            galleries.
                        </Text>
                        <Link as={RouterLink} to="/resume" textDecoration="underline" fontWeight="bold" pb={2}>
                            Brigitte Nowak's CV
                        </Link>
                    </GridItem>
                </Grid>
            </Box>
            <Box as="section" pb={12} px={{ base: 2, md: 0 }}>
                <Heading pb={2}>About Egg Tempera</Heading>
                <Text fontWeight="bold" pb={2}>
                    Egg tempera has been used as a painting medium since ancient times, and was in common use prior to the invention of oil paint.
                    Known for its luminous and subtle colour properties, it is made by mixing egg yolk with water and pure, powdered, pigments which
                    have been ground by hand. The painting surface is a wood or masonite panel which has been prepared using rabbitskin glue as a size
                    and several coats of traditional gesso (marble dust, whiting and hide glue mixed with water - modern acrylic gesso is not
                    absorbent enough). The paint is applied in thin layers, usually built up through cross-hatching, although more creative
                    applications are also possible.
                </Text>
            </Box>
            <ArtworkTypeByProps type={EGG_TEMPERA} />
            <Box as="section" pb={12} px={{ base: 2, md: 0 }}>
                <Heading pb={2}>About serigraphs (also known as screenprints)</Heading>
                <Text fontWeight="bold" pb={2}>
                    Serigraphs are limited edition prints made using the screenprinting process, which is also commonly used for commercial purposes.
                    To make a serigraph, or screenprint, an image is created on a screen, often drawn by hand. Areas are blocked out, either with a
                    paper stencil, glue-like coating or photographic emulsion, and ink is forced through the open areas of the screen on to a
                    substrate (such as paper) with a squeegee. This process is repeated for each desired colour. There is no image which is copied
                    from another source, printing is done by hand, and the screen is reclaimed after the printing process is complete.
                </Text>
            </Box>
            <ArtworkTypeByProps type={SERIGRAPHS} />
        </Flex>
    )
}
