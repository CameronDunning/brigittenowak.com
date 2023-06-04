import { Link as RouterLink } from 'react-router-dom'
import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react'

export const About = () => {
    return (
        <Flex as="main" w={{ base: '100%', md: '4xl' }} flexDirection="column">
            <Box as="section" pb={12} px={{ base: 2, md: 0 }}>
                <Heading pb={2}>About Brigitte Nowak</Heading>
                <Text fontWeight="bold" pb={2}>
                    Brigitte Nowak was born in Germany, grew up in Cambridge, Ontario and graduated from the University of Guelph, Ontario in Fine
                    Art. She lives in Toronto and spends summers on an island in Georgian Bay. Image-making, as a quest to understand and reveal the
                    world around her and her role in it, has been a cornerstone of her life as far back as she can remember.
                </Text>
                <Text fontWeight="bold" pb={2}>
                    Her realist landscapes and figurative works explore the nature of reality and illusion, the interaction between the human and
                    natural worlds, and the line between observation and comment. Of ongoing interest is that most Canadian of icons, the canoe, for
                    its form and for its symbolic allusions, the emerging self-awareness of children and adolescents, and the places that define our
                    lives.
                </Text>
                <Text fontWeight="bold" pb={2}>
                    Brigitte Nowak has had several solo exhibitions and has participated in numerous group and juried shows in both Canada and the
                    United States. Her work has been used as the signature piece for Toronto’s Riverdale Art Walk, the Project CANOE charitable
                    organization and was chosen one of the "Top Ten" in the 2009 Royal Agricultural Winter Fair's Fine Art Showcase.
                </Text>
                <Link as={RouterLink} to="/resume" textDecoration="underline" fontWeight="bold" pb={2}>
                    Brigitte Nowak's CV
                </Link>
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
        </Flex>
    )
}
