import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
    colors: {
        primary: {
            50: '#f6f4ef',
            100: '#e8e2d3',
            200: '#dad2b8',
            300: '#ccc29d',
            400: '#daccb4', // main color
            500: '#b6b08f',
            600: '#91876c',
            700: '#6c5e48',
            800: '#473725',
            900: '#1f140a',
        },
    },
    fonts: {
        heading: 'Helvetica Neue, sans-serif',
        body: 'Open Sans, sans-serif',
    },
    styles: {
        global: {
            body: {
                bg: '#59728e',
                color: 'primary.400',
                fontFamily: 'body',
                fontWeight: 'normal',
                lineHeight: 'base',
                paddingBottom: '40px',
            },
            a: {
                color: 'primary.400',
                textDecoration: 'none',
                _hover: {
                    textDecoration: 'underline',
                },
            },
            h1: {
                fontFamily: 'heading',
                fontSize: '5xl',
                fontWeight: 'bold',
                color: 'primary.400',
            },
            h2: {
                fontFamily: 'heading',
                fontSize: '4xl',
                fontWeight: 'bold',
                color: 'primary.400',
            },
            h3: {
                fontFamily: 'heading',
                fontSize: '3xl',
                fontWeight: 'bold',
                color: 'primary.400',
            },
            h4: {
                fontFamily: 'heading',
                fontSize: '2xl',
                fontWeight: 'bold',
                color: 'primary.400',
            },
            h5: {
                fontFamily: 'heading',
                fontSize: 'xl',
                fontWeight: 'bold',
                color: 'primary.400',
            },
            h6: {
                fontFamily: 'heading',
                fontSize: 'lg',
                fontWeight: 'bold',
                color: 'primary.400',
            },
            ul: {
                listStyleType: 'none',
            },
        },
    },
})
