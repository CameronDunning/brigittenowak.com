import React from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout } from '~/components/Layout'
import { NotFound } from '~/pages/404'
import { Admin } from '~/pages/Admin'
import { Home } from '~/pages/Home'
import { About } from '~/pages/About'
import { Resume } from '~/pages/Resume'
import { Representation } from './pages/Representation'
import { Contact } from './pages/Contact'
import { Artwork } from './pages/Artwork'
import { ArtworkType } from './pages/ArtworkType'
import { theme } from '~/styles/customTheme'

const ROUTER = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/admin', element: <Admin /> },
            { path: '/about', element: <About /> },
            { path: '/resume', element: <Resume /> },
            { path: '/representation', element: <Representation /> },
            { path: '/contact', element: <Contact /> },
            { path: '/artwork', element: <Artwork /> },
            { path: '/artwork/:type', element: <ArtworkType /> },
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
