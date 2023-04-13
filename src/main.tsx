import React from 'react'

import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout } from './components/Layout'
import { NotFound } from './pages/404'
import { HelmetProvider } from 'react-helmet-async'
import { Home } from './pages/Home'

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
            <ChakraProvider>
                <RouterProvider router={ROUTER} />
            </ChakraProvider>
        </HelmetProvider>
    </React.StrictMode>
)
