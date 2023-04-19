import React from 'react'

import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import { Layout } from '~/components/Layout'
import { NotFound } from '~/pages/404'
import { Home } from '~/pages/Home'
import { theme } from '~/styles/customTheme'

const ROUTER = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '*', element: <NotFound /> },
        ],
        errorElement: <NotFound />,
    },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HelmetProvider>
            <ChakraProvider theme={theme}>
                <RouterProvider router={ROUTER} />
            </ChakraProvider>
        </HelmetProvider>
    </React.StrictMode>
)
