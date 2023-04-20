import { Fragment } from 'react'

import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Box, Divider, Flex, HStack, IconButton, Link, Stack, useDisclosure } from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

type NavLinkProps = {
    children: string
}

const links = ['About', 'Images', 'Representation', 'Contact']

const NavLink = ({ children }: NavLinkProps) => (
    <Link pl={{ base: 2, md: 0 }} href={`/${children.toLowerCase()}`}>
        {children}
    </Link>
)

export const NavBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { pathname } = useLocation()

    return (
        <Box as="nav" w="100%" borderBottom="1px solid gray">
            <Box p={4} display="flex" justifyContent={'center'}>
                <Flex w="4xl" h="14px" justifyContent="space-between" alignItems="center">
                    <Link as={RouterLink} to="/" fontWeight="bold">
                        Brigitte Nowak
                    </Link>
                    <HStack spacing={4} h="14px" display={{ base: 'none', md: 'flex' }}>
                        {links.map((link, index) => (
                            <Fragment key={index}>
                                <NavLink key={link}>{link}</NavLink>
                                {index !== links.length - 1 && <Divider orientation="vertical" />}
                            </Fragment>
                        ))}
                    </HStack>
                    <IconButton
                        size="sm"
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                </Flex>
            </Box>
            {isOpen ? (
                <Box pb={4} display={{ md: 'none' }} style={styles.dropdown}>
                    <Stack spacing={4}>
                        {links.map(link => (
                            <NavLink key={link}>{link}</NavLink>
                        ))}
                    </Stack>
                </Box>
            ) : null}
        </Box>
    )
}

const styles = {
    dropdown: {
        marginTop: 0,
    },
}
