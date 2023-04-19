import { Box } from '@chakra-ui/react'

export const Footer = () => {
    return (
        <footer>
            <Box p={2} textAlign="center" fontSize="sm" position="absolute" bottom={0} w="100%" data-testid="footer">
                ©2023 Brigitte Nowak, painter and printmaker.
            </Box>
        </footer>
    )
}
